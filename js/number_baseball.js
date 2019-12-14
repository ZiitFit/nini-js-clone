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

var textCount = document.createElement('p');
body.append(textCount);
textCount.textContent='남은횟수: 10번';

var numbers = [];
var resultNumbers = [];
var wrongCount = 0;

resetData();
console.log(resultNumbers);

form.addEventListener('submit',function(event){
	event.preventDefault();
	wrongCount++;
	if(inputForm.value === resultNumbers.join('')){
		result.textContent = '홈런';
		wrongCount = 0;
		resetData();
	}else{
		var strikeNum = 0;
		var ballNum = 0;
		if(wrongCount === 10){
			alert('10번 넘어서 실패');
			resetData();
		} else {
			for(var i=0;i<4;i++){
				var inputArray = inputForm.value.split('');
				if(resultNumbers[i] === Number(inputArray[i])){
					strikeNum++;
				} else {
					if(inputForm.value.indexOf(resultNumbers[i])>=0){
						ballNum++;
					}
				}
			}
			result.textContent = strikeNum+'스트라이크'+ballNum+'볼';
			strikeNum = 0;
			ballNum = 0;
			inputForm.value= '';
			inputForm.focus();
		}
		textCount.textContent='남은횟수: '+(10-wrongCount)+'번';
	}
});

function resetData() {
	inputForm.value= '';
	inputForm.focus();
	
	wrongCount = 0;
	textCount.textContent='남은횟수: 10번';

	for(var i=1; i<=9; i++){
		numbers.push(i);
	}
	
	for(var i=0; i<4; i++){
		var randomNum = Math.floor(Math.random()*(9-i));
		var pickNum = numbers.splice(randomNum,1)[0];
		resultNumbers.push(pickNum);
		result.textContent='';
	}
}