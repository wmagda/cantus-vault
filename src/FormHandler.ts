function onFormSubmit(e: GoogleAppsScript.Events.SheetsOnFormSubmit): void {
  try {
    const row = e.values;
    Logger.log('Form submission received. Raw values: ' + JSON.stringify(row));

    const fields = parseFormRow(row);
    Logger.log('Parsed fields: ' + JSON.stringify(fields));

    const composer = fields.newComposer || fields.composerDropdown;

    if (!fields.title || !composer) {
      Logger.log('Missing title or composer — skipping file organization.');
    } else if (fields.fileUrl) {
      try {
        organizeFile(fields.title, composer, fields.fileUrl);
      } catch (fileError) {
        Logger.log('Error organizing file (continuing to sync composers): ' + fileError);
      }
    } else {
      Logger.log('No file URL found in submission.');
    }

    syncComposers();
  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error);
  }
}

function parseFormRow(row: string[]): {
  title: string;
  composerDropdown: string;
  newComposer: string;
  season: string;
  language: string;
  fileUrl: string;
} {
  // Column order depends on form field order.
  // Expected: Timestamp, Title, Composer (Existing), New Composer, Season, Language, File Upload
  // But the actual order may vary — log the raw values above to verify.
  return {
    title: (row[1] || '').trim(),
    composerDropdown: (row[2] || '').trim(),
    newComposer: (row[3] || '').trim(),
    season: (row[4] || '').trim(),
    language: (row[5] || '').trim(),
    fileUrl: (row[6] || '').trim(),
  };
}
