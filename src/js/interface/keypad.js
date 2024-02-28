import {
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  ClearCommand,
  SwitchSignCommand,
  PercentCommand,
  PowCommand,
  Pow2Command,
  Pow3Command,
  OneOfXCommand,
  Pow1OfYCommand,
  Pow1Of2Command,
  Pow1Of3Command,
  Pow10OfXCommand,
  FactorialCommand,
  MemRemCommand,
  MemClearCommand,
  MemPlusCommand,
  MemMinusCommand,
  PressNumCommand,
} from '../model'

import { Commands } from '../constants'

function handleNumberClick(clickedNumber, calculator) {
  calculator.executeCommand(PressNumCommand, clickedNumber)
  calculator.newNumber = false
  calculator.operatorActive = false
}

const commandVariants = {
  [Commands.Add]: AddCommand,
  [Commands.Subtract]: SubtractCommand,
  [Commands.Multiply]: MultiplyCommand,
  [Commands.Divide]: DivideCommand,

  [Commands.Pow2]: Pow2Command,
  [Commands.Pow3]: Pow3Command,
  [Commands.PowY]: PowCommand,
  [Commands.Pow10OfX]: Pow10OfXCommand,

  [Commands.OneOfX]: OneOfXCommand,

  [Commands.Pow1Of2]: Pow1Of2Command,
  [Commands.Pow1Of3]: Pow1Of3Command,
  [Commands.Pow1OfY]: Pow1OfYCommand,

  [Commands.Factorial]: FactorialCommand,

  [Commands.MemClear]: MemClearCommand,
  [Commands.MemRem]: MemRemCommand,
  [Commands.MemPlus]: MemPlusCommand,
  [Commands.MemMinus]: MemMinusCommand,

  [Commands.SwitchSign]: SwitchSignCommand,
  [Commands.Percent]: PercentCommand,
  [Commands.Clear]: ClearCommand,
}

function operationsSwitch(calculator) {
  const outputBeforeOperation = calculator.currentOutput.value

  const NeededCommand = commandVariants[calculator.currentOperator]

  if (!NeededCommand) return

  calculator.executeCommand(NeededCommand)

  if (calculator.equalCounter === 0) {
    calculator.currentRemValue = outputBeforeOperation
  }
}

function handleDoubleOperatorClick(clickedOperator, calculator) {
  if (calculator.operatorActive === true) {
    calculator.currentRemValue = calculator.currentOutput.value
    calculator.currentOperator = clickedOperator
    return
  }

  if (calculator.currentOperator !== null) {
    operationsSwitch(calculator)
  }

  calculator.operatorActive = true
  calculator.currentRemValue = calculator.currentOutput.value
  calculator.currentOperator = clickedOperator
  calculator.newNumber = true
}

function handleSingleOperatorClick(clickedOperator, calculator) {
  const NeededCommand = commandVariants[clickedOperator]

  if (!NeededCommand) return

  calculator.executeCommand(NeededCommand)
}

export function initKeypad(calculator) {
  const calculatorKeyboard = document.querySelector('.calculator__keypad')

  calculatorKeyboard.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('key--number')) {
      handleNumberClick(ev.target.id, calculator)
    } else if (ev.target.classList.contains('key--operator--double-value')) {
      handleDoubleOperatorClick(ev.target.id, calculator)
      calculator.equalCounter = 0
    } else if (ev.target.classList.contains('key--operator--single-value')) {
      handleSingleOperatorClick(ev.target.id, calculator)
      calculator.newNumber = true
    } else
      switch (ev.target.id) {
        case Commands.Equal: {
          operationsSwitch(calculator)
          calculator.operatorActive = true
          calculator.newNumber = true
          calculator.equalCounter += 1
          break
        }
      }
  })
}
