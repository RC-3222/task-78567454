export class Calculator {
  constructor(
    currentOutput,
    currentOperator = '',
    currentRemValue = 0,
    operatorActive = false,
    newNumber = true,
    maxOutputLength = 14,
    equalCounter = 0
  ) {
    this.currentOperator = currentOperator

    this.currentRemValue = currentRemValue
    this.currentOutput = currentOutput

    this.operatorActive = operatorActive

    this.newNumber = newNumber

    this.maxOutputLength = maxOutputLength

    this.equalCounter = equalCounter

    this.memValue = null

    this.history = []
  }

  executeCommand(command) {
    command?.execute()
    this.history.push(command)
  }

  undoCommand() {
    this.history.pop()?.undo()
  }
}
