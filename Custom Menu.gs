function onOpen() {

  SpreadsheetApp.getUi()
    .createMenu('[ Custom Menu ]')
    .addItem('Hide Empty Columns', 'hideEmptyColumns')
    .addItem('unHide Empty Columns', 'unHideAllColumns')
    .addSeparator()
	.addItem('Initialize notification triggers', 'startNotificationTriggers')
	.addItem('Stop notification triggers', 'stopNotificationTriggers')    
    .addSeparator()
	.addItem('Send Saturday notifications', 'saturday')    
	.addItem('Send Sunday notifications', 'sunday')    
    .addSeparator()
	.addItem('Delete expired rows', 'deleteExpiredRows')    
	.addItem('Add new rows', 'addNewRow')    
    .addToUi();
    }