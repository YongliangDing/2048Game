require('../css/reset.scss');
require('../css/index.scss');

import $ from 'jquery';
import * as imation from './imation';
import * as support from './support';

let score;
let startX, startY;
let endX, endY;
const board = [];
const hasConflicted = [];
const $container = $('#container');
const deviceWidth = $('#container').width() > 500 ? 500 : $('#container').width();

$(document).ready(() => {
  newGame();
});
if (deviceWidth === 500) {
  document.querySelector('#start').addEventListener('click', (event) => {
    event.stopPropagation();
    newGame();
  }, false);
} else {
  document.querySelector('#start').addEventListener('touchend', (event) => {
    event.stopPropagation();
    newGame();
  }, false);
}


function newGame() {
  init();
  score = 0;
  imation.updateScore(score);
  createOneNum();
  createOneNum();
  $('#container').height($('#container').width());
  $('.cell').height($('.cell').width());
}

// 负责布局16个格,并将每个格子的值初始化为0
function init() {
  for (let i = 0; i < 4; i++) {
    board[i] = [];
    hasConflicted[i] = [];
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
      hasConflicted[i][j] = false;
    }
  }
  updateBoardView();
}

// 更新格子视图,并创建格子上移动的16个块,如果数值为0则隐藏,不为0则展示
function updateBoardView() {
  $('.numCell').remove();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let $ele = $('<div></div>').addClass('numCell');
      $ele.attr('id', 'numCell-' + i + '-' + j);
      $container.append($ele);
      $('.numCell').css('line-height', $('.cell').width() + 'px');
      if (board[i][j] == 0) {
        $ele.css({
          'width': 0,
          'height': 0,
          'top': support.getPosTop(i, deviceWidth) + deviceWidth * 0.1,
          'left': support.getPosLeft(j, deviceWidth) + deviceWidth * 0.1
        });
      } else {
        $ele.css({
          'width': deviceWidth * 0.2,
          'height': deviceWidth * 0.2,
          'top': support.getPosTop(i, deviceWidth),
          'left': support.getPosLeft(j, deviceWidth),
          'background-color': support.getBackgroumdColor(board[i][j]),
          'color': support.getColor(board[i][j])
        });
        $ele.html(board[i][j]);
        if ($ele.html() > 9) {
          if (deviceWidth === 500) {
            $ele.css('font-size', 64);
          } else {
            $ele.css('font-size', 48);
          }
        }
        if ($ele.html() > 99) {
          if (deviceWidth === 500) {
            $ele.css('font-size', 48);
          } else {
            $ele.css('font-size', 36);
          }
        }
        if ($ele.html() > 999) {
          if (deviceWidth === 500) {
            $ele.css('font-size', 30);
          } else {
            $ele.css('font-size', 24);
          }
        }
      }
      hasConflicted[i][j] = false;
    }
  }
}

// 新建块,并随机赋值2或4
function createOneNum() {
  // 判断有无空位置
  if (support.noSpace(board)) {
    return false;
  }

  // 随机位置
  let randx = parseInt(Math.floor(Math.random() * 4));
  let randy = parseInt(Math.floor(Math.random() * 4));
  while (board[randx][randy] != 0) {
    randx = parseInt(Math.floor(Math.random() * 4));
    randy = parseInt(Math.floor(Math.random() * 4));
  }

  // 随机数字
  let randNum = Math.random() < 0.5 ? 2 : 4;
  board[randx][randy] = randNum;
  imation.showNum(randx, randy, randNum, deviceWidth);
  console.log('create', randx + 1, randy + 1, randNum);
  return true;
}

// 移动函数
function doMove(val) {
  switch (val) {
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
  }
}

// 绑定事件
document.addEventListener('keyup', (event) => {
  event.preventDefault();
  doMove(event.keyCode);
}, false);

document.querySelector('#container').addEventListener('touchstart', (event) => {
  event.preventDefault();
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;
}, false);

