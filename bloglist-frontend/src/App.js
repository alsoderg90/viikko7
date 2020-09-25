import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import loginService from './services/login'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {

  const dispatch = useDispatch()
//const [blog, newBlog] = useState({title:'', author:'', url:''})
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogsVisible, setBlogsVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  })

  useEffect (() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
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

  const addBlog= (blogObject) => {
    blogService.create(blogObject).then(blog => {
      console.log(blog, 'lisätty blogi')
      setBlogs(blogs.concat(blog))
      setBlogsVisible(false)
      dispatch(setNotification(`A new blog: ${blog.title} by ${blog.author} added`, 'gg', 2))
    })
  }


  const blogForm = () => {
    const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
    const showWhenVisible = { display: blogsVisible ? '' : 'none' }

    const sortedList = blogs.sort((a,b) => (a.likes < b.likes) ? 1 : -1)

    return (
      <div>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in <button onClick = {() => {
            window.localStorage.clear()
            setUser(null)}}> Log out </button>
        </p>
        {sortedList.map(blog => <Blog key={blog.id} blog={blog} users={user} setBlogs={() =>
          setBlogs} blogs={blogs}/>) }
        <div style={hideWhenVisible}> <button onClick={() =>
          setBlogsVisible(true)}> Create </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            addBlog={addBlog}
            setBlogsVisible={setBlogsVisible}
            user={user}/>
        </div>
      </div>
    )
  }

  return (

    <div>
      <Notification />
      {user === null ? <LoginForm username={username}
        password={password} setPassword={({ target }) =>
        {setPassword(target.value)}} setUsername={({ target }) =>
        {setUsername(target.value)}} handleLogin={(event) =>
        {handleLogin(event)}} /> :
        blogForm()}
    </div>
  )
}

export default App