var board = new Array();
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
    randomNum();
    randomNum();
    updateThePage();//更新游戏界面。
}

function getPosTop(i) {
    return 20 + i * 120;
}

function getPosLeft(j) {
    return 20 + j * 120;
}

function updateThePage() {//更新数组的前端样式
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
            //每次移动都需要生成一个数字

            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j]!==0)
                    moveAnimation(i, j);
                }
            }
            randomNum();

            break;
        case 38://up
            //每次移动都需要生成一个数字
            randomNum();
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j]!==0)
                        moveAnimation(i, j);
                }
            }
            break;
        case 39://right
            //每次移动都需要生成一个数字
            randomNum();
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j]!==0)
                        moveAnimation(i, j);
                }
            }
            break;
        case 40://down
            //每次移动都需要生成一个数字
            randomNum();
            for (var i = 0; i < 4; i++) {
                for (var j = 0; j < 4; j++) {
                    if (board[i][j]!==0)
                        moveAnimation(i, j);
                }
            }
            break;
    }
});

function moveAnimation(x,y) {//实现移动格子的样式变动

    var numberGrid = $('#number-grid-' + x + '-' + y);
    numberGrid.animate({
        top: getPosTop(x),
        left: 20
    }, 200);
}
