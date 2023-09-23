const Color = {
    RED: 'red',
    BLACK: 'black',
    WHITE: 'white',
    BLUE: 'blue',
    YELLOW: 'yellow'
}

class Cell {
    _divInstance = null;
    _divParentInstance = null;
    _bgColor = Color.BLACK;
    _size = 20;
    _pos = [0,0]; // [x,y]

    constructor(parent = document.body, size = 20, bgColor = Color.BLACK,
        pos = [0,0]
        ) {
        this._divInstance = document.createElement('div');
        this._divInstance.style.position = 'absolute';
        this._divInstance.classList.add('cell');
        // this._divInstance.style.borderRadius = 2+'px';
        this._divParentInstance = parent;
        this._divParentInstance.appendChild(this._divInstance);
        this._bgColor = bgColor;
        this._size = size;
        this._pos = pos;
        this._updateCell();
    }

    eventHandler(eventType, fn) {
        this._divInstance.addEventListener(eventType, fn);
    }

    setSize(size) {
        this._size = size;
        this._updateCell();
    }

    setCellPos(pos) {
        this._pos = pos;
        this._updateCell();
    }

    setColor(color) {
        this._bgColor = color;
        this._updateCell();
    }

    getColor() {
        return this._bgColor;
    }

    _updateCell() {
        const [x,y] = this._pos;
        this._divInstance.style.left = x + 'px';
        this._divInstance.style.top = y + 'px';
        this._divInstance.style.backgroundColor = this._bgColor;
        this._divInstance.style.width = this._size + 'px';
        this._divInstance.style.height = this._size + 'px';
    }
}

const container = document.getElementById('container');
// const c1 = new Cell(container);
// c1.setColor(Color.RED);
// c1.setSize(50);
// c1.setCellPos([10, 10]);

class Grid {
    _title = "Grid"
    _gridSide = 23;
    _gridCells = [];
    _gridGutter = 1;
    _cellSize = 25;
    _gridContainerInstance = null;

    constructor(gridContainer, gridSide, cellSize = 25, gridTitle = "Grid") {
        // set parent height and width
        this._gridContainerInstance = gridContainer;
        this._gridSide = gridSide;
        this._cellSize = cellSize;
        gridContainer.style.width = this._gridSide*this._cellSize + this._gridSide + 2 + 'px';
        gridContainer.style.height = this._gridSide*this._cellSize + this._gridSide + 2 + 'px';
        for(let i = 0; i < Math.pow(this._gridSide,2); i++) {
            this._gridCells.push(new Cell(gridContainer, this._cellSize));
        }
        this._calculateCellPositions();
        this._setGridCellsAttribute();
    }

    getGridSize() {
        return this._gridSide;
    }

    getCellInstance(cellPos) {
        const [r, c] = cellPos;
        const cellInstance = this._gridCells[(r-1)*this._gridSide + c-1];
        return cellInstance;
    }

    _setGridCellsAttribute() {
        for(let i = 0; i < this._gridCells.length; i++) {
            // column = (i%gridSide)
            // row = Math.floow(i/gridSide)
            this._gridCells[i]._divInstance.setAttribute('data-col', i%this._gridSide);
            this._gridCells[i]._divInstance.setAttribute('data-row', Math.floor(i/this._gridSide));
        }
    }

    getCellColor(cellPos) {
        return this.getCellInstance(cellPos).getColor();
    }

    triggerCellChangeEvent(fn) {
        // trigger this fn when a change of cell happens
        this._gridContainerInstance.addEventListener('mousemove', (event) => {
            const cell = document.elementFromPoint(event.clientX, event.clientY);
            const {row, col} = cell.dataset;
            if(row && col) {
                console.log(row,col);
            }
        })
    }

    bindToCellEvent(eventType, fn) {
        for(const cell of this._gridCells) {
            cell._divInstance.addEventListener(eventType, () => {
                fn(cell);
            })
        }
    }

    triggerOnHover(fn) {
        for(const cell of this._gridCells) {
            fn(cell);
            cell._divInstance.addEventListener('mouseover', () => {
                cell._divInstance.style.backgroundColor = Color.RED;
            })
            cell._divInstance.addEventListener('mouseout', () => {
                cell._divInstance.style.backgroundColor = Color.BLACK;
            })
        }
    }

    setCellColor(cellPos, color) {
        const [r,c] = cellPos;
        if(r < 1 || c < 1 || r > this._gridSide || c > this._gridSide) {
            throw new Error(`Invalid cell position x=${r}, y=${c}`);
        }
        const cellInstance = this._gridCells[(r-1)*this._gridSide + c-1];
        cellInstance.setColor(color);
        // 2,1
        // (2-1)*5 + 1
        // (3-1)*5 + 3
    }

    _calculateCellPositions() {
        // initial pos = 2px;
        for(let i = 0; i < this._gridCells.length; i++) {
            this._gridCells[i].setCellPos([
                (this._gridGutter + (this._cellSize + this._gridGutter)*i)%((this._cellSize + this._gridGutter)*this._gridSide),
                Math.floor(i/this._gridSide)*(this._cellSize + this._gridGutter) + this._gridGutter
            ]);
        }
    }
}
