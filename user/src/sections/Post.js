import { Box, makeStyles, Typography } from '@material-ui/core'
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarIcon from '@material-ui/icons/Star';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { likePost } from '../service/api';

function Post({post}) {
    const useStyles =makeStyles(theme => ({
        blog:{
            height:360,
            width:237,  
            margin:9,
            // borderRadius:10,
            marginRight: '18px',
            [theme.breakpoints.down('md')]: {
                marginRight: 0
            },
            border:'1px outset #ffffff5c',
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between',
            // alignItems:'center',
            // background:'white
            
            '& > *':{
            fontFamily:'Macan,Helvetica Neue,Helvetica,Arial,sans-serif'
            }
        },
        image: {
            width: '100%',
            objectFit: 'cover',
            // borderRadius: '10px 10px 0 0',
            height: 140
        },  
        text:{
            wordBreak:'break-all',
            padding:'0 12px 5px'
        },
        name:{
            fontFamily:'Luminari',
            fontSize:20,
            padding:'12px 12px 8px'
        },
        title:{
            fontFamily:'Audiowide',
            fontSize:21,
            textAlign:'center'
        },
        profile:{
            width:'25px',
            verticalAlign:'middle'
        },
        writeup:{
            wordBreak:'break-word'
        },
        likes:{
            height:30,
            padding:'20px 12px',
            display:'flex',
            alignItems:'center',
            borderTop:'1px inset #d1d1d1',
            borderTopWidth:2,
            '& > *':{
                cursor:'pointer'
            }
            
        }



        
    }))
    const classes = useStyles()
    const [rpost,setRpost]=useState(post)
    const url=post.picture || "https://fiverr-res.cloudinary.com/t_gig_cards_web,q_auto,f_auto/gigs/167057682/original/3e98bd70ba72f6ef26ef6db25e22c75b83e8ab3f.jpg"
    const profile_url="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
    const addEllipsis = async (str, limit) => {
        return await str.length > limit ? str.substring(0, limit) + '...' : str;
    } 
    const unlikeblog = async () =>{
        const user=post.author;
        let blog = await likePost(post._id,user,-1)
        setRpost(blog)
    }
    const likeblog = async () =>{
        const user=post.author;
        let blog = await likePost(post._id,user,1)
        setRpost(blog)
    }

    
  return (
    <Box className={classes.blog}>
        <Link to={`/viewblog/${post._id}`} style={{textDecoration:'none',color:'inherit'}}>
        <Box>
        <img src={url} alt="" style={{height:150}} className={classes.image}/>
        <Typography className={classes.name}><img src={profile_url} className={classes.profile}/> {rpost.author}</Typography>
        <Typography className={classes.title}>{post.title}</Typography>
        <Typography className={classes.text}>{post.writeup.length > 60? post.writeup.substring(0, 60) + '...' : post.writeup}</Typography>
        </Box>
        </Link>
        <footer className={classes.likes} >
            
            <FavoriteIcon onClick={() => rpost.userLike.includes(post.author) ? unlikeblog() : likeblog()} style={{color:rpost.userLike.includes(post.author) ? 'red':''}}/>
            &nbsp;&nbsp;{rpost.like}
        </footer>
    </Box>
  )
}

export default Post