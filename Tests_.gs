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

function test_sms() {

    var to = '+447967142916'
    var body = 'test'
    var result = sendSms(to, body)
    return

    function sendSms(to, body) {
    
      if (!TEST_SEND_SMS_) {
        Log_.warning('SMS Send disabled. not sent to: ' + to + ', body: ' + body);
        return;
      }
    
      var smsSentFrom = Config.get('TWILIO_SMS_NUMBER');
      
      var payload = {
        "To": to,
        "Body": body,
        "From": smsSentFrom,
      };
      
      var options = {
        "method": "post",
        "payload": payload
      };
      
      options.headers = {
        "Authorization": "Basic " + Utilities.base64Encode("ACaa3afbcaac665e62f1fd38f670fe4acd:e3c6eb511b2e72cb9dd6bcf813c9f65c")
      };

      var messagesUrl = Config.get('TWILIO_SMS_URL');

      UrlFetchApp.fetch(messagesUrl, options);
//      Log_.info('SMS sent to: ' + to + ', body: ' + body);
        
    } // sendReminder_.sendMailToStaff.sendSms()
 }
