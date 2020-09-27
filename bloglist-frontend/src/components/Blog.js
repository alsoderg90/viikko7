import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Button } from './StyledComponents'

const Blog = () => {

  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const voteBlog = async (blog) => {
    const newBlog = { ...blog, likes : blog.likes +1 }
    dispatch(likeBlog(newBlog))
  }

  const RemoveBlog = () => {
    return (
      <Button id='remove' onClick={() => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
          dispatch(removeBlog(blog.id))
      }}> Delete
      </Button>
    )
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVote = () => {
    voteBlog(blog)
  }

  if (blog !== undefined) {
    return (
      <li className='all'>
        <div style={blogStyle}><div>
          <p>{blog.title}</p>
          <p> {blog.author} </p>
          <p> Likes {blog.likes} <Button id='like' onClick={handleVote}> Vote</Button> </p>
          <p> {blog.url}</p>
          <p> Added by {blog.user.name}</p>
          {RemoveBlog()}
        </div>
        </div>
      </li>
    )
  }
  else return null

}

export default Blog
