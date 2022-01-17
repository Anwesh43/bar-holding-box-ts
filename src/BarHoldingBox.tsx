import React from 'react'
import { useStyle } from './hooks'
import withContext from './withContext'

interface BHBProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : Function 
}

const BarHoldingBox = (props : BHBProps) => {
    const {barStyle, boxStyle, parentStyle} = useStyle(props.w, props.h, props.scale)
    return (
        <React.Fragment>
            <div style = {parentStyle()}>
                <div style = {barStyle()} onClick = {() => props.onClick()}></div>
                {[0, 1].map(i => (<div key = {`box_${i}`} style = {boxStyle(i)}></div>))}
            </div>
        </React.Fragment>
    )
}

export default withContext(BarHoldingBox)