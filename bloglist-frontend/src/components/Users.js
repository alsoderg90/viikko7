import React from 'react'
import { Link } from 'react-router-dom'
import { Tr, Td, Table } from './StyledComponents'

const Users = (users) => {

  if (users.users !== null) {
    return (
      <div>
        <h2>Users</h2>
        <Table align="left">
          <tbody>
            <Tr>
              <Td></Td>
              <Td><b>Blogs created</b></Td>
            </Tr>
            {users.users.map((user,i) =>
              <Tr key={i}><td> <Link to={`/users/${user.id}`}>
                {user.name}</Link></td><td>{user.blogs.length}</td></Tr>)}
          </tbody>
        </Table>
      </div>
    )
  }
  else return null
}

export default Users