var body = document.body;

var result = document.createElement('h1');
body.append(result);

var form = document.createElement('form');
body.append(form);

var inputForm = document.createElement('input');
form.append(inputForm);

var button = document.createElement('button');
form.append(button);
button.textContent='입력';

var numbers = [];
var strikeNum = 0;
var ballNum = 0;

for(var i=0; i<4; i++){
	numbers.push(Math.floor(Math.random()*9)+1);
}

console.log(numbers);

form.addEventListener('submit',function(event){
	event.preventDefault();
	if(inputForm.value === numbers.join('')){
		result.textContent = '홈런';
	}else{
		for(var i=0;i<4;i++){
			var inputArray = inputForm.value.split('');
			if(Number(inputArray[i]) === numbers[i]){
				strikeNum++;
			} else {
				console.log(numbers.join('').indexOf(inputArray[i]));
				if(numbers.join('').indexOf(inputArray[i])>=0){
					ballNum++;
				}
			}
		}
		result.textContent = strikeNum+'스트라이크'+ballNum+'볼';
		strikeNum = 0;
		ballNum = 0;
		inputForm.value= "";
		inputForm.focus();
	}
});