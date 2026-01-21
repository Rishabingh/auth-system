import '../css/login-page.css'

export const LoginPage = () => {
  return (
    <div className='login-div'>
      <h1 className='login-heading'>login</h1>
      <form action="" className="login">
        <div className='flex'>
        <label htmlFor="username">Username</label>
        <input type="text" placeholder="username:" />
        </div>

        <div className='flex'>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="email:" />
        </div>
        <div className='flex'>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder="password" />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
