var table = document.createElement('table');
var tableNum = 3;
var rows = [];
var cells = [];
var turn = 'X';
var checkedNum = 0;
var end = false;
var result = document.createElement('div');

for (var i = 0; i < tableNum; i++) {
    var row = document.createElement('tr');
    rows.push(row);
    cells.push([]);
    for (var j = 0; j < tableNum; j++) {
        var cell =  document.createElement('td');
        cells[i].push(cell);
        cell.addEventListener('click', selected);
        row.appendChild(cell);
        table.appendChild(row);
    }
}

document.body.append(table);
document.body.append(result);

function selected(event){
    end = false;
    if(turn === 'O'){
        return;
    }
    var rowNum = rows.indexOf(event.target.parentNode);
    var colsNum = cells[rowNum].indexOf(event.target);
    var selectedCell = cells[rowNum][colsNum];
    if(selectedCell.textContent === ''){
        selectedCell.textContent = turn;
        checkClick(rowNum,colsNum);
        if(!end){
            setTimeout(function(){
                console.log('컴퓨터의 턴입니다.');
                turn = 'O';
                var random=[];
                for (var i = 0; i < tableNum; i++) {
                    for (var j = 0; j < tableNum; j++) {
                        random.push(cells[i][j]);
                    }
                }
                random = random.filter(function(cell){return !cell.textContent});
                if(random.length !== 0){
                    var randomSelected = random[Math.floor(Math.random()*random.length)]
                    randomSelected.textContent = turn;
                    rowNum = rows.indexOf(randomSelected.parentNode);
                    colsNum = cells[rowNum].indexOf(randomSelected);
                    checkClick(rowNum,colsNum);
                    turn = 'X';
                } else {
                    result.textContent = '무승부입니다';
                    resetData();
                    return;
                }
            },1000);
        }
    }else{
        alert('빈칸이 아닙니다');
    }
}
function checkClick(rowNum,colsNum){
    //가로 줄 확인
    checkedNum = 0;
    for (var i = 0; i < tableNum; i++) {
        if(cells[rowNum][i].textContent === turn){
            checkOneLine();
        }
    }

    //세로 줄 확인
    checkedNum = 0;
    for (var i = 0; i < tableNum; i++) {
        if(cells[i][colsNum].textContent === turn){
            checkOneLine();
        }
    }

    //오른쪽 대각선 확인
    checkedNum = 0;
    for (var i = 0; i < tableNum; i++) {
        if(cells[i][i].textContent === turn){
            checkOneLine();
        }
    }

    //왼쪽 대각선 확인
    checkedNum = 0;
    for (var i = 0; i < tableNum; i++) {
        j = tableNum-1-i
        if(cells[i][j].textContent === turn){
            checkOneLine();
        }
    }
}
function checkOneLine(){
    checkedNum++;
    if(checkedNum===tableNum){
        result.textContent = turn+'님 승리';
        resetData();
        end = true;
    }
}

function resetData(){
    setTimeout(function(){
        for (var i = 0; i < tableNum; i++) {
            for (var j = 0; j < tableNum; j++) {
                cells[i][j].textContent = '';
            }
        }
        turn = 'X';
    },1000);
}

