var screen = document.querySelector('#screen');

var status = {
};
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
screen.addEventListener('click',function(){
    var startTime;
    if(screen.classList.contains('waiting')){
        screen.classList.remove('waiting');
        screen.classList.add('ready');
        screen.textContent = '초록색이 되면 클릭하세요';
        setTimeout(function(){
            startTime = new Date();
            screen.click();
        },Math.random()*1000+2000); //2000~3000사이 수
    } else if(screen.classList.contains('ready')){
        screen.classList.remove('ready');
        screen.classList.add('now');
        screen.textContent = '클릭하세요';
    } else if(screen.classList.contains('now')){
        var endTime = new Date();
        console.log((endTime-startTime)/1000);
        screen.classList.remove('now');
        screen.classList.add('waiting');
        screen.textContent = '초록색이 되면 클릭하세요';
    }
});