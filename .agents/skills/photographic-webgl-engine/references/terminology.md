# Từ Điển Thuật Ngữ Nhiếp Ảnh & Đồ Họa Điện Ảnh WebGL

Tài liệu tham khảo chi tiết giải thích mối liên hệ giữa các thuật ngữ nhiếp ảnh quang học thực tế và thông số kỹ thuật tương ứng trong Three.js / WebGL.

| Thuật ngữ Nhiếp ảnh | Tên tiếng Anh | Đại lượng WebGL / Three.js tương ứng | Ý nghĩa & Ứng dụng |
| :--- | :--- | :--- | :--- |
| **Tiêu cự** | Focal Length | `camera.setFocalLength(mm)` / `camera.fov` | Xác định góc nhìn hẹp hay rộng và tỷ lệ phối cảnh. |
| **Khẩu độ** | Aperture (f-stop) | `dofEffect.bokehScale` / `fstop` | Điều chỉnh độ xóa phông (DoF) và hình dạng Bokeh. |
| **Tốc độ màn trập** | Shutter Speed | `motionBlurPass.samples` / `intensity` | Quyết định độ nhòe chuyển động của vật thể. |
| **Độ nhạy sáng** | ISO Sensitivity | `noiseEffect.blendFunction` & `exposure` | Mô phỏng độ sáng cảm biến và độ mịn/hạt film. |
| **Độ sâu trường ảnh** | Depth of Field (DoF) | `DepthOfFieldEffect` | Vùng không gian trong ảnh giữ được độ nét sắc nét. |
| **Tán sắc viền** | Chromatic Aberration | `ChromaticAberrationEffect` | Hiệu ứng phân tán ánh sáng đa sắc ở rìa thấu kính. |
| **Tối góc** | Vignetting | `VignetteEffect({ darkness, offset })` | Giảm độ sáng ở 4 góc để hướng mắt người nhìn vào tâm. |
| **Hào quang sáng** | Bloom / Glow | `BloomEffect({ luminanceThreshold })` | Lan tỏa ánh sáng từ các bề mặt phát quang hoặc điểm chói. |
| **Nén phối cảnh** | Lens Compression | `camera.zoom` kết hợp dịch vị trí lùi xa | Hiệu ứng ống kính tele kéo gần khoảng cách hậu cảnh và tiền cảnh. |
| **Góc nghiêng Dutch**| Dutch Angle | `camera.rotation.z` | Nghiêng trục camera để tạo cảm giác căng thẳng, bất ổn. |
