import '../css/login-page.css'
import { Link } from 'react-router'
import React, { useState } from 'react'

export const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  return (
    <div className='login-div'>
      <h1 className='login-heading black'>Sign Up</h1>
      <form action="" className="login">
        <div className='flex'>
        <label htmlFor="username">Username</label>
        <input 
        type="text" 
        placeholder="username:" 
        value={username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
        />
        </div>

        <div className='flex'>
        <label htmlFor="email">Email</label>
        <input 
        type="email" 
        name="email" 
        id="email" 
        placeholder="email:"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
        </div>
        <div className='flex'>
        <label htmlFor="password">Password</label>
        <input 
        type="password" 
        placeholder="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setPassword(e.target.value))}
        />
        </div>

        <button type='submit'>Submit</button>
      </form>
      <div className='black'>
        don't have an account, <Link to={'/register'}>signup</Link> instead
      </div>
    </div>
  )
}
