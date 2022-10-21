import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import logo from "../images/god.png"

const categoryTitels = {
  GREEK_PHILOSOPHY: 'פילוסופיה יוונית',
  GREEK_PHILOSOPHY2: 'פילוסופיה חדשה'
}

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes 

  const postsList = []
  posts.forEach(post => {
    if (!post.frontmatter.public) return
    const category = post.frontmatter.category
    const indexOfCategory = postsList.findIndex(e => e.category === category);
    if (indexOfCategory > -1) {
      postsList[indexOfCategory].posts.push(post)
    } else {
      postsList.push({
        category,
        posts: [post]
      })
    }
  });

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Philosophy Notebook | Eliran Natan" />
        <p>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Philosophy Notebook | Eliran Natan" />   
      <div className="home-header">
        <div className="home-header-logo">
          <img src={logo}/>
        </div>
        <div className="home-header-title">
          <span>מחברת פִילוֹסוֹפְיָה</span>
        </div>
        <div className="home-header-creds">
          <span className="written-by">נכתב ע״י</span>
          <span className="written-by-name">אלירן מלר נתן</span>
        </div>
      </div>
      <div className="seperator">
        ~
      </div>
      <div className="table-of-content">
        {postsList.map(category => {
          return (
            <div className="category">
              <div className="category-title">
                {categoryTitels[category.category]}
              </div>
              {
                category.posts.map(post => {
                  if (!post.frontmatter.public) {return}
                  const title = post.frontmatter.title || post.fields.slug
                  return (
                    <div className="post-entry">
                      <Link to={post.fields.slug}>
                        <span>{title}</span>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          )
        })}
      </div>

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
          category
        }
      }
    }
  }
`
