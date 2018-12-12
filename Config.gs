// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - TODO
/* jshint asi: true */

(function() {"use strict"})()

// Code review all files - TODO
// JSHint review (see files) - TODO
// Unit Tests - TODO
// System Test (Dev) - TODO
// System Test (Prod) - TODO

// Config.gs
// =========
//
// All the constants and configuration settings

// Configuration
// =============

var SCRIPT_NAME = "PromotionStalls";
var SCRIPT_VERSION = "v1.7";

var PRODUCTION_VERSION_ = true;

// Log Library
// -----------

var DEBUG_LOG_LEVEL_ = PRODUCTION_VERSION_ ? BBLog.Level.INFO : BBLog.Level.FINER
var DEBUG_LOG_DISPLAY_FUNCTION_NAMES_ = PRODUCTION_VERSION_ ? BBLog.DisplayFunctionNames.NO : BBLog.DisplayFunctionNames.NO

// Assert library
// --------------

var SEND_ERROR_EMAIL_ = PRODUCTION_VERSION_ ? true : false;
var HANDLE_ERROR_ = Assert.HandleError.THROW;
var ADMIN_EMAIL_ADDRESS_ = 'dev@cloudfire.media';

// Tests
// -----

var TEST_PROMOTIONS_SHEET_ID_ = '1VrtkuNDBQ47-QUkVKbi2vy_qjA0MCJSbwcZYV7XSNP0'; // Test Copy of Sunday Promotion Stalls Calendar (ar@cf)

var TEST_SEND_COC_EMAIL_   = true;
var TEST_SEND_STAFF_EMAIL_ = true;

var TEST_SEND_SMS_ = true;

if (PRODUCTION_VERSION_ && 
    (!TEST_SEND_COC_EMAIL_ ||
     !TEST_SEND_STAFF_EMAIL_ ||
     !TEST_SEND_SMS_)) {
  throw new Error('Test flags set in production mode')
}

// Constants/Enums
// ===============

var STALLS_SHEET_NAME_ = "Foyer + Atrium Promo Stalls";

// Function Template
// -----------------

/**
 *
 *
 * @param {Object} 
 *
 * @return {Object}
 */
/* 
function functionTemplate() {

  Log_.functionEntryPoint()
  
  

} // functionTemplate() 
*/