//function saturday_() {sendReminder_(true, false)}
//function sunday_() {sendReminder_(false, true)}
//
//function sendReminder_(emailFlag, smsFlag) {
//
//  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  
//  if (ss === null && !PRODUCTION_VERSION_) {
//    ss = SpreadsheetApp.openById(SUNDAY_PROMOTION_STALLS_CALENDAR_ID_)
//  }
//  
//  var sheet = ss.getSheetByName('Foyer + Atrium Promo Stalls');
//  var dataRange = sheet.getDataRange();
//  var timeZone = ss.getSpreadsheetTimeZone();
//  var values = dataRange.getValues();
//  var stall = "";
//  
//  var thisSunday = getNextSunday('sunday', true);
//  
//  var regE = new RegExp('(.*)\n(.*)\n(.*)', 'ig');
//
//  var allStaff = SpreadsheetApp
//    .openById(STAFF_DATA_TEST_ID_)
//    .getSheetByName('Staff')
//    .getDataRange()
//    .getValues();
//    
//  var coc = getStaffMemberFromRole('CAMPUS OPERATIONS COORDINATOR');
//  var ccd = getStaffMemberFromRole('CONGREGATIONAL CARE DIRECTOR');
//  var cd  = getStaffMemberFromRole('COMMUNICATIONS DIRECTOR');
//  var dca  = getStaffMemberFromRole('DIRECTOR OF CAMPUS OPERATIONS');
//  
//  var rtl = getTeamLeader("RESOURCE TEAM");
//
//  var cnnStaffList = getStaffFromMainSpreadsheet();
//  var events = [];
//  
//  for (var i = 3; i < values.length; i++) {
//    
//    var row = "";
//    
//    var dateColumn = values[i][0];
//    
//    var nextDate = Utilities.formatDate(dateColumn, timeZone, "yyyy-MM-dd");
//    var thisSundayDate = Utilities.formatDate(thisSunday, timeZone, "yyyy-MM-dd");
//    
//    if (nextDate !== thisSundayDate) {
//      continue;
//    }
//      
//    var tableHTL = '<table style="border-collapse:collapse; border:1px solid #ddd; "><tr>'
//    
//    var rowHTL = '<tr>' 
//    
//    for (var j = 1; j < values[i].length; j++) {
//    
//      var nextValue = values[i][j]
//      
//      if (nextValue != "") {
//      
//        stall = getStall(j);
//        
//        tableHTL += 
//          '<th style="border:1px solid #000000; background-color:#d7d7d7; ' + 
//            'padding: 15px;">' + stall + " " + values[2][j] + '</th>';
//        
//        var strStr = values[i][j];
//        
//        var matches = strStr.match(regE);
//        
//        while (match = regE.exec(strStr)) {
//          var evStr = match[1];
//          var unk = match[2];
//          var userStr = match[3];
//        }
//        
//        rowHTL = 
//          rowHTL + 
//          '<td align="center" bgcolor="#ffff00" style="border:1px solid #000000; padding: 15px;">' + 
//          evStr + '<br><b>' + 
//          unk + '</b><br>' + 
//          userStr + 
//          '</td>';
//        
//        var staffNameFromSheet = userStr.trim();
//        
//        for (var k = 0; k < cnnStaffList.length; k++) {
//          
//          var nameFromCNN = ('' + cnnStaffList[k][0]).trim();
//          
//          if (staffNameFromSheet == nameFromCNN) {
//            
//            var row = cnnStaffList[k].slice(0);
//            row.push(evStr); // event
//            row.push(unk); // resource
//            row.push(stall + " " + values[2][j]); // stall
//            events.push(row);
//          }
//        }
//      }
//      
//    } // For each column
/////***
//    if (emailFlag) {
//      
//      if (coc.length == 3 && coc[1] != "") {
//        
//        var subjectCampusOperationsEmail = 'Summary: Foyer + Atrium Promotion Stalls';
//        
//        var bodyCampusOperationsEmail = 
//            '<tag-name style="white-space:pre"><p>{Campus Operations Coordinator}:<br>'                       + 
//                    'cc:&#9;{Resource Team Leader}, Resource Team Leader<br>'                                 +
//                       '&#9;{Congregational Care Director}, Congregational Care Director<br>'                 +
//                       '&#9;{Director of Campus Operations}, Director of Campus Operations</p> </style>'      + 
//              '<p>Below is a summary of promotional stalls that have been reserved in the Foyer and/or '      +
//              'Atrium for this Sunday morning.</p>'                                                           + 
//              '<p>{All Events HTML Table}</p>'                                                                +
//              '<p>Please note:</p>'                                                                           +  
//              '<ul>'                                                                                          + 
//              '<li>Campus Operations is responsible for providing'                                            +
//              '<span style="background-color: #FFFF00">only</span> the resources included '                   +
//              'in the table above (including 11"x17" signage, tables, banners, and/or other facilities '      +
//              'equipment. Team Leaders have been instructed that, if their stall includes print literature '  +
//              '(i.e. sign-up sheets, tickets, handbills, etc.) or other promotional assets, they or a member '+
//              'of their team must bring these items with them.'                                               +            
//              '<li>If you have any questions about setup for this Sunday, please contact '                    + 
//              '{First Last Name of Communications Director} at {Comms Director Cell Phone Number}.'           +
//              '</ul>';
//         
//        var cc = ''
//        
//        if (ccd[1] !== '') {
//          cc = ccd[1] + ((rtl[1] !== '' ? ',' : '') + rtl[1]);
//        } else {
//          cc = (rtl[1] !== '') ? rtl[1] : '';
//        }
//        
//        var allEventsHTMLTable = tableHTL + "</tr>" + rowHTL + "</tr></table>";
//
//        bodyCampusOperationsEmail = bodyCampusOperationsEmail.replace("{Campus Operations Coordinator}", coc[0]);
//        bodyCampusOperationsEmail = bodyCampusOperationsEmail.replace("{Congregational Care Director}", ccd[0]);
//        bodyCampusOperationsEmail = bodyCampusOperationsEmail.replace("{Resource Team Leader}", rtl[0]);
//        bodyCampusOperationsEmail = bodyCampusOperationsEmail.replace("{Director of Campus Operations}", dca[0]);
//        bodyCampusOperationsEmail = bodyCampusOperationsEmail.replace("{All Events HTML Table}", allEventsHTMLTable);
//        
//        var objE = {
//          name: "communications@ccnash.org",
//          to: coc[1],
//          cc: cc,
//          subject: subjectCampusOperationsEmail,
//          htmlBody: bodyCampusOperationsEmail
//        }
//        
//        if (TEST_SEND_COC_EMAIL_) {
//          MailApp.sendEmail(objE);
//          Log_.info('Sent reminder to ' + objE.to + '. Body: ' + bodyCampusOperationsEmail);
//        } else {
//          Log_.warning('COC Email disabled (not sent to ' + objE.to + ')');
//        }
//      }
//    }
//    
//  } // For each row in Promotion Stalls GSheet
// 
//  sendMailToStaff(events, emailFlag, smsFlag);
//
//  return 
//  
//  // Private Functions
//  // -----------------
//
//  /**
//   * Work back along row 2 to find the last stall room
//   *
//   * @param {number} lastColumnIndex 
//   */
//   
//  function getStall(lastColumnIndex) {
//  
//    var stall = '';
//    var cellIndex = lastColumnIndex;
//    var foundStall = false;
//    
//    while (!foundStall && cellIndex > 0) {
//    
//      if (values[1][cellIndex] !== "") {
//        stall = values[1][cellIndex];
//        foundStall = true;
//      }
//     
//      cellIndex--;
//    }
//
//    if (stall === '') {
//      throw new Error('Could not find stall room');
//    }
//
//    return stall;
//
//  } // sendReminder_.getStall()
//
//  /** 
//   * Send notifications (email or SMS out to staff)
//   *
//   * Go through the list of events and create a filtered list of staff to contact 
//   *
//   * @param {object} events
//   * @param {boolean} emailFlag
//   * @param {boolean} smsFlag
//   */
//  
//  function sendMailToStaff(events, emailFlag, smsFlag) {
//    
//    var uniqueEmail = [];
//    var staff = [];
//    
//    // Get an array of unique emails
//    
//    for (var i = 0; i < events.length; i++) {
//      uniqueEmail.push(events[i][1]);
//    }
//    
//    uniqueEmail = uniqueEmail.getUnique();
//    
//    // Get the event data for each of these staff members
//    
//    for (var j = 0; j < uniqueEmail.length; j++) {
//    
//      // Name , email, isTL, team, phone, TL email, TL Name, event, resources, stalls
//      var row = ["", uniqueEmail[j], "", "", "", "", "", "", "", ""]
//      
//      for (var i = 0; i < events.length; i++) {
//      
//        if (uniqueEmail[j] == events[i][1]) {        
//          row[0] = events[i][0]; // Name
//          row[4] = events[i][4]; // Cell         
//          row[5] = getField(row[5], events[i][5], false); // Team leader email
//          row[6] = getField(row[6], events[i][6], false); // Team leader name
//          row[7] = getField(row[7], events[i][7], true); // Event
//          row[8] = getField(row[8], events[i][8], true); // Resources          
//          row[9] = getField(row[9], events[i][9], true); // Stall                    
//        }
//      }
//      
//      staff.push(row.slice(0));     
//    }
//    
//    for (var i = 0; i < staff.length; i++) {
//      
//      var sName = staff[i][0];
//      var sEmail = staff[i][1];
//      var tEmail = staff[i][5];
//      var tName = staff[i][6];
//      var tPhone = staff[i][4];      
//      var eventNames = staff[i][7];
//      var resources = staff[i][8];
//      var stalls = staff[i][9];
//      
//      var eventSt;
//      
//      // Format the list of events nicely
//      
//      if (('' + eventNames).indexOf(",") > 0) {
//        
//        var arrES = ('' + eventNames).split(",");
//        arrES = arrES.getUnique();
//        
//        if (arrES.length > 1) {
//        
//          var nsEv = '"' + arrES[0] + '"';
//          
//          for (var g = 1; g < arrES.length; g++) {            
//            nsEv = nsEv + ' and "' + arrES[g] + '"';           
//          }
//          
//          eventSt = 'promotion stalls for ' + nsEv + ' have'
//          
//        } else {
//        
//          eventSt = arrES[0]
//          eventSt = 'a promotion stall for "' + eventSt + '" has'
//        }
//        
//      } else { // Just the one event
//      
//        eventSt = 'a promotion stall for "' + eventNames + '" has'    
//      }
//      
//      if (emailFlag && sEmail != "") {
//      
//        var subjectTeamLeaderEmail = 'Reminder: Promotion stall in foyer/atrium';
//                
//        var bodyTeamLeaderEmail = 
//          '<p>Hi {recipient},'                                                                     + 
//          '{team leader}</p>'                                                                      + 
//          '<p>This is a courtesy reminder that {event} been reserved for this Sunday morning.</p>' + 
//          '<p>{event table}</p>'                                                                   +
//          '<p>Please note:</p>'                                                                    +  
//          '<ul>'                                                                                   + 
//          '<li>If promotion for your event includes print literature (i.e. sign-up sheets, '       + 
//            'tickets, handbills, etc.), you must bring these items with you. They will not '       + 
//            'be provided by the Facilities setup crew.'                                            + 
//          '<li>If you no longer need this promotion stall, please notify '                         + 
//            '{First Last Name of Campus Operations Coordinator} at '                               + 
//            '{Campus Operations Coordinator Cell Phone Number} ASAP.'                              + 
//          '<li>If you have any other questions, please contact '                                   + 
//            '{First Last Name of Communications Director} at {Comms Director Cell Phone Number}.'  +
//          '</ul>'
//                
//        bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{recipient}", sName);
//        
//        if (tEmail !== "") {        
//          bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{team leader}", "<br/>cc: " + tName + ", Team Leader");
//        } else {
//          bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{team leader}", "");        
//        }
//        
//        var eventTable = getEventTableHtml(sName, eventNames, resources, stalls);
//        
//        bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{event}", eventSt);        
//        bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{First Last Name of Campus Operations Coordinator}", coc[0]);
//        bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{Campus Operations Coordinator Cell Phone Number}", coc[2]);
//        bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{First Last Name of Communications Director}", cd[0]);
//        bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{Comms Director Cell Phone Number}", cd[2]);
//        bodyTeamLeaderEmail = bodyTeamLeaderEmail.replace("{event table}", eventTable);
//
//        var objE = {
//          name: "communications@ccnash.org",
//          to: sEmail,
//          subject: subjectTeamLeaderEmail,
//          htmlBody: bodyTeamLeaderEmail
//        }
//        
//        if (tEmail != "") {
//          objE.cc = tEmail;
//        }
//
//        if (TEST_SEND_STAFF_EMAIL_) {
//          MailApp.sendEmail(objE);
//          Log_.info('Sent reminder to ' + objE.to + '. Body: ' + bodyTeamLeaderEmail);
//        } else {
//          Log_.warning('Staff Email disabled (not sent to ' + objE.to + ')');
//        }
//      }
//      
//      if (smsFlag && tPhone != "") {
//      
//        var sheetUrl = SpreadsheetApp.getActive().getUrl();
//      
//        var bodyTeamLeaderSMS = 
//          'Hi {recipient}, This is a courtesy reminder that {event} been reserved in '             + 
//            'the Foyer and/or Atrium for you this Sunday morning.'                                 + 
//            '%0a'                                                                                  +
//            '%0a'                                                                                  +
//            'Please remember that if promotion for your event includes print literature '          +
//            '(i.e. sign-up sheets, tickets, handbills, etc.), you MUST bring these items with '    + 
//            'you. They will not be provided by Communications or the Campus Operations Setup Crew.'+
//            '%0a'                                                                                  +
//            '%0a'                                                                                  +                                                            
//            'If you do not need the promotion stall(s) reserved for you, please notify '           + 
//            '{First Last Name of Campus Operations Coordinator} at '                               + 
//            '{Campus Operations Coordinator Cell Phone Number} now.'                               +
//            '%0a'                                                                                  +
//            '%0a'                                                                                  +
//            'Click this link ({Promo Stalls spreadsheet URL}) for more information.'
//            
//        bodyTeamLeaderSMS = bodyTeamLeaderSMS.replace("{recipient}", sName);
//        bodyTeamLeaderSMS = bodyTeamLeaderSMS.replace("{event}", eventSt);
//        bodyTeamLeaderSMS = bodyTeamLeaderSMS.replace("{First Last Name of Campus Operations Coordinator}", coc[0]);
//        bodyTeamLeaderSMS = bodyTeamLeaderSMS.replace("{Campus Operations Coordinator Cell Phone Number}", coc[2]);
//        bodyTeamLeaderSMS = bodyTeamLeaderSMS.replace("{Promo Stalls spreadsheet URL}", sheetUrl);        
//        sendSms(tPhone, bodyTeamLeaderSMS);
//      }      
//      
//    } // for each staff member
//    
//    return
//    
//    // Private Functions
//    // -----------------
//
//    function getField(oldValue, newValue, addSameValues) {
//
//      newValue = newValue.trim();
//      var returnValue = '';
//
//      if (newValue !== '' && typeof newValue !== 'undefined') { 
//        
//        if (oldValue === '') {
//        
//          // No old value so just return new one
//          returnValue = newValue;
//          
//        } else {
//        
//          // We have an old value ...
//        
//          if (oldValue.indexOf(newValue) === -1) {
//          
//            // ... but we don't already have this one so add it
//            returnValue = oldValue + "," + newValue;
//              
//          } else {
//          
//            // and we already have it ...
//
//            if (addSameValues) {
//            
//              // ... but add it anyway
//              returnValue = oldValue + "," + newValue;
//              
//            } else {
//
//              // ... so just use old value 
//              returnValue = oldValue;
//            }
//          }
//        }
//      }
//    
//      return returnValue;
//      
//    } // sendReminder_.getField()
//
//    function getEventTableHtml(name, events, resources, stalls) {
//    
//      var headerHTML = ''
//      var rowHTML = '' 
//      
//      // The event data comes in a series of comma separated lists, so convert in
//      // arrays
//      events = events.split(',');
//      resources = resources.split(',');
//      stalls = stalls.split(',');
//            
//      for (var eventIndex = 0; eventIndex < events.length; eventIndex++) {
//        
//        var event = events[eventIndex];
//        var resource = resources[eventIndex];
//        var stall = stalls[eventIndex];
//                  
//        headerHTML += 
//          '<th style="border:1px solid #000000; background-color:#d7d7d7; ' + 
//            'padding: 15px;">' + stall + '</th>';
//                  
//        rowHTML += 
//          '<td bgcolor="ffff00" align="center" style="border:1px solid #000000; padding: 15px;">' + event + '<br><b>' + 
//            resource + '</b><br>' + name + '</td>';        
//      }
//    
//      var tableHTML = 
//        '<table style="border-collapse:collapse; border:1px solid #ddd;">' + 
//        '<tr>' + headerHTML + '</tr>' + 
//        '<tr>' + rowHTML + '</tr>' + 
//        '</table>';    
//    
//      return tableHTML;
//    
//    } // sendReminder_.getEventTableHtml()
//
//    function sendSms(to, body) {
//    
//      if (!TEST_SEND_SMS_) {
//        Log_.warning('SMS Send disabled. not sent to: ' + to + ', body: ' + body);
//        return;
//      }
//    
//      var messages_url = "https://api.twilio.com/2010-04-01/Accounts/ACaa3afbcaac665e62f1fd38f670fe4acd/Messages.json";
//      
//      var payload = {
//        "To": to,
//        "Body": body,
//        "From": SMS_SENT_FROM_,
//      };
//      
//      var options = {
//        "method": "post",
//        "payload": payload
//      };
//      
//      options.headers = {
//        "Authorization": "Basic " + Utilities.base64Encode("ACaa3afbcaac665e62f1fd38f670fe4acd:e3c6eb511b2e72cb9dd6bcf813c9f65c")
//      };
//      
//      UrlFetchApp.fetch(messages_url, options);
//      Log_.info('SMS sent to: ' + to + ', body: ' + body);
//        
//    } // sendReminder_.sendMailToStaff.sendSms()
//    
//  } // sendReminder_.sendMailToStaff()
//  
//  function getStaffFromMainSpreadsheet() {
//  
//    var staffFromSheet = [];
//    
//    var sp = SpreadsheetApp.openById(STAFF_DATA_TEST_ID_);
//    var sh = sp.getSheetByName('Staff');
//    var data = sh.getDataRange().getValues();
//    
//    for (var i = 2; i < data.length; i++) {
//    
//      if (data[i][0] != "") {
//        
//        var phoneNumm = data[i][7];
//        
//        if (phoneNumm.length < 6) {
//          phoneNumm = "";
//        } else {
//          var phoneNumm = '+1' + phoneNumm.replace(/-/g, '');
//        }
//        
//        var isTeamLeader = data[i][12];
//        var team = ('' + data[i][11]).trim().toUpperCase();
//        var tLEmail = "";
//        var tlName = ""
//        
//        if (('' + isTeamLeader).trim().toUpperCase() == "NO") {
//        
//          for (var j = 2; j < data.length; j++) {
//          
//            if (('' + data[j][11]).trim().toUpperCase() == team && ('' + data[j][12]).trim().toUpperCase() == "YES") {
//              tLEmail = data[j][8];
//              tlName = data[j][0] + ' ' + data[j][1];
//              break;
//            }
//          }
//        }
//        
//        staffFromSheet.push([data[i][0] + ' ' + data[i][1], data[i][8], data[i][12], data[i][11], phoneNumm, tLEmail, tlName]);
//        // Name , email, isTL, team, phone, TL email, TL Name
//      }
//    }
//    
//    return staffFromSheet;
//      
//  } // sendReminder_.getStaffFromMainSpreadsheet()
//
//  function getNextSunday(day, resetTime) {
//    
//    var dayIndex = 0;
//    var returnDate = new Date();
//    var returnDay = returnDate.getDay();
//    
//    while (dayIndex !== returnDay) {
//      returnDate = new Date(returnDate.valueOf() + (1000 * 3600 * 24));
//      returnDay = returnDate.getDay();
//    }
//    
//    if (resetTime) {
//      returnDate.setHours(0);
//      returnDate.setMinutes(0);
//      returnDate.setSeconds(0);
//      returnDate.setMilliseconds(0);
//    }
//    
//    return returnDate;
//    
//  } // sendReminder_.getNextSunday()
//
//  /**
//   * @param {string} role
//   *
//   * @return {Array} [name, email, cell]
//   */
//
//  function getStaffMemberFromRole(role) {
//  
//    var staffMember = [];
//    
//    for (var i = 2; i < allStaff.length; i++) {
//      
//      if (('' + allStaff[i][4]).trim().toUpperCase() == role) {
//        
//        staffMember.push(allStaff[i][0] + ' ' + allStaff[i][1]); // First name = last name        
//        staffMember.push(allStaff[i][8]); // Email
//        staffMember.push(allStaff[i][7]); // Cell - Added after email,as it was already there        
//        break;
//      }
//    }
//  
//    return staffMember;
//      
//  } // sendReminder_.getStaffMemberFromRole()
//
//  /**
//   * @param {string} team
//   *
//   * @return {Array} [name, email, cell]
//   */
//
//  function getTeamLeader(team) {
//
//    var teamLeader = [];
//    team = team.trim().toUpperCase()
//    
//    for (var i = 2; i < allStaff.length; i++) {
//    
//      var nextTeam = ('' + allStaff[i][11]).trim().toUpperCase()
//      var isTeamLeader = ('' + allStaff[i][12]).trim().toUpperCase()
//      
//      if (nextTeam === team && isTeamLeader === 'YES') {
//      
//        teamLeader.push(allStaff[i][0] + ' ' + allStaff[i][1]); // First name = last name        
//        teamLeader.push(allStaff[i][8]); // Email
//        teamLeader.push(allStaff[i][7]); // Cell - Added after email,as it was already there        
//        break;
//      }
//    }
//  
//    return teamLeader;
//
//  } // sendReminder_.getTeamLeader()
//
//} // sendReminder_()
//
//function startNotificationTriggers_() {
//  
//  var ui = SpreadsheetApp.getUi();
//  var us = SpreadsheetApp.getActiveSpreadsheet().getOwner();
//  var email = Session.getActiveUser().getEmail();
//  
//  if (us.getEmail() === email) {
//    
//    var ss = SpreadsheetApp.getActiveSpreadsheet();
//    var triggers = ScriptApp.getUserTriggers(ss);
//    
//    for (var i = triggers.length - 1; i >= 0; i--) {
//      
//      if (triggers[i].getHandlerFunction() == 'saturday' || triggers[i].getHandlerFunction() == 'sunday') {
//        ScriptApp.deleteTrigger(triggers[i]);
//      }     
//    }
//    
//    ScriptApp.newTrigger('sunday')
//      .timeBased()
//      .onWeekDay(ScriptApp.WeekDay.SUNDAY)
//      .atHour(6)
//      .nearMinute(15)
//      .create();
//    
//    ScriptApp.newTrigger('saturday')
//      .timeBased()
//      .onWeekDay(ScriptApp.WeekDay.SATURDAY)
//      .atHour(11)
//      .nearMinute(15)
//      .create();
//    
//    var result = ui.alert(
//      'Info',
//      "Notification trigger was initiated successfully!", ui.ButtonSet.OK);
//    
//  } else {
//    
//    var result = ui.alert(
//      'Error',
//      "You don't have enough rights, please contact the owner!", ui.ButtonSet.OK);
//  }
//  
//} // startNotificationTriggers_()
//
//function stopNotificationTriggers_() {
//
//  var ui = SpreadsheetApp.getUi();
//  var us = SpreadsheetApp.getActiveSpreadsheet().getOwner();
//  var email = Session.getActiveUser().getEmail();
//  
//  if (us.getEmail() === email) {
//    
//    var ss = SpreadsheetApp.getActiveSpreadsheet();
//    var triggers = ScriptApp.getUserTriggers(ss);
//    
//    for (var i = triggers.length - 1; i >= 0; i--) {
//      if (triggers[i].getHandlerFunction() == 'saturday' || triggers[i].getHandlerFunction() == 'sunday') {
//        ScriptApp.deleteTrigger(triggers[i]);
//      }
//    }
//    
//    var result = ui.alert(
//      'Info',
//      "Trigger was stopped successfully!", ui.ButtonSet.OK);
//    
//  } else {
//    
//    var result = ui.alert(
//      'Error',
//      "You don't have enough rights, please contact the owner!", ui.ButtonSet.OK);
//  }
//
//} // stopNotificationTriggers_()
//
//Array.prototype.getUnique = function () {
//
//  var hash = {},
//      result = [],
//      key;
//      
//  for (var i = 0, l = this.length; i < l; ++i) {
//  
//    key = JSON.stringify(this[i]);
//    
//    if (!hash.hasOwnProperty(key)) {
//      hash[key] = true;
//      result.push(this[i]);
//    }
//  }
//  
//  return result;
//}