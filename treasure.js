const prizes=[
 {name:'Chipchip vị cocacola',art:'🥔🥤',description:'Một món snack giòn rụm dành riêng cho cậu!'},
 {name:'Trà sữa full topping',art:'🧋💗',description:'Một ly trà sữa full topping, hẹn cậu cùng đi chọn vị nha!'},
 {name:'Phần quà tùy chọn',art:'🎁✨',description:'Đặc quyền tự chọn món quà mà cậu thích nhất!'}
];
let mapping=[0,1,2],locked=false;
const row=document.getElementById('chest-row');
setTimeout(()=>{
 document.getElementById('prize-preview').classList.add('hide-prizes');
 document.getElementById('chest-instruction').textContent='Quà đã chui vào rương rồi! Ba chiếc rương sẽ đảo vị trí… Chọn một chiếc bằng trực giác nha ✨';
 const chests=[...row.children];
 chests.forEach((chest,i)=>{chest.classList.add(i%2?'shuffle-a':'shuffle-b');});
 // Slowly shuffle the prize-to-chest mapping while the chests animate.
 setTimeout(()=>{
   mapping=[2,0,1];
   chests.forEach((chest,i)=>{chest.classList.remove('shuffle-a','shuffle-b');chest.querySelector('small').textContent=`RƯƠNG ${String.fromCharCode(65+i)}`;});
   document.getElementById('chest-instruction').textContent='Rương đã đổi chỗ xong! Chọn một rương để mở quà nhé 💖';
 },900);
},1800);
row.querySelectorAll('.chest').forEach((chest,index)=>chest.addEventListener('click',()=>{
 if(locked)return;locked=true;
 const prize=prizes[mapping[index]];
 // Lưu phần quà người chơi chọn.
sessionStorage.setItem('vipDatingPrize', prize.name);

sendGameEvent('prize_selected', {
  prize: prize.name,
  description: prize.description
});
 sendGameEvent('treasure_selected', {
  prize: prize.name,
  chest: index + 1
});
 row.querySelectorAll('.chest').forEach((c,i)=>{c.disabled=true;if(i!==index)c.classList.add('vanish');else c.classList.add('chosen');});
 document.getElementById('chest-instruction').textContent='Đang mở rương… ✨';
 setTimeout(()=>{
   row.querySelectorAll('.chest').forEach((c,i)=>{if(i!==index)c.classList.add('hidden');});
   const result=document.getElementById('prize-result');result.classList.remove('hidden');
   result.innerHTML=`<div class="result-art">${prize.art}</div><p class="kicker">QUÀ CỦA CẬU ĐÂY</p><h2>${prize.name}</h2><p>${prize.description}</p>`;
   document.getElementById('chest-instruction').textContent='Chúc mừng cậu đã mở được rương báu! 🎉';
   playTone('win');burstConfetti(45);
   if(mapping[index]===2){document.getElementById('custom-prize-form').classList.remove('hidden');}
   else{document.getElementById('continue-final').classList.remove('hidden');}
 },700);
}));
document.getElementById('custom-prize-form').addEventListener('submit',e=>{
 e.preventDefault();const value=document.getElementById('custom-prize').value.trim();if(!value)return;
 sessionStorage.setItem('vipDatingCustomPrize', value);

sendGameEvent('custom_prize_entered', {
  prize: value
});
 const result=document.getElementById('prize-result');
 const chosen=document.createElement('p');chosen.innerHTML='💌 <strong>Yêu cầu đặc biệt:</strong> ';chosen.append(document.createTextNode(value));result.appendChild(chosen);
 document.getElementById('custom-prize-form').classList.add('hidden');document.getElementById('continue-final').classList.remove('hidden');playTone('good');
});
