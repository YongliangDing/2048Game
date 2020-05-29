import '../css/reset.scss';
import '../css/index.scss';
import $ from 'jquery';
import {
  score,
  board,
  hasConflicted,
  $container,
  deviceWidth,
  editScore
} from './variable';
import * as imation from './imation';
import * as support from './support';

let startX: number;
let startY: number;
let endX: number;
let endY: number;

$(document).ready(() => {
  newGame();
  deviceWidth === 500 ?
    $('#start').on('click', (event) => {
      event.stopPropagation();
      newGame();
    }) :
    $('#start').on('touchend', (event) => {
      event.stopPropagation();
      newGame();
    });
});

function newGame() {
  init();
  imation.updateScore(editScore(0));
  support.createOneNum();
  support.createOneNum();
  onEvent();
  $('#container').height($('#container').width()!);
  $('.cell').height($('.cell').width()!);
}

function onEvent() {
  // 绑定事件
  $(document).on('keyup', (event) => {
    event.preventDefault();
    doMove(event.keyCode);
  });

  $('#container').on('touchstart', (event) => {
    event.preventDefault();
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
  });

  $('#container').on('touchend', (event) => {
    event.preventDefault();
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;
    const deltayX = endX - startX;
    const deltayY = endY - startY;
    if (Math.abs(deltayX) < deviceWidth * 0.25 && Math.abs(deltayY) < deviceWidth * 0.25) {
      return;
    }
    if (Math.abs(deltayX) > Math.abs(deltayY)) {
      deltayX > 0 ? doMove(39) : doMove(37);
    } else {
      deltayY > 0 ? doMove(40) : doMove(38);
    }
  });
}

function offEvent() {
  $(document).off('keyup');
  $('#container').off('touchstart touchend');
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
      const $ele = $('<div></div>').addClass('numCell');
      $ele.attr('id', 'numCell-' + i + '-' + j);
      $container.append($ele);
      $('.numCell').css('line-height', $('.cell').width() + 'px');
      if (board[i][j] === 0) {
        $ele.css({
          'width': 0,
          'height': 0,
          'top': support.getPosTop(i) + deviceWidth * 0.1,
          'left': support.getPosLeft(j) + deviceWidth * 0.1
        });
      } else {
        $ele.html(board[i][j] + '').css({
          'width': deviceWidth * 0.2,
          'height': deviceWidth * 0.2,
          'top': support.getPosTop(i),
          'left': support.getPosLeft(j),
          'background-color': support.getBackgroumdColor(board[i][j]),
          'color': support.getColor(board[i][j])
        });
        if (+$ele.html() > 999) {
          deviceWidth === 500 ?
            $ele.css('font-size', 36) :
            $ele.css('font-size', 24);
        } else if (+$ele.html() > 99) {
          deviceWidth === 500 ?
            $ele.css('font-size', 48) :
            $ele.css('font-size', 36);
        } else if (+$ele.html() > 9) {
          deviceWidth === 500 ?
            $ele.css('font-size', 64) :
            $ele.css('font-size', 48);
        }
      }
      hasConflicted[i][j] = false;
    }
  }
}

// 移动函数
function doMove(val: number) {
  switch (val) {
    case 37:
      if(support.moveLeft(updateBoardView)) {
        setTimeout(support.createOneNum, 210);
        setTimeout(isGameOver, 300);
      }
      break;
    case 38:
      if(support.moveUp(updateBoardView)) {
        setTimeout(support.createOneNum, 210);
        setTimeout(isGameOver, 300);
      }
      break;
    case 39:
      if(support.moveRight(updateBoardView)) {
        setTimeout(support.createOneNum, 210);
        setTimeout(isGameOver, 300);
      }
      break;
    case 40:
      if(support.moveDown(updateBoardView)) {
        setTimeout(support.createOneNum, 210);
        setTimeout(isGameOver, 300);
      }
      break;
  }
}

// 检测游戏是否结束,即无空间且不可移动
function isGameOver() {
  if (!support.noSpace() || !support.noMove()) {
    return false;
  }
  $('#over .score').html(score + '');
  offEvent();
  setTimeout(() => {
    $('#over').css('display', 'flex');
  }, 1000);

  $(document).on('keyup', (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      $(document).off('keyup');
      $('#over').hide();
      newGame();
    }
  });
  deviceWidth === 500 ?
    $('#over a').on('click', () => {
      $('#over').hide();
      newGame();
    }) :
    $('#over a').on('touchend', () => {
      $('#over').hide();
      newGame();
    });
}