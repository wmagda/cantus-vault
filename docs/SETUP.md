# Setup Guide — Cantus Vault

This guide walks through creating all the Google Workspace resources and connecting them to the Apps Script code.

---

## 1. Create the Google Drive Folder

1. Go to [Google Drive](https://drive.google.com)
2. Click **New > Folder**
3. Name it: **Choir Music Library**
4. Open the folder. Copy the **folder ID** from the URL:
   ```
   https://drive.google.com/drive/folders/FOLDER_ID_HERE
   ```
   Save this ID — you will need it in step 6.

---

## 2. Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Rename it to: **Choir Music Catalog**
4. At the bottom, click the **+** tab to add a new sheet
5. Rename the new sheet tab to: **Composers**
6. In the Composers sheet, type `Composer` in cell **A1** as a header
7. Leave the default `Sheet1` tab as-is (the form will replace it with `Form Responses 1`)

---

## 3. Create the Google Form

1. Go to [Google Forms](https://forms.google.com)
2. Create a new blank form
3. Rename it to: **Polish Choir Music Upload**

### Add the following fields in order:

#### Field 1: Title
- Type: **Short answer**
- Required: **Yes**

#### Field 2: Composer (Existing)
- Type: **Dropdown**
- Required: **No**
- Add one placeholder option: `(Select composer)` — the automation will populate this list automatically
- Note: This dropdown will be updated automatically after each submission

#### Field 3: New Composer
- Type: **Short answer**
- Required: **No**
- Description: `Use this field if the composer is not in the dropdown above`

#### Field 4: Season
- Type: **Dropdown**
- Required: **Yes**
- Add these options exactly:
  ```
  Adwent
  Boże Narodzenie
  Wielki Post
  Wielkanoc
  Okres Zwykły
  Ślub
  Pogrzeb
  Maryjne
  Inne
  ```

#### Field 5: Language
- Type: **Dropdown**
- Required: **Yes**
- Add these options exactly:
  ```
  Polski
  Łacina
  Angielski
  Inny
  ```

#### Field 6: Upload Sheet Music
- Type: **File upload**
- Allow only specific file types: **PDF**
- Maximum number of files: **1**
- Maximum file size: **10 MB** (adjust as needed)

### Link the form to the spreadsheet:

1. In the form editor, click the **Responses** tab
2. Click the Google Sheets icon (or **Link to Sheets**)
3. Select **Select existing spreadsheet**
4. Choose the **Choir Music Catalog** spreadsheet you created in step 2
5. This creates a `Form Responses 1` sheet tab automatically

### Copy the Form ID:

The form ID is in the URL:
```
https://docs.google.com/forms/d/FORM_ID_HERE/edit
```
Save this ID — you will need it in step 6.

---

## 4. Open the Apps Script Project

1. Open the **Choir Music Catalog** spreadsheet
2. Go to **Extensions > Apps Script**
3. This opens the script editor for a container-bound Apps Script project
4. Copy the **Script ID** from the URL:
   ```
   https://script.google.com/macros/d/SCRIPT_ID_HERE/edit
   ```
   Or go to **Project Settings** (gear icon) and copy the Script ID from there.

---

## 5. Connect Clasp

1. In your terminal, navigate to the project directory:
   ```bash
   cd cantus-vault
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Log in to clasp (opens a browser for Google OAuth):
   ```bash
   npx clasp login
   ```

4. Open `.clasp.json` and replace `YOUR_SCRIPT_ID_HERE` with the Script ID from step 4:
   ```json
   {
     "scriptId": "paste-your-script-id-here",
     "rootDir": "build"
   }
   ```

5. Build and push the code:
   ```bash
   npm run push
   ```

6. Verify in the Apps Script editor that all files appear (Code.gs, FormHandler.gs, etc.)

---

## 6. Configure Script Properties

1. In the Apps Script editor, go to **Project Settings** (gear icon)
2. Scroll down to **Script Properties**
3. Add the following properties:

| Property        | Value                                    |
|-----------------|------------------------------------------|
| `ROOT_FOLDER_ID`| The Google Drive folder ID from step 1  |
| `FORM_ID`       | The Google Form ID from step 3          |

---

## 7. Set Up the Form Submit Trigger

1. In the Apps Script editor, click the **Triggers** icon (clock icon) in the left sidebar
2. Click **+ Add Trigger**
3. Configure:
   - **Choose which function to run**: `onFormSubmit`
   - **Choose which deployment should run**: `Head`
   - **Select event source**: `From spreadsheet`
   - **Select event type**: `On form submit`
4. Click **Save**
5. Grant the required permissions when prompted

---

## 8. Deploy the Web App

1. In the Apps Script editor, click **Deploy > New deployment**
2. Click the gear icon next to **Select type** and choose **Web app**
3. Configure:
   - **Description**: `Choir Music Library`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Copy the **Web app URL** — this is the link you share with choir members

Alternatively, deploy via clasp:
```bash
npm run deploy
```

---

## 9. Share with Choir Members

Distribute the web app URL to choir members. They only need this one link to search and open sheet music.

The upload form URL should be shared only with people who upload music (e.g., the choir director).

---

## Troubleshooting

### "Authorization required" error
Re-run the trigger setup (step 7) and make sure you grant all requested permissions.

### Composer dropdown not updating
Check that the `FORM_ID` script property is set correctly. Open the Apps Script editor and run `syncComposers()` manually to test.

### Files not moving to the correct folder
Check that the `ROOT_FOLDER_ID` script property matches the Choir Music Library folder ID. Ensure the Google account running the script has edit access to that folder.

### Web app shows no songs
Make sure at least one form submission exists. Check that the `Form Responses 1` sheet has data.
