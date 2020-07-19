import { CellValue, CellState, Cell } from './types'

const MAX_ROWS = 9;
const MAX_COLS = 9;

export const generateCells = ():Cell[][] => {
    const cells: Cell[][] = []
    for (let row = 0; row < MAX_ROWS; row++){
        cells.push([]);
        for(let col = 0; col < MAX_COLS; col++){
            cells[row].push({
                value: CellValue.none,
                state: CellState.open
            });
        }
    }
    return cells;
}