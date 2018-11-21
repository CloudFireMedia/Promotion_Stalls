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

//   :      [function() {},  '()',      'Failed to ', ],

var EVENT_HANDLERS_ = {

//                           Initial actions  Name                           onError Message                           Main Functionality
//                           ---------------  ----                           ---------------                           ------------------

  saturday:                  [function() {},  'saturday()',                  'Failed to run saturday notifications',   saturday_],
  sunday:                    [function() {},  'sunday()',                    'Failed to run sunday notifications',     sunday_],
  startNotificationTriggers: [function() {},  'startNotificationTriggers()', 'Failed to start notification triggers',  startNotificationTriggers_],
  stopNotificationTriggers:  [function() {},  'stopNotificationTriggers()',  'Failed to stop notifications triggers',  stopNotificationTriggers_],
  hideEmptyColumns:          [function() {},  'hideEmptyColumns()',          'Failed to hide empty columns',           hideEmptyColumns_],
  unHideAllColumns:          [function() {},  'unHideAllColumns()',          'Failed to unHide all columns',           unHideAllColumns_],
  deleteExpiredRows:         [function() {},  'deleteExpiredRows()',         'Failed to delete expired rows',          deleteExpiredRows_],
  addNewRow:                 [function() {},  'addNewRow()',                 'Failed to add new row',                  addNewRow_],
}

// function (arg)                     {return eventHandler_(EVENT_HANDLERS_., arg)}

function saturday (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.saturday, arg1, arg2, properties, lock)}
function sunday   (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.sunday, arg1, arg2, properties, lock)}

function startNotificationTriggers (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.startNotificationTriggers, arg1, arg2, properties, lock)}
function stopNotificationTriggers  (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.stopNotificationTriggers, arg1, arg2, properties, lock)}

function hideEmptyColumns (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.hideEmptyColumns, arg1, arg2, properties, lock)}
function unHideAllColumns (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.unHideAllColumns, arg1, arg2, properties, lock)}

function deleteExpiredRows (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.deleteExpiredRows, arg1, arg2, properties, lock)}
function addNewRow (arg1, arg2, properties, lock) {return eventHandler_(EVENT_HANDLERS_.addNewRow, arg1, arg2, properties, lock)}

// Private Functions
// =================

// General
// -------

/**
 * All external function calls should call this to ensure standard 
 * processing - logging, errors, etc - is always done.
 *
 * @param {Array} config:
 *   [0] {Function} prefunction
 *   [1] {String} eventName
 *   [2] {String} onErrorMessage
 *   [3] {Function} mainFunction
 
 * @param {Object}   arg1       The argument passed to the top-level event handler
 * @param {Object}   arg2       The argument passed to the top-level event handler
 * @param {Property} properties A PropertiesService
 * @param {Lock}     lock       A LockService
 */

function eventHandler_(config, arg1, arg2, properties, lock) {

  // Check the parameters

  if (typeof arg1 === 'undefined') {
    throw new Error('The first argument has to be defined or set to null')
  } 

  if (typeof arg2 === 'undefined') {
    throw new Error('The second argument has to be defined or set to null')
  } 

  try {

    properties.getProperties()
    
  } catch (error) {
  
    if (error.message.indexOf('Cannot call method "getProperties" of undefined') !== -1) {
    
      throw new Error('The third argument has to be one of the PropertiesServices')
      
    } else {
    
      throw error
    }
  }
  
  try {

    lock.hasLock()
    
  } catch (error) {
  
    if (error.message.indexOf('Cannot call method "hasLock" of undefined') !== -1) {
    
      throw new Error('The fourth argument has to be one of the LockService')
      
    } else {
    
      throw error
    }
  }

  // Perform the main functionality

  try {

    var originallyHasLock = lock.hasLock()

    // Perform any initial functions
    config[0]()    
    
    initialseEventHandler()
    
    var userEmail = Session.getEffectiveUser().getEmail()
    Log_.info('Handling ' + config[1] + ' from ' + (userEmail || 'unknown email') + ' (' + SCRIPT_NAME + ' ' + SCRIPT_VERSION + ')')
    
    // Call the main function
    return config[3](arg1, arg2)
    
  } catch (error) {
  
    var assertConfig = {
      error:          error,
      userMessage:    config[2],
      log:            Log_,
      handleError:    Assert.HandleError.DISPLAY_FULL, 
      sendErrorEmail: SEND_ERROR_EMAIL_, 
      emailAddress:   ADMIN_EMAIL_ADDRESS_,
      scriptName:     SCRIPT_NAME,
      scriptVersion:  SCRIPT_VERSION, 
    }

    Assert.handleError(assertConfig) 
    
  } finally {
  
    if (!originallyHasLock) {
      lock.releaseLock()
    }
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
      lock:                 lock,
    })

  } // eventHandler_.initialseEventHandler() 

} // eventHandler_()