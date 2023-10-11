import { ArrowDownCircleFill, ArrowRepeat, ArrowUpCircleFill, PauseCircleFill, PlayCircleFill } from 'react-bootstrap-icons';
import './App.scss';
import { useEffect, useState } from 'react';
import sound from './pupu_tururu.mp3';

const WORK = 1500;
const REST = 300;
// const WORK = 5;
// const REST = 3;

const App = () => {
  const [rest, setRest] = useState(REST);
  const [work, setWork] = useState(WORK);
  const [display, setDisplay] = useState(work);
  const [turn, setTurn] = useState('Session');
  const [flow, setFlow] = useState(false);
  const [breakAudio] = useState(new Audio(sound));

  const playBreakSound = () => {
    breakAudio.currentTime = 0;
    breakAudio.play();
  }

  const convTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec - minutes * 60;
    return pad(minutes) + ':' + pad(seconds);
  };

  const pad = (d) => {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  const upRest = () => {
    if (flow === false) {
      setRest(rest + 60);
    }
  };

  const downRest = () => {
    if (flow === false) {
      setRest(rest - 60);
    }
  };

  const upWork = () => {
    if (flow === false) {
      setWork(work + 60);
    }
  };

  const downWork = () => {
    if (flow === false) {
      setWork(work - 60);
    }
  };

  const play = () => {
    if (flow === false) {
      setFlow(true);
      let interval = setInterval(update, 1000);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    } else {
      pause();
    }
  };

  const pause = () => {
    setFlow(false);
    clearInterval(localStorage.getItem('interval-id'));
  }

  const update = () => {
    if (display > 0) {
      setDisplay((display) => display - 1);
    } else {
      playBreakSound();
      if (turn === 'Session') {
        setTurn('Break');
        setDisplay(rest);
      } else {
        setTurn('Session');
        setDisplay(work);
      }
    }
  }

  const repeat = () => {
    setTurn('Session');
    setDisplay(work);
    if (flow === true) {
      play();
    }
    setRest(REST);
    setWork(WORK);
  };

  useEffect(() => {
    setDisplay(work);
  }, [work]);

  useEffect(() => {
    if (display < 0) {
      update();
    }
  }, [display]);

  return (
    <div className="container">
      <div className='app row'>
        <div className='col-12 clock my-auto text-center'>
          <div className='row'>
            <div className='col-12'>
              <h1>25 + 5 Clock</h1>
            </div>
          </div>
          <div className='row'>
            <div className='col-3'></div>
            <div className='col-3'>
              <div className='row'>
                <div className='col-12'>
                  <h3 id='break-label'>Break Length</h3>
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <ArrowDownCircleFill id='break-decrement' color="#ffb145" size={30} onClick={downRest} />
                </div>
                <div className='col-4'>
                  <p id='break-length'>{convTime(rest)}</p>
                </div>
                <div className='col-4'>
                  <ArrowUpCircleFill id='break-increment' color="#ffb145" size={30} onClick={upRest} />
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='row'>
                <div className='col-12'>
                  <h3 id='session-label'>Session Length</h3>
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <ArrowDownCircleFill id='session-decrement' color="#ffb145" size={30} onClick={downWork} />
                </div>
                <div className='col-4'>
                  <p id='session-length'>{convTime(work)}</p>
                </div>
                <div className='col-4'>
                  <ArrowUpCircleFill id='session-increment' color="#ffb145" size={30} onClick={upWork} />
                </div>
              </div>
            </div>
            <div className='col-3'></div>
          </div>
          <div className='row my-4'>
            <div className='col-4'></div>
            <div className='col-4 session'>
              <div className='row'>
                <div className='col-12'>
                  <h2 id='timer-label'>{turn}</h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <p id='time-left'>{convTime(display)}</p>
                </div>
              </div>
            </div>
            <div className='col-4'></div>
          </div>
          <div className='row mb-4 mt-3'>
            <div className='col-5'></div>
            <div className='col-1' id='start_stop' onClick={play}>
              <PlayCircleFill color="#ffb145" size={25} />
              <PauseCircleFill color="#ffb145" size={25} />
            </div>
            <div className='col-1'>
              <ArrowRepeat id='reset' color="#ffb145" size={30} onClick={repeat} />
            </div>
            <div className='col-5'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
