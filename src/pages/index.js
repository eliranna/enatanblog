import * as React from "react"
import { Link, graphql, navigate } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout2"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes


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
          if (!post.frontmatter.public) {return}
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug} className="post-item-list2">
              <article
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                <div className="post-details2"><div className="post-date-span">⏱️ {post.frontmatter.date}</div></div>
                  <h2 className="blog-post-title-h2">
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline" className="blog-post-title"><mark>{title}</mark></span>
                    </Link>
                  </h2>
                 
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                    className="post-details2-desc"
                  />
                   
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
    
  )
}

export default BlogIndex

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
