import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout2"
import Seo from "../components/seo"

import "katex/dist/katex.min.css"

import logo from "../images/me.png"



const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className={`${post.frontmatter.type == "article" ? "blog-post": "tutorial"}`}
        itemScope
        itemType="http://schema.org/Article"
      >
        <header className="post-head">
          <div className="post-headline">
            <h1 itemProp="headline">{post.frontmatter.title}</h1>
          </div>
          <div className="post-owner">
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
            <div className="post-owner-name">
              <div className="post-owner-full-name">
                Eliran Natan
              </div>
              <div className="post-owner-role">
                SW Architect at <mark>#Axonius</mark>
              </div>              
            </div>           
          </div>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
          className="article-body"
        />
        <footer className="footer">
          <div className="rights">© 2021 — Eliran Natan</div>
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        type
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
