var score = 0;//记录分数

function getPosTop(i) {
    return 20 + i * 120;
}

function getPosLeft(j) {
    return 20 + j * 120;
}

function init() {
    score = 0;
    //单元格定位
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            console.log(getPosTop(i));
            console.log(getPosLeft(j));
            $("#grid-cell-" + i + "-" + j).css({
                "top": getPosTop(i),
                "left": getPosLeft(j)
            });

        }
    }
}

function newgame() {
    //1.初始化
    init();
}

$(document).ready(function (e) {
    newgame();
});