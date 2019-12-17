var numbers = Array(45)
.fill()
//array.fill(value, start, end)
.map(function(element,i){
    return i+1;
});

var shuffle = [];
//for:몇번 돌아야할지 알때, while:몇번 돌아야할지 모를때,기준값이 바뀔때
while(numbers.length > 0){
    var number = numbers.splice(Math.floor(Math.random()*numbers.length),1)[0];
    shuffle.push(number);
}

var bonus = shuffle.pop();
var result = shuffle.slice(0,5).sort(function(a,b){return a-b});
/*
slice : 기존 배열은 변하지 않고, 잘려진 배열을 반환
splice : 기존 배열 변하고, 잘려진 배열 반환
split : ( String의 메서드 ) delimeter를 기준으로 잘라서 배열을 만든후 배열을 반환
*/

var boxResult = document.getElementById('boxResult');
for (var i = 0; i < result.length; i++) {
    (function(j) {
        setTimeout(function(){
            var ball = document.createElement('div');
            //클로저 에러 발생 -> for문 안에 비동기함수가 들어있는 경우
            ball.textContent = result[j];
            ballStyled(ball);
            boxResult.append(ball);
        },(j+1)*1000);
    })(i);
}

setTimeout(function(){
    var textBonus = document.querySelector('.bonus');
    textBonus.textContent = bonus;
    ballStyled(textBonus);
},(result.length+1)*1000);

function ballStyled(ball){
    var bgColor = '';
    var ballNumber = ball.textContent;
    if (ballNumber<=10) {
        bgColor='red';
    } else if(ballNumber<=20) {
        bgColor='orange';
    } else if(ballNumber<=30) {
        bgColor='yellow';
    } else if(ballNumber<=40) {
        bgColor='blue';
    } else {
        bgColor='green';
    }
    ball.style.backgroundColor=bgColor;
    ball.style.display='inline-block';
    ball.style.border='1px solid #333';
    ball.style.width='30px';
    ball.style.height='30px';
    ball.style.lineHeight='30px';
    ball.style.borderRadius='30px';
    ball.style.textAlign='center';
}