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

  var solvedSudoku;

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

  emptyCellsArray.forEach(element => {
    variants = 0;
    for(let k = 0; k < rowAvailableNumbersArray[element.row].length; k++) {
      currentCellValue = rowAvailableNumbersArray[element.row][k];
      if(columnAvailableNumbersArray[element.column].indexOf(currentCellValue) !== -1 &&
          squareAvailableNumbersArray[element.square].indexOf(currentCellValue) !== -1) {
        element.variants.push(currentCellValue);
      }
    }    
  });
  emptyCellsArray.sort((left, right) => {
    return left.variants.length - right.variants.length;
  });

  var solve = function (matrixToSolve, /*rowANArray, columnANArray, squareANArray,*/ emptyCArray) {
    if(emptyCArray.length == 0) {
      return matrixToSolve;
    }
    var mToSolve = [];
    var emptyCA = [];
    //console.log(emptyCArray);
    for(let i = 0; i < emptyCArray.length; i++) {
      let element = emptyCArray[i];
      let valueToSet;
      if(element.variants.length != 0) {
        for(let j = 0; j < element.variants.length; j++) {
          mToSolve = matrixToSolve.slice();
          valueToSet = element.variants[j];
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
          emptyCA.sort((left, right) => {
            return left.variants.length - right.variants.length;
          });
          result = solve(mToSolve, emptyCA);
          if(Array.isArray(result)) {
            return result;
          }
        }
      } else {
        return false;
      }
    }
  };

  var solve2 = function (matrixToSolve, /*rowANArray, columnANArray, squareANArray,*/ emptyCArray) {
    if(emptyCArray.length == 0) {
      return matrixToSolve;
    }
    var mToSolve = [];
    var emptyCA = [];
    console.log(emptyCArray);
    for(let i = 0; i < emptyCArray.length; i++) {
      let element = emptyCArray[i];
      let valueToSet;
      if(element.variants.length == 1) {
        
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
          emptyCA.sort((left, right) => {
            return left.variants.length - right.variants.length;
          });
          result = solve(mToSolve, emptyCA);
          if(Array.isArray(result)) {
            return result;
          }
        
      } else if(element.variants.length > 1) {

      } else {
        return false;
      }
    }
  };

  var solve3 = function(sudokuPuzzle, emptyCellsArray, index) {
    var eca;
    var element = emptyCellsArray[index];
    if(index == emptyCellsArray.length) {
      return sudokuPuzzle;
    } else {
      var values = emptyCellsArray[index].variants;
      var result;
      for(let i = 0; i < values.length; i++) {
        sudokuPuzzle[element.row][element.column] = values[i];
        eca = [];
        emptyCellsArray.forEach(el => {
          eca.push({row : el.row, column : el.column, square : el.square, variants : el.variants.slice()});
        });
        eca.forEach(el => {
          if(el.row == element.row || el.column == element.column || el.square == element.square) {
            let index = el.variants.indexOf(values[i]);
            if(index != -1) {
              el.variants.splice(index, 1);
            }
          }
        });
        result = solve3(sudokuPuzzle, eca, index+1);
        if(result) {
          return sudokuPuzzle;
        }
        sudokuPuzzle[element.row][element.column] = 0;
      }
    }
  }
  //solvedSudoku = solve3(matrix, emptyCellsArray, 0);

  var solve4 = function(sudokuPuzzle, emptyCellsArray, index) {
    if(index == emptyCellsArray.length) {
      return sudokuPuzzle;
    } else {
      var element = emptyCellsArray[index];
      var values = [];
      var rowOffset = element.row * 9;
      var sqIndexStart = (element.row - element.row%3)*9 + (element.column - element.column%3);
      for(var i = 0; i < 9; i++) {
        values.push(mMatrix[rowOffset + i]);
        values.push(mMatrix[9*i + element.column]);
        sqIndex = sqIndexStart + (i - i%3)*3 + i%3;
        values.push(mMatrix[sqIndex]);
        //console.log(mMatrix[rowOffset + i] + ' ' + mMatrix[9*i + element.column] + ' ' + mMatrix[sqIndex]);
      }
      var possibleValues = [];
      for(var k = 1; k < 10; k++) {
        if(values.indexOf(k) === -1) {
          possibleValues.push(k);
        }
      }
      var result;
      for(let i = 0; i < possibleValues.length; i++) {
        sudokuPuzzle[element.row * 9 + element.column] = possibleValues[i];
        result = solve4(sudokuPuzzle, emptyCellsArray, index+1);
        if(result) {
          return sudokuPuzzle;
        }
        sudokuPuzzle[element.row * 9 + element.column] = 0;
      }
    }
  }
  var sSudoku = solve4(mMatrix, emptyCellsArray, 0)
  if(Array.isArray(sSudoku)) {
    var solvedSudoku = [];
    for(let l = 0; l < 9; l++) {
      solvedSudoku.push(sSudoku.slice(l*9,(l+1)*9));
    }
    //console.log(solvedSudoku);
  }


  return solvedSudoku;
}
