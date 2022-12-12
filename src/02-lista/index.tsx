import { useEffect, useState } from "react"
import { getList, Item } from "../Services/getList"
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'


const loadingListaMachine =

  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgBssBDCAGQEtYAXY-EABy1guoqw3oA9EBaANnQBPPv2RoQRUpRrEAdBQgEw9JizYduiACwAmYYgCM2gAzj0U8lVpzLFDFFXNW7TkhA8EegwkMBOAA45AFZzSRIrWTkwACcYrBindVctL30QEQQAwxCwyxkbWABXAGMSuHh3NRdNd09vDMRdYIB2cXEgA */
  createMachine({
    id: 'loadLista',
    initial: 'inicial',
    states: {
      inicial: {
        on: {
          BUSCAR: { target: 'loading' },
        }
      },
      loading: {
        on: {
          SUCESSO: { target: 'sucesso' },
          ERRO: { target: 'erro' },
        }
      },
      erro: {
        on: {
          BUSCAR: { target: 'loading' },
        }
      },
      sucesso: {
        on: {
          BUSCAR: { target: 'loading' },
        }
      },
    }
  })

const Lista02 = () => {
  const [lista, setLista] = useState<Item[]>([])
  const [error, setError] = useState('')
  const [state, send] = useMachine(loadingListaMachine);

  const loadList = async () => {
    try {
      send('BUSCAR')
      setLista(await getList())
      send('SUCESSO')
    } catch {
      setError('Ocorreu um erro')
      send('ERRO')
    } 
  }

  return (
    <div>
      <button onClick={loadList}>Buscar</button>
      <div>
        {state.matches('inicial') && <>Clique em buscar</>}
        {state.matches('loading') && <>Loading</>}
        {state.matches('sucesso') && (
          lista.map(x => (<div key={x.id}>{x.id}</div>))
        )}
        {state.matches('erro') && <b>{error}</b>}
      </div>
      <span>{JSON.stringify(state.value)}</span>
    </div>
  )
}

export { Lista02 }