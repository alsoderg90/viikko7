import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const get = (id) => {
  const response = axios.get(baseUrl`/${id}`)
  return response.data
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(`${baseUrl}/${id}`, newObject,config)
  return response.data
}

const remove = async id => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log(response)
  return response.data
}

export default { getAll, setToken, create, update, remove, get }