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
  OneOfXPowCommand,
  OneOfXPow2Command,
  OneOfXPow3Command,
  Pow10naXCommand,
  FactorialCommand,
} from '../model/operations'

import { getOutput } from './output'

const output = getOutput()

const commands = {
  '+': AddCommand,
  '-': SubtractCommand,
  '*': MultiplyCommand,
  '/': DivideCommand,

  'x^2': Pow2Command,
  'x^3': Pow3Command,
  'x^y': PowCommand,
  '10^x': Pow10naXCommand,

  '1/x': OneOfXCommand,
  '1/x^2': OneOfXPow2Command,
  '1/x^3': OneOfXPow3Command,
  '1/x^y': OneOfXPowCommand,

  'x!': FactorialCommand,
}

function operationsSwitch(calculator) {
  const outputBeforeOperation = output.value

  //console.log(calculator);

  const NeededCommand = commands[calculator.currentOperator]

  if (!NeededCommand) return

  new NeededCommand(calculator).execute()

  if (calculator.equalCounter === 0) {
    calculator.currentValue = outputBeforeOperation
  }
}

function handleDoubleOperatorClick(clickedOperator, calculator) {
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

function handleSingleOperatorClick(clickedOperator, calculator) {
  const NeededCommand = commands[clickedOperator]
  if (!NeededCommand) return console.log('fuk single')
  new NeededCommand(calculator).execute()
}

export function initOperators(calculator) {
  const calculatorKeyboard = document.querySelector('.calculator__keypad')

  calculatorKeyboard.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('key--operator--double-value')) {
      handleDoubleOperatorClick(ev.target.value, calculator)
      calculator.equalCounter = 0
    } else if (ev.target.classList.contains('key--operator--single-value')) {
      handleSingleOperatorClick(ev.target.value, calculator)
      calculator.newNumber = true
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
          //break
        }
        /*
        default: {
          const NeededCommand = commands[calculator.currentOperator]
          if (NeededCommand) {
            new NeededCommand(calculator).execute()
          }
        }
        */
      }
  })
}
