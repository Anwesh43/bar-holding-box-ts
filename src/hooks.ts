import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.01
const delay : number = 20

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 

                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    })
    return {
        w, 
        h, 
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)


export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const background = 'indigo'
    const barWidth = Math.min(w, h) / 6
    const barHeight = Math.min(w, h) / 15 
    const midX = w / 2 
    const midY = h / 2
    const sf : number = sinify(scale)
    const sf1 : number = divideScale(sf, 0, 4)
    const sf2 : number = divideScale(sf, 1, 4)
    const sf3 : number = divideScale(sf, 2, 4)
    const sf4 : number = divideScale(sf, 3, 4)
    return {
        parentStyle() : CSSProperties {
            const left = `${midX}px`
            const top = `${midY + (h / 2 - barHeight) * sf4}px`
            const transform = `rotate(${180 * sf3}deg)`
            return {
                position,
                top, 
                left,
                transform
            }
        },

        barStyle() : CSSProperties {
            const left = `${-barWidth / 2}px`
            const top = `${-barHeight / 2}px`
            const width = `${barWidth}px`
            const height = `${barHeight}px`
            return {
                position, 
                left, 
                top,
                width, 
                height, 
                background
            }
        },

        boxStyle(i : number) : CSSProperties {
            const top = `${-barHeight - h / 2 + (h / 2 - barHeight / 2) * sf1}px`
            const left = `${(-barWidth / 2 + (barWidth - barHeight) * i)  *  (1 - sf2) - barHeight * 0.5 * sf2}px`
            const width = `${barHeight}px`
            const height = `${barHeight}px`
            return {
                position, 
                left, 
                top, 
                width, 
                height,
                background  
            }
        }
    }
}