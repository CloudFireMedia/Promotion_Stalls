//Redevelopment note 1: Revise email to Director of Campus Operations accordingly (including new recipients)... 

//Hi {Campus Operations Coordinator}
//<br>cc {Resource Team Leader}, {Congregational Care Director}
//
//<br><br>Below is a summary of promotional stalls that have been reserved in the Foyer and/or Atrium for this Sunday morning.
//
//<br><br>{tableHTML}
    

//Redevelopment note 2: revise email to staff accordingly...

//Hi {recipient}
//
//<br><br>This is a courtesy reminder that {event} been reserved for this Sunday morning.
//
//<br><br>{tableHTL here} 
//
//<br><br>Please note: 
//
//<ul>
//<li>If promotion for your event includes print literature (i.e. sign-up sheets, tickets, handbills, etc.), you must bring these items with you. They will not be provided by the Facilities setup crew.
//<li>If you no longer need this promotion stall, please notify the {First Last Name of Campus Operations Coordinator} at {Campus Operations Coordinator Cell Phone Number} ASAP.
//<li>If you have any other questions, please contact {First Last Name of Communications Director} at {Comms Director Cell Phone Number}.
//</ul>

//Redevelopment note 3: create setup process to define the following variables...
// 


//Redevelopment note 3: See [email 1](https://share.polymail.io/v1/z/s/M3aQ4EPE6xVg4BpP/LR3tosPa9Fd8Xg9RUPt28olZBsnr_ZUIZFYvZUbH-bBVfx8pK82EovA0D99uLwGC7saxWpZXqQdVh5ECk3Ge98TmiYW2IyvHB-Y=) and [email 2](https://share.polymail.io/v1/z/s/asvroxLgewNsvcbr/4OivLuza93HmwYyVyqfiQOeSakFo5gWfNCk5TRzV71T7i_t5zOjjUln5fmqvvQPrum95SRdJwE6Xh6duL-SiN52DPkjLVoTDvo4=)

//1. Email 1 is the summary of events that triggered email 2
//2. Email 2 should not have 'Greg Brewer,Greg Brewer,Greg Brewer, Team Leader' in the cc field, only 'Greg Brewer, Team Leader'
//3. Doug Swilley should have received a second email for 'Kid's Camp', but only one email was sent (for 'VBS')


var cnnStaffDoc = "1iiFmdqUd-CoWtUjZxVgGcNb74dPVh-l5kuU_G5mmiHI";
var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15D1U6VvxqXO4k6ebQX4U6oKyod3zxYNu0nuifThCEwA/edit#gid=0";

function onOpen() {

	var ui = SpreadsheetApp.getUi();

	ui.createMenu('Utilities')
	.addItem('Initialize triggers', 'bol8')
	.addItem('Stop triggers', 'bol9')
	.addToUi();

}

function saturday() {
	SendReminder(true, false);
}

function sunday() {
	SendReminder(false, true);
}

