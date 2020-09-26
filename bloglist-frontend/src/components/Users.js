import React from 'react'


const Users = (users) => {

  console.log(users.users)

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
            <tr key={i}><td>{user.name}</td><td>{user.blogs.length}</td></tr>)}
        </tbody>

      </table>
    </div>
  )

}

export default Users