import { Answers, ChoiceType, Question } from 'inquirer'
import inquirer from 'inquirer'
import { Main } from 'src/Main'

export abstract class MenuBase {
  private name = 'menu'
  private type = 'list'
  private message = ''
  private menu: Question<Answers>

  private async execute(command): Promise<void> {
    await this[command]()
    this.run()
  }

  constructor(message: string, choices: ChoiceType[], exitChoices?: ChoiceType[]) {
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

  public async run(): Promise<void> {
    const answers = await inquirer.prompt(this.menu)
    const selected = answers[this.name]
    if (selected === 'exit') process.exit()
    if (selected === 'main') return new Main().run()
    this.execute(selected)
  }
}
