import './navbar.scss'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import ReorderOutlinedIcon from '@mui/icons-material/ReorderOutlined'
import React, { useContext, useEffect } from 'react'
import Avatar from 'react-avatar'
import { Link } from 'react-router-dom'
import { DarkModeContext } from '../../context/darkModeContext'
import useLocalStorage from 'use-local-storage'

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext)
  const defaultDark = useContext(DarkModeContext).darkMode
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? true : false)

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme))
  }, [theme])
  const switchTheme = () => {
    const newTheme = theme === true ? false : true
    setTheme(newTheme)
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          {theme ? (
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => {
                switchTheme(theme)
                dispatch({ type: 'MODE' })
              }}
            />
          ) : (
            <DarkModeIcon
              className="icon"
              style={{ color: '#243a52' }}
              onClick={() => {
                switchTheme(theme)
                dispatch({ type: 'MODE' })
              }}
            />
          )}
        </div>
        <div className="items">
          <Link to={'/notification'}>
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="couter"></div>
          </Link>
        </div>
        <div className="items">
          <Avatar className="avatar" name={localStorage.getItem('fullname')} />
          {/* <img
            src="https://scontent.fsgn5-11.fna.fbcdn.net/v/t39.30808-6/306270860_3298140720458506_3713114337754087711_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=FGP8MS6oV-gAX8taVEq&_nc_ht=scontent.fsgn5-11.fna&oh=00_AT8OvTv8zRndTwKqLh-t1H7ec3Rh-uw4yNejjn-k0wA5hg&oe=635E6371"
            alt="avatar"
            className="avatar"
          /> */}
        </div>
        {/* <div className="items">
          <ReorderOutlinedIcon className="icon" />
        </div> */}
      </div>
    </div>
  )
}

export default Navbar
