// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  const [{status, pokemon, error}, setState] = React.useState({
    status: pokemonName ? 'pending' : 'idle',
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) return
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => setState({status: 'resolved', pokemon}),
      error => setState({status: 'rejected', error}),
    )
  }, [pokemonName])

  if (status === 'idle') return 'Submit a pokemon'
  if (status === 'pending') return <PokemonInfoFallback name={pokemonName} />
  if (status === 'rejected') throw error
  if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />

  throw new Error('Serious error, should not be possible')
}

const ErrorFallback = ({error, resetErrorBoundary}) => (
  <div style={{color: 'orangered'}}>
    Something went wrong!
    <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName('')}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
