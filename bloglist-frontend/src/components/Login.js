import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input } from './StyledComponents'

const LoginForm = ({
  setUsername,
  setPassword,
  username,
  password,
  handleLogin
}) => {

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <div> Username
          <Input
            id='username'
            type ="username"
            value={username}
            name='Username'
            onChange = {setUsername}
          />
        </div>
        <div> Password
          <Input
            id='password'
            type = "password"
            value = {password}
            name = "password"
            onChange = {setPassword}
          />
        </div>
        <Button id='login-button' type="submit" primary=''>Login</Button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm