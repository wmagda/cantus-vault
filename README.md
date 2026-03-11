# Cantus Vault — Polish Choir Sheet Music Library

A sheet music management system for the Polish choir at [Divine Mercy Church](https://milosierdzie.us/). Built entirely on Google Workspace (Forms, Sheets, Drive, Apps Script).

## What It Does

- **Upload**: Choir directors upload scanned sheet music PDFs via a Google Form
- **Organize**: Automation renames files and sorts them into composer folders on Google Drive
- **Search**: Choir members find music instantly through a mobile-friendly web app
- **Consistency**: Composer names are managed via an auto-updating dropdown

## Tech Stack

- Google Forms (upload interface)
- Google Sheets (metadata database)
- Google Drive (file storage)
- Google Apps Script (automation + web app)
- TypeScript + [clasp](https://github.com/google/clasp) (local development)

## Quick Start

### Prerequisites

- Node.js 18+
- A Google account with access to the church's Google Workspace

### Setup

1. Follow the full setup guide in [`docs/SETUP.md`](docs/SETUP.md) to create the Google Form, Sheet, and Drive folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Log in to clasp:

   ```bash
   npx clasp login
   ```

4. Copy the Apps Script project ID into `.clasp.json`.

5. Build and push:

   ```bash
   npm run push
   ```

6. Deploy the web app:

   ```bash
   npm run deploy
   ```

See [`docs/SETUP.md`](docs/SETUP.md) for detailed instructions including trigger setup and deployment configuration.

## Development

```bash
npm run watch    # Watch TypeScript files for changes
npm run build    # Compile TypeScript + copy HTML to build/
npm run push     # Build and push to Apps Script
npm run deploy   # Build, push, and create a new deployment
```

## Project Structure

```
src/
  appsscript.json      # Apps Script manifest (scopes, webapp config)
  Code.ts              # doGet() entry point, include() helper
  FormHandler.ts       # onFormSubmit trigger logic
  ComposerManager.ts   # Composer list sync + form dropdown update
  FileOrganizer.ts     # PDF rename + Drive folder organization
  WebApp.ts            # getData() for the search web app
  Index.html           # Web app page template
  Stylesheet.html      # Mobile-first CSS
  JavaScript.html      # Client-side search and rendering
docs/
  SETUP.md             # Step-by-step Google Workspace setup guide
```
