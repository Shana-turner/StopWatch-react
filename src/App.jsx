import { useEffect, useState } from 'react'
import './App.css'

function App(){
  const [time, setTime] = useState(0);
  const[isActive, setIsActive] = useState(false);
  const [lap, setLap] = useState([]);

  //add time
  useEffect(()=>{
    let interval =  null;

    if(isActive){
      interval = setInterval(()=>{
        setTime(prevTime => prevTime + 10);
      }, 10)
    }else if(!isActive && time !==0){
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [isActive, time])

  const toggleStartStop = ()=>{
    setIsActive(!isActive);
  }
  
  const resetStopWatch = ()=>{
    setIsActive(false);
    setTime(0);
    setLap([]);
  }

  const lapStopWatch = ()=>{
    setLap([...lap, formatTime(time)]);
  }

  const formatTime = (time) =>{
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor(time/1000) % 60}`.slice(-2);
    const minutes = `0${Math.floor(time/60000) % 60}`.slice(-2);
    return `${minutes}:${seconds}:${getMilliseconds}`;
  }

  return <div className='flex flex-col gap-5'>
  <h1 className='text-sky-500'>StopWatch</h1>
  <span>{formatTime(time)}</span>
  <div className='flex flex-row gap-5'>
    <button 
      onClick={toggleStartStop} 
      className='hover:border-sky-300 hover:text-sky-300 focus:outline focus:outline-sky-300'>
      {isActive ? 'Stop' : 'Start'}
    </button>
    <button 
      onClick={resetStopWatch} 
      className='hover:border-sky-400 hover:text-sky-400 focus:outline focus:outline-sky-400' >
      Reset
    </button>
    <button 
      onClick={lapStopWatch} 
      disabled={!isActive}  
      className='hover:border-sky-500 hover:text-sky-500 focus:outline focus:outline-sky-500' >
      Lap
    </button>
  </div>
  {lap.length > 0 && (
    <div>
      <ul>
        {lap.map((laps, index)=>(
          <li key={index}>{`Lap ${index + 1}: ${laps}`}</li>
        ))}
      </ul>
    </div>
  )}

</div>
}

export default App
