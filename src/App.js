import { ArrowDownCircleFill, ArrowRepeat, ArrowUpCircleFill, PauseCircleFill, PlayCircleFill } from 'react-bootstrap-icons';
import './App.scss';
import { useEffect, useState, useRef } from 'react';

const App = () => {
  const [rest, setRest] = useState(3);
  const [work, setWork] = useState(5);
  const [display, setDisplay] = useState(work);
  const [turn, setTurn] = useState('Session');

  useEffect(() => {
    setDisplay(work);
  }, [work]);

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
    console.log('I enter on play');
    console.log(turn);
      let interval = setInterval(update, 1000);
      localStorage.clear();
      localStorage.setItem('interval-id', interval);
  };

  useEffect(() => {
    if (display < 0) {
      pause();
      console.log('I enter on useEffect and I pause');
      console.log(display);
      update();
    }
  }, [display]);

  const pause = () => {
    console.log('I click pause');
    clearInterval(localStorage.getItem('interval-id'));
  }

  const update = () => {
    console.log('I enter on update');
    console.log('display='+display);
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

  // useEffect(() => {
  //   play();
  // }, [turn]);
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
        play();
    }
  }, [turn]);

  const repeat = () => {
    play();
    setTurn('Session');
  };

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
                  <h3>Break Length</h3>
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <ArrowDownCircleFill color="#ffb145" size={30} onClick={downRest} />
                </div>
                <div className='col-4'>
                  <p>{rest}</p>
                </div>
                <div className='col-4'>
                  <ArrowUpCircleFill color="#ffb145" size={30} onClick={upRest} />
                </div>
              </div>
            </div>
            <div className='col-3'>
              <div className='row'>
                <div className='col-12'>
                  <h3>Session Length</h3>
                </div>
              </div>
              <div className='row'>
                <div className='col-4'>
                  <ArrowDownCircleFill color="#ffb145" size={30} onClick={downWork} />
                </div>
                <div className='col-4'>
                  <p>{work}</p>
                </div>
                <div className='col-4'>
                  <ArrowUpCircleFill color="#ffb145" size={30} onClick={upWork} />
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
                  <h2>{turn}</h2>
                </div>
              </div>
              <div className='row'>
                <div className='col-12'>
                  <p>{display}</p>
                </div>
              </div>
            </div>
            <div className='col-4'></div>
          </div>
          <div className='row mb-4 mt-3'>
            <div className='col-3'></div>
            <div className='col-2'>
              <PlayCircleFill color="#ffb145" size={30} onClick={play} />
            </div>
            <div className='col-2'>
              <PauseCircleFill color="#ffb145" size={30} onClick={pause} />
            </div>
            <div className='col-2'>
              <ArrowRepeat color="#ffb145" size={30} onClick={repeat} />
            </div>
            <div className='col-3'></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
