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
  const isRootPath = (location.pathname === rootPath) || (location.pathname === '/talks') || (location.pathname === '/talks/') || (location.pathname === '/subscribe/') || (location.pathname === '/subscribe')
  let header = isRootPath && (
    <div className="main-heading">
      <div className="logo-box2">
        <Link to="/">
          <img
            src={"https://scontent.fsdv3-1.fna.fbcdn.net/v/t1.6435-1/118732079_10223558435893099_3741007992127305573_n.jpg?stp=dst-jpg_p480x480&_nc_cat=109&ccb=1-5&_nc_sid=7206a8&_nc_ohc=jsd8q3Yc6HEAX_2UsFi&tn=s-Jpzaq8jx_ZoXCH&_nc_ht=scontent.fsdv3-1.fna&oh=00_AT9Si4cy8izn9PvkLCQpD1NK7tdiXWT2q1FL0MMzwd7rMQ&oe=62986D0A"}
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
            <Link to="/subscribe" activeClassName="active-emo-menu-item">
                <div className="emo-menu-item">
                    🛎️ Subscribe
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