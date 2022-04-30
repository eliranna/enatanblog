import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import logo from "../images/god.png"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header = (
    <div className="main-heading">
      <div className="logo-box">
        <Link to="/">
          <img
            src={logo}
            width={40}
            quality={95}
            alt="Profile picture"
          />
        </Link>
      </div>
      {isRootPath && 
        <div className="spacer"/>
      }
      {isRootPath && 
        <div className="bio-box">
          Notes on artificial intelligence and the nature of the mind
        </div>}
      {isRootPath && 
        <div className="credit-box">
        <div className="blog-by">
          Blog by
        </div>
        <div className="blog-by-name">
          Eliran Natan
        </div>
      </div>}
    </div>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main className="main">{children}</main>
      {true && 
      <footer>
        ©ssss {new Date().getFullYear()}
        {` `}
      </footer>
      }
    </div>
  )
}

export default Layout
