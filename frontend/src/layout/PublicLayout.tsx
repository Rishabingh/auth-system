
import { Outlet } from 'react-router'
import './public.css'
export const PublicLayout = () => {
  return (
    <div className='main'>
        <Outlet />
    </div>
  )
}
