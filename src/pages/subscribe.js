import * as React from "react"
import { Link, graphql, navigate } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout2"
import Seo from "../components/seo"

const subscribe = (email) => {
    fetch("https://express-vercel-kpozr2pf5-eliranna.vercel.app/api/subscribe",
    {   method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email})
    }).then(function(res){
        console.log(res) 
      if (res.ok) {
          return res.json();
      } else {
        console.log('failed')
      }})
  }

  const subscribe2 = (email) => {
    fetch("https://express-vercel-kpozr2pf5-eliranna.vercel.app/api/subscribe",
    {   method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    }).then(function(res){
        console.log(res) 
      if (res.ok) {
          return res.json();
      } else {
        console.log('failed')
      }})
  }

const Subscribe = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
 
    <Layout location={location} title={siteTitle}>
      <Seo title="Subscribe" />   
        <form action="https://getform.io/f/75cf1114-4dfd-4bdd-a9a2-d9e114ecb163" method="POST">
            <input type="text" name="name"/>
            <input type="email" name="email"/>
            <button type="submit">Send</button>
        </form>
    </Layout>
    
  )
}

export default Subscribe

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
