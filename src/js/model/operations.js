import { numberValidation, transformInt } from '../utils'
import { getOutput } from '../interface/output'

const output = getOutput()

export class Command {
  constructor(calculator) {
    this.calculator = calculator
  }

  execute() {}
}

export class AddCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentValue, output.value)) return
    output.value = transformInt(
      Number(this.calculator.currentValue) + Number(output.value)
    )
  }
}

export class SubtractCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentValue, output.value)) return
    output.value = transformInt(
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentValue) - Number(output.value)
        : Number(output.value) - Number(this.calculator.currentValue)
    )
  }
}

export class MultiplyCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentValue, output.value)) return
    output.value = transformInt(
      Number(this.calculator.currentValue) * Number(output.value)
    )
  }
}

export class DivideCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentValue, output.value)) return
    if (Number(output.value) === 0) {
      output.value = 'Error'
    } else {
      output.value = transformInt(
        this.calculator.equalCounter === 0
          ? Number(this.calculator.currentValue) / Number(output.value)
          : Number(output.value) / Number(calculator.currentValue)
      )
    }
  }
}

export class ClearCommand extends Command {
  constructor(calculator) {
    super(calculator)
    this.previousValue = calculator.currentValue
    this.previousOperator = calculator.currentOperator
    this.previousNewNumber = output.value
  }

  execute() {
    output.value = 0
    this.calculator.currentOperator = ''
    this.calculator.currentValue = 0
  }
}

export class SwitchSignCommand extends Command {
  execute() {
    if (!numberValidation(output.value)) return
    output.value = transformInt(output.value * -1)
  }
}

export class PercentCommand extends Command {
  execute() {
    if (!numberValidation(output.value)) return
    if (
      ['/', '*', ''].includes(this.calculator.currentOperator) ||
      this.calculator.operatorActive === true
    ) {
      output.value = transformInt(output.value / 100)
    } else {
      output.value = transformInt(
        (Number(this.calculator.currentValue) * Number(output.value)) / 100
      )
    }
  }
}
