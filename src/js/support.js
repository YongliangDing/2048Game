// 设置格子位置
export function getPosTop(i, width) {
  return width * 0.04 + i * width * 0.24;
}

export function getPosLeft(j, width) {
  return width * 0.04 + j * width * 0.24;
}

// 根据值设置背景颜色
export function getBackgroumdColor(val) {
  let color;
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

// 根据值设置颜色
export function getColor(val) {
  if (val <= 4) {
    return '#776e65';
  }
  return '#fff';
}

// 检测是否还有空间
export function noSpace(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] == 0) {
        return false;
      }
    }
  }

  return true;
}

// 检测是否可以向左移动
export function canMoveLeft(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (board[i][j] != 0 && (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j])) { //该位置有值,左侧值为0或值相同
        return true;
      }

    }
  }
  return false;
}

// 检测有块的格子左侧有相同块或者无块则可以移动
export function canMoveRight(board) {
  for (let i = 0; i < 4; i++) {
    for (let j = 2; j >= 0; j--) {
      if (board[i][j] != 0) { //该位置有值
        if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) { //右侧值为0或值相同
          return true;
        }
      }
    }
  }
  return false;
}

export function canMoveUp(board) {
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) { //该位置有值
        if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) { //上侧值为0或值相同
          return true;
        }
      }
    }
  }
  return false;
}

export function canMoveDown(board) {
  for (let i = 2; i >= 0; i--) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] != 0) {
        if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) { //下册值为0或值相同
          return true;
        }
      }
    }
  }
  return false;
}

// 检测(i,j)的左侧是否有块
export function noBlockLeft(i, k, j, arr) {
  for (let index = k + 1; index < j; index++) {
    if (arr[i][index] != 0) {
      return false;
    }
  }
  return true;
}

export function noBlockRight(i, k, j, arr) {
  for (let index = k - 1; index > j; index--) {
    if (arr[i][index] != 0) {
      return false;
    }
  }
  return true;
}

export function noBlockUp(j, k, i, arr) {
  for (let index = k + 1; index < i; index++) {
    if (arr[index][j] != 0) {
      return false;
    }
  }
  return true;
}

export function noBlockDown(j, k, i, arr) {
  for (let index = k - 1; index > i; index--) {
    if (arr[index][j] != 0) {
      return false;
    }
  }
  return true;
}


// 检测是否不可移动
export function noMove(board) {
  if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
    return false;
  }
  return true;
}