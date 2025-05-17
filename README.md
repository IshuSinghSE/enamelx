# EnamelX: Front-End and Backend Overview

## Tech Stack and Tools

EnamelX is built using a combination of modern technologies and tools to ensure a seamless and efficient user experience. The stack includes:

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **SHADCNUI**: Component library for building UI elements. ( Material UI, chakra ui, mantine ui, daisyui, etc)
- **Fabric.js**: JavaScript library for working with canvas and annotations.
- **Python**: Programming language used for backend development.
- **Flask**: Lightweight web framework for handling API requests.
- **Ultralytics**: Library/tool used for model-related functions.

---

## Folder Structure

- **Frontend**:
  - **.venv** : python Library & environment for backend
  - **Backend**: Code for backend ( model and python code)
- **Backend**:
  - **node_modules**: Required modules for frontend development
  - **src**: code for frontend (NEXT.js)
  - **public**: static assets for website (images, icons, illustration, etc)
  - **.next & .vscode**  are temporary folder created automatically while development

---

## Authorization Pages

- **Sign-In/Sign-Out Pages**:
  - `src/app/(auth)/signin` - Sign-In functionality.
  - `src/app/(auth)/signup` - Sign-Up functionality.

---

## Dashboard Components and Functionalities

All functionalities of the root dashboard are mapped within the **dashboard components folder**:

- Path: `enamelx/src/components/dashboard/`

### Key Functional Files:

- **`fileUtils.ts`**: File downloading and uploading.
- **`DiseasePanel.tsx`**: Right-side panel for selecting disease options.
- **`ImageViewer.tsx`**: Main Image Display canvas.
- **`InfoChart.tsx` and `InfoPieChart.tsx`**: Displayed charts.
- **`ViewerOptions.tsx`**: Left-side panel for annotations.
- **`canvasUtils.ts`**: Functionalities of actions in `ViewerOptions.tsx`.
- **`drawUtils.ts`**: Handles all annotation functionalities.
- **`mouseEvents.ts`**: Enables mouse-based interaction with the X-ray image on canvas.

---

## UI and Styling

### Main Pages:

- **Main Dashboard Page**:
  - Path: `src/app/(root)/dashboard/page.tsx` - Serves as the main page display.
  - This page imports all working components.

### Utility Components:

- **Global Styling**:
  - `favicon` → website Logo/Icon
  - `globals.css` → Tailwind CSS is used for styling.
- **Page Structuring**:
  - `layout.tsx` → Structuring the page.
  - `Page.tsx` → Landing page (currently under development).

---

## Hooks and Notifications

- Path: `src/components/hooks/use-toast.ts`
  Used for global functions like showing file upload or error notifications.

---

## Shared UI Components

UI elements downloaded from the **SHADCNUI library**, available via terminal installation:

- Path: `src/components/ui/`

### Reusable Components:

- **`ActionButton.tsx`**: Buttons used across various pages.
- **`AuthForm.tsx`**: Authorization page.
- **`ProfileDropDown.tsx`**: Dashboard profile picture icon.
- **`DiseaseSelect.tsx`**: Handles partial logic for disease selection.*Note: Props drilling is used instead of state management, which requires passing data across parent-child nodes.*
- **Headers**:
  - `Header.tsx` → Main page header.
  - `LandingPageHeader.tsx` → Landing page header.

---

## State Management

- Path: `src/contexts/ThemeProvider.tsx`
  State management is centralized here. Currently used for managing the dark-light theme.

---

## Utility Functions

- **Basic Utility Functions**:
  - Path: `src/lib/utils.ts`
  - Examples: Password hashing, data manipulation.

---

## Backend Overview

The backend includes two main files:

1. **`app.py`**: Handles backend logic.
2. **`requirements.txt`**: Specifies required libraries.

### Additional Notes:

- **`prediction.json`**: Used during testing (not mandatory).
- **`package.json`**: Platform-dependent file required during hosting.

### API Calls:

1. **Server Status**: Checks if the server or API routes are operational.
2. **Model Predictions**: Feeds data to the model and retrieves predictions.

---

## Automated Testing

- Path: `src/test`
  Used for automated testing (functionality exploration recommended).

---

## Static Media Assets

- Path: `public/images`
  Contains static media assets like logos, reusable during development.

---

## Root Configuration Files

Several configuration files in the root folder play key roles in maintaining project standards and functionality:

- **`prettierrc`**: Configures Prettier for code formatting.
- **`prettierignore`**: Ignore Prettier code formatting for these file.
- **`eslintrc.json`**: Lints JavaScript/TypeScript code for consistent styling and error prevention.
- **`eslintignore`**: Ignore Linting for specified files.
- **`.gitignore`**: Specifies intentionally untracked files to ignore.

**These files are automatically created**

- **`bun.lock`**: Dependency lock file for deterministic builds.
- **`package.json`**: Contains metadata, dependencies, and scripts for the project.
- **`postcss.config.js`**: Nextjs Configures PostCSS for processing CSS files.
- **`tailwind.config.ts`**: Configuration for customizing Tailwind CSS.
- **`tsconfig.json`**: TypeScript configuration file for defining compiler options.
- **`components.json`**: config file for ShadcnUI
- **`next.config.ts`**: config file for NEXT.js


Modification:

 **color of bounding box**: src/app/(root)/dashboard/page.ts [13-30]

opacity of bounding bo background : src/components/dashboard/ImageViewer.tsx [168] 
```javascript
 const opacity = 0.10 // ~33/255, similar to '22' hex, 
```
border or bounding box : src/components/dashboard/ImageViewer.tsx [178] 
```javascript
            strokeWidth: 2,
```
---
