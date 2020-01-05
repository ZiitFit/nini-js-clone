var width = 4;
var height = 3;
var colors = ['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink'];
var colorsBackup = colors.slice();
/*
참조 얇은 복사 아닌 깊은 복사방법
1. var colorsBackup = colors.slice(); //1단계만 복사 나머지는 참조
2. Object.keys(colors).forEach(function(key){
    colorsBackup[key] = colors[key];
}) //1단계만 복사 나머지는 참조
2. var colorsBackup = JSON.parse(JSON.stringify(colors));
*/
var shuffle = [];
var clickFlag = true;
var clickCard = []; 
var completeCard = [];
var startTime;

function colorShuffle(){
    while(colorsBackup.length > 0){
        shuffle = shuffle.concat(colorsBackup.splice(Math.floor(Math.random()*colorsBackup.length),1)[0]);
    }
}

function cardSetting(width,height){
    clickFlag = false;
    for (let index = 0; index < width*height; index++) {
        var card = document.createElement('div');
        card.className = 'card';
        var cardInner = document.createElement('div');
        cardInner.className = 'card_inner';
        var cardFront = document.createElement('div');
        cardFront.className = 'card_front';
        var cardBack = document.createElement('div');
        cardBack.className = 'card_back';
        cardBack.style.backgroundColor = shuffle[index];
        cardInner.append(cardFront);
        cardInner.append(cardBack);
        card.append(cardInner);
        (function(c){
            card.addEventListener('click',function(e){
                if(clickFlag && !completeCard.includes(c)){
                    c.classList.toggle('flipped');
                    clickCard.push(c);
                    if(clickCard.length === 2){
                        if(clickCard[0].querySelector('.card_back').style.backgroundColor === 
                        clickCard[1].querySelector('.card_back').style.backgroundColor){
                            completeCard.push(clickCard[0]);
                            completeCard.push(clickCard[1]);
                            if(completeCard.length == width*height){
                                var endTime = new Date();
                                alert('축하합니다!'+(startTime-endTime)/1000+'초 걸렸습니다!');
                                document.querySelector('#wrapper').innerHTML='';
                                colorsBackup = colors;
                                completeCard = [];
                                startTime;
                                colorShuffle();
                                cardSetting(width,height);
                            }
                            clickCard = []
                        } else {
                            clickFlag = false;
                            setTimeout(function(){
                                clickCard[0].classList.remove('flipped');
                                clickCard[1].classList.remove('flipped');
                                clickFlag = true;
                                clickCard = []
                            },1000);
                        }
                    } 
                }
            });
        })(card);
        document.querySelector('#wrapper').append(card);
    }
    document.querySelectorAll('.card').forEach(function(card,index){
        setTimeout(function(){
            card.classList.add('flipped');
        },200*index);
    })

    setTimeout(function(){
        document.querySelectorAll('.card').forEach(function(card,index){
            card.classList.remove('flipped');
        })
        clickFlag = true;
        startTime = new Date();
    },5000)
}

colorShuffle();
cardSetting(width,height);
