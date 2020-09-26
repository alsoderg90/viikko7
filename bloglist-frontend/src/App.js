import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import loginService from './services/login'
import userService from './services/users'
import Login from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Users from './components/Users'


const App = () => {

  //const [blog, newBlog] = useState({title:'', author:'', url:''})

  const dispatch = useDispatch()
  const [page, setPage] = useState('home')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    dispatch(initBlogs())
  },[dispatch])

  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  useEffect(() => {
    const fetchData = async  () => {
      const response = await userService.getAll()
      console.log(response.data)
      setUsers(response.data)
    }
    fetchData()
  },[])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    }
    catch (exception) {
      dispatch(setNotification('wrong credentials','error', 2))
      setUsername('')
      setPassword('')
    }
  }

  const  toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const content = () => {

    if (page === 'home') {
      return (
        <div>
          <Notification />
          {user === null ? <Login username={username}
            password={password} setPassword={({ target }) =>
            {setPassword(target.value)}} setUsername={({ target }) =>
            {setUsername(target.value)}} handleLogin={(event) =>
            {handleLogin(event)}} /> :
            <BlogForm user={user} setUser={setUser}/>}
        </div>
      )
    } else if (page === 'users') {
      return <Users users={users} />
    }
  }

  const style = {
    padding: 5
  }

  return (
    <div>
      <div>
        <a href="/#" onClick={toPage('home')} style={style}>
          Blogs
        </a>
        <a href="/#" onClick={toPage('users')} style={style}>
          Users
        </a>
      </div>

      {content()}
    </div>
  )

}

export default App