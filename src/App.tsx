import React, { useEffect, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { MdClose } from "react-icons/md";
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import Sparkle from './components/Sparkle';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [scoreText, setScoreText] = useState<string>('');
  const [winStreak, setWinStreak] = useState<number>(0);
  const [summary, setSummary] = useState<string>('');

  const responseMessage = async (response: any) => {
    // console.log(response);
    localStorage.setItem('logIn', '1');
    localStorage.setItem('Auth', response.credential);
    const status = localStorage.getItem('logIn');
    if (status === '1') {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  const checkStatusLogIn = () => {
    const status = localStorage.getItem('logIn');
    if (status === '1') {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }

  const handleGameEnd = (result: 'win' | 'lose' | 'draw') => {
    setSummary(result);
    if (result === 'win') {
      setScoreText('+1');
      console.log('win');
      setWinStreak(winStreak + 1);
      let newScore = score + 1;
      if (winStreak + 1 === 3) {
        setScoreText('+1');
        newScore += 1; 
        setWinStreak(0);
      }
      setScore(newScore);
    } else if (result === 'lose') {
      setScoreText('-1');
      console.log('lose');
      setWinStreak(0);
      setScore(score - 1);
    } else {
      console.log('draw');
      setWinStreak(score);
    }
    setTimeout(() => {
      setSummary('');
      setScoreText('');
    }, 1000);
  };

  const logOut = () => {
    // console.log('logOut');
    googleLogout();
    localStorage.setItem('logIn', '0');
    localStorage.removeItem('Auth');
    setIsAuth(false);
  }

  const progressBar = (score: number) => {
    let width: string
    switch (score) {
      case 1:
        width = '33.33333%';
        break;
      case 2:
        width = '66.66666%';
        break;
      case 3:
        width = '100%';
        break;
    
      default:
        width = '0%';
        break;
    }
    return width
  }

  useEffect(() => {
    checkStatusLogIn();
  }, []);

  return (
    <div className="bg-[#d6cfb7] relative w-full h-screen max-w-[320px] mx-auto overflow-hidden flex items-center justify-center">
    {!isAuth ? (
      <div className="p-4 text-center">
        <div className="flex items-center justify-center mb-4">
          <img className="rounded-full" src="/images/logo.png" width={150} height={150} alt='' />
        </div>
        <GoogleLogin onSuccess={responseMessage} onError={() => errorMessage} />
      </div>
    ) : (
      <div className="w-full h-full p-4 relative flex items-center justify-center">
        <img 
          className="absolute top-0 left-0 w-full h-full z-0 object-cover" 
          src="/images/bg-frame-wooden.png" 
          alt="" 
        />
        <div className="absolute top-0 left-0 p-4 w-full">
          <div className="flex items-center justify-between relative">
            <div className={`${scoreText === '' ? 'top-2' : 'top-[-2rem]'} absolute left-[82px] z-10 transition-all duration-500 text-md font-medium text-yellow-300`}>
              {scoreText}
            </div>
            <ScoreBoard score={score} />
            <button onClick={logOut} className="relative bg-red-600 flex items-center justify-center w-8 h-8 text-md font-[500] rounded-full shadow-sm shadow-slate-600">
              <span className="bg-red-500 absolute top-[1px] left-[1px] z-0 w-6 h-6 rounded-full" />
              <MdClose className="text-lg text-white relative z-10" />
            </button>
          </div>
        </div>
        <div className="bg-[#ffffffa3] w-full shadow-sm shadow-slate-400 p-4 rounded-xl relative z-10">
          <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
            <div className="bg-[#ffa500] h-2.5 rounded-full relative transition-all" style={{width: progressBar(winStreak)}}>
              <div className="bg-[#fbbc47] h-1 rounded-full absolute top-[2px] left-0 z-10 w-full" />
              {winStreak > 0 && (
              <div className="absolute top-0 right-0 z-10">
                <Sparkle />
              </div>
              )}
            </div>
            <div className="absolute top-0 right-0">
              <img className="shake-animation" src="/images/castle.png" width={35} height={35} alt='' />
            </div>
          </div>
          <Board onGameEnd={handleGameEnd} />
        </div>
        {summary !== '' && (
        <>
          <div className="bg-[#0000009e] pointer-events-none absolute top-0 left-0 w-full h-full z-10" />
          <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center">
            <div className="text-orange-400 uppercase shadow-sm shadow-slate-600 font-rubik-wet-paint text-6xl rotate-12">
              {summary}
            </div>
          </div>
        </>
        )}
      </div>
    )}
    </div>
  );
}

export default App;
