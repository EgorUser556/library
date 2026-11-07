# Library

A book search application built with vanilla JavaScript, CSS, and Webpack.

## Task

[Task requirements](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)

## How to run the app

### Prerequisites

- Node.js and npm installed.

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/EgorUser556/library.git
cd library
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will open at http://localhost:3000.

### Production build

Build the application:

```bash
npm run build
```

The production files will be generated in the `dist/` directory.

### Formatting

Format the project files with Prettier:

```bash
npm run format
```

## Project structure

```text
library/
├── src/
│   ├── api/           # API requests and search configuration
│   ├── assets/        # Static assets like SVG icons
│   ├── components/    # UI components and rendering logic
│   ├── store/         # Favorites state and persistence
│   ├── styles/        # Application styles
│   ├── theme/         # Theme switching logic
│   ├── utils/         # Search, filtering, and utility functions
│   └── main.js        # Application entry point
├── index.html         # HTML template
├── package.json       # Dependencies and npm scripts
├── webpack.config.cjs # Webpack configuration
└── .prettierrc.json   # Prettier configuration
```

