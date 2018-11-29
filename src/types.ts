export enum Token {
    X = 'X',
    O = 'O',
};

export type Cell = Token | null;

export interface Round {
    cells: Array<Cell>;
    token: Token;
};
