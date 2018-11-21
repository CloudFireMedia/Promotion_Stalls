function deleteExpiredRows_() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(STALLS_SHEET_NAME_);
  var datarange = sheet.getDataRange();
  var lastrow = datarange.getLastRow();
  var values = datarange.getValues(); // get all data in a 2D array
  
  var currentDate = new Date();
  var today = new Date();
  today.setDate(currentDate.getDate());
  
  for (var i = lastrow; i >= 4; i--) {
  
    var tempdate = values[i-1][0]; // arrays are 0 indexed so row1 = values[0] and col3 = [2]
    
    if(tempdate < today)  {
      sheet.deleteRows(i);
    }
  }
}
