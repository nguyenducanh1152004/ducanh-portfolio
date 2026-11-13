# Đức Anh — Portfolio hệ hành tinh 3D

Trang mở ra với một hệ mặt trời 3D toàn màn hình. Mỗi hành tinh là một mục. Bấm vào hành tinh (hoặc menu) thì camera bay tới, hành tinh đó đứng một mình và bảng nội dung trượt ra.

| Hành tinh | Mục |
|---|---|
| Trái Đất | Giới thiệu |
| Sao Hải Vương | Kỹ năng |
| Sao Thổ | Dự án |
| Sao Hỏa | Kinh nghiệm |
| Sao Thiên Vương | Liên hệ |

## Chạy trên máy

```powershell
npm start
```

Mở `http://127.0.0.1:4173`. Nếu cổng bận: `$env:PORT=4174; npm start`.

## Sửa nội dung

**Toàn bộ chữ nằm trong `dist/config.js`**: tên, email, giới thiệu, kỹ năng (kèm mức độ 1–5 và số năm), dự án, kinh nghiệm, chứng chỉ, FAQ… Sửa xong chỉ cần tải lại trang, không cần build.

Dự án và kinh nghiệm hiện là **nội dung minh họa** để thử giao diện.

## Cấu trúc

- `dist/index.html`: khung trang
- `dist/config.js`: nội dung
- `dist/assets/scene.js`: cảnh 3D (Three.js), camera, hành tinh
- `dist/assets/main.js`: điều hướng, render nội dung, form, hộp thoại dự án
- `dist/assets/style.css`: giao diện và responsive
- `dist/assets/planets/`: texture hành tinh (khoảng 600 KB)

## Tương tác

- Bấm hành tinh hoặc menu để mở mục. `←` `→` chuyển mục, `Esc` quay về.
- Kéo chuột để xoay hệ hành tinh (hoặc xoay quanh hành tinh đang xem).
- URL có hash (`#projects`…), nút Back của trình duyệt hoạt động.
- Tôn trọng chế độ “giảm chuyển động” của hệ điều hành.

## Form liên hệ

`demo: true` trong `config.js`: form chỉ báo là bản thử nghiệm. Đổi thành `false` (và điền email thật) thì form mở ứng dụng email với nội dung soạn sẵn.

## Kiểm tra & deploy (khi sẵn sàng)

```powershell
npm run check
```

Thư mục deploy tĩnh là `dist/` (đã có `vercel.json`).
