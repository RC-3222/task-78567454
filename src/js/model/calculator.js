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

    //this.history = []
  }

  executeCommand(Command, ...args) {
    const command = new Command(this, ...args)
    command?.execute()
    //this.history.push(command)
  }

  /*undoCommand() {
    this.history.pop()?.undo()
  }*/

  tryUpdateOutput(value) {
    this.currentOutput.value =
      (value > 0 && (value > Number.MAX_VALUE || value < Number.MIN_VALUE)) ||
      (value < 0 && (value > -Number.MIN_VALUE || value < -Number.MAX_VALUE))
        ? 'Error (Overflow)'
        : value
  }

  tryUpdateMemoryValue(value) {
    if (
      (value > 0 && (value > Number.MAX_VALUE || value < Number.MIN_VALUE)) ||
      (value < 0 && (value > -Number.MIN_VALUE || value < -Number.MAX_VALUE))
    )
      return
    this.memValue = value
  }
}
