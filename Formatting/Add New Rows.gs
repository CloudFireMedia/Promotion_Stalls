function addNewRow_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(STALLS_SHEET_NAME_);
  sh.insertRowBefore(55);
  sh.getRange("A55").setFormula('=A54+7'); 
}