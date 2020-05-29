import $ from 'jquery';

export let score = 0;
export const board: number[][] = [];
export const hasConflicted: boolean[][] = [];
export const $container = $('#container');
export const deviceWidth = $container.width()! > 500 ? 500 : $container.width()!;
export function editScore(val: number) {
  score = val;
  return score;
}