// Edit the five questions and correctIndex values here to personalize the quiz.
const questions=[
 {emoji:'💗',text:'Nếu được chọn một buổi hẹn đầu tiên, cậu thích điều gì nhất?',answers:['Đi ăn món ngon rồi tám chuyện','Ngồi ngắm hoàng hôn','Đi chơi game cùng nhau','Cả ba đều được, miễn vui'],correctIndex:3},
 {emoji:'🐱',text:'Một chú mèo đang giận dỗi thì nên làm gì?',answers:['Dỗ dành bằng đồ ăn','Ôm một cái thật nhẹ','Xin lỗi bằng giọng đáng yêu','Tất cả đáp án trên'],correctIndex:3},
 {emoji:'🧋',text:'Mật khẩu của một buổi hẹn vui vẻ là gì?',answers:['Cười thật nhiều','Không ai được dùng điện thoại','Có đồ ăn ngon','Tất cả đều đúng'],correctIndex:3},
 {emoji:'🌷',text:'Khi người đặc biệt hơi buồn, cậu sẽ…',answers:['Lắng nghe và ở bên','Gửi meme hài hước','Mua món ăn yêu thích','Hỏi xem người ấy cần gì'],correctIndex:3},
 {emoji:'💌',text:'Câu hỏi quan trọng nhất: cậu đã sẵn sàng gặp trùm cuối chưa?',answers:['Tớ sinh ra để chiến thắng!','Hơi run nhưng chơi luôn','Cho tớ chuẩn bị tinh thần','Tất cả đều là YES!'],correctIndex:3}
];
let current=0,answered=false;
const $=id=>document.getElementById(id);
function renderQuestion(){
 const q=questions[current];answered=false;
 $('question-counter').textContent=`Câu ${current+1}/5`;
 $('progress-fill').style.width=`${(current+1)/questions.length*100}%`;
 $('quiz-emoji').textContent=q.emoji;$('question-text').textContent=q.text;
 $('answer-feedback').textContent='';$('next-question').disabled=true;
 $('next-question').textContent=current===questions.length-1?'⚔️':'➜';
 $('answer-list').replaceChildren();
 q.answers.forEach((answer,index)=>{
   const b=document.createElement('button');b.className='answer-btn';b.type='button';b.textContent=`${String.fromCharCode(65+index)}. ${answer}`;
   b.addEventListener('click',()=>chooseAnswer(index,b));$('answer-list').appendChild(b);
 });
}
function chooseAnswer(index,button){
 if(answered)return;answered=true;
 const q=questions[current],buttons=[...$('answer-list').querySelectorAll('button')];
 buttons.forEach(b=>b.disabled=true);
 
  sendGameEvent('quiz_answer', {
    question: current + 1,
    answer: q.answers[index],
    correct: index === q.correctIndex
  });

 if(index===q.correctIndex){
   button.classList.add('correct');$('answer-feedback').textContent='Giỏi thíiii!!! ✨🐱';playTone('good');burstConfetti(15);
 }else{
   button.classList.add('wrong');buttons[q.correctIndex].classList.add('correct');
   $('answer-feedback').textContent='Ối dồi ôi, sai mất rùiii 😼 Nhưng không sao, nhiệm vụ vẫn tiếp tục!';playTone('bad');
 }
 $('next-question').disabled=false;
}
$('next-question').addEventListener('click',()=>{
 if(!answered)return;
 if(current<questions.length-1){current++;renderQuestion();}
 else{window.location.href='boss.html';}
});
renderQuestion();
