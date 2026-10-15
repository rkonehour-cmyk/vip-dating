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

const TRACKER_URL = 'https://script.google.com/macros/s/AKfycbzNeIj_Yrw5bWN2pcz1UM7Zu5ndK0-Gb-5u-AkASxhIF12SEdie_EmsFjyQUvac9WPENw/exec';

const gameSession =
  'game-' + Date.now() + '-' +
  Math.random().toString(36).slice(2, 8);


function sendGameEvent(event, details = {}) {
  const payload = {
    session: gameSession,
    event,
    details,
    page: location.pathname,
    sentAt: new Date().toISOString()
  };

  console.log('Đang gửi sự kiện:', payload);

  const body = new URLSearchParams({
    payload: JSON.stringify(payload)
  });

  fetch(TRACKER_URL, {
    method: 'POST',
    body
  })
  .then(() => {
    console.log('Đã gửi yêu cầu tới tracker.');
  })
  .catch(err => {
    console.error('Lỗi gửi tracker:', err);
  });
}


