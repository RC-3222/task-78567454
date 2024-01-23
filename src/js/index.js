import '../scss/index.scss'
import { Calculator } from './model/calculator'

import { initOperators } from './interface/operators'
import { initNumbers } from './interface/numbers'
import { initThemeSwitcher } from './interface/switch-theme'

const calculator = new Calculator('', 0, false, true, 14, 0)

initNumbers(calculator)
initOperators(calculator)
initThemeSwitcher()
