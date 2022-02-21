import { Grid, makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Heading from './Heading'
import Post from './Post'
import Posts from './Posts'
import './Categories.css'
import { useLocation } from 'react-router-dom'
import { getAllBlogs } from '../service/api'
function Categories() {
    const color=['#bc382e','#ff8000','#388d80','#577783']
    const blogOption=["TECHNOLOGY","ARTIFICIAL INTELLIGENCE","DARK WEB","SOCIAL"]
    let blogTag=useLocation().search
    blogTag = blogTag.substr(blogTag.indexOf("=") + 1)

    const [posts,setPosts] =useState([])
    const [likedpost,setLikedpost]=useState([])
    let query = useLocation()
    useEffect(()=>{
      const fetchData = async () =>{
        let data = await getAllBlogs(query)
        let unsorted  = data.slice();
        setPosts(unsorted)
        setLikedpost(data.sort((a, b) => {return b.like - a.like;}))
      }
      fetchData();
    },[query])
  return (
    <React.Fragment>
        <div>
            <div className="box1">
                <Heading name={blogTag} order="Recents"/>
                <div className="post_scroll">
                {posts.map(postt => (
                    <div>
                        {/* <Link to={`/viewblog/${post._id}`} style={{textDecoration:'none',color:'inherit'}}> */}
                        <Post post={postt}/>
                      
                        {/* </Link> */}
                    </div>
                ))}
                    
                </div >
            </div>
            <div className="box1">
                <Heading name={blogTag} order="Most popular"/>
                <div className="post_scroll">
                {likedpost.map(postt => (
                    <div>
                        {/* <Link to={`/viewblog/${post._id}`} style={{textDecoration:'none',color:'inherit'}}> */}
                        <Post post={postt}/>
                        {/* </Link> */}
                    </div>
                ))}
                    
                </div >
            </div>
            
        </div>
        
    </React.Fragment>
  )
}

export default Categories