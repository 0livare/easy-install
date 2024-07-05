export type PackageManagerName = 'npm' | 'yarn' | 'pnpm' | 'bun'

export const packageManagerDefs: PackageManagerDefinition[] = [
  {
    name: 'npm',
    lockFileName: 'package-lock.json',
    installDeps: 'npm install',
    addNewDep: 'npm install',
    devDepFlag: '--save-dev',
  },
  {
    name: 'yarn',
    lockFileName: 'yarn.lock',
    installDeps: 'yarn install',
    addNewDep: 'yarn add',
    devDepFlag: '--dev',
  },
  {
    name: 'pnpm',
    lockFileName: 'pnpm-lock.yaml',
    installDeps: 'pnpm install',
    addNewDep: 'pnpm add',
    devDepFlag: '--save-dev',
  },
  {
    name: 'bun',
    lockFileName: 'bun.lockb',
    installDeps: 'bun install',
    addNewDep: 'bun add',
    devDepFlag: '--dev',
  },
]

export type PackageManagerDefinition = {
  name: PackageManagerName
  lockFileName: string
  installDeps: string
  addNewDep: string
  devDepFlag: string
}
