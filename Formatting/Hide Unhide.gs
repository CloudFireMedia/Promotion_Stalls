function hideEmptyColumns_() {

    var ss = SpreadsheetApp.getActive(),
        sheet = ss.getSheetByName('Foyer + Atrium Promo Stalls'),
        startRow = 4,
        startColumn = 2,
        numberOfRows = sheet.getLastRow() + startRow,
        numberOfColumns = sheet.getMaxColumns() - startColumn,
        range = sheet.getRange(startRow, startColumn, numberOfRows, numberOfColumns),
        data = range.getValues();
                
    sheet.unhideColumn(range);

    for (var columnIndex = 0; columnIndex < numberOfColumns; columnIndex++) {
    
        // Get all the values in the column
        var values = data.map(function (v) {
            return v[columnIndex];
        });
    
        // Remove all the empty values
        var nonEmptyValues = values.filter(function (d) {
            return d.length && d[0] !== '';
        });
            
        // Hide any columns with no values in it    
        if (nonEmptyValues.length === 0) {
          sheet.hideColumns(columnIndex + startColumn);
        }
    }
}

function unHideAllColumns_() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var fullSheetRange = sheet.getRange(1,1,sheet.getMaxRows(), sheet.getMaxColumns() )  
  sheet.unhideColumn( fullSheetRange ); 
}  
