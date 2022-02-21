import React from 'react'
import { makeStyles, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Pic.css'
const useStyles = makeStyles({
    
    link:{
        textDecoration:'none',
        color:'var(--black)',
        zIndex:500,
        '&:hover' :{
            opacity:0.9
        }
    }
})
function Pic() {
    const classes = useStyles()
  return (
    <div className="image">
        <Link to='/createblog' className={classes.link}><button style={{fontSize:25,fontWeight:1000,borderRadius:20,fontFamily:'Arial',cursor:'pointer'}}>Create BLOG</button></Link>
    </div>
)
}

export default Pic