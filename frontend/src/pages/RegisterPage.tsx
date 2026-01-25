import '../css/login-page.css'
import { Link } from 'react-router'
import React, { useState, useEffect } from 'react'
import { useRegister } from '../hooks/useRegister'
import { useNavigate } from 'react-router'

export const RegisterPage = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const navigate = useNavigate();

  const {registerReq, loading, error, user} = useRegister();

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      await registerReq(username, email, password);
  }

  useEffect(() => {
      if(user) {
        localStorage.setItem('accessToken', user.accessToken);
        navigate('/');
      }
  }, [user, navigate])

  return (
    <div className='login-div'>
      <h1 className='login-heading black'>Sign Up</h1>
      <form action="" className="login" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {handleSubmit(e)}}>
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

        <button type='submit'>{loading ? "wait..." : "submit"}</button>
        {error && (
          <div>{error}</div>
        )}
      </form>
      <div className='black'>
        Already have an account, <Link to={'/login'}>login</Link> instead
      </div>
    </div>
  )
}
