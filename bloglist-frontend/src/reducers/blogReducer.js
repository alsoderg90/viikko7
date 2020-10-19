import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log(state, 'tila', action, 'action')
  switch(action.type) {
  case('INIT'):
    return action.blogs
  case('CREATE'):
    return state.concat(action.data)
  case('LIKE'):
    return state.map(blog => blog.id === action.data.id ? action.data : blog )
  case('DELETE'):
    console.log(state,'1')
    state = state.filter(blog => blog.id !== action.data)
    console.log(state,'2')
    return state
  default: return state
  }
}

export const removeBlog = (id) => {
  console.log('poista', id)
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog.id, blog)
    //console.log(blog)
    dispatch({
      type:'LIKE',
      data: blog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      blogs
    })
  }
}

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    console.log(blogObject, newBlog)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}


export default blogReducer