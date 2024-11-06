import React from 'react';

interface ScoreBoardProps {
  score: number;
}

function ScoreBoard({ score } : ScoreBoardProps) {
  return (
    <div className="scoreboard relative bg-orange-200 px-4 py-1 rounded-full outline outline-4 outline-orange-400 shadow-sm shadow-slate-600">
      <div className="absolute top-[1px] left-[1px] w-[84px] h-[26px] z-0 bg-orange-100 rounded-full"></div>
      <div className="relative z-10 font-medium">
        <h3>Score: {score}</h3>
      </div>
    </div>
  );
};

export default ScoreBoard;
