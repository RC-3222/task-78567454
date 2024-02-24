import { Command } from './command'

export class PressNumCommand extends Command {
  constructor(calculator, numToAppend) {
    super(calculator)
    this.numToAppend = numToAppend
    //this.prevOutputValue = this.calculator.currentOutput.value
  }
  execute() {
    if (this.numToAppend.trim() === '.') {
      if (this.calculator.newNumber === true) {
        this.calculator.currentOutput.value = 0 + this.numToAppend
      } else if (!this.calculator.currentOutput.value.includes('.')) {
        this.calculator.currentOutput.value += this.numToAppend
      }
    } else if (
      this.calculator.currentOutput.value === '0' ||
      this.calculator.newNumber === true
    ) {
      this.calculator.currentOutput.value = this.numToAppend
    } else if (
      this.calculator.currentOutput.value.length <=
      this.calculator.maxOutputLength
    ) {
      this.calculator.currentOutput.value += this.numToAppend
    }
  }
  /*undo() {
    this.calculator.currentOutput.value = this.prevOutputValue
  }*/
}
