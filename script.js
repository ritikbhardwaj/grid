const g1 = new Grid(container, 20, 30);

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

// open Challenge: How to add a delay with each recusive call to a function.
// Solution: Possible with generators.
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

g1.bindToCellEvent('click', (cellInstance) => {
    console.log(cellInstance);
})

g1.triggerCellChangeEvent((event) => {
    console.log(event);
});

g1.triggerOnHover((cellInstance) => {
    console.log(cellInstance._pos);
    cellInstance._divInstance.addEventListener('click', () => {
        console.log(cellInstance._pos);
    });
});

// g1.getCellInstance([1,1]).addEventListener('click', () => {
//     console.log('click');
// })
// const cellInstance = g1.getCellInstance([1,1])._divInstance;
// cellInstance.addEventListener('mouseover', () => {
//     cellInstance.style.backgroundColor = Color.RED;
//     console.log('in');
// })
// cellInstance.addEventListener('mouseout', () => {
//     cellInstance.style.backgroundColor = Color.BLACK;
//     console.log('out');
// })

printNQueens(1, Color.BLUE);