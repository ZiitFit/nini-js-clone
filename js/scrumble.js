var body = document.body;

var word = document.createElement('div');
word.textContent = '단어';
document.body.append(word);

var form = document.createElement('form');
document.body.append(form);

var answer = document.createElement('input');
form.append(answer);

var button = document.createElement('button');
button.textContent = '버튼';
form.append(button);

var result = document.createElement('p');
document.body.append(result);

form.addEventListener('submit',function(event){
    // 페이지 넘어가는 기본 동작 방지
    event.preventDefault();

    if(word.textContent[word.textContent.length-1] === answer.value[0]){
      result.textContent = '딩동댕';
      word.textContent = answer.value;
    } else {
      result.textContent = '땡';
    }
    answer.value = '';
    answer.focus();
});