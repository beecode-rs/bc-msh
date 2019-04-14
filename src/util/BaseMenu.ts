import { Answers, ChoiceType, Question } from 'inquirer'
import inquirer from 'inquirer'

export abstract class BaseMenu {
  private name = 'menu'
  private type = 'list'
  private message: string
  private menu: Question<Answers>

  private async execute(command): Promise<void> {
    await this[command]()
    if (global.exitAfterCommandExecuted) process.exit()
    await this.run()
  }

  protected constructor(message: string, choices: ChoiceType[], exitChoices?: ChoiceType[]) {
    if (message) this.message = message
    choices.push(new inquirer.Separator())
    for (const choice of exitChoices || []) choices.push(choice)
    choices.push({ name: 'Exit', value: 'exit' })
    this.menu = {
      type: this.type,
      name: this.name,
      message: this.message,
      choices: [...choices],
    } as Question<Answers>
  }

  public async run(preSelected?: string): Promise<void> {
    const selected = preSelected ? preSelected : (await inquirer.prompt(this.menu))[this.name]
    switch (selected) {
      case 'exit':
        process.exit()
        break
      default:
        await this.execute(selected)
    }
  }
}
