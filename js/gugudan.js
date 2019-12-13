var body = document.body;

var num1 = Math.ceil(Math.random()*9);
var num2 = Math.ceil(Math.random()*9);

var question = document.createElement('p');
question.textContent = num1+'x'+num2+'?';
body.append(question);

var form = document.createElement('form');
body.append(form);

var answer = document.createElement('input');
form.append(answer);

var button = document.createElement('button');
button.textContent = '입력';
form.append(button);

var result = document.createElement('div');
result.textContent = '결과';
body.append(result);

form.addEventListener('submit',function(event){
    event.preventDefault();
    if(Number(answer.value) === num1*num2) {
        result.textContent = '딩동댕';
        num1 = Math.ceil(Math.random()*9);
        num2 = Math.ceil(Math.random()*9);
        question.textContent = num1+'x'+num2+'?';
    } else {
        result.textContent = '땡';
    }
    answer.value = '';
    answer.focus();
});