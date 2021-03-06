import { showMove, showNum, updateScore } from './imation';
import { board, deviceWidth, editScore, hasConflicted, score } from './variable';

type IUpdateBoardView = () => void



// 设置格子位置
export function getPosTop(i: number): number {
  return deviceWidth * 0.04 + i * deviceWidth * 0.24;
}

export function getPosLeft(j: number) {
  return deviceWidth * 0.04 + j * deviceWidth * 0.24;
}

// 根据值设置背景颜色
export function getBackgroumdColor(val: number): string {
  let color: string = '';
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
    case 8192:
      color = '#93c';
      break;
  }
  return color;
}

// 根据值设置颜色
export function getColor(val: number): string {
  return val <= 4 ? '#776e65' : '#fff';
}

// 检测是否还有空间
export function noSpace(): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        return false;
      }
    }
  }

  return true;
}

// 检测是否可以向左移动
export function canMoveLeft(): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] !== 0 && (board[i][j - 1] === 0 || board[i][j - 1] === board[i][j])) { // 该位置有值,左侧值为0或值相同
        return true;
      }
    }
  }
  return false;
}

// 检测有块的格子左侧有相同块或者无块则可以移动
export function canMoveRight(): boolean {
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      // 该位置有值
      if (board[i][j] !== 0 && (board[i][j + 1] === 0 || board[i][j + 1] === board[i][j])) { // 右侧值为0或值相同
        return true;
      }
    }
  }
  return false;
}

export function canMoveUp(): boolean {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      // 该位置有值
      if (board[i][j] !== 0 && (board[i - 1][j] === 0 || board[i - 1][j] === board[i][j])) { // 上侧值为0或值相同
        return true;
      }
    }
  }
  return false;
}

export function canMoveDown(): boolean {
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] !== 0 && (board[i + 1][j] === 0 || board[i + 1][j] === board[i][j])) { // 下册值为0或值相同
        return true;
      }
    }
  }
  return false;
}

// 检测(i,j)的左侧是否有块
function noBlockLeft(i: number, k: number, j: number): boolean {
  for (let index = k + 1; index < j; index++) {
    if (board[i][index] !== 0) {
      return false;
    }
  }
  return true;
}

function noBlockRight(i: number, k: number, j: number): boolean {
  for (let index = k - 1; index > j; index--) {
    if (board[i][index] !== 0) {
      return false;
    }
  }
  return true;
}

export function noBlockUp(i: number, k: number, j: number): boolean {
  for (let index = k + 1; index < i; index++) {
    if (board[index][j] !== 0) {
      return false;
    }
  }
  return true;
}

export function noBlockDown(i: number, k: number, j: number): boolean {
  for (let index = k - 1; index > i; index--) {
    if (board[index][j] !== 0) {
      return false;
    }
  }
  return true;
}


// 检测是否不可移动
export function noMove(): boolean {
  if (canMoveLeft() || canMoveRight() || canMoveUp() || canMoveDown()) {
    return false;
  }
  return true;
}

// 新建块,并随机赋值2或4
export function createOneNum(): boolean {
  // 判断有无空位置
  if (noSpace()) {
    return false;
  }

  // 随机位置
  let randx = Math.floor(Math.floor(Math.random() * 4));
  let randy = Math.floor(Math.floor(Math.random() * 4));
  while (board[randx][randy] !== 0) {
    randx = Math.floor(Math.floor(Math.random() * 4));
    randy = Math.floor(Math.floor(Math.random() * 4));
  }

  // 随机数字
  const randNum = Math.random() < 0.5 ? 2 : 4;
  board[randx][randy] = randNum;
  showNum(randx, randy, randNum, deviceWidth);
  console.log('create', randx + 1, randy + 1, randNum);
  return true;
}


