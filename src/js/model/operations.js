import { Command } from './command'

import { numberValidation, transformInt } from '../utils'

export class PowCommand extends Command {
  execute() {
    if (
      !numberValidation(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return
    this.calculator.currentOutput.value = transformInt(
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentRemValue) **
            Number(this.calculator.currentOutput.value)
        : Number(this.calculator.currentOutput.value) **
            Number(this.calculator.currentRemValue)
    )
  }
}

export class Pow2Command extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) ** 2
    )
  }
}

export class Pow3Command extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) ** 3
    )
  }
}

export class Pow10OfXCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      10 ** Number(this.calculator.currentOutput.value)
    )
  }
}

export class OneOfXCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      1 / Number(this.calculator.currentOutput.value)
    )
  }
}

export class Pow1OfYCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentRemValue) **
            (1 / Number(this.calculator.currentOutput.value))
        : Number(this.calculator.currentOutput.value) **
            (1 / Number(this.calculator.currentRemValue))
    )
  }
}

export class Pow1Of2Command extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) ** (1 / 2)
    )
  }
  /*undo() {
    Number(this.calculator.currentOutput.value) ** 2
  }*/
}

export class Pow1Of3Command extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) ** (1 / 3)
    )
  }
  /*undo() {
    Number(this.calculator.currentOutput.value) ** 3
  }*/
}

export class AddCommand extends Command {
  execute() {
    if (
      !numberValidation(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentRemValue) +
        Number(this.calculator.currentOutput.value)
    )
  }
  /*undo() {
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) -
        Number(this.calculator.currentRemValue)
    )
  }*/
}

export class SubtractCommand extends Command {
  execute() {
    if (
      !numberValidation(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return
    this.calculator.currentOutput.value = transformInt(
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentRemValue) -
            Number(this.calculator.currentOutput.value)
        : Number(this.calculator.currentOutput.value) -
            Number(this.calculator.currentRemValue)
    )
  }
  /*undo() {
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) +
        Number(this.calculator.currentRemValue)
    )
  }*/
}

export class MultiplyCommand extends Command {
  execute() {
    if (
      !numberValidation(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentRemValue) *
        Number(this.calculator.currentOutput.value)
    )
  }
  /*undo() {
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) /
        Number(this.calculator.currentRemValue)
    )
  }*/
}

export class DivideCommand extends Command {
  execute() {
    if (
      !numberValidation(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return
    if (Number(this.calculator.currentOutput.value) === 0) {
      this.calculator.currentOutput.value = 'Error'
      return
    }
    this.calculator.currentOutput.value = transformInt(
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentRemValue) /
            Number(this.calculator.currentOutput.value)
        : Number(this.calculator.currentOutput.value) /
            Number(this.calculator.currentRemValue)
    )
  }
  /*undo() {
    this.calculator.currentOutput.value = transformInt(
      Number(this.calculator.currentOutput.value) *
        Number(this.calculator.currentRemValue)
    )
  }*/
}

export class FactorialCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return

    if (this.calculator.currentOutput.value < 0) {
      this.calculator.currentOutput.value = 'Error'
      return
    }

    let res = 1
    const num = Number.parseInt(this.calculator.currentOutput.value)
    for (let i = 1; i <= num; i++) {
      res *= i
    }

    this.calculator.currentOutput.value = transformInt(res)
  }
}

export class ClearCommand extends Command {
  /*constructor(calculator) {
    super(calculator)
    this.prevValue = calculator.currentRemValue
    this.prevOperator = calculator.currentOperator
    this.prevOutputValue = this.calculator.currentOutput.value
  }*/

  execute() {
    this.calculator.currentOutput.value = 0
    this.calculator.currentOperator = ''
    this.calculator.currentRemValue = 0
  }

  /*undo() {
    this.calculator.currentOutput.value = this.prevOutputValue
    this.calculator.currentOperator = this.prevOperator
    this.calculator.currentRemValue = this.prevValue
  }*/
}

export class SwitchSignCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    this.calculator.currentOutput.value = transformInt(
      this.calculator.currentOutput.value * -1
    )
  }
}

export class PercentCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return
    if (
      !['+', '-'].includes(this.calculator.currentOperator) ||
      this.calculator.operatorActive === true
    ) {
      this.calculator.currentOutput.value = transformInt(
        this.calculator.currentOutput.value / 100
      )
    } else {
      this.calculator.currentOutput.value = transformInt(
        (Number(this.calculator.currentRemValue) *
          Number(this.calculator.currentOutput.value)) /
          100
      )
    }
  }
}

export class MemRemCommand extends Command {
  execute() {
    if (this.calculator.memValue == null) return false
    this.calculator.currentOutput.value = transformInt(this.calculator.memValue)
  }
}
export class MemPlusCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return

    if (!this.calculator.memValue) this.calculator.memValue = 0
    this.calculator.memValue = transformInt(
      this.calculator.memValue + Number(this.calculator.currentOutput.value)
    )
  }
}

export class MemMinusCommand extends Command {
  execute() {
    if (!numberValidation(this.calculator.currentOutput.value)) return

    if (this.calculator.memValue == null) this.calculator.memValue = 0
    this.calculator.memValue = transformInt(
      this.calculator.memValue - Number(this.calculator.currentOutput.value)
    )
  }
}

export class MemClearCommand extends Command {
  execute() {
    this.calculator.memValue = null
  }
}
