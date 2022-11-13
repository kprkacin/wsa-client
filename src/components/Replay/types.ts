export enum SquareSymbol {
  'X' = 'X',
  'O' = 'O',
}
export interface Square {
  symbol?: SquareSymbol;
}
export enum PlayerStates {
  'ACTIVE' = 'ACTIVE',
  'QUEUED' = 'QUEUED',
  'IN_GAME' = 'IN_GAME',
}
