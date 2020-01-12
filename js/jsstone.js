var rival = {
    hero: document.getElementById('rival_hero'),
    deck: document.getElementById('rival_deck'),
    field: document.getElementById('rival_cards'),
    cost: document.querySelector('#rival_cost span'),
    selected: null,
    deckData: [],
    heroData: [],
    fieldData: [],
    selectedData: null
}

var my = {
    hero: document.getElementById('my_hero'),
    deck: document.getElementById('my_deck'),
    field: document.getElementById('my_cards'),
    cost: document.querySelector('#my_cost span'),
    selected: null,
    deckData: [],
    heroData: [],
    fieldData: [],
    selectedData: null
}

var turn = true;
var turnButton = document.getElementById('turn_btn');

function deckToField(data, myTurn){
    var obj = myTurn? my:rival;
    var currentCost  = Number(obj.cost.textContent);
    if(currentCost < data.cost){
        return 'end';
    } 
    var idx = obj.deckData.indexOf(data);
    obj.deckData.splice(idx,1);
    obj.fieldData.push(data);
    obj.deck.innerHTML = '';
    obj.field.innerHTML = '';
    obj.fieldData.forEach(data => {
        cardDomConnected(data,obj.field);
    });
    obj.deckData.forEach(data => {
        cardDomConnected(data,obj.deck);
    });
    data.field = true;
    obj.cost.textContent = currentCost - data.cost;
}
function fieldReDrawing(obj){
    obj.field.innerHTML = '';
    obj.fieldData.forEach(data => {
        cardDomConnected(data,obj.field);
    });
}
function deckReDrawing(obj){
    obj.deck.innerHTML = '';
    obj.deckData.forEach(data => {
        cardDomConnected(data,obj.deck);
    });
}
function heroReDrawing(obj){
    obj.hero.innerHTML = '';
    cardDomConnected(obj.heroData,obj.hero,true);
}
function cardReDrawing(myTurn){
    var obj = myTurn? my:rival;
    fieldReDrawing(obj);
    deckReDrawing(obj);
    heroReDrawing(obj);
}
function cardDomConnected(data,parentDom,isHero){
    var card = document.querySelector('.card_hidden .card').cloneNode(true);
    card.querySelector('.card_cost').textContent = data.cost;
    card.querySelector('.card_att').textContent = data.att;
    card.querySelector('.card_hp').textContent = data.hp;
    if(isHero){
        card.querySelector('.card_cost').style.display = 'none';
        var name = document.createElement('div');
        name.textContent = '영웅';
        card.appendChild(name);
    }
    card.addEventListener('click',function(){
        if(turn){ //내 턴 일때
            attack(true,card,data);
        } else { //상태방 턴일때
            attack(false,card,data);
        }
    });
    parentDom.appendChild(card);
}
function attack(myTurn,card,data){
    var obj = myTurn? my:rival;
    var rivalObj = myTurn? rival:my;
    if(card.classList.contains('card_turnover')){
        return;
    }
    var rivalTurn = myTurn? !data.mine: data.mine
    if(rivalTurn && obj.selected){
        data.hp = data.hp - obj.selectedData.att;
        obj.selected.classList.remove('card_selected');
        obj.selected.classList.add('card_turnover');
        if(data.hp <= 0){ //카드가 죽었을 때
            var index = rivalObj.fieldData.indexOf(data);
            if(index > -1){ //쫄병이 죽었을 때
                rivalObj.fieldData.splice(index,1);
            } else { //영웅이 죽었을 때
                if(obj == my){
                    alert('승리하셨습니다');
                } else {
                    alert('패배하셨습니다');
                }
                setting();
            }
        }
        cardReDrawing(!myTurn);
        obj.selectedData = null;
        obj.selected = null;
    }
    if(rivalTurn){ //상태방 카드거나 카드가 필드에 있을 때
        return;
    }
    if(data.field){
        card.parentNode.parentNode.querySelectorAll('.card_selected').forEach(function(card){
            card.classList.remove('card_selected');
        });
        card.classList.add('card_selected');
        obj.selected = card;
        obj.selectedData = data;
    }else {
        if(deckToField(data,myTurn) !== 'end'){
            myTurn? myDeckCreated(1):rivalDeckCreated(1);
        }
    }

}
function rivalDeckCreated(number){
    for (var index = 0; index < number; index++) {
        rival.deckData.push(cardFactory());
    }
    deckReDrawing(rival);
}
function myDeckCreated(number){
    for (var index = 0; index < number; index++) {
        my.deckData.push(cardFactory(false,true));
    }
    deckReDrawing(my);
}
function rivalHeroCreated(number){
    rival.heroData = cardFactory(true);
    cardDomConnected(rival.heroData,rival.hero,true);
}
function myHeroCreated(number){
    my.heroData = cardFactory(true,true);
    cardDomConnected(my.heroData,my.hero,true);
}
function setting(){
    rivalDeckCreated(5);
    myDeckCreated(5);
    rivalHeroCreated();
    myHeroCreated();
    cardReDrawing(true);
    cardReDrawing(false);
}
function Card(hero,myCard){
    if(hero){
        this.att = Math.floor(Math.random() * 2);
        this.hp = Math.floor(Math.random() * 5) + 25;
        this.hero = true;
        this.field = true;
    } else {
        this.att = Math.floor(Math.random() * 5);
        this.hp = Math.floor(Math.random() * 5);
        this.cost = Math.floor((this.att + this.hp) / 2);
        this.hero = false;
    }
    if(myCard){
        this.mine = true;
    }
}
function cardFactory(hero,myCard){
    return new Card(hero,myCard);
}
turnButton.addEventListener('click',function(){
    var obj = turn? my:rival
    document.getElementById('rival').classList.toggle('turn');
    document.getElementById('my').classList.toggle('turn');
    fieldReDrawing(obj);
    heroReDrawing(obj);
    turn = !turn;
    if(turn){
        my.cost.textContent = 10;
    } else {
        rival.cost.textContent = 10;
    }
});
setting();

