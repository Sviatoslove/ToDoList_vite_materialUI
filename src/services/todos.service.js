import httpService from "./http.service";

const todoEndpoint = 'todos/'

const todosService = {
  create: async (payload) => {
    const  { data }  = await httpService.put(todoEndpoint + payload._id, payload)
    return data
  },
  fetchAll: async () => {
    const { data } = await httpService.get(todoEndpoint)
    return data
  },
  remove: async (id) => {
    const { data } = await httpService.delete(todoEndpoint + id)
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(todoEndpoint + payload._id, payload)
    return data
  }
}

export default todosService
