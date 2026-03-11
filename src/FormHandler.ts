function onFormSubmit(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
  try {
    const row = e.values;
    // Column order from form: Timestamp, Title, Composer, New Composer, Season, Language, File Upload
    const title = (row[1] || '').trim();
    const composerDropdown = (row[2] || '').trim();
    const newComposer = (row[3] || '').trim();
    const fileUrl = (row[6] || '').trim();

    const composer = newComposer || composerDropdown;

    if (!title || !composer) {
      Logger.log('Missing title or composer — skipping file organization.');
      return;
    }

    if (fileUrl) {
      organizeFile(title, composer, fileUrl);
    } else {
      Logger.log('No file URL found in submission.');
    }

    syncComposers();
  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error);
  }
}
