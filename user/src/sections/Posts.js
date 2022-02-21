import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, useLocation } from 'react-router-dom'
import Post from './Post'
import { getAllBlogs } from '../service/api.js'
function Posts() {
    // let posts=[1,2,3,4,5,6,7,8,9]
    const [posts,setPosts] =useState([])
    let query = useLocation()
    useEffect(()=>{
      const fetchData = async () =>{
        let data = await getAllBlogs(query)
        // console.log(data)
        setPosts(data)
      }
      fetchData();
    },[query])
  return (
    posts.map(post => (
        <div>
            {/* <Link to={`/viewblog/${post._id}`} style={{textDecoration:'none',color:'inherit'}}> */}
            <Post post={post}/>
            {/* </Link> */}
        </div>
    ))
  )
}

export default Posts