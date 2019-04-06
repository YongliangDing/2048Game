import $ from 'jquery';
import {
  getBackgroumdColor,
  getColor,
  getPosTop,
  getPosLeft
} from './support';

// 展示块上的数值
export function showNum(i, j, randNum, width) {
  let $numCell = $('#numCell-' + i + '-' + j);
  $numCell.css('background-color', getBackgroumdColor(randNum));
  $numCell.css('color', getColor(randNum));
  $numCell.html(randNum);
  $numCell.animate({
    width: width * 0.2 + 'px',
    height: width * 0.2 + 'px',
    top: getPosTop(i, width) + 'px',
    left: getPosLeft(j, width) + 'px'
  }, 50);
}

// 展示移动,(x1, y1) => (x2, y2)
export function showMove(x1, y1, x2, y2, width) {
  let $numCell = $('#numCell-' + x1 + '-' + y1);
  $numCell.animate({
    top: getPosTop(x2, width) + 'px',
    left: getPosLeft(y2, width) + 'px'
  }, 200);
}

// 更新分数
export function updateScore(score) {
  $('#score').html(score);
  if (score > +localStorage.getItem('great')) {
    localStorage.setItem('great', score);
  }
  $('#great').html(localStorage.getItem('great'));
}