export enum PlayState {
    Playing,
    Won,
    Draw,
};

export enum Token {
    X = 'X',
    O = 'O',
};

export type Cell = Token | null;

/**
 * The "cells" indices represent...
 *   0  1  2
 *   3  4  5
 *   6  7  8
 */
export interface Round {
    cells: Array<Cell>;
    token: Token;
};
