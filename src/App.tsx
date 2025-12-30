import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { Unit } from './types/common'
import { clamp, sanitize } from './utils/string'
import { Tooltip } from './components/tooltip'

function App() {
  const [unit, setUnit] = useState<Unit>(Unit.PERCENT)
  const [value, setValue] = useState<string>('100')
  const lastInputValid = useRef<string>('100')

  const handleValidInput = () => {
    //clear string
    const inputValue = sanitize(value)
    if (typeof inputValue !== 'number') {
      setValue(lastInputValid.current)
      return
    }

    //check if the input number is between 0 and 100
    const newValue = clamp(Number(inputValue), unit, Number(lastInputValid.current))
    setValue(newValue.toString())
    lastInputValid.current = newValue.toString()
  }

  useEffect(() => {
    if (unit === Unit.PERCENT) handleValidInput()
  }, [unit])

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="w-[280px] h-[120px] bg-background-base p-4 flex gap-4 flex-col">
        {/* unit */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-text-primary font-normal ">Unit</span>
          <div className="w-[140px] h-[36px] bg-background-unselect flex rounded-lg overflow-hidden p-0.5 gap-0.5">
            <div
              className={clsx(
                'flex-1 text-text-primary text-xs flex items-center justify-center cursor-pointer',
                unit === Unit.PERCENT && 'bg-background-select rounded-md text-text-secondary'
              )}
              onClick={() => setUnit(Unit.PERCENT)}
            >
              %
            </div>
            <div
              className={clsx(
                'flex-1 text-text-primary text-xs flex items-center justify-center cursor-pointer',
                unit === Unit.PX && 'bg-background-select rounded-md text-text-secondary'
              )}
              onClick={() => setUnit(Unit.PX)}
            >
              px
            </div>
          </div>
        </div>
        {/* value */}

        <div className="flex justify-between items-center">
          <span className="text-xs text-text-primary font-normal ">Value</span>
          <div className="w-[140px] h-[36px] bg-background-unselect flex rounded-lg transition-colors duration-200 has-[input:hover]:bg-background-hover">
            <Tooltip content={unit === Unit.PERCENT ? 'Value must greater than 0' : ''} position="top">
              <button
                className={clsx(
                  'w-9 h-9 text-text-secondary text-xs flex items-center justify-center cursor-pointer hover:bg-background-hover rounded rounded-tl-lg rounded-bl-lg',
                  unit === Unit.PERCENT && Number(value) === 0 && 'cursor-not-allowed'
                )}
                onClick={() => {
                  const newValue = Number(value) - 1
                  setValue(newValue < 0 ? '0' : newValue.toString())
                }}
                disabled={unit === Unit.PERCENT && Number(value) === 0}
              >
                -
              </button>
            </Tooltip>

            <input
              className="flex-1 w-[68px] bg-transparent outline-none text-text-secondary text-center"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleValidInput}
            />
            <Tooltip
              content={unit === Unit.PERCENT && Number(value) >= 100 ? 'Value must less than 100' : ''}
              position="top"
            >
              <button
                className={clsx(
                  'w-9 h-9 text-text-secondary text-xs flex items-center justify-center cursor-pointer hover:bg-background-hover rounded rounded-tr-lg rounded-br-lg',
                  unit === Unit.PERCENT && 'cursor-not-allowed'
                )}
                onClick={() => {
                  const newValue = Number(value) + 1
                  setValue(newValue > 100 && unit === Unit.PERCENT ? '100' : newValue.toString())
                }}
                disabled={unit === Unit.PERCENT && Number(value) >= 100}
              >
                +
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
