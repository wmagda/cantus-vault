function organizeFile(title: string, composer: string, fileUrl: string): void {
  const config = getConfig();
  if (!config.rootFolderId) {
    Logger.log('ROOT_FOLDER_ID not configured. Skipping file organization.');
    return;
  }

  const fileId = extractFileId(fileUrl);
  if (!fileId) {
    Logger.log('Could not extract file ID from URL: ' + fileUrl);
    return;
  }

  const file = DriveApp.getFileById(fileId);
  const newName = title + ' - ' + composer + '.pdf';
  file.setName(newName);

  const composerFolder = getOrCreateComposerFolder(config.rootFolderId, composer);
  file.moveTo(composerFolder);

  Logger.log('Organized: ' + newName + ' -> ' + composer + '/');
}

function extractFileId(url: string): string | null {
  // Google Drive URLs come in several formats:
  //   https://drive.google.com/open?id=FILE_ID
  //   https://drive.google.com/file/d/FILE_ID/view
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (openMatch) return openMatch[1];

  const pathMatch = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (pathMatch) return pathMatch[1];

  return null;
}

function getOrCreateComposerFolder(
  rootFolderId: string,
  composer: string,
): GoogleAppsScript.Drive.Folder {
  const rootFolder = DriveApp.getFolderById(rootFolderId);
  const existing = rootFolder.getFoldersByName(composer);

  if (existing.hasNext()) {
    return existing.next();
  }

  return rootFolder.createFolder(composer);
}
