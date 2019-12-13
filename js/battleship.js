
function play(playUrl){
  var player = new Audio();
  player.src = playUrl;
  player.play();
}


var view = {
  displayMessage: function(msg){
    var messageArea = $("#messageArea");
    messageArea.html(msg);
  },
  displayHit: function(loc){
    $("#"+loc).addClass("hit");
    //play("shock.mp3");
    // player.src = "shock.mp3";
    // player.play();
    play("../sound/battleship/shock.mp3");
  },
  displayMiss: function(loc){
    $("#"+loc).addClass("miss");
    play("../sound/battleship/water_splash1.wav");
  },
  displayColSunk: function(loc){
    $("#"+loc).removeClass("hit");
    $("#"+loc).addClass("colSunk");
    play("../sound/battleship/shock.mp3");
  },
  displayRowSunk: function(loc){
    $("#"+loc).removeClass("hit");
    $("#"+loc).addClass("rowSunk");
    play("../sound/battleship/shock.mp3");
  }
};

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 3,
  shipsSunk:0,

  ships: [
    { locations: ["06", "16", "26"], hits: ["", "", ""] },
    { locations: ["24", "34", "44"], hits: ["", "", ""] },
    { locations: ["10", "11", "12"], hits: ["", "", ""] }
  ],
//5. location에 guess값 찾기
  fire: function(guess){
    for (var i = 0; i < this.numShips; i++) {
      var ship = this.ships[i];
      locations = ship.locations;

      var index = locations.indexOf(guess);

      //6-1. 명중 일 때
      if(index >= 0){ // location에 guess 값 있을 때
        this.ships[i].hits[index] = "hit"; //명중 처리
        view.displayHit(guess); // 있으면 격함 이미지 뜸
        view.displayMessage("명중!");
        //7. 전함 격침 체크
        if(this.isSunk(ship)){
          view.displayMessage("전함이 격침됬습니다!");
          this.shipsSunk++; // 3개 다 체크일 때 파괴한 전함 1 증가
          $('#'+this.ships[i].locations[1]).remove();
          $('#'+this.ships[i].locations[2]).remove();

          if(this.ships[i].locations[0].charAt(0) == this.ships[i].locations[1].charAt(0)){
            console.log("가로");
            document.getElementById(this.ships[i].locations[0]).colSpan = "3";
            view.displayColSunk(this.ships[i].locations[0]);
          } else{
            console.log("세로");
            document.getElementById(this.ships[i].locations[0]).rowSpan = "3";
            view.displayRowSunk(this.ships[i].locations[0]);
          }

        }
        return true;
      }
    }
    //6-2. 명중이 아닐 때
    view.displayMiss(guess); // 없으면 실패 이미지 뜸
    view.displayMessage("실패했습니다!");
    return false;
  },
  //7. hits 배열 모두 hit check
  isSunk: function(ship) {
		for (var i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
  },

  generateShipLocations: function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
      //3번 실행
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("전함 배열: ");
		console.log(this.ships);
	},

	generateShip: function() {
		var direction = Math.floor(Math.random() * 2); //가로, 세로 랜덤
		var row, col;

		if (direction === 1) { // 가로
			row = Math.floor(Math.random() * this.boardSize); //7
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
      console.log("test"+row +""+col)                                    //7-3+1
		} else { // 세로
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
                                        //7-3+1
			col = Math.floor(Math.random() * this.boardSize); //7
		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++) {
      //3
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
        console.log(newShipLocations[0])

			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};


var controller = {
	guesses: 0, //시도 횟수

  // 3.
	processGuess: function(guess) {
    // 4.
    //GUESS: A1 location:01
		if (guess) {
			this.guesses++; //시도 횟수 1 증가
      //5.
			var hit = model.fire(guess);
			if (hit && model.shipsSunk === model.numShips) {
          //격함 명중되고 3개 다 격침됬을 때 - 게임 끝났을 때
					view.displayMessage("여러분은 " + this.guesses + "번 추측해 전함을 모두 격침시켰습니다.");
          popupOpen(this.guesses);
			}
		}
	}
};

function popupOpen(tryNum){
  var w = 640;    //팝업창의 너비
  var h = 510;    //팝업창의 높이

  var leftPosition=(screen.width-w)/2;
  var topPosition=(screen.height-h)/2;

	var popUrl = "test.html";	//팝업창에 출력될 페이지 URL
	var popOption = "width="+w+", height="+h+",top="+topPosition+",left="+leftPosition+" scrollbars=no, status=no;";    //팝업창 옵션(optoin)
		window.open(popUrl+"?tryNum="+tryNum,"",popOption);
	}

window.onload = init;

for (var i = 0; i < 7; i++) {
  for(var j = 0; j < 7; j++) {
    console.log(i+""+j);
    tableClick(i+""+j);
  }
}

function tableClick(idNum){
  $("#"+idNum).click(function(){
    controller.processGuess(idNum);
  });
}

//1번째 실행
function init() {
  //* 랜덤 무조건 실행!!
	model.generateShipLocations();
}

// var player = new Audio('');
// function play(URL){
//   if(player.paused || url != player.src){
//           if(player.canPlayType('audio/mp3')){
//                   player.src = URL;
//           }
//           player.play();
//   }else{
//           player.pause();
//       player.currentTIme = 0;
//   }
// }
