var board = [],
    scroe,
    hasConflicted = [];
var $container = $('#container');
window.onload = function () {
    newGame();
};

function newGame() {
    init();
    score=0;
    createOneNum();
    createOneNum();
}

function init() {
    var i, j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            var $cell = $('#cell-' + i + '-' + j);
            $cell.css('top', getPosTop(i));
            $cell.css('left', getPosLeft(j));
        }
    }

    for (i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;
}

function updateBoardView() {
    $('.numCell').remove();
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            var $ele = $('<div></div>').addClass('numCell');
            $ele.attr('id', 'numCell-' + i + '-' + j);
            $container.append($ele);
            if (board[i][j] == 0) {
                $ele.css({
                    'width': 0,
                    'height': 0,
                    'top': getPosTop(i) + 50,
                    'left': getPosLeft(j) + 50
                })
            } else {
                $ele.css({
                    'width': 100,
                    'height': 100,
                    'top': getPosTop(i),
                    'left': getPosLeft(j),
                    'background-color': getBackgroumdColor(board[i][j]),
                    'color': getColor(board[i][j])
                });
                $ele.html(board[i][j]);
                if ($ele.html() > 99) {
                    $ele.css('font-size', 48);
                }
                if ($ele.html() > 999) {
                    $ele.css('font-size', 36);
                }
            }

            hasConflicted[i][j] = false;
        }
    }
}


function createOneNum() {
    // 判断有无空位置
    if (noSpace(board)) {
        return false;
    }

    // 随机位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (board[randx][randy] != 0) {
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }

    // 随机数字
    var randNum = Math.random() < 0.5 ? 2 : 4;
    board[randx][randy] = randNum;
    showNum(randx, randy, randNum);
    console.log('create', randx + 1, randy + 1, randNum);
    return true;
}

document.onkeyup = function (event) {
    switch (event.keyCode) {
        case 37:
            if (moveLeft()) {
                setTimeout(createOneNum, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        case 38:
            if (moveUp()) {
                setTimeout(createOneNum, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        case 39:
            if (moveRight()) {
                setTimeout(createOneNum, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        case 40:
            if (moveDown()) {
                setTimeout(createOneNum, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        default:
            break;
    }
};

function moveLeft() {
    console.log('←');

    if (!canMoveLeft(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) { //该位置有值
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockLeft(i, k, j, board)) { //左侧有空位置且中间无阻碍
                        showMove(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
                        break;
                    } else if (board[i][k] == board[i][j] && noBlockLeft(i, k, j, board) && !hasConflicted[i][k]) { //左侧有值相同且中间无阻碍
                        showMove(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
                        break;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;
}

function moveUp() {
    console.log('↑');
    if (!canMoveUp(board)) {
        return false;
    }

    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) { //该位置有值
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockUp(j, k, i, board)) { //上侧有空位置且中间无阻碍
                        showMove(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
                        break;
                    } else if (board[k][j] == board[i][j] && noBlockUp(j, k, i, board) && !hasConflicted[k][j]) { //上侧有值相同且中间无阻碍
                        showMove(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
                        break;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;
}

function moveRight() {
    console.log('→');

    if (!canMoveRight(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) { //该位置有值
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockRight(i, k, j, board)) { //右侧有空位置且中间无阻碍
                        showMove(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
                        break;
                    } else if (board[i][k] == board[i][j] && noBlockRight(i, k, j, board) && !hasConflicted[i][k]) { //右侧有值相同且中间无阻碍
                        showMove(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        hasConflicted[i][k] = true;
                        updateScore(score);
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
                        break;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;
}



function moveDown() {
    console.log('↓');
    if (!canMoveDown(board)) {
        return false;
    }

    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) { //该位置有值
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockDown(j, k, i, board)) { //下侧有空位置且中间无阻碍
                        showMove(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
                        break;
                    } else if (board[k][j] == board[i][j] && noBlockDown(j, k, i, board) && !hasConflicted[k][j]) { //下侧有值相同且中间无阻碍
                        showMove(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
                        break;
                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);
    return true;
}

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        alert('Game over');
        newGame();
    }
}