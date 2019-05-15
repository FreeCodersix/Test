var board = new Array();//存储随机生生成的数字
var added = new Array();//记录当前位置是否完成过合并
var score = 0;

$(document).ready(function (e) {
    //初始化棋盘格
    init();
});

function init() {
    score = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css("top", getPosTop(i));
            gridCell.css("left", getPosLeft(j));
        }
    }

    for (var i = 0; i < 4; i++) {//初始化格子数组
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    for (var i = 0; i < 4; i++) {
        added[i] = new Array();
        for (var j = 0; j < 4; j++) {
            added[i][j] = 0;
        }
    }

    randomNum();
    randomNum();
    updateThePage();
}

function getPosTop(i) {
    return 20 + i * 120;
}

function getPosLeft(j) {
    return 20 + j * 120;
}

function updateThePage() {//更新游戏界面。
    $(".number-grid").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-grid" id="number-grid-' + i + '-' + j + '"></div>');
            var numberGrid = $('#number-grid-' + i + '-' + j);
            if (board[i][j] == 0) {
                numberGrid.css({
                    "width": 0,
                    "height": 0
                })
            } else {
                numberGrid.css({
                    "width": 100,
                    "height": 100,
                    "top": getPosTop(i),
                    "left": getPosLeft(j)
                });
                numberGrid.text(board[i][j]);
            }
        }
    }
}

function randomNum() {//生成随机的格子

    //随机一个位置
    var x = parseInt(Math.floor(Math.random() * 4));
    var y = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[x][y] === 0)
            break;
        x = parseInt(Math.floor(Math.random() * 4));
        y = parseInt(Math.floor(Math.random() * 4));
    }
    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机出来的位置上显示随机数字
    board[x][y] = randNumber;
    return true;
}

//上下左右按键响应
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                //每次移动都需要生成一个数字
                randomNum();
            }
            break;
        case 38://up
            //每次移动都需要生成一个数字
            randomNum();
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] !== 0)
                        moveAnimation(i, j);
                }
            }
            break;
        case 39://right
            //每次移动都需要生成一个数字
            randomNum();
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] !== 0)
                        moveAnimation(i, j);
                }
            }
            break;
        case 40://down
            //每次移动都需要生成一个数字
            randomNum();
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j] !== 0)
                        moveAnimation(i, j);
                }
            }
            break;
    }
});

function moveLeft() {
    if (!canMoveLeft(board))
        return false;

    addedReset();
    //函数核心
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {//第一列的数字不可能向左移动
            if (board[i][j] != 0) {
                //(i,j)左侧的元素
                for (var k = 0; k < j; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //满足条件就移动
                        moveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        moveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        added[i][k] = 1;//此位置已经合并过，避免一次按键触发多次事件

                        continue;
                    }
                }
            }
        }
    setTimeout("updateThePage()", 200);
    return true;
}

function addedReset() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            added[i][j] = 0;
        }
    }
}

function canMoveLeft() {
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++)
            if (board[i][j] != 0 && (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]))
                return true;
    return false;
}

function moveAnimation(x, y) {//实现移动格子的样式变动

    var numberGrid = $('#number-grid-' + x + '-' + y);
    numberGrid.animate({
        top: getPosTop(x),
        left: 20
    }, 200);
}

function noBlockHorizontal(row, col1, col2, board){
    for(var i = col2 + 1; i<col1; i++)
        if(board[row][i]!=0)
            return false;
    return true;
}