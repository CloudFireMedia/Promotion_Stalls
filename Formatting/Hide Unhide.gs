function hideEmptyColumns_() {
  
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName(STALLS_SHEET_NAME_);
  var startRow = 4;
  var startColumn = 1;
  var numberOfRows = 1;
  var numberOfColumns = sheet.getMaxColumns() - startColumn;
  var range = sheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns);
  var row = range.getValues()[0];
  
  sheet.unhideColumn(range);
  
  for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    
    if (row[columnIndex] === '') {
      sheet.hideColumns(columnIndex + startColumn);
    }
  }
}

function unHideAllColumns_() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var fullSheetRange = sheet.getRange(1,1,sheet.getMaxRows(), sheet.getMaxColumns() )  
  sheet.unhideColumn( fullSheetRange ); 
}  
