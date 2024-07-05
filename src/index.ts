import path from 'node:path'
import {$} from 'bun'
import chalk from 'chalk'

const packageManagers = {
  npm: {lockFileName: 'package-lock.json', installCommand: 'npm install'},
  yarn: {lockFileName: 'yarn.lock', installCommand: 'yarn install'},
  pnpm: {lockFileName: 'pnpm-lock.yaml', installCommand: 'pnpm install'},
  bun: {lockFileName: 'bun.lockb', installCommand: 'bun install'},
}
type PackageManager = keyof typeof packageManagers

const packageJsonPath = await findClosestPackageJson()
if (!packageJsonPath) {
  console.error(chalk.red('No package.json found'))
  process.exit(1)
}

const packageManagerName = await determinePackageManager(packageJsonPath)
if (!packageManagerName) {
  console.error(chalk.red('No lock file found'))
  process.exit(1)
}

const manager = packageManagers[packageManagerName]
console.info(chalk.gray(`$ ${manager.installCommand}`))
await $`${manager.installCommand}`

//
// Helper Functions
//

async function findClosestPackageJson(): Promise<string | undefined> {
  let current = process.cwd()
  while (true) {
    const packageJsonPath = path.join(current, 'package.json')
    if (await Bun.file(packageJsonPath).exists()) return packageJsonPath

    const parent = path.dirname(current)
    if (parent === current) break
    current = parent
  }
}

async function determinePackageManager(
  packageJsonPath: string,
): Promise<PackageManager | undefined> {
  for (const _name in packageManagers) {
    const managerName = _name as PackageManager
    const {lockFileName} = packageManagers[managerName]
    const lockFilePath = path.join(path.dirname(packageJsonPath), lockFileName)

    if (await Bun.file(lockFilePath).exists()) {
      console.info(chalk.gray(`Found lock file ${lockFilePath}`))
      return managerName
    }
  }
}
