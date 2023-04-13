import path from "path";
import fs from "fs";
import chalk from "chalk";

export function createPage(pageName) {
  const pageNameUpper =
    pageName[0].toUpperCase() + pageName.substring(1) + "Page";

  const pagePath = path.join(process.cwd(), "src/pages", pageNameUpper);

  fs.mkdirSync(pagePath, { recursive: true });
  fs.writeFileSync(
    path.join(pagePath, `index.jsx`),
    `import React from 'react';\n\nfunction ${pageName}() {\n  return (\n    <div>\n      <h1>${pageName}</h1>\n    </div>\n  );\n}\n\nexport default ${pageName};\n`
  );
  console.log(chalk.green(`Component ${pagePath} created successfully.`));
}
