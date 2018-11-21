// 34567890123456789012345678901234567890123456789012345678901234567890123456789

// JSHint - TODO
/* jshint asi: true */

(function() {"use strict"})()

// PromotionStalls.gs
// ==================
//
// External interface to this script - all of the event handlers.
//
// This files contains all of the event handlers, plus miscellaneous functions 
// not worthy of their own files yet
//
// The filename is prepended with _API as the Github chrome extension won't 
// push a file with the same name as the project.

var Log_

// Public event handlers
// ---------------------
//
// All external event handlers need to be top-level function calls; they can't 
// be part of an object, and to ensure they are all processed similarily 
// for things like logging and error handling, they all go through 
// errorHandler_(). These can be called from custom menus, web apps, 
// triggers, etc
// 
// The main functionality of a call is in a function with the same name but 
// post-fixed with an underscore (to indicate it is private to the script)
//
// For debug, rather than production builds, lower level functions are exposed
// in the menu

var EVENT_HANDLERS_ = {

//                           Name                           onError Message                           Main Functionality
//                           ----                           ---------------                           ------------------

  saturday:                  ['saturday()',                  'Failed to run saturday notifications',   saturday_],
  sunday:                    ['sunday()',                    'Failed to run sunday notifications',     sunday_],
  startNotificationTriggers: ['startNotificationTriggers()', 'Failed to start notification triggers',  startNotificationTriggers_],
  stopNotificationTriggers:  ['stopNotificationTriggers()',  'Failed to stop notifications triggers',  stopNotificationTriggers_],
  hideEmptyColumns:          ['hideEmptyColumns()',          'Failed to hide empty columns',           hideEmptyColumns_],
  unHideAllColumns:          ['unHideAllColumns()',          'Failed to unHide all columns',           unHideAllColumns_],
  deleteExpiredRows:         ['deleteExpiredRows()',         'Failed to delete expired rows',          deleteExpiredRows_],
  addNewRow:                 ['addNewRow()',                 'Failed to add new row',                  addNewRow_],
}

function saturday()                   {return eventHandler_(EVENT_HANDLERS_.saturday)}
function sunday()                     {return eventHandler_(EVENT_HANDLERS_.sunday)}

function startNotificationTriggers()  {return eventHandler_(EVENT_HANDLERS_.startNotificationTriggers)}
function stopNotificationTriggers()   {return eventHandler_(EVENT_HANDLERS_.stopNotificationTriggers)}

function hideEmptyColumns()           {return eventHandler_(EVENT_HANDLERS_.hideEmptyColumns)}
function unHideAllColumns()           {return eventHandler_(EVENT_HANDLERS_.unHideAllColumns)}

function deleteExpiredRows()          {return eventHandler_(EVENT_HANDLERS_.deleteExpiredRows)}
function addNewRow()                  {return eventHandler_(EVENT_HANDLERS_.addNewRow)}

// Private Functions
// =================

// General
// -------

/**
 * All external function calls should call this to ensure standard 
 * processing - logging, errors, etc - is always done.
 */

function eventHandler_(config) {

  try {

    initialseEventHandler()
    
    var userEmail = Session.getEffectiveUser().getEmail()
    Log_.info('Handling ' + config[0] + ' from ' + (userEmail || 'unknown email') + ' (' + SCRIPT_NAME + ' ' + SCRIPT_VERSION + ')')
    
    // Call the main function
    return config[2]()
    
  } catch (error) {
  
    var assertConfig = {
      error:          error,
      userMessage:    config[1],
      log:            Log_,
      handleError:    Assert.HandleError.DISPLAY_FULL, 
      sendErrorEmail: SEND_ERROR_EMAIL_, 
      emailAddress:   ADMIN_EMAIL_ADDRESS_,
      scriptName:     SCRIPT_NAME,
      scriptVersion:  SCRIPT_VERSION, 
    }

    Assert.handleError(assertConfig)  
  }
  
  return
  
  // Private Functions
  // -----------------

  /**
   * Initialise the event handling
   */
 
  function initialseEventHandler() {
      
    var userEmail = Session.getEffectiveUser().getEmail()

    Log_ = BBLog.getLog({
      level:                DEBUG_LOG_LEVEL_, 
      displayFunctionNames: DEBUG_LOG_DISPLAY_FUNCTION_NAMES_,
    })

  } // eventHandler_.initialseEventHandler() 

} // eventHandler_()