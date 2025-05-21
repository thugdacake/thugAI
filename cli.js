#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { execSync } = require("child_process");

const srcDir = path.join(__dirname, "templates");
const destDir = process.cwd();

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function initializeGit() {
  try {
    execSync("git init", { stdio: "inherit" });
    execSync("git add .", { stdio: "inherit" });
    execSync('git commit -m "feat: Inicialização com Cérebro Operante"', { stdio: "inherit" });
    console.log(chalk.green("✅ Git inicializado com sucesso!"));
  } catch (error) {
    console.log(chalk.yellow("⚠️ Git não inicializado. Você pode inicializar manualmente depois."));
  }
}

function installDependencies() {
  try {
    console.log(chalk.blue("📦 Instalando dependências..."));
    execSync("npm install", { stdio: "inherit" });
    console.log(chalk.green("✅ Dependências instaladas com sucesso!"));
  } catch (error) {
    console.log(chalk.yellow("⚠️ Erro ao instalar dependências. Verifique o package.json."));
  }
}

console.log(chalk.green("🚀 Iniciando novo projeto com o Cérebro Operante..."));
copyRecursive(srcDir, destDir);
console.log(chalk.bold.green("✅ Estrutura do projeto criada!"));

initializeGit();
installDependencies();

console.log(chalk.bold.green("\n🎉 Projeto iniciado com sucesso!"));
console.log(chalk.blue("\nPróximos passos:"));
console.log("1. Configure suas variáveis de ambiente"));
console.log("2. Execute 'npm run dev' para iniciar o desenvolvimento"));
console.log("3. Consulte a documentação em docs/ para mais informações")); 