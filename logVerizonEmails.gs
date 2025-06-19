
function logVerizonEmails() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Emails") || SpreadsheetApp.getActiveSpreadsheet().insertSheet("Emails");
  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000); // change as per need

  const threads = GmailApp.search(`to:vz-alerts@verizon.com after:${Math.floor(oneHourAgo.getTime() / 1000)}`);

  threads.forEach(thread => {
    const messages = thread.getMessages();
    messages.forEach(message => {
      const date = message.getDate();
      if (date > oneHourAgo) {
        sheet.appendRow([
          date,
          message.getFrom(),
          message.getSubject(),
          message.getPlainBody().substring(0, 200)  // limit body length
        ]);
      }
    });
  });
}
