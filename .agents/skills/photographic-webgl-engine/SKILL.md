---
name: photographic-webgl-engine
description: Chuyên gia và bộ hướng dẫn xử lý đồ họa WebGL, kỹ thuật nhiếp ảnh điện ảnh (Cinematic Photography), mô phỏng Camera vật lý (Aperture, Shutter Speed, ISO, Bokeh, DoF), Shaders GLSL và hiệu ứng hậu kỳ (Tone Mapping, Bloom, Vignette, Film Grain, Chromatic Aberration) cho Three.js và WebGL.
---

# 🎬 Chuyên Gia Đồ Họa WebGL & Nhiếp Ảnh Điện Ảnh (Photographic WebGL Engine)

Skill này cung cấp cho Antigravity nền tảng tri thức chuyên sâu và các module mã nguồn mở để thiết kế, render và điều khiển các khung cảnh 3D/WebGL mang đậm chất nhiếp ảnh điện ảnh (Cinematic Aesthetics).

---

## 📸 1. Bản Đồ Thuật Ngữ Nhiếp Ảnh Điện Ảnh (Cinematic Photography Lexicon)

Khi xử lý các yêu cầu về hình ảnh, camera hoặc render WebGL, luôn áp dụng chuẩn hóa các thông số vật lý thực tế:

### 1.1. Ống Kính & Tiêu Cự (Lens & Focal Length)
- **16mm - 24mm (Ultra-Wide / Wide Angle)**: Phù hợp toàn cảnh phong cảnh, kiến trúc hoặc tạo cảm giác không gian rộng lớn, kịch tính.
- **35mm (Cinematic / Documentary)**: Góc nhìn điện ảnh kinh điển, tự nhiên và gần gũi.
- **50mm (Standard / Human Eye)**: Tái tạo phối cảnh gần nhất với mắt người, không bị méo hình.
- **85mm - 105mm (Portrait / Cinematic Close-up)**: Tiêu cự chân dung vàng, nén phối cảnh (compression) đẹp mắt, tách biệt chủ thể tối đa.
- **200mm+ (Telephoto)**: Nén hậu cảnh sâu, làm phẳng không gian, thích hợp cảnh đặc tả tầm xa.

### 1.2. Tam Giác Phơi Sáng & Độ Sâu Trường Ảnh (Exposure Triangle & DoF)
- **Khẩu độ (Aperture / f-stop)**:
  - `f/1.2 - f/2.0`: Xóa phông cực mạnh, bokeh tròn mịn, vùng nét mỏng (Shallow Depth of Field).
  - `f/4.0 - f/5.6`: Cân bằng giữa độ sắc nét của chủ thể và độ mờ vừa phải của hậu cảnh.
  - `f/8.0 - f/11.0`: Độ sâu trường ảnh dày (Deep DoF), nét đều từ tiền cảnh đến hậu cảnh.
- **Khoảng cách lấy nét (Focus Distance)**: Khoảng cách từ thấu kính đến điểm hội tụ nét sắc của chủ thể.
- **Độ nhạy sáng (ISO) & Hạt phim (Film Grain)**: ISO thấp (100-200) cho ảnh sạch; ISO cao (1600-6400) thêm texture hạt noise nhẹ mang cảm giác hoài niệm cổ điển.

### 1.3. Ánh Sáng Điện Ảnh (Cinematic Lighting)
- **Three-Point Lighting (Hệ thống chiếu sáng 3 điểm)**:
  1. *Key Light*: Nguồn sáng chính định hình chủ thể (góc 45 độ).
  2. *Fill Light*: Nguồn sáng phụ làm dịu bóng đổ của Key Light (cường độ 30-50% Key Light).
  3. *Rim/Back Light*: Đặt phía sau chủ thể để viền sáng tóc/vai, tách chủ thể khỏi nền.
- **Nhiệt độ màu (Color Temperature - Kelvin)**:
  - `2700K - 3200K`: Tungsten / Golden Hour (ấm áp, chiều hoàng hôn).
  - `5500K - 6500K`: Daylight (ánh sáng ban ngày chuẩn tự nhiên).
  - `7500K - 9000K`: Blue Hour / Moonlight (xanh lạnh ban đêm).

---

## 🎨 2. Đường Ống Hậu Kỳ WebGL (Post-Processing Pipeline)

Tận dụng module `modules/postprocessing` tích hợp sẵn trong repo để xây dựng pipeline điện ảnh:

1. **ACES Filmic Tone Mapping**:
   Chuyển đổi dải sáng cao (HDR) về sRGB một cách mềm mại, tránh tình trạng cháy sáng (blown highlights).
2. **Depth of Field (DoF) & Bokeh**:
   Mô phỏng ống kính quang học với vòng tròn tán sắc bokeh tròn/đa giác tự nhiên.
3. **Bloom / Glow (`UnrealBloomPass`)**:
   Tạo hiệu ứng hào quang quanh các nguồn sáng chói, đèn neon và tia nắng.
4. **Vignette & Chromatic Aberration**:
   Làm tối nhẹ 4 góc khung hình và phân tách nhẹ dải màu RGB ở viền ngoài thấu kính.
5. **Color Grading & 3D LUT**:
   Áp dụng bảng màu điện ảnh (Teal & Orange, Cyberpunk, Kodachrome, Bleach Bypass).

---

## 💻 3. Mẫu Khởi Tạo Camera & Hậu Kỳ (Quick Implementation)

Tham khảo file mẫu tại:
- [`examples/cinematic-camera-setup.js`](./examples/cinematic-camera-setup.js)
- [`references/terminology.md`](./references/terminology.md)

```javascript
import * as THREE from 'three';
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  BloomEffect,
  DepthOfFieldEffect,
  VignetteEffect,
  ToneMappingEffect,
  ToneMappingMode
} from '../modules/postprocessing/src/index.js';

export function setupCinematicPipeline(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const dofEffect = new DepthOfFieldEffect(camera, {
    focusDistance: 0.02,
    focalLength: 0.05, // 50mm
    bokehScale: 4.0
  });

  const bloomEffect = new BloomEffect({
    intensity: 0.6,
    luminanceThreshold: 0.8
  });

  const toneMappingEffect = new ToneMappingEffect({
    mode: ToneMappingMode.ACES_FILMIC
  });

  const vignetteEffect = new VignetteEffect({
    darkness: 0.5,
    offset: 0.3
  });

  const pass = new EffectPass(camera, dofEffect, bloomEffect, toneMappingEffect, vignetteEffect);
  composer.addPass(pass);

  return composer;
}
```

---

## 🔍 4. Quy Trình Kiểm Thử (Verification Checklist)
- [x] Module `modules/postprocessing` hiện diện đầy đủ các shader và mã nguồn trong `src/`.
- [x] File `SKILL.md` tuân thủ chuẩn cấu trúc Antigravity (YAML frontmatter + Markdown).
- [x] Không xung đột tên (name uniqueness) với các skill hệ thống khác.
