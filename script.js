const g1 = new Grid(container, 6, 80);

function isQueenSafe(row, col, trueColor) {
    // vertically up
    for(let i = row - 1, j = col; i > 0; i--) {
        if(g1.getCellColor([i,j]) === trueColor) {
            return false;
        }
    }
    // diag left
    for(let i = row-1, j = col-1; i > 0 && j > 0; i--, j--) {
        if(g1.getCellColor([i,j]) === trueColor) {
            return false;
        }
    }
    // diag right
    for(let i = row-1, j = col+1; i > 0 && j <= g1.getGridSize(); i--, j++) {
        if(g1.getCellColor([i,j]) === trueColor) {
            return false;
        }
    }
    return true;
}

function printNQueens(row = 0, trueColor) {
    if(row == g1.getGridSize()) {
        return;
    }

    for(col = 1; col <= g1.getGridSize(); col++) {
        if(isQueenSafe(row, col, trueColor)) {
            g1.setCellColor([row, col], trueColor);
            printNQueens(row + 1, trueColor);
        }
    }

}

printNQueens(1, Color.BLUE);