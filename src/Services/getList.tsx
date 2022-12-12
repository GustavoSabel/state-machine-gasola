export type Item = {
  id: number
}

const result: Item[] = [
  {
    id: 1
  }, {
    id: 2
  }, {
    id: 3
  }, {
    id: 4
  },
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