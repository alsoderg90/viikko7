import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogForm = ({ user, setUser }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogsVisible, setBlogsVisible] = useState(false)
  const dispatch = useDispatch()
  const blogsRedux = useSelector(state => state.blogs)

  const newBlog = (event) => {
    event.preventDefault()
    const newBlog = { title: title, author: author, url: url }
    addBlog(newBlog)
    setUrl('')
    setTitle('')
    setAuthor('')
  }

  const addBlog= (blogObject) => {
    dispatch(createBlog(blogObject))
    setBlogsVisible(false)
    dispatch(setNotification(`A new blog: ${blogObject.title} by ${blogObject.author} added`, 'gg', 2))
  }

  const hideWhenVisible = { display: blogsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogsVisible ? '' : 'none' }

  const sortedList = blogsRedux.sort((a,b) => (a.likes < b.likes) ? 1 : -1)

  return (
    <div>
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick = {() => {
          window.localStorage.clear()
          setUser(null)}}> Log out </button>
      </p>
      {sortedList.map(blog =>
        <Blog key={blog.id} blog={blog} users={user} blogs={blogsRedux}/>) }
      <div style={hideWhenVisible}> <button onClick={() =>
        setBlogsVisible(true)}> Create </button>
      </div>
      <div style={showWhenVisible}>
      </div>
      <h2>Create new</h2>
      <form onSubmit={newBlog}>
        <div> Title: <input id='title' type="text" value={title} name="title" onChange={({ target }) => {setTitle(target.value)}}/></div>
        <div> Author: <input id='author' type="text" value={author} name="author" onChange={({ target }) => {setAuthor(target.value)}}/></div>
        <div> Url: <input id='url' type="text" value={url} name="url" onChange={({ target }) => {setUrl(target.value)}}/></div>
        <button id='create' type="submit">Create</button>
      </form>
      <button onClick={() => setBlogsVisible(false)}> Cancel </button>
    </div>
  )
}

export default BlogForm