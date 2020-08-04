import { ChoiceCollection } from 'inquirer'
import { BaseMenu } from 'src/util/BaseMenu'

// @ts-ignore
export class MainMenu extends BaseMenu {
  private async execute(command): Promise<void> {
    const clazz = require(`src/exec/${command}`) as any
    await new clazz().run()
  }
  constructor() {
    const menuItems: { name: string; value: string }[] = []
    if (global.config.cmd.gitEnabled) menuItems.push({ name: 'Git', value: 'Git' })
    if (global.config.cmd.cleanEnabled) menuItems.push({ name: 'Clean', value: 'Clean' })
    if (global.config.cmd.npmEnabled) menuItems.push({ name: 'NPM', value: 'NPM' })
    if (global.config.cmd.prEnabled) menuItems.push({ name: 'Pull Request', value: 'PR' })
    super('What do you want to do?', menuItems as ChoiceCollection)
  }
}
