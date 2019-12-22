var computerLocation = 0;
var rockScissorsPaper = {
    rock: {location:0,score:0,text:'바위'},
    scissors: {location:-125,score:1,text:'가위'},
    paper: {location:-265,score:-1,text:'보'}
};
var random;

//위치와 가위바위보 매칭
function computerChoice(computerLocation){
    return Object.entries(rockScissorsPaper).find(function(element){
        return element[1].location === computerLocation;
    })[1].text;
} 

function setComputerChoice(){
    random = setInterval(function(){
        if(computerLocation === 0){
            computerLocation = -125;
        }else if(computerLocation === -125){
            computerLocation = -265;
        }else if(computerLocation === -265){
            computerLocation = 0;
        }
        document.querySelector('.content').style.backgroundPositionX = computerLocation+'px'
    },100);
}

setComputerChoice();

document.querySelectorAll('.button_choice').forEach(function(button) {
    button.addEventListener('click',function(){
        var selectedButton = button.textContent;
        
       clearTimeout(random);
       setTimeout(function(){
           setComputerChoice();
       }, 1000);

       // 내가 선택한 가위바위보 text로 rockScissorsPaper중 찾기
        var myChoiceObject = Object.entries(rockScissorsPaper).find(function(element){
            if(element[1].text === selectedButton){
                return element;
            }
        });

        // 상대 가위바위보 text로 rockScissorsPaper중 찾기
        var computerChoiceObject = Object.entries(rockScissorsPaper).find(function(element){
            if(element[1].text === computerChoice(computerLocation)){
                return element;
            }
        });
        
        //위 찾은 걸로 score, text 뽑아내기
        var myChoiceScore = myChoiceObject[1].score;
        var computerChoiceScore = computerChoiceObject[1].score;
        var myChoiceText = myChoiceObject[1].text;
        var computerChoiceText = computerChoiceObject[1].text;
        
        //바위 가위 보 0 1 -1로 계산
        var scoreDifferent = myChoiceScore - computerChoiceScore;
        if(scoreDifferent === 0){
            document.querySelector('#result').textContent = '나:'+myChoiceText+',상대:'+computerChoiceText+'로 비겼습니다';
        } else if([-1,2].includes(scoreDifferent)){
            document.querySelector('#result').textContent = '나:'+myChoiceText+',상대:'+computerChoiceText+'로 이겼습니다';
        } else {           
            document.querySelector('#result').textContent = '나:'+myChoiceText+',상대:'+computerChoiceText+'로 겼습니다';
        }
    });
});
