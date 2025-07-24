const fs = require("fs");

async function setupProject(projectName, run) {
  console.log(`🚀 Creating project: ${projectName}...\n`);
  
  // Create Next.js project
  run(`npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --no-src-dir --app --import-alias="@/*" --no-turbopack -y`);
  
  // Add project folder to .gitignore
  console.log('📝 Updating .gitignore...');
  fs.appendFileSync('.gitignore', `\n# Dynamic project folder\n${projectName}/\n`);
  
  // Initialize shadcn
  console.log('\n🎨 Installing shadcn/ui and its dependencies...');
  run(`cd ${projectName} && npx shadcn@latest init -y --base-color=neutral`);
  
  // Add shadcn components
  console.log('\n📦 Adding commonly used shadcn components...');
  const shadcnComponents = [
    "button",
    "carousel"
  ];
  
  shadcnComponents.forEach(component => {
    console.log(`Adding ${component} component...`);
    run(`cd ${projectName} && npx shadcn@latest add ${component} --yes`);
  });
}

module.exports = { setupProject }; 