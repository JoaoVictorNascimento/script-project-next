const fs = require("fs");

async function setupProject(projectName, run) {
  console.log(`🚀 Creating project: ${projectName}...\n`);
  
  // Create Next.js project
  run(`npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --no-src-dir --app --import-alias="@/*" --no-turbopack -y`);
  
  // Add project folder to .gitignore if not already present
  console.log('📝 Checking .gitignore...');
  const gitignorePath = '.gitignore';
  const gitignoreEntry = `\n# Dynamic project folder\n${projectName}/`;
  
  let shouldAdd = true;
  if (fs.existsSync(gitignorePath)) {
    const currentContent = fs.readFileSync(gitignorePath, 'utf8');
    if (currentContent.includes(projectName)) {
      shouldAdd = false;
      console.log('Project already in .gitignore, skipping...');
    }
  }
  
  if (shouldAdd) {
    fs.appendFileSync(gitignorePath, gitignoreEntry + '\n');
    console.log('Added project to .gitignore');
  }
  
  // Initialize shadcn
  console.log('\n🎨 Installing shadcn/ui and its dependencies...');
  run(`cd ${projectName} && npx shadcn@latest init -y --base-color=neutral`);
  
  // Add shadcn components
  console.log('\n📦 Adding commonly used shadcn components...');
  const shadcnComponents = [
    "button",
    "carousel",
    "accordion"
  ];
  
  shadcnComponents.forEach(component => {
    console.log(`Adding ${component} component...`);
    run(`cd ${projectName} && npx shadcn@latest add ${component} --yes`);
  });

  // Install additional dependencies
  console.log('\n📦 Installing additional dependencies...');
  run(`cd ${projectName} && npm install lucide-react`);
}

module.exports = { setupProject }; 