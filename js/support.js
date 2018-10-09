function getPosTop(i) {
    return 20 + i * 120;
}

function getPosLeft(j) {
    return 20 + j * 120;
}

function getBackgroumdColor(val) {
    var color;
    switch (val) {
        case 2:
            color = '#eee4da';
            break;
        case 4:
            color = '#ede0c8';
            break;
        case 8:
            color = '#f2b179';
            break;
        case 16:
            color = '#f59563';
            break;
        case 32:
            color = '#f67c5f';
            break;
        case 64:
            color = '#f65e3b';
            break;
        case 128:
            color = '#edcf72';
            break;
        case 256:
            color = '#edcc61';
            break;
        case 512:
            color = '#9c0';
            break;
        case 1024:
            color = '#33b5e5';
            break;
        case 2048:
            color = '#09c';
            break;
        case 4096:
            color = '#a6c';
            break;
        default:
            color = '#93c';
    }
    return color;
}

function getColor(val) {
    if (val <= 4) {
        return '#776e65';
    }
    return '#fff';
}


function noSpace(arr) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] == 0) {
                return false;
            }
        }
    }

    return true;
}

function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) { //该位置有值
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) { //左侧值为0或值相同
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) { //该位置有值
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) { //右侧值为0或值相同
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp(board) {
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) { //该位置有值
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) { //上侧值为0或值相同
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown(board) {
    for (var i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) { //下册值为0或值相同
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockLeft(i, k, j, arr) {
    for (var index = k + 1; index < j; index++) {
        if (arr[i][index] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockRight(i, k, j, arr) {
    for (var index = k - 1; index > j; index--) {
        if (arr[i][index] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockUp(j, k, i, arr) {
    for (var index = k + 1; index < i; index++) {
        if (arr[index][j] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockDown(j, k, i, arr) {
    for (var index = k - 1; index > i; index--) {
        if (arr[index][j] != 0) {
            return false;
        }
    }
    return true;
}



function noMove(board) {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
        return false;
    }
    return true;
}