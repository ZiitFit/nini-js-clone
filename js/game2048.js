var table = document.getElementById('table');
var data = [];

function setting(){
    [1,2,3,4].forEach(tr => {
        var trData = [];
        data.push(trData);
        var tr = document.createElement('tr');
        table.appendChild(tr);
        [1,2,3,4].forEach(td => {
            var tdData = [];
            trData.push(tdData);
            var td = document.createElement('td');
            tr.appendChild(td);
        });
    });
}

function drawing(){
    data.forEach((trData,i) => {
        trData.forEach((tdData,j) =>{
            table.children[i].children[j].textContent = tdData;
        })
    });
}

function randomSetting(){
    var noneArray = [];
    data.forEach((trData,i) => {
        trData.forEach((tdData,j) =>{
            if(!tdData[0]){
                noneArray.push([i,j]);
            }
        })
    });
    var randomLocation = noneArray[Math.floor(Math.random()*noneArray.length)];
    data[randomLocation[0]][randomLocation[1]]=2;
    drawing();
}

setting();
randomSetting();

var dragStart = false;
var startXY;
var endXY;

window.addEventListener('mousedown',function(e){
    console.log('mousedown',e)
    dragStart = true;
    startXY = [e.clientX,e.clientY];
});
window.addEventListener('mousemove',function(e){
    if(dragStart){
        console.log('mousemove',e);
    }
});

window.addEventListener('mouseup',function(e){
    console.log('mouseup',e)
    dragStart = false;
    endXY = [e.clientX,e.clientY];
    var minusX = endXY[0] - startXY[0];
    var minusY = endXY[1] - startXY[1];
    if(minusX < 0 && Math.abs(minusX)/Math.abs(minusY)>1){
        direction = '왼쪽';
    } else if(minusX > 0 && Math.abs(minusX)/Math.abs(minusY)>1){
        direction = '오른쪽';
    } else if(minusY > 0 && Math.abs(minusX)/Math.abs(minusY)<1){
        direction = '아래';
    } else if(minusY < 0 && Math.abs(minusX)/Math.abs(minusY)<1){
        direction = '위';
    }
    console.log(direction);
});