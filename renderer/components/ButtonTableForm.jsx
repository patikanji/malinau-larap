const ButtonTableForm = ({ fm, field, setter, value, flag  }) => {
  return (
    <div className="pt-4 text-center text-xs">
      <button
      onClick={e => { fm(null) }}
      className="border text-xs px-4 py-1">Cancel</button>
      <button
      onClick={e => {
        setter(prev => ({
          ...prev,
          [field]: [
            ...prev[field],
            value
          ]
        }))
        flag()
      }}
      className="border text-xs px-4 py-1 ml-3">Save</button>
    </div>
  )
}