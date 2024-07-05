export type PackageManagerName = 'npm' | 'yarn' | 'pnpm' | 'bun'

export const packageManagerDefs: PackageManagerDefinition[] = [
  {
    name: 'npm',
    lockFileName: 'package-lock.json',
    installDepsCmd: 'npm install',
    addNewDepCmd: 'npm install',
    devDepFlag: '--save-dev',
  },
  {
    name: 'yarn',
    lockFileName: 'yarn.lock',
    installDepsCmd: 'yarn install',
    addNewDepCmd: 'yarn add',
    devDepFlag: '--dev',
  },
  {
    name: 'pnpm',
    lockFileName: 'pnpm-lock.yaml',
    installDepsCmd: 'pnpm install',
    addNewDepCmd: 'pnpm add',
    devDepFlag: '--save-dev',
  },
  {
    name: 'bun',
    lockFileName: 'bun.lockb',
    installDepsCmd: 'bun install',
    addNewDepCmd: 'bun add',
    devDepFlag: '--dev',
  },
]

export type PackageManagerDefinition = {
  name: PackageManagerName
  lockFileName: string
  installDepsCmd: string
  addNewDepCmd: string
  devDepFlag: string
}
