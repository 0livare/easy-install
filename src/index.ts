import path from 'node:path'
import {$} from 'bun'
import {parseArgs} from 'util'
import chalk from 'chalk'

type PackageManager = keyof typeof packageManagerInfos
const packageManagerInfos = {
  npm: {
    lockFileName: 'package-lock.json',
    installDeps: 'npm install',
    addNewDep: 'npm install',
    devDepFlag: '--save-dev',
  },
  yarn: {
    lockFileName: 'yarn.lock',
    installDeps: 'yarn install',
    addNewDep: 'yarn add',
    devDepFlag: '--dev',
  },
  pnpm: {
    lockFileName: 'pnpm-lock.yaml',
    installDeps: 'pnpm install',
    addNewDep: 'pnpm add',
    devDepFlag: '--save-dev',
  },
  bun: {
    lockFileName: 'bun.lockb',
    installDeps: 'bun install',
    addNewDep: 'bun add',
    devDepFlag: '--dev',
  },
}

const packageJsonPath = await findClosestPackageJson()
if (!packageJsonPath) {
  console.error(chalk.red('No package.json found'))
  process.exit(1)
}

const manager = await determinePackageManager(packageJsonPath)
if (!manager) {
  console.error(chalk.red('No lock file found'))
  process.exit(1)
}
const {packageManagerName, lockFilePath} = manager
console.info(
  chalk.gray(`Installing with ${packageManagerName}: ${lockFilePath}`),
)

const cli = parseCliArgs()
if (!cli.dependencies) {
  await shell(packageManagerInfos[packageManagerName].installDeps)
  process.exit(0)
}

let cmd = packageManagerInfos[packageManagerName].addNewDep
if (cli.dev) cmd += ' ' + packageManagerInfos[packageManagerName].devDepFlag
cmd += ' ' + cli.dependencies
await shell(cmd)

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

async function determinePackageManager(packageJsonPath: string) {
  for (const _name in packageManagerInfos) {
    const managerName = _name as PackageManager
    const {lockFileName} = packageManagerInfos[managerName]
    const lockFilePath = path.join(path.dirname(packageJsonPath), lockFileName)

    if (await Bun.file(lockFilePath).exists()) {
      return {packageManagerName: managerName, lockFilePath}
    }
  }
}

function parseCliArgs() {
  let args
  try {
    args = parseArgs({
      args: Bun.argv,
      options: {
        dependencies: {type: 'string'},
        dev: {type: 'boolean', short: 'D'},
      },
      strict: true,
      allowPositionals: true,
    })
  } catch (e: any) {
    console.error(chalk.red(e.message))
    process.exit(1)
  }

  const positionals = args.positionals.slice(2)
  if (positionals.length > 0 && !args.values.dependencies) {
    args.values.dependencies = positionals.join(' ')
  }

  return args.values
}

async function shell(cmd: string) {
  console.info(chalk.gray(`$ ${cmd}`))

  const fakeLiteral = [cmd] as unknown as TemplateStringsArray
  // @ts-expect-error
  fakeLiteral.raw = [cmd]

  return await $(fakeLiteral, [])
}
