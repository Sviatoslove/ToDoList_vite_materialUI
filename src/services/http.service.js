import axios from "axios";
import configFile from "../config.json"

//устанавливаем настройки URL через config.json
const http = axios.create({
  baseURL: configFile.baseUrl
})

//interceptors - перехватчик запросов(request) или ответов(response), позволяет произвести необходимые действия с данными до того как они попадут на сервер либо к юзеру.
//метод use() принимает в себя две функции, по принципу resolve, reject.
http.interceptors.request.use(
  (config) => {
    // регулярное выражение на проверку наличия - "/" в конце URL
    const containSlash = /\/$/gi.test(config.url)
    // чтобы работать с firebase необходимо к URL добавить '.json'
    config.url = (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
    return config
  },
  error => {return new Promise.reject(error)}
)

const transformData = data => {
  if(data) return data && data._id ? data : Object.keys(data).map(key => ({...data[key]}))
}

http.interceptors.response.use(
  (res) => {
    res.data = {content: transformData(res.data)}
    return res
  },
  error => {return new Promise.reject(error)}
)

const httpService = {
  get: http.get,
  put: http.put,
  delete: http.delete,
  patch: http.patch
}

export default httpService
