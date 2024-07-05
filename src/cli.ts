import {parseArgs} from 'util'
import chalk from 'chalk'

export function parseCliArgs() {
  let args
  try {
    args = parseArgs({
      args: Bun.argv,
      options: {
        dependencies: {type: 'string'},
        dev: {type: 'boolean', short: 'D'},
        help: {type: 'boolean', short: 'h'},
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
