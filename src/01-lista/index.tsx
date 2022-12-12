import { useState } from "react"
import { getList, Item } from "../Services/getList"

const Lista01 = () => {
  const [lista, setLista] = useState<Item[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadList = async () => {
    try {
      setError('')
      setLoading(true)
      setLista(await getList())
    } catch {
      setError('Ocorreu um erro. Tente novamente mais tarde')
    } finally {
      setLoading(false)
    } 
  }

  return (
    <div>
      <button onClick={loadList} disabled={loading}>Buscar</button>
      <div>
        {loading && <>Loading</>}
        {!loading && !error && lista === null && <>Clique em buscar</>}
        {!loading && !error && lista && (
          lista.map(x => (<div key={x.id}>{x.nome}</div>))
        )}
        {!loading && error && <b>{error}</b>}
      </div>
    </div>
  )
}

export { Lista01 }