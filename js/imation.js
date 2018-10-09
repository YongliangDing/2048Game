function showNum(i, j, randNum) {
    var $numCell = $('#numCell-' + i + '-' + j);
    $numCell.css('background-color', getBackgroumdColor(randNum));
    $numCell.css('color', getColor(randNum));
    $numCell.html(randNum);
    $numCell.animate({
        width: '100px',
        height: '100px',
        top: getPosTop(i) + 'px',
        left: getPosLeft(j) + 'px'
    }, 50);
}

function showMove(x1, y1, x2, y2) {
    var $numCell = $('#numCell-' + x1 + '-' + y1);
    $numCell.animate({
        top: getPosTop(x2) + 'px',
        left: getPosLeft(y2) + 'px'
    }, 200);
}

function updateScore(score) {
    $('#score').html(score);
}