function SendReminder(emailFlag, smsFlag) {
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = ss.getSheetByName('Foyer + Atrium Promo Stalls');
	var dataRange = sheet.getDataRange();
	var timeZone = ss.getSpreadsheetTimeZone();
	var values = dataRange.getValues();
	var stall = "";

	var thisSunday = getNextSunday('sunday', true);

	var regE = new RegExp('(.*)\n(.*)\n(.*)', 'ig');

	//Logger.log(thisSunday);

	var dco = getDCO();

	var staffToEmail = [];
	for (var i = 3; i < values.length; i++) {
		var row = "";
		if (i >= 3) {
			var dateColumn = values[i][0];

			if (Utilities.formatDate(dateColumn, timeZone, "yyyy-MM-dd") ==
				Utilities.formatDate(thisSunday, timeZone, "yyyy-MM-dd")) {

				//Logger.log(Utilities.formatDate(dateColumn, timeZone, "yyyy-MM-dd"))


				var cnnStaffList = getStaffFromMainSpreadsheet();
				//Logger.log(cnnStaffList)

				//var tableHTL = '<table style="border-collapse:collapse; border:1px solid #ddd; "><tr><th style="border:1px solid #ddd;  background-color:#d7d7d7; color:yellow;  padding: 15px;">' + values[1][0] + '</th>'
				var tableHTL = '<table style="border-collapse:collapse; border:1px solid #ddd; "><tr>'

					var rowHTL = '<tr>' //<td style="border:1px solid #ddd; padding: 15px;">' + Utilities.formatDate(dateColumn, timeZone, "yyyy-MM-dd") + '</td>'

					for (var j = 1; j < values[i].length; j++) {

						if (values[i][j] != "") {

							if (values[1][j] != "") {
								stall = values[1][j];
							}

							tableHTL = tableHTL + '<th style="border:1px solid #ddd; background-color:#4CAF50; color:white;  padding: 15px;">' + stall + " " + values[2][j] + '</th>';

							//Logger.log(values[i][j]);

							var strStr = values[i][j];

							var matches = strStr.match(regE);
							while (match = regE.exec(strStr)) {

								var evStr = match[1];
								var unk = match[2];
								var userStr = match[3];
								//Logger.log(match[0]);
								//Logger.log(evStr);
								//Logger.log(userStr);
							}

							rowHTL = rowHTL + '<td style="border:1px solid #ddd; padding: 15px;">' + evStr + '<br><b>' + unk + '</b><br>' + userStr + '</td>';

							//	var strNames = usersStr.split(";");

							//	var evStr = strNames[strNames.length - 1];
							//Logger.log(evStr);


							//	for (var l = 0; l < (strNames.length - 1); l++) {

							var staffNameFromSheet = userStr.trim();

							for (var k = 0; k < cnnStaffList.length; k++) {

								var nameFromCNN = ('' + cnnStaffList[k][0]).trim();

								if (staffNameFromSheet == nameFromCNN) {

									var row = cnnStaffList[k]
										row.push(evStr)
										staffToEmail.push(row);
									//Logger.log(row);

								}
							}
							//	}

						}
					}
					//Logger.log(staffToEmail);

					if (emailFlag == true) {
						if (dco.length == 2 && dco[1] != "") {

							var tableHTML = tableHTL + "</tr>" + rowHTL + "</tr></table>";

							//Logger.log(tableHTML);

							var subjectS = 'Summary: Foyer + Atrium Promotion Stalls';
							var bodyS = 'Hi {recipient}<br><br>Below is a summary of events have been reserved in the Foyer and/or Atrium this Sunday morning.<br><br>Details can be found <a href="{spreadsheetUrl}">here</a>.<br><br>';
							tableHTML + '<br><br>'
							bodyS = bodyS.replace("{recipient}", dco[0]);
							bodyS = bodyS.replace("{spreadsheetUrl}", spreadsheetUrl);
							bodyS = bodyS + tableHTML + '<br><br>';
							var objE = {
								name: "communications@ccnash.org",
								to: dco[1],
								subject: subjectS,
								htmlBody: bodyS
							}

							//Logger.log(objE.to)
							// objE.to = "ioana.prof@gmail.com"

							MailApp.sendEmail(objE);

						}
					}

			}
		}
	}

	// Logger.log(staffToEmail);
	sendMailToStaff(staffToEmail, emailFlag, smsFlag);
}

