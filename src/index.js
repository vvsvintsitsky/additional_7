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

  var roots = [];
  emptyCellsArray.forEach(element => {
    if(element.variants.length == leastVariants) {
      roots.push(element);
    }
  });

  var solve = function (matrixToSolve, /*rowANArray, columnANArray, squareANArray,*/ emptyCArray) {
    if(emptyCArray.length == 0) {
      return matrixToSolve;
    }
    var mToSolve = matrixToSolve.slice();
    //var rowANA = [];
    //var columnANA = [];
    //var squareANA = [];
    var emptyCA = [];
    var leastVariants;

    /*for(let k = 0; k < 9; k++) {
      rowANA.push(rowANArray[k].slice());
      columnANA.push(columnANArray[k].slice());
      squareANA.push(squareANArray[k].slice());
    }*/
    emptyCArray.forEach(element => {
      emptyCA.push({row : element.row, column : element.column, square : element.square, variants : element.variants.slice()});
    });

    leastVariants = emptyCA[0].variants.length;

    
    for(let i = 0; i < emptyCA.length; i++) {
      let element = emptyCA[i];
      let valueToSet;
      if(element.variants.length === 1) {
        mToSolve = matrixToSolve.slice();
        valueToSet = element.variants[0];
        mToSolve[9*element.row + element.column] = valueToSet;
        emptyCA = [];
        emptyCArray.forEach(el => {
          emptyCA.push({row : el.row, column : el.column, square : el.square, variants : el.variants.slice()});
        });
        emptyCA.splice(i, 1);
        emptyCA.forEach(el => {
          if(el.row == element.row || el.column == element.column || el.square == element.square) {
            let index = el.variants.indexOf(valueToSet);
            if(index != -1) {
              el.variants.splice(index, 1);
            }
          }
        });
      }

    }
  }

  solve(mMatrix, /*rowAvailableNumbersArray, columnAvailableNumbersArray, squareAvailableNumbersArray,*/ emptyCellsArray);

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
