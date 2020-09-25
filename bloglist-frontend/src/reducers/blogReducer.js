import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case('INIT'):
    return state = action.blogs
  case('CREATE'):
    return state.concat(action.data)
  default: return state
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