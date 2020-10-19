import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, initBlogs } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'
import { Button, ButtonLO } from './StyledComponents'
import { Redirect } from 'react-router-dom'

const Blog = () => {

  const dispatch = useDispatch()
  const [redirect, setRedirect] = useState(false)
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)
  dispatch(initBlogs)


  const voteBlog = async (blog) => {
    const newBlog = { ...blog, likes : blog.likes +1 }
    dispatch(likeBlog(newBlog))

  }

  const RemoveBlog = () => {
    return (
      <Button id='remove' onClick={() => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`))
        dispatch(initBlogs())
          dispatch(removeBlog(blog.id))
        setRedirect(true)
        dispatch(initBlogs())
      }}> Delete
      </Button>

    )
  }

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVote = () => {
    voteBlog(blog)
  }


  if (redirect) return <Redirect to="/"></Redirect>

  if (blog !== undefined) {
    return (
      <div style={blogStyle}><div>
        <p>{blog.title}</p>
        <p> {blog.author} </p>
        <p> Likes {blog.likes} <ButtonLO id='like' onClick={handleVote}> Vote</ButtonLO> </p>
        <p> {blog.url}</p>
        <p> Added by {blog.user.name}</p>
        {RemoveBlog()}
      </div>
      </div>
    )
  }

  else return null

}

export default Blog
