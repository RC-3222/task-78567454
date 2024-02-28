import { Command } from './command'

import { isValidNumber, transformNumber } from '../utils'
import { Commands, Errors } from '../constants'

export class PowCommand extends Command {
  execute() {
    if (
      !isValidNumber(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return

    const num1 =
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentRemValue)
        : Number(this.calculator.currentOutput.value)
    const num2 =
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentOutput.value)
        : Number(this.calculator.currentRemValue)

    if (num1 < 0 && num2 < 1 && (1 / num2) % 2 === 0) {
      this.calculator.currentOutput.value = Errors.Generic
      return
    }

    this.calculator.tryUpdateOutput(
      transformNumber(
        (num1 > 0 ? num1 : -num1) ** num2 *
          (num1 < 0 && num2 % 2 !== 0 ? -1 : 1)
      )
    )
  }
}

export class Pow2Command extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    this.calculator.tryUpdateOutput(
      transformNumber(Number(this.calculator.currentOutput.value) ** 2)
    )
  }
}

export class Pow3Command extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    this.calculator.tryUpdateOutput(
      transformNumber(Number(this.calculator.currentOutput.value) ** 3)
    )
  }
}

export class Pow10OfXCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    this.calculator.tryUpdateOutput(
      transformNumber(10 ** Number(this.calculator.currentOutput.value))
    )
  }
}

export class OneOfXCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    if (this.calculator.currentOutput.value === 0) {
      this.calculator.currentOutput.value = Errors.Generic
      return
    }

    this.calculator.tryUpdateOutput(
      transformNumber(1 / Number(this.calculator.currentOutput.value))
    )
  }
}

export class Pow1OfYCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    const num1 =
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentRemValue)
        : Number(this.calculator.currentOutput.value)
    const num2 =
      this.calculator.equalCounter === 0
        ? Number(this.calculator.currentOutput.value)
        : Number(this.calculator.currentRemValue)

    if (num1 < 0 && num2 % 2 === 0) {
      this.calculator.currentOutput.value = Errors.Generic
      return
    }

    this.calculator.tryUpdateOutput(
      transformNumber(
        (num1 > 0 ? num1 : -num1) ** (1 / num2) *
          (num1 < 0 && (1 / num2) % 2 !== 0 ? -1 : 1)
      )
    )
  }
}

export class Pow1Of2Command extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    if (this.calculator.currentOutput.value < 0) {
      this.calculator.currentOutput.value = Errors.Generic
      return
    }

    this.calculator.tryUpdateOutput(
      transformNumber(Number(this.calculator.currentOutput.value) ** (1 / 2))
    )
  }
}

export class Pow1Of3Command extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    const num1 = Number(this.calculator.currentOutput.value)

    this.calculator.tryUpdateOutput(
      transformNumber(
        (num1 > 0 ? num1 : -num1) ** (1 / 3) * (num1 > 0 ? 1 : -1)
      )
    )
  }
}

export class AddCommand extends Command {
  execute() {
    if (
      !isValidNumber(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return

    this.calculator.tryUpdateOutput(
      transformNumber(
        Number(this.calculator.currentRemValue) +
          Number(this.calculator.currentOutput.value)
      )
    )
  }
}

export class SubtractCommand extends Command {
  execute() {
    if (
      !isValidNumber(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return

    this.calculator.tryUpdateOutput(
      transformNumber(
        this.calculator.equalCounter === 0
          ? Number(this.calculator.currentRemValue) -
              Number(this.calculator.currentOutput.value)
          : Number(this.calculator.currentOutput.value) -
              Number(this.calculator.currentRemValue)
      )
    )
  }
}

export class MultiplyCommand extends Command {
  execute() {
    if (
      !isValidNumber(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return

    this.calculator.tryUpdateOutput(
      transformNumber(
        Number(this.calculator.currentRemValue) *
          Number(this.calculator.currentOutput.value)
      )
    )
  }
}

export class DivideCommand extends Command {
  execute() {
    if (
      !isValidNumber(
        this.calculator.currentRemValue,
        this.calculator.currentOutput.value
      )
    )
      return

    if (Number(this.calculator.currentOutput.value) === 0) {
      this.calculator.currentOutput.value = Errors.Generic
      return
    }

    this.calculator.tryUpdateOutput(
      transformNumber(
        this.calculator.equalCounter === 0
          ? Number(this.calculator.currentRemValue) /
              Number(this.calculator.currentOutput.value)
          : Number(this.calculator.currentOutput.value) /
              Number(this.calculator.currentRemValue)
      )
    )
  }
}

export class FactorialCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    if (this.calculator.currentOutput.value < 0) {
      this.calculator.currentOutput.value = Errors.Generic
      return
    }

    let res = 1

    for (let i = 1; i <= +this.calculator.currentOutput.value; i++) {
      res *= i

      if (res >= Number.MAX_VALUE) {
        this.calculator.currentOutput.value = Errors.Overflow
        return
      }
    }

    this.calculator.currentOutput.value = transformNumber(res)
  }
}

export class ClearCommand extends Command {
  execute() {
    this.calculator.currentOutput.value = 0
    this.calculator.currentOperator = ''
    this.calculator.currentRemValue = 0
  }
}

export class SwitchSignCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    this.calculator.tryUpdateOutput(
      transformNumber(+this.calculator.currentOutput.value * -1)
    )
  }
}

export class PercentCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    if (
      ![Commands.Add, Commands.Subtract].includes(
        this.calculator.currentOperator
      ) ||
      this.calculator.operatorActive === true
    ) {
      this.calculator.tryUpdateOutput(
        transformNumber(this.calculator.currentOutput.value / 100)
      )
    } else {
      this.calculator.tryUpdateOutput(
        transformNumber(
          (Number(this.calculator.currentRemValue) *
            Number(this.calculator.currentOutput.value)) /
            100
        )
      )
    }
  }
}

export class MemRemCommand extends Command {
  execute() {
    if (this.calculator.memValue == null) return

    this.calculator.tryUpdateOutput(transformNumber(this.calculator.memValue))
  }
}
export class MemPlusCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    if (!this.calculator.memValue) this.calculator.memValue = 0

    this.calculator.tryUpdateMemoryValue(
      transformNumber(
        this.calculator.memValue + Number(this.calculator.currentOutput.value)
      )
    )
  }
}

export class MemMinusCommand extends Command {
  execute() {
    if (!isValidNumber(this.calculator.currentOutput.value)) return

    if (this.calculator.memValue == null) this.calculator.memValue = 0

    this.calculator.tryUpdateMemoryValue(
      transformNumber(
        this.calculator.memValue - Number(this.calculator.currentOutput.value)
      )
    )
  }
}

export class MemClearCommand extends Command {
  execute() {
    this.calculator.memValue = null
  }
}