document.querySelector('#container').addEventListener('touchend', (event) => {
  event.preventDefault();
  endX = event.changedTouches[0].pageX;
  endY = event.changedTouches[0].pageY;
  const deltayX = endX - startX;
  const deltayY = endY - startY;
  if (Math.abs(deltayX) < deviceWidth * 0.25 && Math.abs(deltayY) < deviceWidth * 0.25) {
    return;
  }
  if (Math.abs(deltayX) > Math.abs(deltayY)) {
    if (deltayX > 0) {
      doMove(39);
    } else {
      doMove(37);
    }
  } else {
    if (deltayY > 0) {
      doMove(40);
    } else {
      doMove(38);
    }
  }
}, false);

function moveLeft() {
  console.log('←');

  if (!support.canMoveLeft(board)) {
    return false;
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0) { //该位置有值
        for (let k = 0; k < j; k++) { // k是比j小的值
          if (board[i][k] == 0 && support.noBlockLeft(i, k, j, board)) { //左侧有空位置且中间无阻碍
            imation.showMove(i, j, i, k, deviceWidth); // (i, j) => (i, k)
            board[i][k] = board[i][j];
            board[i][j] = 0;
            console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
            break;
          } else if (board[i][k] == board[i][j] && support.noBlockLeft(i, k, j, board) && !hasConflicted[i][k]) { //左侧有值相同且中间无阻碍
            imation.showMove(i, j, i, k, deviceWidth);
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            imation.updateScore(score);
            hasConflicted[i][k] = true; // 合并检测,已合并,本次不可再次合并
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
  if (!support.canMoveUp(board)) {
    return false;
  }

  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) { //该位置有值
        for (let k = 0; k < i; k++) {
          if (board[k][j] == 0 && support.noBlockUp(j, k, i, board)) { //上侧有空位置且中间无阻碍
            imation.showMove(i, j, k, j, deviceWidth);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
            break;
          } else if (board[k][j] == board[i][j] && support.noBlockUp(j, k, i, board) && !hasConflicted[k][j]) { //上侧有值相同且中间无阻碍
            imation.showMove(i, j, k, j, deviceWidth);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            imation.updateScore(score);
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

  if (!support.canMoveRight(board)) {
    return false;
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) { //该位置有值
        for (let k = 3; k > j; k--) {
          if (board[i][k] == 0 && support.noBlockRight(i, k, j, board)) { //右侧有空位置且中间无阻碍
            imation.showMove(i, j, i, k, deviceWidth);
            board[i][k] = board[i][j];
            board[i][j] = 0;
            console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
            break;
          } else if (board[i][k] == board[i][j] && support.noBlockRight(i, k, j, board) && !hasConflicted[i][k]) { //右侧有值相同且中间无阻碍
            imation.showMove(i, j, i, k, deviceWidth);
            board[i][k] += board[i][j];
            board[i][j] = 0;
            score += board[i][k];
            hasConflicted[i][k] = true;
            imation.updateScore(score);
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
  if (!support.canMoveDown(board)) {
    return false;
  }

  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) { //该位置有值
        for (let k = 3; k > i; k--) {
          if (board[k][j] == 0 && support.noBlockDown(j, k, i, board)) { //下侧有空位置且中间无阻碍
            imation.showMove(i, j, k, j, deviceWidth);
            board[k][j] = board[i][j];
            board[i][j] = 0;
            console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
            break;
          } else if (board[k][j] == board[i][j] && support.noBlockDown(j, k, i, board) && !hasConflicted[k][j]) { //下侧有值相同且中间无阻碍
            imation.showMove(i, j, k, j, deviceWidth);
            board[k][j] += board[i][j];
            board[i][j] = 0;
            score += board[k][j];
            imation.updateScore(score);
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


// 检测游戏是否结束,即无空间且不可移动
function isGameOver() {
  if (support.noSpace(board) && support.noMove(board)) {
    alert('Game over');
    newGame();
  }
}