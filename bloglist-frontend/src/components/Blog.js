/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, users }) => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  const voteBlog = async (blog) => {
    const newBlog = { ...blog, likes : blog.likes +1 }
    dispatch(likeBlog(newBlog))
  }

  const RemoveBlog = () => {
    if (blog.user.username === users.username) return (
      <button id='remove' onClick={() => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
          dispatch(removeBlog(blog.id))
      }}> Delete
      </button>
    )
    else return <p>moi</p>
  }

  const [allInfo, showAll] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleShow = () => {
    showAll(!allInfo)
  }

  const handleVote = () => {
    voteBlog(blog)
  }

  if (allInfo === false)
    return (
      <li className='blog'>
        <div style={blogStyle}><div>
          {blog.title} by {blog.author}
          <button id='view' onClick={handleShow}>View</button>
        </div>
        </div>
      </li>
    )

  else {
    return (
      <li className='all'>
        <div style={blogStyle}><div>
          <p>{blog.title} <button onClick={handleShow}> Hide </button></p>
          <p> {blog.author} </p>
          {/*eslint-disable-next-line no-unused-vars */}
          <p> Likes {blog.likes} <button id='like' onClick={handleVote}> Vote</button> </p>
          <p> {blog.url}</p>
          <p> {blog.user.name}</p>
          {RemoveBlog()}
        </div>
        </div>
      </li>
    )
  }
}

export default Blog
