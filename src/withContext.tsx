import React from 'react'
import { useAnimatedScale, useDimension } from './hooks'

const withContext = (MainComponent : React.FC<any>) : React.FC<any> => {
    return () => {
        const {w, h} = useDimension()
        const {start : onClick, scale} = useAnimatedScale()
        const props = {
            w, 
            h, 
            onClick,
            scale 
        }
        return (
            <MainComponent {...props}>
            </MainComponent>
        )
    }
}

export default withContext 