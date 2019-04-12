import { ChoiceType } from 'inquirer'
import { MenuBase } from 'src/util/MenuBase'

export abstract class SubMenu extends MenuBase {
  constructor(message: string, choices: ChoiceType[]) {
    super(message, choices, [{ name: 'Go Back', value: 'main' }])
  }
}
