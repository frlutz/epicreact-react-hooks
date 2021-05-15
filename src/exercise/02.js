// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (
  defaultValue,
  storageKey,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) => {
  const [state, setState] = React.useState(() => {
    const valueInLocalStorage = window.localStorage.getItem(storageKey)
    if (valueInLocalStorage) return deserialize(valueInLocalStorage)
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  const previousStorageKeyRef = React.useRef(storageKey)

  React.useEffect(() => {
    const previousKey = previousStorageKeyRef.current
    if (previousKey !== storageKey) window.localStorage.removeItem(previousKey)

    previousStorageKeyRef.current = storageKey
    window.localStorage.setItem(storageKey, serialize(state))
  }, [serialize, state, storageKey])
  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState(initialName, 'name')

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
