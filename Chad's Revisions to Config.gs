//// 34567890123456789012345678901234567890123456789012345678901234567890123456789
//
//// JSHint - TODO
///* jshint asi: true */
//
//(function() {"use strict"})()
//
//// Code review all files - TODO
//// JSHint review (see files) - TODO
//// Unit Tests - TODO
//// System Test (Dev) - TODO
//// System Test (Prod) - TODO
//
//// Config.gs
//// =========
////
//// All the constants and configuration settings
//
//// Configuration
//// =============
//
//var SCRIPT_NAME = "PromotionStalls"
//var SCRIPT_VERSION = "v1.5"
//
//var PRODUCTION_VERSION_ = true;
//
//// Log Library
//// -----------
//
//var DEBUG_LOG_LEVEL_ = PRODUCTION_VERSION_ ? BBLog.Level.INFO : BBLog.Level.FINER
//var DEBUG_LOG_DISPLAY_FUNCTION_NAMES_ = PRODUCTION_VERSION_ ? BBLog.DisplayFunctionNames.NO : BBLog.DisplayFunctionNames.NO
//
//// Assert library
//// --------------
//
//var SEND_ERROR_EMAIL_ = PRODUCTION_VERSION_ ? true : false;
//var HANDLE_ERROR_ = Assert.HandleError.THROW;
//var ADMIN_EMAIL_ADDRESS_ = 'chcs.dev@gmail.com';
//
//// Tests
//// -----
//
//var TEST_SEND_COC_EMAIL_   = true;
//var TEST_SEND_STAFF_EMAIL_ = true;
//
//var TEST_SEND_SMS_ = true;
//
//var TEST_USE_LIVE_STAFF_DATA_ = true;
//
//if (PRODUCTION_VERSION_ && 
//    (!TEST_SEND_COC_EMAIL_ ||
//     !TEST_SEND_STAFF_EMAIL_ ||
//     !TEST_SEND_SMS_ ||
//     !TEST_USE_LIVE_STAFF_DATA_)) {
//  throw new Error('Test flags set in production mode')
//}
//
//// Constants/Enums
//// ===============
//
//// FILEPATH: ccn.comms@gmail.com ... 1.2.2 Sunday Promotion Stalls Calendar / ...
//var SUNDAY_PROMOTION_STALLS_CALENDAR_ID_ = '15D1U6VvxqXO4k6ebQX4U6oKyod3zxYNu0nuifThCEwA'; // Sunday Promotion Stalls Calendar.gsheet
//
//if (TEST_USE_LIVE_STAFF_DATA_) {
// // FILEPATH: ccn.comms@gmail.com ... 0.1.1 All Staff/ ...
//var STAFF_DATA_ID_ = "1iiFmdqUd-CoWtUjZxVgGcNb74dPVh-l5kuU_G5mmiHI"; // Staff Data.gsheet
//} else {
//// FILEPATH: chcs.dev@gmail.com ... 0.1.1 All Staff/ 
//var STAFF_DATA_TEST_ID_ = "1HEOWmNPo32uhR6N1XkviYiDM7KdAnaYycKDH9fz3OXE" // Staff Data_TEST.gsheet
//}
//
//var SMS_SENT_FROM_ = "(615) 398-6380";
//
//// Function Template
//// -----------------
//
///**
// *
// *
// * @param {Object} 
// *
// * @return {Object}
// */
///* 
//function functionTemplate() {
//
//  Log_.functionEntryPoint()
//  
//  
//
//} // functionTemplate() 
//*/