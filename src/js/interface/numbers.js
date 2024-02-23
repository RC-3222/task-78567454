import { PressNumCommand } from '../model'

function handleNumberClick(clickedButton, calculator) {
  calculator.executeCommand(new PressNumCommand(calculator, clickedButton))
  calculator.newNumber = false
  calculator.operatorActive = false
}

export function initNumbers(calculator) {
  const calculatorKeyboard = document.querySelector('.calculator__keypad')

  calculatorKeyboard.addEventListener('click', (ev) => {
    if (ev.target.classList.contains('key--number')) {
      handleNumberClick(ev.target.id, calculator)
    }
  })
}
