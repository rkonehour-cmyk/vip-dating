
const response = document.getElementById('final-response');
const dateActions = document.getElementById('date-actions');
const yesButton = document.getElementById('yes-date');
const thinkButton = document.getElementById('think-date');

// Khi bấm "Đồng ý chứ!"
yesButton.addEventListener('click', () => {
    sendGameEvent('date_response', {
  response: 'Đồng ý chứ! 💖'
});

  response.textContent =
    'YAYYYYY!!! 💖 Hẹn gặp cậu nha. Giờ mình cùng chọn ngày, giờ và địa điểm thôi!';

  playTone('win');
  burstConfetti(50);

  dateActions.classList.add('hidden');
});

// Khi bấm "Cho tớ suy nghĩ xíu"
thinkButton.addEventListener('click', () => {
    sendGameEvent('date_response', {
  response: 'Cho tớ suy nghĩ xíu 😳'
});
  // Xóa nút suy nghĩ
  thinkButton.remove();

  // Nút đồng ý chiếm toàn bộ chiều ngang
  yesButton.style.width = '100%';
  yesButton.style.gridColumn = '1 / -1';
  yesButton.textContent = 'Đồng ý chứ! 💖';

  // Hiện thông báo bên dưới
  response.textContent = 'Không có suy nghĩ gì nữa, chốt kèo!!! 💍💗';

  playTone('good');
  burstConfetti(25);
});
