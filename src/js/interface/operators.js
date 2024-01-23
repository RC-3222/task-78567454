import {
  AddCommand,
  SubtractCommand,
  MultiplyCommand,
  DivideCommand,
  ClearCommand,
  SwitchSignCommand,
  PercentCommand,
} from '../model/operations'

import { getOutput } from './output'

const output = getOutput()

const commands = {
  '+': AddCommand,
  '-': SubtractCommand,
  '*': MultiplyCommand,
  '/': DivideCommand,
}

function operationsSwitch(calculator) {
  const outputBeforeOperation = output.value

  const NeededCommand = commands[calculator.currentOperator]

  if (!NeededCommand) return

  new NeededCommand(calculator).execute()
  if (calculator.equalCounter === 0) {
    calculator.currentValue = outputBeforeOperation
  }
}

function handleOperatorClick(clickedOperator, calculator) {
  if (calculator.operatorActive === true) {
    calculator.currentValue = output.value
    calculator.currentOperator = clickedOperator
    return
  }
  if (calculator.currentOperator !== '') {
    operationsSwitch(calculator)
  }
  calculator.operatorActive = true
  calculator.currentValue = output.value
  calculator.currentOperator = clickedOperator
  calculator.newNumber = true
}

export function initOperators(calculator) {
  const calculatorKeyboard = document.querySelector('.calculator__keypad')

  calculatorKeyboard.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('key--operator')) {
      handleOperatorClick(ev.target.value, calculator)
      calculator.equalCounter = 0
    } else
      switch (ev.target.id) {
        case '=': {
          operationsSwitch(calculator)
          calculator.operatorActive = true
          calculator.newNumber = true
          calculator.equalCounter += 1
          break
        }
        case 'clear': {
          new ClearCommand(calculator).execute()
          calculator.equalCounter = 0
          break
        }
        case '+-': {
          new SwitchSignCommand(calculator).execute()
          calculator.equalCounter = 0
          break
        }
        case '%': {
          new PercentCommand(calculator).execute()
        }
      }
  })
}
