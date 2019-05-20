var board = new Array();//存储随机生生成的数字
var score = 0;
var bool = false;
var flag = 0;

$(document).ready(function (e) {
    //初始化棋盘格
    init();
});

//初始化
function init() {
    score = 0;
    bool = false;
    flag = 0;
    $("#RankingOp").css("display", "none");
    $("#formI").css("display","none");
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css({
                "top": getPosTop(i),
                "left": getPosLeft(j)
            });
        }
    }

    for (var i = 0; i < 4; i++) {//初始化格子数组
        board[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    randomNum();
    randomNum();
    updateThePage();
}

//用于格子的定位
function getPosTop(i) {
    return 20 + i * 120;
}

function getPosLeft(j) {
    return 20 + j * 120;
}

//更新游戏界面
function updateThePage() {
    $(".number-grid").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-grid" id="number-grid-' + i + '-' + j + '"></div>');
            var numberGrid = $('#number-grid-' + i + '-' + j);
            if (board[i][j] === 0) {
                numberGrid.css({
                    "width": 0,
                    "height": 0,
                    "top": getPosTop(i),
                    "left": getPosLeft(j)
                });
            } else {
                numberGrid.css({
                    "width": 100,
                    "height": 100,
                    "top": getPosTop(i),
                    "left": getPosLeft(j),
                    "background-color": getNumberBgc(board[i][j]),
                    "color": getNumberColor(board[i][j])
                });
                numberGrid.text(board[i][j]);
            }
        }
    }
}

//生成随机数
function randomNum() {//生成随机的格子
    if (nospace(board))
        return false;

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
    numberAnimation(x, y, randNumber);
    return true;
}

//上下左右按键响应
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            if (moveLeft()) {
                getScore();
                //每次移动都需要生成一个数字
                randomNum();
                setTimeout("isgameover()", 400);//400毫秒
            }
            break;
        case 38://up
            if (moveUp()) {
                getScore();
                //每次移动都需要生成一个数字
                randomNum();
                setTimeout("isgameover()", 400);//400毫秒
            }
            break;
        case 39://right
            if (moveRight()) {
                getScore();
                //每次移动都需要生成一个数字
                randomNum();
                setTimeout("isgameover()", 400);//400毫秒
            }
            break;
        case 40://down
            if (moveDown()) {
                getScore();
                //每次移动都需要生成一个数字
                randomNum();
                setTimeout("isgameover()", 400);//400毫秒
            }
            break;
    }
});

function moveLeft() {
    if (!canMoveLeft(board))
        return false;

    //函数核心
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {//第一列的数字不可能向左移动
            if (board[i][j] !== 0) {
                //(i,j)左侧的元素
                for (var k = 0; k < j; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        //满足条件就移动
                        moveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board)) {
                        moveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                    }
                }
            }
        }
    setTimeout("updateThePage()", 200);
    return true;
}

function moveRight() {
    //判断格子是否能够向右移动
    if (!canMoveRight(board))
        return false;

    //函数核心
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {//最后一列的数字不可能向右移动
            if (board[i][j] !== 0) {
                //(i,j)右侧的元素
                for (var k = 3; k > j; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[i][k] === 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        moveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        moveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                    }
                }
            }
        }
    setTimeout("updateThePage()", 200);
    return true;
}

function moveUp() {
    //判断格子是否能够向上移动
    if (!canMoveUp(board))
        return false;

    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {//第一行的数字不可能向上移动
            if (board[i][j] !== 0) {
                //(i,j)上面的元素
                for (var k = 0; k < i; k++) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[k][j] === 0 && noBlockVertical(j, k, i, board)) {
                        //move
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board)) {
                        //move
                        moveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                    }
                }
            }
        }
    setTimeout("updateThePage()", 200);
    return true;
}

function moveDown() {
    //判断格子是否能够向下移动
    if (!canMoveDown(board))
        return false;

    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {//最后一行的数字不可能向下移动
            if (board[i][j] !== 0) {
                //(i,j)上面的元素
                for (var k = 3; k > i; k--) {
                    //落脚位置的是否为空 && 中间没有障碍物
                    if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        moveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if (board[k][j] === board[i][j] && noBlockVertical(j, i, k, board)) {
                        //move
                        moveAnimation(i, j, k, j);
                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                    }
                }
            }
        }
    setTimeout("updateThePage()", 200);
    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if( board[i][j] !==0 && j !== 0)
                if( board[i][j-1] === 0 || board[i][j-1] === board[i][j])
                    return true;
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] !== 0 && j !== 3)
                if (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j])
                    return true;
    return false;
}

function canMoveUp(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] !== 0 && i !== 0)
                if (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j])
                    return true;
    return false;
}

function canMoveDown(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] !== 0 && i !== 3)
                if (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j])
                    return true;
    return false;
}

//格子移动动画
function moveAnimation(fromx, fromy, tox, toy) {//实现格子移动方法

    var numberGrid = $('#number-grid-' + fromx + '-' + fromy);
    numberGrid.animate({
        top: getPosTop(tox),
        left: getPosLeft(toy)
    }, 200);
}

//数字合并动画
function numberAnimation(i, j, randNumber) {//实现随机数字的样式变动

    var numberGrid = $('#number-grid-' + i + '-' + j);
    numberGrid.css({
        "background-color": getNumberBgc(randNumber),
        "color": getNumberColor(randNumber)
    });
    numberGrid.text(randNumber);

    numberGrid.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i),
        left: getPosLeft(j)
    }, 50);
}

////判断水平方向是否有障碍物
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col2 + 1; i < col1; i++)
        if (board[row][i] !== 0)
            return false;
    return true;
}

//判断竖直方向是否有障碍物
function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++)
        if (board[i][col] !== 0)
            return false;
    return true;
}

function getNumberBgc(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#eee4da";
            break;
        case 8:
            return "#f26179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f67c5f";
            break;
        case 64:
            return "#f65e36";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#edcc61";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#3365a5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6bc";
            break;
        case 8192:
            return "#93c";
            break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

//用于生成数字时判断时候还有空间
function nospace(board) {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++)
            if (board[i][j] === 0)
                return false;
    return true;
}

function isgameover() {
    if (nospace(board) && nomove(board)) {
        bool = true;
    }
    gameover();
}

function gameover() {
    if (bool === true&&flag === 0){
        var div = $("<div>太棒了！您的分数为:<input id='Score' type=\"text\" name=\"newScore\" class=\"input\" value=\""+score+"\"></div>");
        $("#div").prepend(div);
        bool = false;
        flag = 1;
        $("#formI").css("display","block");
    }
}

//判断能否移动
function nomove(board) {
    return !(canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board));
}

//获取分数
function getScore() {
    document.getElementById("score").innerHTML = score;
}

