import { useState } from "react"
import { getList, Item } from "../Services/getList"
import { createMachine } from 'xstate'
import { useMachine } from '@xstate/react'

/** Reportando erro caso dê erro na requisição */
const loadingListaMachine = createMachine({
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
        REPORTAR: { target: 'reportando' },
      }
    },
    sucesso: {
      on: {
        BUSCAR: { target: 'loading' },
      }
    },
    reportando: {
      on: {
        ENVIAR: { target: 'reportado' },
        BUSCAR: { target: 'loading' },
      }
    },
    reportado: {
      on: {
        BUSCAR: { target: 'loading' },
      }
    }
  }
})

const Lista03 = () => {
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
      <button onClick={loadList} disabled={state.matches('loading')}>Buscar</button>
      {'   '}
      <span>Estado: {JSON.stringify(state.value)}</span>
      <div>
        {state.matches('inicial') && <>Clique em buscar</>}
        {state.matches('loading') && <>Loading</>}
        {state.matches('sucesso') && (
          lista.map(x => (<div key={x.id}>{x.nome}</div>))
        )}
        {state.matches('erro') && <div>
          {error}
          <button onClick={() => send('REPORTAR')}>Reportar</button>
        </div>}
        {state.matches('reportando') && <div>
          Qual foi o erro?
          <input />
          <button onClick={() => send('ENVIAR')}>Enviar</button>
        </div>}
        {state.matches('reportado') && <b>Erro reportado com sucesso!</b>}
      </div>
    </div>
  )
}

export { Lista03 }