function sendMailToStaff(arrEmD, emailFlag, smsFlag) {

	// Logger.log(arrEmD)

	var uniqueEmail = [];
	var arrEm = []
	for (var i = 0; i < arrEmD.length; i++) {
		uniqueEmail.push(arrEmD[i][1]);
	}

	uniqueEmail = uniqueEmail.getUnique();

	for (var j = 0; j < uniqueEmail.length; j++) {
		// Name , email, isTL, team, phone, TL email, TL Name, event
		var row = ["", uniqueEmail[j], "", "", "", "", "", ""]
		for (var i = 0; i < arrEmD.length; i++) {
			if (uniqueEmail[j] == arrEmD[i][1]) {
				row[0] = arrEmD[i][0];
				row[4] = arrEmD[i][4];

				if (arrEmD[i][5] != "" && arrEmD[i][5] != undefined) {
					if (row[5] == "") {
						row[5] = arrEmD[i][5]
					} else {
						row[5] = row[5] + "," + arrEmD[i][5]
					}
				}

				if (arrEmD[i][6] != "" && arrEmD[i][6] != undefined) {

					if (row[6] == "") {
						row[6] = arrEmD[i][6]
					} else {
						row[6] = row[6] + "," + arrEmD[i][6]
					}
				}

				if (arrEmD[i][7] != "" && arrEmD[i][7] != undefined) {
					if (row[7] == "") {
						row[7] = arrEmD[i][7]
					} else {
						row[7] = row[7] + "," + arrEmD[i][7]
					}
				}

			}
		}
		arrEm.push(row);

	}
	//	Logger.log(arrEm)

	for (var i = 0; i < arrEm.length; i++) {

		var sName = arrEm[i][0];
		var sEmail = arrEm[i][1];
		var tEmail = arrEm[i][5];
		var tName = arrEm[i][6];
		var tPhone = arrEm[i][4];

		var eventSt = arrEm[i][7];

		if (('' + eventSt).indexOf(",") > 0) {

			var arrES = ('' + eventSt).split(",");
			arrES = arrES.getUnique();
			if (arrES.length > 1) {
				var nsEv = '"' + arrES[0] + '"';

				for (var g = 1; g < arrES.length; g++) {

					nsEv = nsEv + ' and "' + arrES[g] + '"';

				}

				eventSt = 'promotion stalls for ' + nsEv + ' have'
			} else {
				eventSt = arrES[0]
					eventSt = 'a promotion stall for "' + eventSt + '" has'
			}

		} else {

			eventSt = 'a promotion stall for "' + eventSt + '" has'

		}

		// Logger.log(eventSt)


		if (emailFlag == true && sEmail != "") {
			//Send Email Function
			var subject = 'Reminder: Promotion stall in foyer/atrium';
			var body = 'Hi {recipient}<br><br>This is a courtesy reminder that {event} been reserved in the Foyer and/or Atrium this Sunday morning. <br><br>Details can be found <a href="{spreadsheetUrl}">here</a>.<br><br>If you do NOT need this promotion stall, please notify Campus Operations ASAP.' //tried {infoURL} already

				if (tEmail != "") {
					body = body.replace("{recipient}", sName + "<br> cc " + tName + ", Team Leader");
				} else {

					body = body.replace("{recipient}", sName);
				}
				body = body.replace("{spreadsheetUrl}", spreadsheetUrl);
			body = body.replace("{event}", eventSt);

			var objE = {
				name: "communications@ccnash.org",
				to: sEmail,
				subject: subject,
				htmlBody: body
			}

			if (tEmail != "") {
				objE.cc = tEmail;
			}

			//	objE.to = "ioana.prof@gmail.com"

			MailApp.sendEmail(objE);
		}
		if (smsFlag == true && tPhone != "") {
			var bodySMS = 'Hi {recipient}, This is a courtesy reminder that {event} been reserved in the Foyer and/or Atrium this Sunday morning. If you do NOT need this promotion stall, please notify Campus Operations ASAP.';
			bodySMS = bodySMS.replace("{recipient}", sName);
			bodySMS = bodySMS.replace("{spreadsheetUrl}", spreadsheetUrl);
			bodySMS = bodySMS.replace("{event}", eventSt);
			//Logger.log(tPhone);
			sendSms(tPhone, bodySMS);
			// sendSms('+40767221111', bodySMS);
		}

	}
}

function getStaffFromMainSpreadsheet() {

	var staffFromSheet = [];

	var sp = SpreadsheetApp.openById(cnnStaffDoc);
	var sh = sp.getSheetByName('Staff');
	var data = sh.getDataRange().getValues();

	for (var i = 2; i < data.length; i++) {
		if (data[i][0] != "") {

			var phoneNumm = data[i][7];
			if (phoneNumm.length < 6) {
				phoneNumm = "";
			} else {
				var phoneNumm = '+1' + phoneNumm.replace(/-/g, '');
			}

			var isTeamLeader = data[i][12];
			var team = ('' + data[i][11]).trim().toUpperCase();
			var tLEmail = "";
			var tlName = ""

				if (('' + isTeamLeader).trim().toUpperCase() == "NO") {
					for (var j = 2; j < data.length; j++) {
						if (('' + data[j][11]).trim().toUpperCase() == team && ('' + data[j][12]).trim().toUpperCase() == "YES") {
							tLEmail = data[j][8];
							tlName = data[j][0] + ' ' + data[j][1];
							break;
						}
					}
				}

				staffFromSheet.push([data[i][0] + ' ' + data[i][1], data[i][8], data[i][12], data[i][11], phoneNumm, tLEmail, tlName]);
			// Name , email, isTL, team, phone, TL email, TL Name
		}
	}

	return staffFromSheet; ;
}

