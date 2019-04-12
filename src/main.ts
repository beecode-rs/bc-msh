import { ChoiceType } from 'inquirer'
import { MenuBase } from 'src/util/MenuBase'

// @ts-ignore
export class Main extends MenuBase {
  private async execute(command): Promise<void> {
    const clazz = require(`src/exec/${command}`) as any
    await new clazz().run()
  }
  constructor() {
    super('What do you want to do?', [
      { name: 'Git', value: 'git' },
      { name: 'Clean', value: 'clean' },
      { name: 'NPM', value: 'npm' },
      { name: 'Pull Request', value: 'pr' },
    ] as ChoiceType[])
  }
}