export function moveLeft(updateBoardView: IUpdateBoardView) {
  console.log('←');

  if (!canMoveLeft()) {
    return false;
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] === 0) {
        continue;
      } // 该位置有值
      for (let k = 0; k < j; k++) { // k是比j小的值
        if (board[i][k] === 0 && noBlockLeft(i, k, j)) { // 左侧有空位置且中间无阻碍
          showMove(i, j, i, k, deviceWidth); // (i, j) => (i, k)
          board[i][k] = board[i][j];
          board[i][j] = 0;
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
          break;
        } else if (board[i][k] === board[i][j] && noBlockLeft(i, k, j) && !hasConflicted[i][k]) { // 左侧有值相同且中间无阻碍
          showMove(i, j, i, k, deviceWidth);
          board[i][k] += board[i][j];
          board[i][j] = 0;
          // score += board[i][k];
          updateScore(editScore(score + board[i][k]));
          hasConflicted[i][k] = true; // 合并检测,已合并,本次不可再次合并
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
          break;
        }
      }
    }
  }

  setTimeout(updateBoardView, 200);
  return true;
}

export function moveUp(updateBoardView: IUpdateBoardView) {
  console.log('↑');
  if (!canMoveUp()) {
    return false;
  }

  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        continue;
      } // 该位置有值
      for (let k = 0; k < i; k++) {
        if (board[k][j] === 0 && noBlockUp(j, k, i)) { // 上侧有空位置且中间无阻碍
          showMove(i, j, k, j, deviceWidth);
          board[k][j] = board[i][j];
          board[i][j] = 0;
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
          break;
        } else if (board[k][j] === board[i][j] && noBlockUp(j, k, i) && !hasConflicted[k][j]) { // 上侧有值相同且中间无阻碍
          showMove(i, j, k, j, deviceWidth);
          board[k][j] += board[i][j];
          board[i][j] = 0;
          // score += board[k][j];
          updateScore(editScore(score + board[k][j]));
          hasConflicted[k][j] = true;
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
          break;
        }
      }
    }
  }

  setTimeout(updateBoardView, 200);
  return true;
}

export function moveRight(updateBoardView: IUpdateBoardView) {
  console.log('→');

  if (!canMoveRight()) {
    return false;
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] === 0) {
        continue;
      } // 该位置有值
      for (let k = 3; k > j; k--) {
        if (board[i][k] === 0 && noBlockRight(i, k, j)) { // 右侧有空位置且中间无阻碍
          showMove(i, j, i, k, deviceWidth);
          board[i][k] = board[i][j];
          board[i][j] = 0;
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
          break;
        } else if (board[i][k] === board[i][j] && noBlockRight(i, k, j) && !hasConflicted[i][k]) { // 右侧有值相同且中间无阻碍
          showMove(i, j, i, k, deviceWidth);
          board[i][k] += board[i][j];
          board[i][j] = 0;
          // score += board[i][k];
          hasConflicted[i][k] = true;
          updateScore(editScore(score + board[i][k]));
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (i + 1) + ',' + (k + 1) + ')');
          break;
        }
      }
    }
  }

  setTimeout(updateBoardView, 200);
  return true;
}

export function moveDown(updateBoardView: IUpdateBoardView) {
  console.log('↓');
  if (!canMoveDown()) {
    return false;
  }

  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) {
        continue;
      } // 该位置有值
      for (let k = 3; k > i; k--) {
        if (board[k][j] === 0 && noBlockDown(j, k, i)) { // 下侧有空位置且中间无阻碍
          showMove(i, j, k, j, deviceWidth);
          board[k][j] = board[i][j];
          board[i][j] = 0;
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
          break;
        } else if (board[k][j] === board[i][j] && noBlockDown(j, k, i) && !hasConflicted[k][j]) { // 下侧有值相同且中间无阻碍
          showMove(i, j, k, j, deviceWidth);
          board[k][j] += board[i][j];
          board[i][j] = 0;
          // score += board[k][j];
          updateScore(editScore(score + board[k][j]));
          hasConflicted[k][j] = true;
          console.log('move', '(' + (i + 1) + ',' + (j + 1) + ')=>(' + (k + 1) + ',' + (j + 1) + ')');
          break;
        }
      }
    }
  }

  setTimeout(updateBoardView, 200);
  return true;
}