// var score = 0;//记录分数
// var board = [];//用于存储随机生成的数字，方便读取
//
// $(document).ready(function (e) {
//     newgame();
// });
//
// function newgame() {
//     //1.初始化
//     init();
//     //2.随机生成两个数字
//     randomNum();
//     randomNum();
// }
//
// function init() {
//     score = 0;
//     //单元格定位
//     for (var i = 0; i < 4; i++) {
//         for (var j = 0; j < 4; j++) {
//             /*$("#grid-cell-" + i + "-" + j).css({
//
//                 "top": getPosTop(i),
//                 "left": getPosLeft(j)
//             });*/
//             var gridCell = $("#grid-cell-" + i + "-" + j);
//             gridCell.css("top", getPosTop(i));
//             gridCell.css("left", getPosLeft(j));
//         }
//     }
//
//     //初始化记录数组
//     for (var i = 0; i < 4; i++) {
//         board[i] = [];
//         for (var j = 0; j < 4; j++) {
//             board[i][j] = 0;
//         }
//     }
//
//     updateThePage();//重新生成游戏界面
// }
//
// function updateThePage() {
//     $(".number-grid").remove();
//     for (var i = 0; i < 4; i++) {
//         for (var j = 0; j < 4; j++) {
//             $("#grid-container").append('<div class="number-grid" id="number-grid-' + i + '-' + j + '"></div>');
//             var numberGrid = $("#number-grid-" + i + "-" + j);
//             if (board[i][j] === 0) {
//                 numberGrid.css({
//                     "width": 0,
//                     "height": 0
//                 });
//             } else {
//                 numberGrid.css({
//                     "width": 100 + 'px',
//                     "height": 100 + 'px',
//                     "top": getPosTop(i),
//                     "left": getPosLeft(j)
//                 });
//                 numberGrid.text(board[i][j]);
//             }
//         }
//     }
// }
//
// function getPosTop(i) {
//     return 20 + i * 120;
// }
//
// function getPosLeft(j) {
//     return 20 + j * 120;
// }
//
// function randomNum() {
//     var num = parseInt(Math.round(Math.random() * 4));
//     //1.先随机生成两个数代表位置
//     var x = num;
//     var y = num;
//
//     while (true) {
//         if (board[x][y] === 0)
//             break;//说明x，y可以用作位置
//         x = num;
//         y = num;
//     }
//     var numm = parseInt(Math.random() < 0.5 ? 2 : 4);
//     //用随机生成的数字填充随机生成的位置
//     board[x][y] = numm;
//     return true;
// }
var board = new Array();
var score = 0;

$(document).ready(function (e) {
    newgame();
});

function newgame() {
    //初始化棋盘格
    init();

}

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
                    "height":0
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
    console.log(x);
    console.log(y);
    console.log(randNumber);
    return true;
}

