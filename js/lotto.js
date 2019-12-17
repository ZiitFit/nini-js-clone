var numbers = Array(45)
.fill()
.map(function(element,index){
    return index+1;
});

console.log(numbers);

var shuffle = [];
//for 몇번 돌아야할지 알때, while 몇번 돌아야할지 모를때,기준값이 바뀔때
while(numbers.length > 0){
    var numIndex = numbers.splice(Math.floor(Math.random()*numbers.length),1)[0];
    shuffle.push(numIndex);
}
var bonus = shuffle.pop();
var result = shuffle.slice(0,5).sort(function(a,b){return a-b});

var resultShow = document.getElementById('resultShow');

for (let index = 0; index < result.length; index++) {
    var number = document.createElement('div');
    number.textContent = result[index];
    resultShow.append(number);
}