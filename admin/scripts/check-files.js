const fs = require("fs");
const path = require("path");

const requiredFiles = [
  "app/layout.tsx",
  "app/page.tsx",
  "app/docs/[slug]/page.tsx",
  "app/globals.css",
  "components/Header.tsx",
  "components/DocsLayout.tsx",
  "components/TOC.tsx",
  "content/user.mdx",
  "tailwind.config.js",
  "postcss.config.js",
  "next.config.js",
  "tsconfig.json",
  "package.json",
  "README.md",
];

const projectRoot = process.cwd();
let hasError = false;

console.log("🔍 Checking project structure...");

// Check required files
requiredFiles.forEach((file) => {
  const filePath = path.join(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing required file: ${file}`);
    hasError = true;
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

// Warn about index.tsx
if (
  fs.existsSync(path.join(projectRoot, "pages/index.tsx")) ||
  fs.existsSync(path.join(projectRoot, "src/pages/index.tsx"))
) {
  console.warn(
    "⚠️ Warning: Found pages/index.tsx. This project uses App Router, so this file might be ignored or cause conflicts."
  );
}

// Check for wrong extensions (simple heuristic)
const checkExtensions = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== "node_modules" && file !== ".next" && file !== ".git") {
        checkExtensions(fullPath);
      }
    } else {
      // Check if it looks like a component but has .js extension
      if (
        file.endsWith(".js") &&
        /^[A-Z]/.test(file) &&
        !file.includes("config")
      ) {
        console.warn(
          `⚠️ Warning: ${file} looks like a component but has .js extension. Consider using .tsx`
        );
      }
    }
  });
};

try {
  checkExtensions(projectRoot);
} catch (e) {
  // Ignore errors during extension check
}

if (hasError) {
  console.error(
    "\n❌ Project structure check failed. Please fix missing files."
  );
  process.exit(1);
} else {
  console.log("\n✅ Project structure check passed!");
}
