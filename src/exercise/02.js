// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = ({defaultValue = '', storageKey}) => {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(storageKey) || defaultValue,
  )

  React.useEffect(() => {
    window.localStorage.setItem(storageKey, state)
  }, [state, storageKey])

  return [state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState({
    initialName,
    storageKey: 'name',
  })

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
