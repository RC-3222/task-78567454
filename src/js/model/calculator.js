export class Calculator {
  constructor(
    currentOperator,
    currentValue,
    operatorActive,
    newNumber,
    maxOutputLength,
    equalCounter,
    command
  ) {
    this.currentOperator = currentOperator
    this.currentValue = currentValue

    this.operatorActive = operatorActive

    this.newNumber = newNumber

    this.maxOutputLength = maxOutputLength

    this.equalCounter = equalCounter

    this.valueBeforeOperation = []

    this.command = command
  }

  executeCommand(command) {
    command.execute(this)
  }
}
