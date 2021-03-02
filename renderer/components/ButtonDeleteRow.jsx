const ButtonDeleteRow = ({ onClik }) => {
  const btnHandler = onClik ? onClik : (e) => {
    console.log('Button clicked')
  }

  return <button
  onClick={btnHandler}
  className="rounded-sm text-xs leading-3 bg-gray-200 hover:bg-gray-300 text-gray-400 hover:text-gray-500 focus:bg-gray-500 focus:text-white focus:outline-none px-2 py-1">DEL</button>
}

export default ButtonDeleteRow