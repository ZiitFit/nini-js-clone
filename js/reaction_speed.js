var screen = document.querySelector('#screen');

/* 시간 측정 방법
1. 일반적 사용
    var startTime = new Date();
    var endTime = new Date();
    console.log((endTime-startTime)/1000);
2. 디버깅시 사용
    console.time('시간');
    console.timeEnd('시간');
3. 정밀하게 하고싶을 때
    var startTime = performance.now();
    var endTime = performance.now();
*/

/* 호출스택
후입선출 구조
먼저 들어간게 제일 나중에 나옴, 제일 나중에 들어간 게 제일 먼저 나옴
*/

var startTime,endTime;
var score = [];
var timeout;

screen.addEventListener('click',function(){
    if(screen.classList.contains('waiting')){
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요';
        timeout = setTimeout(function(){
            startTime = new Date();
            screen.click();
        },Math.random()*1000+2000); //2000~3000사이 수
    } else if(screen.classList.contains('ready')){
        if(!startTime){
            clearTimeout(timeout);
            screen.classList.remove('ready');
            screen.classList.add('waiting');
            screen.textContent = '너무 성급하시군요';
        } else{
            screen.classList.remove('ready');
            screen.classList.add('now');
            screen.textContent = '클릭하세요';
        }
    } else if(screen.classList.contains('now')){
        endTime = new Date();
        document.querySelector('#result').textContent = '반응속도:'+(endTime-startTime)/1000+'ms';
        score.push(endTime-startTime);
        startTime, endTime = null;
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '클릭해서 시작하세요';
    }
});