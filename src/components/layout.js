import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import logo from "../images/god.png"

const BLOG_LOGO = logo;
const BLOG_NAME = "על טבעה של הדַּעַת";
const BLOG_TOPIC = "נושאים בפילוסופיה";
const BLOG_IS_WRITTEN_BY = "בלוג מאת";
const BLOG_AUTHOR_NAME = "אלירן נתן";

const isActive = false;
const showSidebarOnInnerPages = false;

const Layout = ({ location, title, children }) => {

  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  let sidebar = (
    <div className="side-bar">
      <div className="logo">
        <Link to="/">
          <img
            src={BLOG_LOGO}
            quality={95}
            alt="logo"
          />
        </Link>        
      </div>
      <div className="blog-about">
        <div className="blog-title">
          <span>
            {BLOG_NAME}
          </span>
        </div>
        <div className="blog-topic">
          <span>
            {BLOG_TOPIC}
          </span>
        </div>
      </div>
      <div className="blog-credit">
        <div className="written-by">
          <span>
           {BLOG_IS_WRITTEN_BY}
          </span>
        </div>
        <div className="author-name">
          <span>
            {BLOG_AUTHOR_NAME}
          </span>
        </div>
      </div>
    </div>
  )

  let topbar = (
    <div className="top-bar">
      <div className="about-blog">
        <div className="logo">
          <Link to="/">
            <img
              src={logo}
              quality={95}
              alt="logo"
            />
          </Link>        
        </div>
        <div className="blog-details">
          <div className="blog-name">
            {BLOG_NAME}
          </div>
          <div className="blog-topic">
            {BLOG_TOPIC}
          </div>
        </div>
      </div>
    </div>
  )

  const showSidebar = isRootPath || (!isRootPath && showSidebarOnInnerPages)
  const showTopbar = !isRootPath

  return isActive ? (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      {showTopbar ? <header>{topbar}</header> : null}
      {isRootPath ? <div className="spacer16"></div> : null}
      <div className="main">
        {showSidebar ? <header>{sidebar}</header> : null}
        <main className="content">{children}</main>
      </div>
    </div>
  ) : <p className="come-again">בונים כאן משהו מגניב, נפגש בקרוב!</p>
}

export default Layout
