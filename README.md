# SkyCat VIP Dating 💗

Một mini-game hẹn hò nhiều trang, responsive cho điện thoại và máy tính.

## Chạy thử
Mở `index.html` bằng trình duyệt. Để thử trên GitHub Pages, tải toàn bộ thư mục lên repository và bật **Settings → Pages**.

## Tài khoản demo
- Tài khoản: `thanhtruc`
- Mật khẩu: `09102005`

**Lưu ý bảo mật:** Đây là cổng đăng nhập vui để chơi game, không phải xác thực bảo mật thật. Vì thông tin đăng nhập nằm trong JavaScript phía trình duyệt, bất kỳ ai xem source code cũng có thể tìm thấy. Không dùng mật khẩu thật hoặc dữ liệu riêng tư.

## Các trang
- `index.html`: đăng nhập
- `intro.html`: lời giới thiệu nhiệm vụ
- `quiz.html`: 5 câu hỏi, progress bar, hiệu ứng và âm thanh
- `boss.html`: mini-game bắn tim đánh boss
- `treasure.html`: chọn rương và nhận quà
- `final.html`: thiệp mời hẹn hò
- `style.css`: giao diện responsive dùng chung
- `app.js`, `quiz.js`, `boss.js`, `treasure.js`, `final.js`: logic tương tác

## Tùy chỉnh
- Sửa câu hỏi/đáp án trong `quiz.js` (mỗi câu có `correctIndex`, đếm từ 0).
- Sửa nội dung lời mời trong `final.html`.
- Hình nhân vật và quà hiện dùng emoji để tránh phụ thuộc ảnh ngoài; có thể thay bằng ảnh riêng nếu muốn.
