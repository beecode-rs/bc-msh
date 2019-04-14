import { ChoiceType } from 'inquirer'
import { MainMenu } from 'src/MainMenu'
import { BaseMenu } from 'src/util/BaseMenu'
import { util } from 'src/util/index'

export abstract class SubMenu extends BaseMenu {
  private async mainMenu(): Promise<void> {
    await new MainMenu().run()
  }
  constructor(message: string, choices: ChoiceType[]) {
    super(message, choices, [{ name: 'Go Back', value: 'mainMenu' }])
  }

  public async run(preSelected?: string): Promise<void> {
    if (!global.config.cmd[`${this.constructor.name.toLowerCase()}Enabled`]) {
      util.log(`${this.constructor.name.toLowerCase()} command is disabled. Check config file [.msh]`)
      return
    }
    return super.run(preSelected)
  }
}
