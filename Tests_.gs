function test_init() {
  Assert.init({
    handleError:    HANDLE_ERROR_, 
    sendErrorEmail: false, 
    emailAddress:   ADMIN_EMAIL_ADDRESS_,
    scriptName:     SCRIPT_NAME,
    scriptVersion:  SCRIPT_VERSION, 
  })
  
  Log_ = BBLog.getLog({
    sheetId:              TEST_PROMOTIONS_SHEET_ID,
    level:                BBLog.Level.ALL, 
    displayFunctionNames: BBLog.DisplayFunctionNames.NO,
  })
}

function test_saturday() {
  test_init()
  saturday_()
}
