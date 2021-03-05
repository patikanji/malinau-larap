import { useState } from 'react'

const Input = ({ model, path, setter, flag = false, disabled = false, numeric=false, style='', width='' }) => {
  const dark = "text-xs leading-normal bg-gray-400 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
  const light = "text-xs leading-normal bg-gray-100 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-white focus:border-blue-400 focus:outline-none"
  const yellow = "text-xs leading-normal bg-yellow-100 bg-opacity-75 px-2 py-1 border-b border-l border-transparent hover:border-yellow-300 focus:bg-white focus:border-blue-400 focus:outline-none"

  let theStyle = light
  if (style == 'dark') theStyle = dark
  else if (style == 'yellow') theStyle = yellow
  theStyle = theStyle + ' ' + width

  const errorStyle = theStyle + ' text-red-500'

  const [local, setLocal] = useState(initialValue() || '')
  const [touched, setTouched] = useState(false)

  function initialValue() {
    if (!model) return path[0]
    else {
      return path.length == 1 ? model[path[0]] : model[path[0]][path[1]]
    }
  }

  const changeModel = (e) => {
    const strVal = e.target.value
    const numVal = parseInt(strVal)
    const regex = new RegExp(`^[0-9]*$`)
    const passed = regex.test(strVal)
    const newVal = !numeric ? strVal : (
      passed ? numVal : 0 // 0
    )

    setLocal(newVal)

    if (!model) {
      setter(newVal)
    } else if (path.length == 1) {
      setter(prev => ({
        ...prev,
        [path[0]]: newVal
      }))
    } else if (path.length == 2) {
      setter(prev => ({
        ...prev,
        [path[0]]: {
          ...prev[path[0]],
          [path[1]]: newVal
        }
      }))
    }

    if (numeric && isNaN(newVal)) {
      e.target.value = '0'
    } else {
      e.target.value = '' + newVal
    }

    console.log('onChange')
    e.target.className = (numeric && !passed) ? errorStyle : theStyle
    setTouched(true)
  }

  const changeProxy = (e) => {
    if (!flag || !touched) {
      console.log('untouched / no-proxy')
      return false
    } else {
      if (flag) flag()
      setTouched(false)
    }
  }

  const theValue = path.length == 1 ? model[path[0]] : model[path[0]][path[1]]

  // value={theValue ? theValue : local}
  // onBlur={doChange}
  return <input
    type={numeric ? 'number' : 'text'}
    disabled={disabled}
    value={theValue ? theValue : local}
    className={theStyle}
    onChange={changeModel}
    onBlur={changeProxy}
  />
}

export default Input
