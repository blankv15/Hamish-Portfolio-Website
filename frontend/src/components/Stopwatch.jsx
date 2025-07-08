import React, { useState, useEffect, useRef } from "react"
import './Stopwatch.css'

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null)
    const startTimeRef = useRef(0)

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(
                () => {
                    setElapsedTime(Date.now() - startTimeRef.current);
                }
            )
        }
        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning])

    function start() {
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsedTime;

    }
    function stop() {

        setIsRunning(false)

    }
    function reset() {
        setElapsedTime(0)
        setIsRunning(false)

    }
    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let min = Math.floor(elapsedTime / (1000 * 60) % 60);
        let sec = Math.floor(elapsedTime / 1000 % 60);
        let miliSec = Math.floor((elapsedTime % 1000) /10 );

        hours = String(hours).padStart(2,0)
        min = String(min).padStart(2,0)
        sec = String(sec).padStart(2,0)
        miliSec = String(miliSec).padStart(2,0)




        return `${hours}:${min}:${sec}:${miliSec}`

    }

    return (<>
        <div className="stopwatch">

            <div className="display"> {formatTime()}</div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop}>Stop</button>
                <button className="reset-button" onClick={reset}>Reset</button>


            </div>


        </div>


    </>);
}

export default Stopwatch;
