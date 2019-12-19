var table = document.createElement('table');
var tableNum = 4;
var rows = [];
var cells = [];
var turn = 'O';
var checkedNum = 0;

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

function selected(event){
    var rowNum = rows.indexOf(event.target.parentNode);
    var colsNum = cells[rowNum].indexOf(event.target);
    var selectedCell = cells[rowNum][colsNum];
    if(selectedCell.textContent === ''){
        if(turn === 'X'){
            turn = 'O';
        }else{
            turn = 'X';
        }

        selectedCell.textContent = turn;
        
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
                console.log(i,j);
                checkOneLine();
            }
        }
    }else{
        alert('빈칸이 아닙니다');
    }
}

function checkOneLine(){
    checkedNum++;
    if(checkedNum===tableNum){
        alert(turn+'님 승리');
        resetData();
    }
}

function resetData(){
    for (var i = 0; i < tableNum; i++) {
        for (var j = 0; j < tableNum; j++) {
            cells[i][j].textContent = '';
        }
    }
}

