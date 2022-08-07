import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import logo from "../images/god.png"

const isActive = false;

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header = (
    <div className="side-bar">
      <div className="logo">
        <Link to="/">
          <img
            src={logo}
            quality={95}
            alt="logo"
          />
        </Link>        
      </div>
      <div className="blog-about">
        <div className="blog-title">
          <span>
            על טבעה של הדַּעַת 
          </span>
        </div>
        <div className="blog-topic">
          <span>
            נושאים בפילוסופיה 
          </span>
        </div>
      </div>
      <div className="blog-credit">
        <div className="written-by">
          <span>
          בְּלוֹג מאת
          </span>
        </div>
        <div className="author-name">
          <span>
            אלירן נתן
          </span>
        </div>
      </div>
    </div>
  )

  return isActive ? (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header>{header}</header>
      <main className="content">{children}</main>
    </div>
  ) : <p className="come-again">האתר הזה נמצא תחת בנייה. נפגש בקרוב!</p>
}

export default Layout
