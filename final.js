
const response = document.getElementById('final-response');
const emailStatus = document.getElementById('email-status');
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
// ===== TỰ ĐỘNG GỬI BÁO CÁO KHI VÀO TRANG CUỐI =====
async function completeVipDatingGame() {
  const response = document.getElementById('final-response');

  try {
    sendGameEvent('game_completed', {
      completedAt: new Date().toISOString()
    });

    await sendGameCompletionEmail();

    console.log('Email báo cáo VIP Dating đã được gửi.');

    // Hiện thông báo nếu tìm được phần tử phù hợp.
    
if (emailStatus) {
  emailStatus.textContent = '📩 Báo cáo đã được gửi thành công!';
}

  } catch (error) {
    console.error('Không gửi được email báo cáo:', error);


  if (emailStatus) {
    emailStatus.textContent =
      '📩 Chưa gửi được báo cáo email. Hãy kiểm tra kết nối rồi thử lại.';
  }

  }
}

// Chạy an toàn dù file JS tải trước hay sau sự kiện DOMContentLoaded.
if (document.readyState === 'loading') {
  document.addEventListener(
    'DOMContentLoaded',
    completeVipDatingGame,
    { once: true }
  );
} else {
  completeVipDatingGame();
}
