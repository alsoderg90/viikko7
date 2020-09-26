import React from 'react'
import { Link } from 'react-router-dom'

const Users = (users) => {

  if (users.users !== null) {
    return (
      <div>
        <h2>Users</h2>
        <table align="left">
          <tbody>
            <tr>
              <td></td>
              <td><b>Blogs created</b></td>
            </tr>
            {users.users.map((user,i) =>
              <tr key={i}><td> <Link to={`/users/${user.id}`}>
                {user.name}</Link></td><td>{user.blogs.length}</td></tr>)}
          </tbody>
        </table>
      </div>
    )
  }
  else return null
}

export default Users