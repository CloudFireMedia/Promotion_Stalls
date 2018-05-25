function hideEmptyColumns_() {
  
  var ss = SpreadsheetApp.getActive(),
      sheet = ss.getSheetByName('Foyer + Atrium Promo Stalls'),
      startRow = 4,
      startColumn = 1,
      numberOfRows = 1,
      numberOfColumns = sheet.getMaxColumns() - startColumn,
      range = sheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns),
      row = range.getValues()[0];
  
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
