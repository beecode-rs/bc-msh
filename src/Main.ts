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
      { name: 'Git', value: 'Git' },
      { name: 'Clean', value: 'Clean' },
      { name: 'NPM', value: 'NPM' },
      { name: 'Pull Request', value: 'PR' },
    ] as ChoiceType[])
  }
}
