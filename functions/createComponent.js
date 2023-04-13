import path from "path";
import fs from "fs";

export function createComponent(componentName) {
  const componentPath = path.join(
    process.cwd(),
    "src/components/common",
    componentName
  );

  fs.mkdirSync(componentPath, { recursive: true });
  fs.writeFileSync(
    path.join(componentPath, `index.jsx`),
    `import React from 'react';\n\nfunction ${componentName}() {\n  return (\n    <div>\n      <h1>${componentName}</h1>\n    </div>\n  );\n}\n\nexport default ${componentName};\n`
  );
  console.log(chalk.green(`Component ${componentName} created successfully.`));
}
