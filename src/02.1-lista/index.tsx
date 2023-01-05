import { useState } from "react"
import { getList, Item } from "../Services/getList"

/** Exemplo sem usar o useMachine */
const Lista02_1 = () => {
  const [lista, setLista] = useState<Item[]>([])
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'inicial' | 'loading' | 'erro' | 'sucesso'>('inicial');

  const loadList = async () => {
    try {
      setStatus('loading')
      setLista(await getList())
      setStatus('sucesso')
    } catch {
      setError('Ocorreu um erro')
      setStatus('erro')
    }
  }

  return (
    <div>
      <button onClick={loadList} disabled={status === 'loading'}>Buscar</button>
      {'   '}
      <span>Estado: {JSON.stringify(status)}</span>
      <div>
        {status === 'inicial' && <>Clique em buscar</>}
        {status === 'loading' && <>Loading</>}
        {status === 'sucesso' && (
          lista.map(x => (<div key={x.id}>{x.nome}</div>))
        )}
        {status === 'erro' && <b>{error}</b>}
      </div>
    </div>
  )
}

export { Lista02_1 }