export class Command {
  constructor(calculator) {
    this.calculator = calculator
  }

  execute() {
    throw new Error("Method 'execute()' is not implemented for this command.")
  }
  undo() {
    throw new Error(`Method 'undo()' is not implemented for this command.`)
  }
}
