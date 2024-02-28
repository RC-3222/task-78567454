import { Errors } from '../constants'

export class Calculator {
  constructor(
    currentOutput,
    currentOperator = null,
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
  }

  executeCommand(Command, ...args) {
    const command = new Command(this, ...args)
    command?.execute()
  }

  tryUpdateOutput(value) {
    if (isNaN(value)) {
      this.currentOutput.value = Errors.Generic
      return
    }

    this.currentOutput.value =
      (value > 0 && (value > Number.MAX_VALUE || value < Number.MIN_VALUE)) ||
      (value < 0 && (value > -Number.MIN_VALUE || value < -Number.MAX_VALUE))
        ? Errors.Overflow
        : value
  }

  tryUpdateMemoryValue(value) {
    if (isNaN(value)) {
      return
    }

    if (
      (value > 0 && (value > Number.MAX_VALUE || value < Number.MIN_VALUE)) ||
      (value < 0 && (value > -Number.MIN_VALUE || value < -Number.MAX_VALUE))
    )
      return

    this.memValue = value
  }
}
