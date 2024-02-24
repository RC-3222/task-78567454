import '../scss/index.scss'

import { initKeypad, initThemeSwitcher, getOutput } from './interface'

import { Calculator } from './model'

const calculator = new Calculator(getOutput())

initKeypad(calculator)
initThemeSwitcher()
