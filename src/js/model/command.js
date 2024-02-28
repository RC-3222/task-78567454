export class Command {
  constructor(calculator) {
    this.calculator = calculator
  }

  execute() {
    throw new Error("Method 'execute()' is not implemented for this command.")
  }
}
