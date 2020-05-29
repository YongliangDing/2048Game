import $ from 'jquery';
import {
  getBackgroumdColor,
  getColor,
  getPosTop,
  getPosLeft
} from './support';

// 展示块上的数值
export function showNum(i: number, j: number, randNum: number, width: number) {
  const $numCell = $('#numCell-' + i + '-' + j);
  $numCell.css('background-color', getBackgroumdColor(randNum));
  $numCell.css('color', getColor(randNum));
  $numCell.html(randNum + '');
  $numCell.animate({
    width: width * 0.2 + 'px',
    height: width * 0.2 + 'px',
    top: getPosTop(i) + 'px',
    left: getPosLeft(j) + 'px'
  }, 50);
}

// 展示移动,(x1, y1) => (x2, y2)
export function showMove(x1: number, y1: number, x2: number, y2: number, width: number) {
  const $numCell = $('#numCell-' + x1 + '-' + y1);
  $numCell.animate({
    top: getPosTop(x2) + 'px',
    left: getPosLeft(y2) + 'px'
  }, 200);
}

// 更新分数
export function updateScore(score: number) {
  $('#score').html(score + '');

  if (score > +localStorage.getItem('great')!) {
    localStorage.setItem('great', score + '');
  }
  $('#great').html(localStorage.getItem('great')!);
}