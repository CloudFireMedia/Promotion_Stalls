function addNewRow_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName("Foyer + Atrium Promo Stalls");
  sh.insertRowBefore(55);
  sh.getRange("A55").setFormula('=A54+7'); 
}

