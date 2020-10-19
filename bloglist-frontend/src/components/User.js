import React from 'react'
import { useParams } from 'react-router-dom'
import { Table } from '../components/StyledComponents'

const User = ( users) => {
  const id = useParams().id
  console.log(users,'moi')

  if (users.users !== null) {
    const user = users.users.find(user => user.id === id)
    return (
      <Table>
        <h2>
          {user.name}
        </h2>
        <p><b>Added Blogs</b></p>
        <ul>
          {user.blogs.map(blog => <li key={blog.id}>  {blog.title}</li>)}
        </ul>
      </Table>

    )
  }
  else return null


}

export default User