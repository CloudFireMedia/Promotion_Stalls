function test_init() {
  
  Log_ = BBLog.getLog({
    sheetId:              TEST_PROMOTIONS_SHEET_ID_,
    level:                BBLog.Level.ALL, 
    displayFunctionNames: BBLog.DisplayFunctionNames.NO,
  })
}

function test_saturday() {
  test_init()
  saturday_()
}
