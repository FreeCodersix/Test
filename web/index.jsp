<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>网页版2048</title>
    <link rel="stylesheet" type="text/css" href="CSS/Clear.css">
    <link rel="stylesheet" type="text/css" href="CSS/index.css">
    <script src="JS/jquery-1.12.4.js"></script>
    <script src="JS/index.js"></script>
</head>

<body>
<header>
    <h1>2048</h1>
    <a href="javascript:init();" id="newgameButton">New Game</a>
    <a href="javascript:rankingList();" id="rankingList">Ranking List</a>
    <p>
        score:<span id="score">0</span>
    </p>
</header>
<div id="grid-container">
    <div class="grid-cell" id="grid-cell-0-0"></div>
    <div class="grid-cell" id="grid-cell-0-1"></div>
    <div class="grid-cell" id="grid-cell-0-2"></div>
    <div class="grid-cell" id="grid-cell-0-3"></div>

    <div class="grid-cell" id="grid-cell-1-0"></div>
    <div class="grid-cell" id="grid-cell-1-1"></div>
    <div class="grid-cell" id="grid-cell-1-2"></div>
    <div class="grid-cell" id="grid-cell-1-3"></div>

    <div class="grid-cell" id="grid-cell-2-0"></div>
    <div class="grid-cell" id="grid-cell-2-1"></div>
    <div class="grid-cell" id="grid-cell-2-2"></div>
    <div class="grid-cell" id="grid-cell-2-3"></div>

    <div class="grid-cell" id="grid-cell-3-0"></div>
    <div class="grid-cell" id="grid-cell-3-1"></div>
    <div class="grid-cell" id="grid-cell-3-2"></div>
    <div class="grid-cell" id="grid-cell-3-3"></div>
</div>
<div id="gameoverDiv">
    <div id="gameover">
        GAME OVER
    </div>
</div>
<div id="RankingOp">
    <div id="RankingListDiv">
        <div class="rankL">姓名</div>
        <div class="rankL"></div>
        <div class="rankL"></div>
        <div class="rankL"></div>
        <div class="rankL"></div>
        <div class="rankL"></div>
        <div class="rankL"></div>
        <div class="rankL"></div>
        <div class="rankL"></div>
        <div class="rankL"></div>
    </div>
    <div id="RankingListScore">
        <div class="rankR">分数</div>
        <div class="rankR"></div>
        <div class="rankR"></div>
        <div class="rankR"></div>
        <div class="rankR"></div>
        <div class="rankR"></div>
        <div class="rankR"></div>
        <div class="rankR"></div>
        <div class="rankR"></div>
        <div class="rankR"></div>
    </div>
</div>
<div id="formI">
    <form action="update.jsp" method="post">
        <div id="div">
            <div class="scoreLine">请留下您的大名：<input type="text" name="newName" class="input"/></div>
        </div>
        <input type="submit" name="submit" value="确定" id="login"/>
    </form>
</div>
</body>

</html>
