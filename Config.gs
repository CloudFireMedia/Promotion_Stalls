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
// Dev: AndrewRoberts.net
//
// All the constants and configuration settings

// Configuration
// =============

var SCRIPT_NAME = "PromotionStalls"
var SCRIPT_VERSION = "v1.1"

var PRODUCTION_VERSION_ = true

// Log Library
// -----------

var DEBUG_LOG_LEVEL_ = PRODUCTION_VERSION_ ? BBLog.Level.INFO : BBLog.Level.FINER
var DEBUG_LOG_DISPLAY_FUNCTION_NAMES_ = PRODUCTION_VERSION_ ? BBLog.DisplayFunctionNames.NO : BBLog.DisplayFunctionNames.YES

// Assert library
// --------------

var SEND_ERROR_EMAIL_ = PRODUCTION_VERSION_ ? true : false
var HANDLE_ERROR_ = Assert.HandleError.THROW
var ADMIN_EMAIL_ADDRESS_ = 'andrewr1969@gmail.com'

// Tests
// -----

var TEST_SEND_COC_EMAIL_ = true;
var TEST_SEND_STAFF_EMAIL_ = true;

var TEST_SEND_SMS_ = true;

var TEST_USE_LIVE_STAFF_DATA = true;

// Constants/Enums
// ===============

if (TEST_USE_LIVE_STAFF_DATA) {
  var CNN_STAFF_SHEET_ID_ = "1iiFmdqUd-CoWtUjZxVgGcNb74dPVh-l5kuU_G5mmiHI"; // live
} else {
  var CNN_STAFF_SHEET_ID_ = "1Ard4lE_DgXw7O8ijp4KPkFZ8-Csq1rmSSowIJTJKU5g"; // AJR Copy of CCN Staff Data Sheet (chcs.dev)
}

var SMS_SENT_FROM_ = "(615) 398-6380";

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