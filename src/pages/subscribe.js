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

const Subscribe = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
 
    <Layout location={location} title={siteTitle}>
      <Seo title="Subscribe" />   
        <div className="Subscribe-box">
            <button onClick={()=>subscribe("elsds@com")}></button>           
        </div>
        <form action="https://express-vercel-five-taupe.vercel.app/subscribe" method="POST">
            <input name="email" type="text"></input>
            <button>Send my greetings</button>
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
