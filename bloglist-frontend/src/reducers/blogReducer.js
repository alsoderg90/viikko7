import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log(state, 'tila')
  switch(action.type) {
  case('INIT'):
    return state = action.blogs
  case('CREATE'):
    return state.concat(action.data)
  case('LIKE'):
    return state.map(blog => blog.id === action.data.id ? action.data : blog )
  case('DELETE'):
    return state.filter(state => state.id !== action.id)
  default: return state
  }
}

export const removeBlog = (id) => {
  console.log('poista')
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'DELETE',
      data: id
    })
  }
}

export const likeBlog = (blog) => {
  console.log('like')
  return async dispatch => {
    const updatedBlog = await blogService.update(blog.id, blog)
    dispatch({
      type:'LIKE',
      data: updatedBlog
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
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}


export default blogReducer