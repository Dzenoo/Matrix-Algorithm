const MATRIX_SIZE = 10;
const START_COORDINATES = [0, 0];
const END_COORDINATES = [MATRIX_SIZE - 1, MATRIX_SIZE - 1];
const NUM_BLOCKING_OBJECTS = 3;

function createMatrix(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 0)
  );
}

// function printMatrix(matrix) {
//   for (const row of matrix) {
//     console.log(row);
//   }
//   console.log();
// }

function generateBlockingObjects(matrix, num, currentPos, endPos) {
  const blockingObjects = [];
  const size = matrix.length;
  while (blockingObjects.length < num) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    if (
      !blockingObjects.some(([bx, by]) => bx === x && by === y) &&
      (x !== currentPos[0] || y !== currentPos[1]) &&
      (x !== endPos[0] || y !== endPos[1])
    ) {
      blockingObjects.push([x, y]);
      matrix[x][y] = 1;
    }
  }
  return blockingObjects;
}

function findPath(matrix, start, end, numBlocks) {
  const path = { movingObjectCoordinates: [], blockingObjectCoordinates: [] };
  const visited = new Set();
  path.movingObjectCoordinates.push(start);
  let currentPos = start;
  const endPos = end;
  while (currentPos[0] !== endPos[0] || currentPos[1] !== endPos[1]) {
    const blockingObjects = generateBlockingObjects(
      matrix,
      numBlocks,
      currentPos,
      endPos
    );
    path.blockingObjectCoordinates = blockingObjects;
    const neighbors = [];
    const [x, y] = currentPos;

    if (x > 0 && matrix[x - 1][y] === 0 && !visited.has(`${x - 1},${y}`)) {
      const distance = Math.sqrt((x - 1 - end[0]) ** 2 + (y - end[1]) ** 2);
      neighbors.push([distance, [x - 1, y]]);
    }

    if (
      x < matrix.length - 1 &&
      matrix[x + 1][y] === 0 &&
      !visited.has(`${x + 1},${y}`)
    ) {
      const distance = Math.sqrt((x + 1 - end[0]) ** 2 + (y - end[1]) ** 2);
      neighbors.push([distance, [x + 1, y]]);
    }

    if (y > 0 && matrix[x][y - 1] === 0 && !visited.has(`${x},${y - 1}`)) {
      const distance = Math.sqrt((x - end[0]) ** 2 + (y - 1 - end[1]) ** 2);
      neighbors.push([distance, [x, y - 1]]);
    }

    if (
      y < matrix.length - 1 &&
      matrix[x][y + 1] === 0 &&
      !visited.has(`${x},${y + 1}`)
    ) {
      const distance = Math.sqrt((x - end[0]) ** 2 + (y + 1 - end[1]) ** 2);
      neighbors.push([distance, [x, y + 1]]);
    }
    if (neighbors.length === 0) {
      path.blockingObjectCoordinates = [];
      break;
    }

    neighbors.sort((a, b) => a[0] - b[0]);

    for (let i = 0; i < neighbors.length; i++) {
      const [distance, nextPos] = neighbors[i];
      path.movingObjectCoordinates = [nextPos];
      visited.add(`${x},${y}`);
      currentPos = nextPos;

      if (currentPos[0] === end[0] && currentPos[1] === end[1]) {
        path.blockingObjectCoordinates = blockingObjects;
        break;
      }

      break;
    }
  }

  return path;
}

const start = () => {
  const startTime = Date.now();
  const matrixSize = 10;
  const startCoordinates = [0, 0];
  const endCoordinates = [matrixSize - 1, matrixSize - 1];
  const numBlockingObjects = 3;
  const matrix = createMatrix(matrixSize);
  const path = findPath(
    matrix,
    startCoordinates,
    endCoordinates,
    numBlockingObjects
  );

  console.log("Path:", path);
  console.log("Execution time:", Date.now() - startTime, "ms");
  // console.table(matrix);
};

start();
