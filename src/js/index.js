import '../scss/index.scss'

import {
  initOperators,
  initNumbers,
  initThemeSwitcher,
  getOutput,
} from './interface'

import { Calculator } from './model'

const calculator = new Calculator(getOutput())

initNumbers(calculator)
initOperators(calculator)
initThemeSwitcher()
