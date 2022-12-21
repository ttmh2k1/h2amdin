import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../commons/assets/brand.png'
import { links } from './data'
import './sidebarStyle.scss'

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="header">
          <Link to="/">
            <img
              src={logo}
              className="logo"
              alt="H2 Store"
              style={{
                maxWidth: '100%',
                width: '12rem',
                height: '4rem',
              }}
            />
          </Link>
        </div>
        <ul className="links">
          {links.map((link) => {
            const { name, items } = link
            return (
              <>
                <p className="name">{name}</p>
                {items.map((item) => {
                  const { url, text, icon } = item
                  return (
                    <a href={url} className="items">
                      {icon}
                      {text}
                    </a>
                  )
                })}
              </>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default Sidebar
