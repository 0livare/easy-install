import path from 'node:path'
import chalk from 'chalk'
import {parseCliArgs} from './cli'
import {shell} from './shell'
import {
  packageManagerDefList,
  type PackageManagerDefinition,
} from './package-managers'
import {help, version} from './commands'

async function main() {
  const cli = parseCliArgs()

  if (cli.help) {
    help()
    process.exit(0)
  }
  if (cli.version) {
    version()
    process.exit(0)
  }

  const manager = await findClosestLockFile()
  if (!manager) {
    console.error(chalk.red('No lock file found'))
    process.exit(1)
  }

  console.info(
    chalk.gray(`Installing with ${manager.name}: ${manager.lockFilePath}`),
  )

  if (!cli.dependencies) {
    await shell(manager.installDepsCmd)
    process.exit(0)
  }

  let cmd = manager.addNewDepCmd
  if (cli.dev || cli['save-dev']) cmd += ' ' + manager.devDepFlag
  cmd += ' ' + cli.dependencies
  await shell(cmd)
}

await main()

//
// Helper Functions
//

type ManagerWithLockFile = PackageManagerDefinition & {lockFilePath: string}

async function findClosestLockFile(): Promise<ManagerWithLockFile | undefined> {
  let current = process.cwd()
  while (true) {
    const packageJsonPath = path.join(current, 'package.json')
    if (await Bun.file(packageJsonPath).exists()) {
      const manager = await determinePackageManager(packageJsonPath)
      if (manager) return manager
    }

    const parent = path.dirname(current)
    if (parent === current) break
    current = parent
  }
}

async function determinePackageManager(
  packageJsonPath: string,
): Promise<ManagerWithLockFile | undefined> {
  for (const manager of packageManagerDefList) {
    const lockFilePath = path.join(
      path.dirname(packageJsonPath),
      manager.lockFileName,
    )

    if (await Bun.file(lockFilePath).exists()) {
      return {...manager, lockFilePath}
    }
  }
}
