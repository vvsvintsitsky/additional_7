module.exports = function solveSudoku(matrix) {
  var rowAvailableNumbersArray = [];
  var columnAvailableNumbersArray = [];
  var squareAvailableNumbersArray = [];
  var i = 0;
  var j = 0;
  var leastVariantsRow = 0;
  var leastVariantsColumn = 0;
  var leastVariants = 10;
  var currentCellValue;
  var currentCellValueIndex;
  var currentSquareArrayIndex;
  var emptyCellsArray = [];
  var emptyCell;
  var bestEmptyCell;
  var bestEmptyCellIndex;
  var variants = 0;

  var mMatrix = [];
  
  for(let k = 0; k < 9; k++) {
    rowAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    columnAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    squareAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    mMatrix = mMatrix.concat(matrix[k]);
    
  }

  var offset = 0;
  for(i = 0; i < 9; i++) {
    offset = i*9;
    for(j = 0; j < 9; j++) {
      currentCellValue = mMatrix[offset + j];
      currentSquareArrayIndex = (i - i%3) + ((j - j%3)/3);
      if(currentCellValue !== 0) {
        currentCellValueIndex = rowAvailableNumbersArray[i].indexOf(currentCellValue);
        rowAvailableNumbersArray[i].splice(currentCellValueIndex, 1);

        currentCellValueIndex = columnAvailableNumbersArray[j].indexOf(currentCellValue);
        columnAvailableNumbersArray[j].splice(currentCellValueIndex, 1);

        currentSquareArrayIndex = (i - i%3) + ((j - j%3)/3);
        currentCellValueIndex = squareAvailableNumbersArray[currentSquareArrayIndex].indexOf(currentCellValue);
        squareAvailableNumbersArray[currentSquareArrayIndex].splice(currentCellValueIndex, 1);
      } else {
        emptyCellsArray.push({row : i, column : j, square : currentSquareArrayIndex, variants : []});
      }
    }
  }

  if(emptyCellsArray.length == 0) {
    return matrix;
  }

  emptyCellsArray.forEach(element => {
    variants = 0;
    for(let k = 0; k < rowAvailableNumbersArray[element.row].length; k++) {
      currentCellValue = rowAvailableNumbersArray[element.row][k];
      if(columnAvailableNumbersArray[element.column].indexOf(currentCellValue) !== -1 &&
          squareAvailableNumbersArray[element.square].indexOf(currentCellValue) !== -1) {
        element.variants.push(currentCellValue);
      }
    }
    if(element.variants.length != 0) {
      if(element.variants.length <= leastVariants) {
        bestEmptyCell = element;
        leastVariants = element.variants.length;
      }
    } else {
      return false;
    }
    
  });

  console.log(emptyCellsArray[1].variants);

  var roots = [];
  emptyCellsArray.forEach(element => {
    if(element.variants.length == leastVariants) {
      roots.push(element);
    }
  });

  var solve = function (matrixToSolve, rowANArray, columnANArray, squareANArray, emptyCArray) {
    var mToSolve = matrixToSolve.splice();

    for(let k = 0; k < 9; k++) {
      rowAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      columnAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      squareAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  
      mMatrix = mMatrix.concat(matrix[k]);
      
    }
  }

  roots.forEach(el => {
    //console.log(el.row + " " + el.column + " " + el.variants);
  });
  //console.log(roots + " " + leastVariants + " " + bestEmptyCell.variants);

  for(let k = 0; k < 9; k++) {
    //console.log(rowAvailableNumbersArray[k]);
    //rowAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //columnAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //squareAvailableNumbersArray.push([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  }

}
