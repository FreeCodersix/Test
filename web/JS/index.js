var score = 0;//记录分数
var board = [];//用于存储随机生成的数字，方便读取

$(document).ready(function (e) {
    newgame();
});

function newgame() {
    //1.初始化
    init();
    //2.随机生成两个数字

}

function init() {
    score = 0;
    //单元格定位
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-cell-" + i + "-" + j).css({
                "top": getPosTop(i),
                "left": getPosLeft(j)
            });
        }
    }

    //初始化记录数组
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
        }
    }

    updateThePage();//重新生成游戏界面
}

function updateThePage() {
    randomNum();
    randomNum();
    $(".number-grid").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-grid" id="number-grid-' + i + '-' + j + '"></div>');
            var numberGrid = $("#number-grid-" + i + "-" + j);
            if (board[i][j] === 0) {
                numberGrid.css({
                    "width": 0,
                    "height": 0
                });
            } else {
                numberGrid.css({
                    "width": 100+'px',
                    "height": 100+'px',
                    "top": getPosTop(i),
                    "left": getPosLeft(j)
                });
                numberGrid.text(board[i][j]);
            }
        }
    }
}

function getPosTop(i) {
    return 20 + i * 120;
}

function getPosLeft(j) {
    return 20 + j * 120;
}

function randomNum() {
    var num = parseInt(Math.floor(Math.random() * 4));
    //1.先随机生成两个数代表位置
    var x = num;
    var y = num;

    while (true) {
        if (board[x][y] === 0) break;//说明x，y可以用作位置
        x = num;
        y = num;
    }

    //用随机生成的数字填充随机生成的位置
    board[x][y] = Math.random() < 0.5 ? 2 : 4;
    return true;
}


