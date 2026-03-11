function syncComposers(): void {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const responsesSheet = ss.getSheetByName('Form Responses 1');
  if (!responsesSheet) {
    Logger.log('Form Responses 1 sheet not found.');
    return;
  }

  const data = responsesSheet.getDataRange().getValues();
  const composerSet = new Set<string>();

  // Skip header row; columns: 0=Timestamp, 1=Title, 2=Composer, 3=New Composer
  for (let i = 1; i < data.length; i++) {
    const dropdown = String(data[i][2] || '').trim();
    const newComp = String(data[i][3] || '').trim();

    if (newComp) composerSet.add(newComp);
    if (dropdown) composerSet.add(dropdown);
  }

  const sorted = Array.from(composerSet).sort((a, b) =>
    a.localeCompare(b, 'pl'),
  );

  updateComposersSheet(ss, sorted);
  updateFormDropdown(sorted);
}

function updateComposersSheet(
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet,
  composers: string[],
): void {
  let sheet = ss.getSheetByName('Composers');
  if (!sheet) {
    sheet = ss.insertSheet('Composers');
  }

  sheet.clearContents();
  sheet.getRange(1, 1).setValue('Composer');

  if (composers.length > 0) {
    const values = composers.map((c) => [c]);
    sheet.getRange(2, 1, values.length, 1).setValues(values);
  }
}

function updateFormDropdown(composers: string[]): void {
  const config = getConfig();
  if (!config.formId) {
    Logger.log('FORM_ID not configured. Skipping dropdown update.');
    return;
  }

  if (composers.length === 0) {
    Logger.log('No composers to populate. Skipping dropdown update.');
    return;
  }

  const form = FormApp.openById(config.formId);
  const items = form.getItems();

  // The Composer dropdown is the second field (index 1)
  for (const item of items) {
    if (item.getTitle() === 'Composer (Existing)') {
      item.asListItem().setChoiceValues(composers);
      Logger.log('Updated composer dropdown with ' + composers.length + ' entries.');
      return;
    }
  }

  Logger.log('Could not find "Composer (Existing)" dropdown in form.');
}
