let hp=100,shots=0,finished=false,attacking=false,attackTimer=null;
const boss=document.getElementById('boss'),hpFill=document.getElementById('boss-hp'),hpLabel=document.getElementById('hp-label');
const speech=document.getElementById('boss-speech'),status=document.getElementById('boss-status'),arena=document.getElementById('arena');
function startBossAttacks(){
 if(attackTimer)clearInterval(attackTimer);
 const interval=hp<=30?850:1700; // Boss attacks twice as fast in rage mode.
 attackTimer=setInterval(()=>{
  if(finished)return;
  const hit=document.createElement('span');hit.className='boss-attack';hit.textContent=hp<=30?'💥':'💢';
  const b=boss.getBoundingClientRect(),a=arena.getBoundingClientRect();
  hit.style.left=(b.left-a.left+b.width/2)+'px';hit.style.top=(b.top-a.top+b.height/2)+'px';
  document.getElementById('projectiles').appendChild(hit);setTimeout(()=>hit.remove(),700);
  const player=document.getElementById('player');player.classList.remove('player-hit');void player.offsetWidth;player.classList.add('player-hit');
  status.textContent=hp<=30?'Boss đang tấn công điên cuồng! Bắn nhanh lên!':'Boss phản công! Né tránh bằng cách hạ máu nó nào!';
  playTone('bad');
 },interval);
}
function updateBoss(){
 hpFill.style.width=hp+'%';hpLabel.textContent=hp+'%';
 if(hp<=30&&!boss.classList.contains('low-health')){boss.classList.add('low-health');boss.textContent='😭';speech.textContent='Khoan đã, mình thương lượng nha!!!';startBossAttacks();}
 if(hp<=0&&!finished){
  finished=true;
  
sendGameEvent('boss_defeated', {
  result: 'win'
});

  if(attackTimer)clearInterval(attackTimer);boss.textContent='🥹';speech.textContent='Tớ đầu hàng!';status.textContent='BOSS ĐÃ BỊ ĐÁNH BẠI! Quá đỉnh luôn!!! 🎉';
  document.getElementById('shoot-button').textContent='Mở rương báu 🎁';playTone('win');burstConfetti(45);
  document.getElementById('shoot-button').onclick=()=>window.location.href='treasure.html';
 }
}
function shoot(){
 if(finished)return;
 shots++;
 const projectile=document.createElement('span');projectile.className='heart-shot';projectile.textContent=['💘','💗','💖'][shots%3];
 const bx=boss.getBoundingClientRect(),ar=arena.getBoundingClientRect();
 projectile.style.setProperty('--target-x',(bx.left-ar.left+bx.width/2)+'px');
 projectile.style.setProperty('--target-y',(bx.top-ar.top+bx.height/2)+'px');
 document.getElementById('projectiles').appendChild(projectile);setTimeout(()=>projectile.remove(),550);
 hp=Math.max(0,hp-10);playTone('good');updateBoss();
 if(hp>0){
   // Boss dodges more often and taunts faster once below 30% HP.
   const low=hp<=30;
   boss.style.left=(18+Math.random()*64)+'%';
   boss.style.top=(low?27+Math.random()*17:29+Math.random()*12)+'%';
   if(shots%3===0)status.textContent=low?'Boss hoảng loạn, né nhanh gấp đôi rồi! Bắn tiếp!':'Boss đang né! Đừng để nó chạy thoát!';
   if(low&&shots%2===0){speech.textContent='Á á á, đừng bắn nữa! 😭';setTimeout(()=>{if(!finished)speech.textContent='Xin hàng được chưa?!'},450);}
 }
}
document.getElementById('shoot-button').addEventListener('click',shoot);
startBossAttacks();
document.addEventListener('keydown',e=>{if(e.code==='Space'&&!finished){e.preventDefault();shoot();}});
