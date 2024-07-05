import chalk from 'chalk'
import pkg from '../../package.json'

export function help() {
  console.info(pkg.description, '\n')
  console.info(
    `${chalk.bold('Usage:')} ${chalk.bold.green('in')} ${chalk.cyan('[flags]')} [...<pkg>]`,
  )
  console.info(`\n${chalk.bold('Flags:')}`)
  console.info(
    `  ${chalk.cyan('-D')}, ${chalk.cyan('--dev')} \t Install pkg as a dev dependency`,
  )
  console.info(`\n${chalk.bold('Examples:')}`)
  console.info(
    chalk.bold.green('  in'),
    '               ',
    chalk.gray('Install all project dependencies'),
  )
  console.info(
    chalk.bold.green('  in express'),
    '       ',
    chalk.gray('Add a project dependency'),
  )
  console.info(
    chalk.bold.green('  in --dev nodemon'),
    ' ',
    chalk.gray('Add a project DEV dependency'),
  )
}
