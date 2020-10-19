import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogReducer'
import { Navigation, ButtonLO } from './components/StyledComponents'
import loginService from './services/login'
import blogService from './services/blogs'
import userService from './services/users'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import Login from './components/Login'
import User from './components/User'
import Blog from './components/Blog'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


const App = () => {

  //const [blog, newBlog] = useState({title:'', author:'', url:''})

  const dispatch = useDispatch()
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

  const style = {
    padding: 5,
  }

  return (

    <Router>
      <Navigation>
        <Link style={style} to="/">Blogs</Link>
        <Link style={style} to="/users">Users</Link>
        {user ? <em>{user.name} logged in
          <ButtonLO onClick = {() => {
            window.localStorage.clear()
            setUser(null)}}> Log out </ButtonLO>
        </em>
          : null }
      </Navigation>

      <Switch>
        <Route path='/users/:id'>
          <User users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          <Blog></Blog>
        </Route>
        <Route path="/users">
          <Users users={users}/>
        </Route>
        <Route path="/">
          <Notification />
          {user === null ? <Login username={username}
            password={password} setPassword={({ target }) =>
            {setPassword(target.value)}} setUsername={({ target }) =>
            {setUsername(target.value)}} handleLogin={(event) =>
            {handleLogin(event)}} /> :
            <BlogForm user={user} setUser={setUser}/>}
        </Route>
      </Switch>
    </Router>
  )
}

export default App