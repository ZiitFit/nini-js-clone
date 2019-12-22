var computerLocation = 0;
var rockScissorsPaper = { 
    rock: 0,
    scissors: -125,
    paper: -265
};

var random = setInterval(function(){
    if(computerLocation === 0){
        computerLocation = -125;
    }else if(computerLocation === -125){
        computerLocation = -265;
    }else if(computerLocation === -265){
        computerLocation = 0;
    }
    document.querySelector(".content").style.backgroundPositionX = computerLocation+"px"
},100);

document.querySelectorAll(".button_choice").forEach(function(myChoice) {
    myChoice.addEventListener("click",function(){
        var computerChoice = Object.entries(rockScissorsPaper).find(function(element){
            if(element[1] === computerLocation){
                return element;
            }
        });
        console.log(myChoice.textContent,computerChoice[0])
        clearTimeout(random);
        //가위 0 바위 1 보 -1
    });
});
