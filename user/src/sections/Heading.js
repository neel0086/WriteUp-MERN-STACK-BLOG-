import { makeStyles } from '@material-ui/core'
import React from 'react'
import './Heading.css'

function Heading({name,order}) {
    const useStyles =makeStyles({
        lines:{
          width:1000,
            borderColor:'black',
            border:'2px solid',
            borderWidth:2
        }   
    })
    const classes = useStyles()
    const x=name.indexOf(' ');
  return (
    <div className='head' >
        {/* <hr aria-hidden='true' style={{height:0,width:'3%'}} className={classes.lines} /> */}
        <span style={{display:'flex'}}><h1 className='headstyle' ><nobr>{name} </nobr></h1><h6 style={{display:'flex',alignItems:' center',filter:'invert(0.7)'}}>({order})</h6></span>
        {/* <p aria-hidden='true' className="lines" /> */}
    </div>
  )
}

export default Heading

// class="font-effect-emboss"