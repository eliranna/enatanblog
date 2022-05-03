import * as React from "react"
import { Link, graphql, navigate } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout2"
import Seo from "../components/seo"


const Blog = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = [
    {
      conf: "ReactSummit",
      title: "Sharing is Caring: (How) Should Micro Frontends Share State?",
      location: "Online",
      date: "June 17th, 2022",
      upcoming: true,
      sticker: "https://pbs.twimg.com/media/FRK99g6XwAAX1VS?format=jpg&name=900x900"
    },
    {
      conf: "JNation",
      title: "The Age of Hooks: Framework-agnostic Front Ends Might be Surprisingly Powerful",
      location: "Coimbra, Portugal",
      date: "June 7th, 2022",
      upcoming: true,
      sticker: "https://scontent.fsdv3-1.fna.fbcdn.net/v/t39.30808-6/279388964_10227649022075197_5515045120749158088_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=n78St9lP_CQAX8qPW6z&_nc_ht=scontent.fsdv3-1.fna&oh=00_AT_hH78juEp-T9LtsIQO23lyaK7NZurIbSgv-spFY1J1nQ&oe=62766F4E"
    },
    {
      conf: "Lemon.io",
      title: "Building Domain-driven Frontends",
      location: "Online",
      date: "May 5th, 2022",
      upcoming: true,
      sticker: "https://scontent.fsdv3-1.fna.fbcdn.net/v/t39.30808-6/279317863_10166590351365495_4191961103096105059_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=fPWD-a-AWN0AX9bhrT1&_nc_ht=scontent.fsdv3-1.fna&oh=00_AT9RMxRYSUvwv9jYW9EwjUYshfdYI_aOY5Te1ibDD4n0Cg&oe=62761591"
    },
    {
      conf: "ReactSummit",
      title: "Build UIs that Learn - Intelligent Prefetching with React and TensorFlow.js",
      location: "Online",
      date: "April 16th, 2021",
      sticker: "https://pbs.twimg.com/media/ExRZnQGW8AEFpYJ?format=jpg&name=large"
    },
    {
      conf: "WeAreDevelopers",
      title: "Discover the powerful combination of UI and AI",
      location: "Online",
      date: "March 24th, 2021",
      sticker: "https://pbs.twimg.com/media/ExRiXhkW8AEc9JS?format=jpg&name=900x900"
    },
    {
      conf: "Hackages",
      title: "Domain-Driven Design with CQRS and Event Sourcing",
      location: "Online",
      date: "November 26th, 2020"
    }
  ]



  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
 
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />   
      <ol style={{ listStyle: `none` }} className="posts-list">
        {posts.map(post => {
          return (
            <div className="talk">
              
              <div className="upcoming-talk">
                  
              </div>             
              <div className="talkloc">
                <mark className="conf">#{post.conf}</mark> <span className="talkLocation">📍{post.location}</span>
              </div>
              <div className="talkTitle">
                <span>{post.title}</span>
              </div>
              <div className="talkdet">
                <span className="talkDate">⏱️ {post.date}</span>
              </div>
              <div className="talk-sticker">
                <img src={post.sticker}/>
              </div>
            </div>

          )
        })}
      </ol>
    </Layout>
    
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          public
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
