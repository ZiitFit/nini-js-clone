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
var resultNumbers = [];
var strikeNum = 0;
var ballNum = 0;

for(var i=1; i<=9; i++){
	numbers.push(i);
}

for(var i=0; i<4; i++){
	var randomNum = Math.floor(Math.random()*(9-i));
	var pickNum = numbers.splice(randomNum,1)[0];
	resultNumbers.push(pickNum);
}

console.log(resultNumbers);

form.addEventListener('submit',function(event){
	event.preventDefault();
	if(inputForm.value === resultNumbers.join('')){
		result.textContent = '홈런';
	}else{
		for(var i=0;i<4;i++){
			var inputArray = inputForm.value.split('');
			if(resultNumbers[i] === Number(inputArray[i])){
				strikeNum++;
			} else {
				console.log(inputForm.value.indexOf(resultNumbers[i]));
				if(inputForm.value.indexOf(resultNumbers[i])>=0){
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