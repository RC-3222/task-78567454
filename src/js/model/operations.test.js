import {
  Pow2Command,
  Pow1Of2Command,
  Pow3Command,
  Pow1Of3Command,
  PowCommand,
  Pow1OfYCommand,
  Pow10OfXCommand,
  AddCommand,
  SubtractCommand,
  SwitchSignCommand,
  MultiplyCommand,
  DivideCommand,
  PercentCommand,
  FactorialCommand,
  MemPlusCommand,
  MemMinusCommand,
  MemClearCommand,
  MemRemCommand,
  ClearCommand,
} from '.'

import { Calculator } from '.'

describe('Math Operations Tests', () => {
  const calculator = new Calculator({ value: 0 })

  describe('POW tests', () => {
    describe('single-input tests', () => {
      test('Pow2Command result for 2 should be 4', () => {
        calculator.currentOutput.value = 2
        calculator.executeCommand(new Pow2Command(calculator))
        expect(calculator.currentOutput.value).toBe(4)
      })
      test('Pow1of2Command result for 4 should be 2', () => {
        calculator.currentOutput.value = 4
        calculator.executeCommand(new Pow1Of2Command(calculator))
        expect(calculator.currentOutput.value).toBe(2)
      })
      test('Pow3Command result for 2 should be 8', () => {
        calculator.currentOutput.value = 2
        calculator.executeCommand(new Pow3Command(calculator))
        expect(calculator.currentOutput.value).toBe(8)
      })
      test('Pow3Command result for 8 should be 2', () => {
        calculator.currentOutput.value = 8
        calculator.executeCommand(new Pow1Of3Command(calculator))
        expect(calculator.currentOutput.value).toBe(2)
      })
      test('Pow10OfXCommand result for 2 should be 100', () => {
        calculator.currentOutput.value = 2
        calculator.executeCommand(new Pow10OfXCommand(calculator))
        expect(calculator.currentOutput.value).toBe(100)
      })
    })

    describe('double-input tests', () => {
      test('PowCommand result for 2 and 4 should be 16', () => {
        calculator.currentRemValue = 2
        calculator.currentOutput.value = 4
        calculator.executeCommand(new PowCommand(calculator))
        expect(calculator.currentOutput.value).toBe(16)
      })
      test('Pow1OfYCommand result for 16 and 4 should be 2', () => {
        calculator.currentRemValue = 16
        calculator.currentOutput.value = 4
        calculator.executeCommand(new Pow1OfYCommand(calculator))
        expect(calculator.currentOutput.value).toBe(2)
      })
    })
  })

  describe('Basic Math Ops tests', () => {
    describe('single-input tests', () => {
      test('SwitchSignCommand result for 2 should be -2', () => {
        calculator.currentOutput.value = 2
        calculator.executeCommand(new SwitchSignCommand(calculator))
        expect(calculator.currentOutput.value).toBe(-2)
      })
    })

    describe('double-input tests', () => {
      test('AddCommand result for 2 and 4 should be 6', () => {
        calculator.currentRemValue = 2
        calculator.currentOutput.value = 4
        calculator.executeCommand(new AddCommand(calculator))
        expect(calculator.currentOutput.value).toBe(6)
      })
      test('SubtractCommand result for 16 and 4 should be 12', () => {
        calculator.currentRemValue = 16
        calculator.currentOutput.value = 4
        calculator.executeCommand(new SubtractCommand(calculator))
        expect(calculator.currentOutput.value).toBe(12)
      })
      test('MultiplyCommand result for 2 and 4 should be 8', () => {
        calculator.currentRemValue = 2
        calculator.currentOutput.value = 4
        calculator.executeCommand(new MultiplyCommand(calculator))
        expect(calculator.currentOutput.value).toBe(8)
      })
      test('DivideCommand result for 4 and 8 should be 0.5', () => {
        calculator.currentRemValue = 4
        calculator.currentOutput.value = 8
        calculator.executeCommand(new DivideCommand(calculator))
        expect(calculator.currentOutput.value).toBe(0.5)
      })
      test('DivideCommand result for 4 and 0 should be "Error"', () => {
        calculator.currentRemValue = 4
        calculator.currentOutput.value = 0
        calculator.executeCommand(new DivideCommand(calculator))
        expect(calculator.currentOutput.value).toBe('Error')
      })
    })
  })

  describe('Special Tests', () => {
    describe('single-input tests', () => {
      test('ClearCommand result after executing some operation should be a clean state of main calculator components (except history and value in memory)', () => {
        calculator.currentRemValue = 4
        calculator.currentOutput.value = 8
        calculator.executeCommand(new DivideCommand(calculator))
        calculator.executeCommand(new ClearCommand(calculator))
        expect(calculator.currentOutput.value).toBe(0)
        expect(calculator.currentRemValue).toBe(0)
        expect(calculator.currentOperator).toBe('')
      })
      test('FactorialCommand result for 3 should be 6', () => {
        calculator.currentOutput.value = 3
        calculator.executeCommand(new FactorialCommand(calculator))
        expect(calculator.currentOutput.value).toBe(6)
      })
      test('FactorialCommand result for 0 should be 1', () => {
        calculator.currentOutput.value = 0
        calculator.executeCommand(new FactorialCommand(calculator))
        expect(calculator.currentOutput.value).toBe(1)
      })
      test('FactorialCommand result for -1 should be "Error"', () => {
        calculator.currentOutput.value = -1
        calculator.executeCommand(new FactorialCommand(calculator))
        expect(calculator.currentOutput.value).toBe('Error')
      })
      test('PercentCommand result for 3 should be 0.03', () => {
        calculator.currentOutput.value = 3
        calculator.executeCommand(new PercentCommand(calculator))
        expect(calculator.currentOutput.value).toBe(0.03)
      })
    })

    describe('double-input tests', () => {
      test('PercentCommand + AddCommand result for 2 and 50 should be 3', () => {
        calculator.currentOperator = '+'
        calculator.currentRemValue = 2
        calculator.currentOutput.value = 50
        calculator.executeCommand(new PercentCommand(calculator))
        calculator.executeCommand(new AddCommand(calculator))
        expect(calculator.currentOutput.value).toBe(3)
      })
      test('PercentCommand + SubtractCommand result for 4 and 50 should be 2', () => {
        calculator.currentOperator = '-'
        calculator.currentRemValue = 4
        calculator.currentOutput.value = 50
        calculator.executeCommand(new PercentCommand(calculator))
        calculator.executeCommand(new SubtractCommand(calculator))
        expect(calculator.currentOutput.value).toBe(2)
      })
      test('PercentCommand + MultiplyCommand result for 2 and 150 should be 3', () => {
        calculator.currentOperator = '*'
        calculator.currentRemValue = 2
        calculator.currentOutput.value = 150
        calculator.executeCommand(new PercentCommand(calculator))
        calculator.executeCommand(new MultiplyCommand(calculator))
        expect(calculator.currentOutput.value).toBe(3)
      })
      test('PercentCommand + DivideCommand result for 3 and 75 should be 4', () => {
        calculator.currentOperator = '/'
        calculator.currentRemValue = 3
        calculator.currentOutput.value = 75
        calculator.executeCommand(new PercentCommand(calculator))
        calculator.executeCommand(new DivideCommand(calculator))
        expect(calculator.currentOutput.value).toBe(4)
      })
    })
  })

  describe('Memory Ops tests', () => {
    test('Memory value after MemPlusCommand for 25 (while no value in memory) should be 25', () => {
      calculator.memValue = null
      calculator.currentOutput.value = 25
      calculator.executeCommand(new MemPlusCommand(calculator))
      expect(calculator.memValue).toBe(25)
    })
    test('Memory value after MemPlusCommand for NaN (while 25 in memory) should be 25', () => {
      calculator.memValue = 25
      calculator.currentOutput.value = NaN
      calculator.executeCommand(new MemPlusCommand(calculator))
      expect(calculator.memValue).toBe(25)
    })
    test('Memory value after MemPlusCommand for 50 (while 3 in memory) should be 53', () => {
      calculator.memValue = 3
      calculator.currentOutput.value = 50
      calculator.executeCommand(new MemPlusCommand(calculator))
      expect(calculator.memValue).toBe(53)
    })
    test('Memory value after MemMinusCommand for 25 (while 28 in memory) should be 3', () => {
      calculator.memValue = 28
      calculator.currentOutput.value = 25
      calculator.executeCommand(new MemMinusCommand(calculator))
      expect(calculator.memValue).toBe(3)
    })
    test('Output value after MemRemCommand for 25 (while 50 in memory) should be 50', () => {
      calculator.memValue = 50
      calculator.currentOutput.value = 25
      calculator.executeCommand(new MemRemCommand(calculator))
      expect(calculator.currentOutput.value).toBe(50)
    })
    test('Output value after MemRemCommand for 25 (while no value in memory) should be 25', () => {
      calculator.memValue = null
      calculator.currentOutput.value = 25
      calculator.executeCommand(new MemRemCommand(calculator))
      expect(calculator.currentOutput.value).toBe(25)
    })
    test('Memory value after MemClearCommand for 50 in memory should be null', () => {
      calculator.memValue = 50
      calculator.executeCommand(new MemClearCommand(calculator))
      expect(calculator.memValue).toBe(null)
    })
  })
})
