# Hobbyist Decals Documentation Site

This is a standalone documentation website for Hobbyist Decals, built with Next.js 14 (App Router), MDX, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

- `/app`: Contains the App Router pages and layouts.
- `/components`: UI components like Header, Sidebar, etc.
- `/content`: MDX files containing the documentation content.
- `/scripts`: Utility scripts.

## Editing Content

To edit the User Guide, modify `content/user.mdx`. The site supports standard Markdown and MDX features.
- Use `##` for section headings (these will appear in the Table of Contents).
- Use standard markdown for lists, links, and code blocks.

## Building for Production

To create a production build:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

## Deployment

This project is ready to be deployed on Vercel.
1. Push code to GitHub.
2. Import project in Vercel.
3. Vercel will automatically detect Next.js and configure the build settings.
