import { ArrowDownCircleFill, ArrowRepeat, ArrowUpCircleFill, PauseCircleFill, PlayCircleFill } from 'react-bootstrap-icons';
import './App.scss';
import { useEffect, useState, useRef } from 'react';

const WORK = 5;
const REST = 3;

const App = () => {
  const [rest, setRest] = useState(REST);
  const [work, setWork] = useState(WORK);
  const [display, setDisplay] = useState(work);
  const [turn, setTurn] = useState('Session');
  const [flow, setFlow] = useState(false);

  // const convTime = (time) => {
  //   const sec = time * 60;
  //   const minutes = Math.floor(sec / 60);
  //   const seconds = sec - minutes * 60;
  //   return pad(minutes) + ':' + pad(seconds);
  // };

  // const pad = (d) => {
  //   return (d < 10) ? '0' + d.toString() : d.toString();
  // }

  const upRest = () => {
    setRest(rest + 1);
  };

  const downRest = () => {
    setRest(rest - 1);
  };

  const upWork = () => {
    setWork(work + 1);
  };

  const downWork = () => {
    setWork(work - 1);
  };

  const play = () => {
    console.log('I enter play');
    if (flow === false) {
      setFlow(true);
      console.log('I enter on play');
      console.log(turn);
      let interval = setInterval(update, 1000);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
    } else {
      pause();
    }
  };

  const pause = () => {
    console.log('I click pause');
    setFlow(false);
    clearInterval(localStorage.getItem('interval-id'));
  }

  const update = () => {
    console.log('I enter on update');
    console.log('display=' + display);
    if (display > 0) {
      setDisplay((display) => display - 1);
    } else {
      console.log('I enter on else in update function when display <= 0');
      if (turn === 'Session') {
        console.log('change turn to break');
        setTurn('Break');
        setDisplay(rest);
      } else {
        console.log('change turn to session');
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
      // play();
      console.log('I enter on useEffect and I pause');
      console.log(display);
      update();
    }
  }, [display]);

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      console.log('I enter on useEffect for turn');
      // play();
    }
  }, [turn]);

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
                  <p id='break-length'>{rest}</p>
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
                  <p id='session-length'>{work}</p>
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
                  <p id='time-left'>{display}</p>
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
