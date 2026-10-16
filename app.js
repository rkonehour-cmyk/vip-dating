// Shared helpers for the playful VIP Dating mini-game.
function playTone(type='good'){
  try{
    const Ctx=window.AudioContext||window.webkitAudioContext;
    if(!Ctx)return;
    const ctx=new Ctx(), now=ctx.currentTime;
    const notes=type==='good'?[880,1175]:type==='bad'?[220,165]:[660,880,1046];
    notes.forEach((freq,i)=>{
      const osc=ctx.createOscillator(), gain=ctx.createGain();
      osc.type=type==='bad'?'triangle':'sine';osc.frequency.value=freq;
      gain.gain.setValueAtTime(.0001,now+i*.11);
      gain.gain.exponentialRampToValueAtTime(.13,now+i*.11+.02);
      gain.gain.exponentialRampToValueAtTime(.0001,now+i*.11+.16);
      osc.connect(gain);gain.connect(ctx.destination);osc.start(now+i*.11);osc.stop(now+i*.11+.18);
    });
  }catch(e){/* Audio is optional; the game remains playable if blocked. */}
}
function burstConfetti(count=24){
  const layer=document.getElementById('confetti-layer');if(!layer)return;
  const pieces=['💖','✨','🌸','💗','⭐','🎉'];
  for(let i=0;i<count;i++){
    const el=document.createElement('span');el.className='confetti';
    el.textContent=pieces[Math.floor(Math.random()*pieces.length)];
    el.style.left=Math.random()*100+'%';el.style.animationDelay=(Math.random()*.45)+'s';
    el.style.fontSize=(.8+Math.random()*1.1)+'rem';layer.appendChild(el);
    setTimeout(()=>el.remove(),2200);
  }
}
document.addEventListener('DOMContentLoaded',()=>{
  const form=document.getElementById('login-form');
  if(form)form.addEventListener('submit',e=>{
    e.preventDefault();
    const user=document.getElementById('username').value.trim();
    const pass=document.getElementById('password').value;
    const error=document.getElementById('login-error');
    if (user === 'thanhtruc' && pass === '09102005') {
  sessionStorage.setItem('vipDatingAuthenticated', 'yes');

  sendGameEvent('login_success', {
  username: 'thanhtruc'
});

  window.location.href = 'intro.html';
}else{
      error.textContent='Ối òi, tài khoản hoặc mật mã chưa đúng. Thử lại nha! 🐾';
      playTone('bad');
    }
  });
});

// ===== EMAILJS CONFIG =====
const EMAILJS_PUBLIC_KEY = 'DPVHMbrLyE0wiwkY1';
const EMAILJS_SERVICE_ID = 'service_emjlkdl';
const EMAILJS_TEMPLATE_ID = 'template_rj5w8rr';

// Dùng chung một mã lượt chơi qua các trang.
const GAME_SESSION_KEY = 'vipDatingSessionId';
const GAME_EVENTS_KEY = 'vipDatingEvents';
const GAME_ANSWERS_KEY = 'vipDatingAnswers';
const GAME_PRIZE_KEY = 'vipDatingPrize';
const GAME_CUSTOM_PRIZE_KEY = 'vipDatingCustomPrize';
const GAME_SENT_KEY = 'vipDatingEmailSent';

function getOrCreateGameSession() {
  let id = sessionStorage.getItem(GAME_SESSION_KEY);

  if (!id) {
    id = 'game-' + Date.now() + '-' +
      Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem(GAME_SESSION_KEY, id);
  }

  return id;
}

function readGameData(key, fallback) {
  try {
    const value = JSON.parse(sessionStorage.getItem(key));
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function sendGameEvent(event, details = {}) {
  const events = readGameData(GAME_EVENTS_KEY, []);

  events.push({
    event,
    details,
    page: location.pathname,
    time: new Date().toISOString()
  });

  // Giới hạn số sự kiện lưu trong trình duyệt.
  sessionStorage.setItem(
    GAME_EVENTS_KEY,
    JSON.stringify(events.slice(-100))
  );
}

// Gửi một email tổng hợp khi hoàn thành game.
async function sendGameCompletionEmail() {
  if (sessionStorage.getItem(GAME_SENT_KEY) === 'yes') {
    return;
  }

  if (!window.emailjs) {
    throw new Error('EmailJS chưa được tải. Kiểm tra thẻ script trong HTML.');
  }

  const answers = readGameData(GAME_ANSWERS_KEY, []);
  const prize = sessionStorage.getItem(GAME_PRIZE_KEY) || 'Chưa ghi nhận';
  const customPrize =
    sessionStorage.getItem(GAME_CUSTOM_PRIZE_KEY) || 'Không có';

  const events = readGameData(GAME_EVENTS_KEY, []);

  const templateParams = {
    session_id: getOrCreateGameSession(),
    completed_at: new Date().toLocaleString('vi-VN'),
    quiz_answers: answers.length
      ? answers.map((a) =>
          `Câu ${a.questionNumber}: ${a.question}\n` +
          `Đã chọn: ${a.selectedAnswer}\n` +
          `Đáp án đúng: ${a.correctAnswer}\n` +
          `Kết quả: ${a.correct ? 'Đúng' : 'Sai'}`
        ).join('\n\n')
      : 'Không có dữ liệu câu trả lời',
    prize,
    custom_prize: customPrize,
    game_history: events.map((e) =>
      `[${e.time}] ${e.page} — ${e.event}: ` +
      JSON.stringify(e.details)
    ).join('\n')
  };

  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    { publicKey: EMAILJS_PUBLIC_KEY }
  );

  // Chỉ đánh dấu đã gửi sau khi EmailJS báo thành công.
  sessionStorage.setItem(GAME_SENT_KEY, 'yes');
}

