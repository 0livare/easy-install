import {objectKeys} from './utils'

const packageManagerDefs = {
  npm: {
    lockFileName: 'package-lock.json',
    installDepsCmd: 'npm install',
    addNewDepCmd: 'npm install',
    devDepFlag: '--save-dev',
  },
  yarn: {
    lockFileName: 'yarn.lock',
    installDepsCmd: 'yarn install',
    addNewDepCmd: 'yarn add',
    devDepFlag: '--dev',
  },
  pnpm: {
    lockFileName: 'pnpm-lock.yaml',
    installDepsCmd: 'pnpm install',
    addNewDepCmd: 'pnpm add',
    devDepFlag: '--save-dev',
  },
  bun: {
    lockFileName: 'bun.lockb',
    installDepsCmd: 'bun install',
    addNewDepCmd: 'bun add',
    devDepFlag: '--dev',
  },
} satisfies Record<string, Omit<PackageManagerDefinition, 'name'>>

export const packageManagerDefList: PackageManagerDefinition[] = objectKeys(
  packageManagerDefs,
).map((managerName) => ({
  name: managerName,
  ...packageManagerDefs[managerName],
}))

export type PackageManagerName = keyof typeof packageManagerDefs
export type PackageManagerDefinition = {
  name: PackageManagerName
  lockFileName: string
  installDepsCmd: string
  addNewDepCmd: string
  devDepFlag: string
}
