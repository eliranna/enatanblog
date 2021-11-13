import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <div className="main-heading">
        <div className="logo-box">
          <Link to="/">
            <img
              src="/icons/god.png"
              width={40}
              quality={95}
              alt="Profile picture"
            />
          </Link>
        </div>
        <div className="bio-box">
          Notes on artificial intelligence and the nature of the mind
        </div>
        <div className="credit-box">
          <div className="blog-by">
            Blog by
          </div>
          <div className="blog-by-name">
            Eliran Natan
          </div>
        </div>
      </div>
    )
  } else {
    header = false && (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

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
