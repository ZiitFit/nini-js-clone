var width = 4;
var height = 3;
var colors = ['red','red','orange','orange','green','green','yellow','yellow','white','white','pink','pink'];
var shuffle = [];
var clickFlag = true;
var clickCard = [];
var completeCard = [];

while(colors.length > 0){
    var color = colors.splice(Math.floor(Math.random()*colors.length),1)[0];
    shuffle.push(color);
}

cardSetting(width,height);
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
        document.body.append(card);
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
    },5000)
}
