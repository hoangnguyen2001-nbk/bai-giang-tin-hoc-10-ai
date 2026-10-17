/**
 * Cinematic WebGL Camera & Post-Processing Setup
 * Emulating realistic photography optics in Three.js
 */

import * as THREE from 'three';
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  BloomEffect,
  DepthOfFieldEffect,
  VignetteEffect,
  ChromaticAberrationEffect,
  ToneMappingEffect,
  ToneMappingMode
} from '../../modules/postprocessing/src/index.js';

export class CinematicStudio {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      focalLength: 50, // 50mm lens
      fstop: 1.8,      // Wide aperture f/1.8
      focusDistance: 3.5, // 3.5 meters
      iso: 200,
      ...options
    };

    this.init();
  }

  init() {
    // 1. Scene & Renderer
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    // 2. Physical Camera
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 1.6, 5); // Eye-level height (1.6m)
    this.camera.setFocalLength(this.options.focalLength);

    // 3. Post-processing Pipeline
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    // Depth of Field
    const dof = new DepthOfFieldEffect(this.camera, {
      focusDistance: this.options.focusDistance / 100,
      focalLength: this.options.focalLength / 1000,
      bokehScale: Math.max(1.0, 10.0 / this.options.fstop)
    });

    // Bloom (Highlight glow)
    const bloom = new BloomEffect({ intensity: 0.5, luminanceThreshold: 0.85 });

    // Chromatic Aberration & Vignette
    const chromaticAberration = new ChromaticAberrationEffect({ offset: new THREE.Vector2(0.001, 0.001) });
    const vignette = new VignetteEffect({ darkness: 0.45, offset: 0.3 });

    // Tone Mapping (Filmic)
    const toneMapping = new ToneMappingEffect({ mode: ToneMappingMode.ACES_FILMIC });

    const cinematicPass = new EffectPass(this.camera, dof, bloom, chromaticAberration, vignette, toneMapping);
    this.composer.addPass(cinematicPass);
  }

  render() {
    this.composer.render();
  }
}
