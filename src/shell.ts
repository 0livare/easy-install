import {$} from 'bun'
import chalk from 'chalk'

export async function shell(cmd: string) {
  console.info(chalk.gray(`$ ${cmd}`))

  const fakeLiteral = [cmd] as unknown as TemplateStringsArray
  // @ts-expect-error
  fakeLiteral.raw = [cmd]

  return await $(fakeLiteral, [])
}
