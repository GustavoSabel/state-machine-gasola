export type Item = {
  id: number
  nome: string
}

const result: Item[] = [
  { id: 1, nome: 'Item 01' },
  { id: 2, nome: 'Item 02' },
  { id: 3, nome: 'Item 03' },
  { id: 4, nome: 'Item 04' },
]

const getList = (): Promise<Item[]> => {
  return new Promise<Item[]>((sucess, error) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        sucess(result)
      } else {
        error('Ocorreu um erro')
      }
    }, 500)
  })
}

export { getList }