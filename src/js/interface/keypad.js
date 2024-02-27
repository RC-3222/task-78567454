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

function handleNumberClick(clickedNumber, calculator) {
  calculator.executeCommand(PressNumCommand, clickedNumber)
  calculator.newNumber = false
  calculator.operatorActive = false
}

const commands = {
  '+': AddCommand,
  '-': SubtractCommand,
  '*': MultiplyCommand,
  '/': DivideCommand,

  'x^2': Pow2Command,
  'x^3': Pow3Command,
  'x^y': PowCommand,
  '10^x': Pow10OfXCommand,

  '1/x': OneOfXCommand,

  'x^1/2': Pow1Of2Command,
  'x^1/3': Pow1Of3Command,
  'x^1/y': Pow1OfYCommand,

  'x!': FactorialCommand,

  mc: MemClearCommand,
  mr: MemRemCommand,
  'm+': MemPlusCommand,
  'm-': MemMinusCommand,

  '+-': SwitchSignCommand,
  '%': PercentCommand,
  clear: ClearCommand,
}

function operationsSwitch(calculator) {
  const outputBeforeOperation = calculator.currentOutput.value

  const NeededCommand = commands[calculator.currentOperator]

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
  if (calculator.currentOperator !== '') {
    operationsSwitch(calculator)
  }
  calculator.operatorActive = true
  calculator.currentRemValue = calculator.currentOutput.value
  calculator.currentOperator = clickedOperator
  calculator.newNumber = true
}

function handleSingleOperatorClick(clickedOperator, calculator) {
  const NeededCommand = commands[clickedOperator]
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
        case '=': {
          operationsSwitch(calculator)
          calculator.operatorActive = true
          calculator.newNumber = true
          calculator.equalCounter += 1
          break
        }
        /*case 'undo': {
          calculator.undoCommand()
        }*/
      }
  })
}
