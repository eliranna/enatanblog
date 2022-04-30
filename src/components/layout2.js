import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { navigate } from 'gatsby'

import logo from "../images/me.png"

const goToBlog = () => {
    navigate('/blog')
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = (location.pathname === rootPath) || (location.pathname === '/talks')
  let header = isRootPath && (
    <div className="main-heading">
      <div className="logo-box2">
        <Link to="/">
          <img
            src={logo}
            width={100}
            height={100}
            quality={95}
            style={{borderRadius: "100%", border: "8px solid #FFD479"}}
            alt="Profile picture"
          />
        </Link>
      </div>
        <div className="blog-by-name2">
            Eliran Natan
        </div>  
        <div className="bio-box-2">
            Software Architect at <a className="mark-link" href="https://www.axonius.com" target="_blank"><mark>#Axonius</mark></a>
        </div> 
        <div className="emo-menu">
            <Link to="/" activeClassName="active-emo-menu-item">
                <div className="emo-menu-item">
                    ✏️ Blog
                </div>
            </Link>
            <Link to="/talks" activeClassName="active-emo-menu-item">
                <div className="emo-menu-item">
                    💬 Speaking
                </div>
            </Link>
        </div>

    </div>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main className="main">{children}</main>
      {false && 
      <footer>
        © {new Date().getFullYear()}
        {` `}
      </footer>
      }
    </div>
  )
}

export default Layout