function getNextSunday(day, resetTime) {
	var dayIndex = 0;
	var returnDate = new Date();
	var returnDay = returnDate.getDay();
	while (dayIndex !== returnDay) {
		returnDate = new Date(returnDate.valueOf() + (1000 * 3600 * 24));
		returnDay = returnDate.getDay();
	}

	if (resetTime) {
		returnDate.setHours(0);
		returnDate.setMinutes(0);
		returnDate.setSeconds(0);
		returnDate.setMilliseconds(0);
	}
	return returnDate;
}

function sendSms(to, body) {
	var messages_url = "https://api.twilio.com/2010-04-01/Accounts/ACaa3afbcaac665e62f1fd38f670fe4acd/Messages.json";

	var payload = {
		"To": to,
		"Body": body,
		"From": "(615) 398-6380"
	};

	var options = {
		"method": "post",
		"payload": payload
	};

	options.headers = {
		"Authorization": "Basic " + Utilities.base64Encode("ACaa3afbcaac665e62f1fd38f670fe4acd:e3c6eb511b2e72cb9dd6bcf813c9f65c")
	};

	UrlFetchApp.fetch(messages_url, options);
}

function getDCO(staffTeam1) {
	var aDCO = [];

	var sp = SpreadsheetApp.openById(cnnStaffDoc);
	var sh = sp.getSheetByName('Staff');
	var data = sh.getDataRange().getValues();

	for (var i = 2; i < data.length; i++) {
		if (('' + data[i][4]).trim().toUpperCase() == "DIRECTOR OF CAMPUS OPERATIONS") {
			aDCO.push(data[i][0] + ' ' + data[i][1]);
			aDCO.push(data[i][8]);
			break;
		}
	}

	return aDCO;
}

function bol8() {
	var ui = SpreadsheetApp
		.getUi();

	var us = SpreadsheetApp
		.getActiveSpreadsheet()
		.getOwner();

	var email = Session
		.getActiveUser()
		.getEmail();

	if (us.getEmail() == email) {

		var ss = SpreadsheetApp.getActiveSpreadsheet();
		var triggers = ScriptApp.getUserTriggers(ss);

		for (var i = triggers.length - 1; i >= 0; i--) {

			if (triggers[i].getHandlerFunction() == 'saturday' || triggers[i].getHandlerFunction() == 'sunday') {
				ScriptApp.deleteTrigger(triggers[i]);
			}

		}

		ScriptApp.newTrigger('sunday')
		.timeBased()
		.onWeekDay(ScriptApp.WeekDay.SUNDAY)
		.atHour(6)
		.nearMinute(15)
		.create();

		ScriptApp.newTrigger('saturday')
		.timeBased()
		.onWeekDay(ScriptApp.WeekDay.SATURDAY)
		.atHour(11)
		.nearMinute(15)
		.create();

		var result = ui.alert(
				'Info',
				"Trigger was initiated successfully!", ui.ButtonSet.OK);

	} else {

		var result = ui.alert(
				'Error',
				"You don't have enough rights, please contact the owner!", ui.ButtonSet.OK);

	}

}

function bol9() {

	var ui = SpreadsheetApp
		.getUi();

	var us = SpreadsheetApp
		.getActiveSpreadsheet()
		.getOwner();

	var email = Session
		.getActiveUser()
		.getEmail();

	if (us.getEmail() == email) {

		var ss = SpreadsheetApp.getActiveSpreadsheet();
		var triggers = ScriptApp.getUserTriggers(ss);

		for (var i = triggers.length - 1; i >= 0; i--) {

			if (triggers[i].getHandlerFunction() == 'saturday' || triggers[i].getHandlerFunction() == 'sunday') {
				ScriptApp.deleteTrigger(triggers[i]);
			}

		}

		var result = ui.alert(
				'Info',
				"Trigger was stopped successfully!", ui.ButtonSet.OK);

	} else {

		var result = ui.alert(
				'Error',
				"You don't have enough rights, please contact the owner!", ui.ButtonSet.OK);

	}

}

Array.prototype.getUnique = function () {
	var hash = {},
	result = [],
	key;
	for (var i = 0, l = this.length; i < l; ++i) {
		key = JSON.stringify(this[i]);
		if (!hash.hasOwnProperty(key)) {
			hash[key] = true;
			result.push(this[i]);
		}
	}
	return result;
}

function debug() {
	sunday()
	//SendReminder(false, false);
}