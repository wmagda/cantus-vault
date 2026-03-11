function getConfig() {
  const props = PropertiesService.getScriptProperties();
  return {
    rootFolderId: props.getProperty('ROOT_FOLDER_ID') || '',
    formId: props.getProperty('FORM_ID') || '',
  };
}

/**
 * Run this function once from the Apps Script editor to set configuration.
 * Alternatively, set these values manually in Project Settings > Script Properties.
 */
function setConfig() {
  const props = PropertiesService.getScriptProperties();
  props.setProperties({
    ROOT_FOLDER_ID: 'PASTE_YOUR_FOLDER_ID',
    FORM_ID: 'PASTE_YOUR_FORM_ID',
  });
}
