interface SongRecord {
  title: string;
  composer: string;
  season: string;
  language: string;
  pdfLink: string;
}

function getData(): SongRecord[] {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Form Responses 1');
  if (!sheet) return [];

  const data = sheet.getDataRange().getValues();
  const songs: SongRecord[] = [];

  // Skip header row
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const composerDropdown = String(row[2] || '').trim();
    const newComposer = String(row[3] || '').trim();
    const composer = newComposer || composerDropdown;
    const title = String(row[1] || '').trim();
    const pdfLink = String(row[6] || '').trim();

    if (!title) continue;

    songs.push({
      title,
      composer,
      season: String(row[4] || '').trim(),
      language: String(row[5] || '').trim(),
      pdfLink,
    });
  }

  songs.sort((a, b) => a.title.localeCompare(b.title, 'pl'));
  return songs;
}
