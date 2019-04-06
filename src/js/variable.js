import $ from 'jquery';

export let score = 0;
export const board = [];
export const hasConflicted = [];
export const $container = $('#container');
export const deviceWidth = $('#container').width() > 500 ? 500 : $('#container').width();
export function editScore(val) {
  score = val;
  return score;
}