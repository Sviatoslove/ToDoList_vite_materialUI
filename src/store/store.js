import _ from 'lodash'
import { nanoid } from 'nanoid'
import { create } from 'zustand'
import todosService from '../services/todos.service'
import { devtools } from 'zustand/middleware'
import { createTheme } from '@mui/material'
import { amber, blue, deepOrange, green, grey, orange, purple, yellow } from '@mui/material/colors'

export const useTodos = create(devtools((set, get) => ({
  todos: [],
  loading: false,
  theme: 'dark',
  async fetchTodos() {
    set({ loading: true })
    const { content } = await todosService.fetchAll()
    if(content) {
      set({ loading: false, todos: content })
    }else {
      set({ loading: false })
    }
  },
  getTodos() {
    return _.orderBy(get().todos, 'created_at', 'desc')
  },
  async addTodo(payload) {
    if(payload !== '') {
      const newTodo = {
        completed: false,
        _id: nanoid(),
        created_at: Date.now(),
        content: payload
      }
      set({ loading: true })
      const { content } = await todosService.create(newTodo)
      set(state => ({
        ...state,
        loading: false,
        todos: [
          ...state.todos, 
          content
        ]
      }))
    }
  },
  async removeTodo(id) {
    const { content } = await todosService.remove(id)
    if (!content) {
      set({todos: get().todos.filter(todo => todo._id !== id)})
    }
  },
  async editTodo(id, text) {
    const { content } = await todosService.update({_id: id, content: text})
    if(content !== '') {
      set({todos: get().todos.map(todo => todo._id === id ? ({...todo, text}) : todo)})
    }
  },
  completedTodo(id) {
    set({todos: get().todos.map(todo => todo._id === id ? ({...todo, completed: !todo.completed}) : todo)})
  },
  async removeSelected() {
    const completedTodos = get().todos.filter(todo => todo.completed)
    await Promise.all(completedTodos.map(todo => todosService.remove(todo._id)))
    set({todos: get().todos.filter(todo => !todo.completed)}) 
  }
})))

export const useTheme = create((set, get) => ({
  theme: createTheme({
    palette: {
     mode: 'dark',
     danger: {
      main: orange[500]},
      primary: {
        main: amber[300],
      },
      secondary: {
        main: blue[300]
      },
      background: {
        default: deepOrange[900],
        paper: deepOrange[900],
      },
      text: {
        primary: '#fff',
        secondary: grey[500],
      },
    },
  }),
  toggleTheme() {
    set({theme: get().theme['palette']['mode'] === 'light' ? createTheme(get().getDesignTokens('dark')) : createTheme(get().getDesignTokens('light'))})
  },
  getDesignTokens(mode) {
    return {
      palette: {
        mode,
        primary: {
          ...amber,
          ...(mode === 'dark' && {
            main: amber[300],
          }),
        },
        secondary: {
          main: blue[300],
          ...(mode === 'light' && {
            main: amber[300],
          }),
        },
        background: {
          default: blue[50],
          paper: blue[100],
        },
        ...(mode === 'dark' && {
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
        }),
        text: {
          ...(mode === 'light'
            ? {
                primary: grey[900],
                secondary: grey[800],
              }
            : {
                primary: '#fff',
                secondary: grey[500],
              }),
        }
      }
    }
  },
  getCurrentTheme() {
    return get().theme.palette.mode === 'dark' ? 'black' : '#ffc107'
  }
}))
