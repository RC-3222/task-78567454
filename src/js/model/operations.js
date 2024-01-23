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
  execute(calculator) {
    if (!numberValidation(calculator.currentValue, output.value)) return
    output.value = transformInt(
      Number(calculator.currentValue) + Number(output.value)
    )
  }
}

export class SubtractCommand extends Command {
  execute(calculator) {
    if (!numberValidation(calculator.currentValue, output.value)) return
    output.value = transformInt(
      calculator.equalCounter === 0
        ? Number(calculator.currentValue) - Number(output.value)
        : Number(output.value) - Number(calculator.currentValue)
    )
  }
}

export class MultiplyCommand extends Command {
  execute(calculator) {
    if (!numberValidation(calculator.currentValue, output.value)) return
    output.value = transformInt(
      Number(calculator.currentValue) * Number(output.value)
    )
  }
}

export class DivideCommand extends Command {
  execute(calculator) {
    if (!numberValidation(calculator.currentValue, output.value)) return
    if (Number(output.value) === 0) {
      output.value = 'Error'
    } else {
      output.value = transformInt(
        calculator.equalCounter === 0
          ? Number(calculator.currentValue) / Number(output.value)
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
    this.calculator.valueBeforeOperation.push(output.value)
    output.value = 0
    this.calculator.currentOperator = ''
    this.calculator.currentValue = 0
  }
}

export class SwitchSignCommand extends Command {
  execute(calculator) {
    if (!numberValidation(output.value)) return
    calculator.valueBeforeOperation.push(output.value)
    output.value = transformInt(output.value * -1)
  }
}

export class PercentCommand extends Command {
  execute(calculator) {
    if (!numberValidation(output.value)) return
    if (
      ['/', '*', ''].includes(calculator.currentOperator) ||
      calculator.operatorActive === true
    ) {
      output.value = transformInt(output.value / 100)
      calculator.valueBeforeOperation.push(output.value)
    } else {
      calculator.valueBeforeOperation.push(output.value)
      output.value = transformInt(
        (Number(calculator.currentValue) * Number(output.value)) / 100
      )
    }
  }
}
