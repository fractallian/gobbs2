export function movePiece(fromStackIndex, toStackIndex) {
  return {
    type: 'MOVE',
    fromStackIndex,
    toStackIndex
  };
}