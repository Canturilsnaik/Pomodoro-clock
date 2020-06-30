const $start = document.getElementById('start');
const $pause = document.getElementById('pause');
const $reset = document.getElementById('reset');
const $arrowUp = document.querySelector('.arrow-up')
const $arrowDown = document.querySelector('.arrow-down')
const countdownElement = document.getElementById('countdown');
const pElement = document.querySelector('.p-element')

let startingMinutes = 25;
let time = startingMinutes * 60;
let myIntervalId;

const audio = document.querySelector('audio')

audio.addEventListener('canplaythrough', function(){
  audio.play();
});

$start.addEventListener("click", (e) => {
  let time = startingMinutes * 60;
  let coisa = {value:time}
  myIntervalId = setInterval(updateCountdown.bind(null, coisa), 1000);
  $pause.style.display = 'block';
});

$pause.addEventListener("click", (e) =>{
  pause();
  $pause.style.display = 'none';
});

$reset.addEventListener("click", (e) =>{
  reset();
});

$arrowUp.addEventListener("click", (e) => {
  up();
});

$arrowDown.addEventListener("click", (e) => {
  down();
});


function up(){
  startingMinutes += 1;
  pElement.innerHTML = `${startingMinutes} min`;
  countdownElement.innerHTML = `${startingMinutes}:00`;
}

function down(){
  startingMinutes -= 1;
  pElement.innerHTML = `${startingMinutes} min`;
  countdownElement.innerHTML = `${startingMinutes}:00`;
}

function updateCountdown(a){
  const minutes = Math.floor(a.value/60);
  let seconds = a.value % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownElement.innerHTML = `${minutes}:${seconds}`;

  a.value--;
  if (a.value <= -1){
    clearInterval(myIntervalId);
    audio.play();
  }
}

function pause(){
  clearInterval(myIntervalId);
  countdownElement.innerHTML = time;
  let time = startingMinutes * 60;
  const minutes = Math.floor(time/60);
  let seconds = time % 60;

  seconds = seconds < 10 ? '0' + seconds : seconds;
  
  countdownElement.innerHTML = `${minutes}:${seconds}`;
}

function reset(){
  clearInterval(myIntervalId);
  let time = startingMinutes * 60;
  const minutes = Math.floor(time/60);
  let seconds = time % 60;
  $pause.style.display = 'none';

  seconds = seconds < 10 ? '0' + seconds : seconds;

  countdownElement.innerHTML = `${minutes}:${seconds}`;
}