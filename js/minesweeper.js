
var tbody = document.querySelector('table tbody');

document.querySelector('#play').addEventListener('click',function(){
    var colNum = document.querySelector('#cols').value;
    var rowNum = document.querySelector('#rows').value;
    var mineNum = document.querySelector('#mines').value;

    //  중요 -> 숫자 연속인 배열 만들 때 array fill map
    var array = Array(colNum * rowNum).fill().map(function(element,index){
        return index;
    })

    // 지뢰 설정
    var shuffle = [];
    while(array.length > 80){
        shuffle.push(array.splice(Math.floor(Math.random()*array.length),1)[0]);
    }

    // 테이블 만들기
    var dataset= [];
    for (var i = 0; i < rowNum; i++) {
        var tr = document.createElement('tr');
        tbody.appendChild(tr);
        dataset.push([]);
        for (let j = 0; j < colNum; j++) {
            var td = document.createElement('td');
            td.addEventListener('contextmenu',function(e){
                e.preventDefault();
                var tr = e.currentTarget.parentNode
                var tbody = e.currentTarget.parentNode.parentNode
                var col = Array.prototype.indexOf.call(tr.children,e.currentTarget);
                var row = Array.prototype.indexOf.call(tbody.children,tr);
                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'X'){
                    e.currentTarget.textContent = '!';
                } else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                } else if(e.currentTarget.textContent === '?'){
                    if(dataset[row][col] === 1){
                        e.currentTarget.textContent = '';
                    } else{
                        e.currentTarget.textContent = 'X';
                    }
                }
            });
            tr.appendChild(td);
            dataset[i].push(1);
        }
    } 
    
    // 지뢰 심기 
    for (var i = 0; i < shuffle.length; i++) {
        var row = Math.floor(shuffle[i]/10);
        var cell = shuffle[i]%10;
        tbody.children[cell].children[row].textContent = 'X';
        dataset[cell][row] = 'X';
    }
});
