const Select = ({ options, model, proxy, setter, disabled = false, path, flag, style }) => {
  const dark = "text-xs leading-normal bg-gray-400 text-gray-800 px-2 py-1 border-b border-l border-transparent hover:border-gray-300 focus:bg-gray-300 focus:border-white focus:outline-none"
  const light = "text-xs leading-normal flex-grow px-2 py-1 border-l border-b border-transparent bg-gray-100 hover:border-gray-300 focus:bg-white focus:border-blue-400 focus:outline-none"
  const yellow = "text-xs leading-normal bg-yellow-100 bg-opacity-75 px-2 py-1 border-b border-l border-transparent hover:border-yellow-300 focus:bg-white focus:border-blue-400 focus:outline-none"

  let theStyle = light
  if (style == 'dark') theStyle = dark
  else if (style == 'yellow') theStyle = yellow

  const set0Step = (e) => {
    setter(e.target.value)
    if (proxy) {
      proxy(e.target.value)
    }

    if (flag) flag()
  }

  const set1Step = (e) => {
    setter(prev => ({
      ...prev,
      [path[0]]: e.target.value
    }))
    if (proxy) {
      proxy(prev => ({
        ...prev,
        [path[0]]: e.target.value
      }))
    }
    if (flag) flag()
  }

  const set2Step = (e) => {
    setter(prev => ({
      ...prev,
      [path[0]]: {
        ...prev[path[0]],
        [path[1]]: e.target.value
      }
    }))
    if (proxy) {
      proxy(prev => ({
        ...prev,
        [path[0]]: {
          ...prev[path[0]],
          [path[1]]: e.target.value
        }
      }))
    }
    if (flag) flag()
  }

  let changeHandler = set0Step
  if (model) changeHandler = path.length == 1 ? set1Step : set2Step

  const theValue = path.length == 1 ? model[path[0]] : model[path[0]][path[1]]

  // Check if options are k-v or just k
  const kv = options[0].length

  if (kv == 1) return (
    <select
    disabled={disabled}
    options={options}
    defaultValue={theValue}
    onChange={changeHandler}
    className={theStyle}>
    <option></option>
    {options.map((k) => (
      <option key={k} value={k}>{k}</option>
    ))}
  </select>
  )

  return <select
  disabled={disabled}
    options={options}
    defaultValue={theValue}
    onChange={changeHandler}
    className={theStyle}>
    <option></option>
    {options.map(([k, v]) => (
      <option key={k} value={k}>{v}</option>
    ))}
  </select>
}

export default Select