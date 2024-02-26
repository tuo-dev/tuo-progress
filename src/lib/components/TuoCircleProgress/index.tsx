import { useCallback, useEffect, useMemo, useState } from 'react';

import './index.scss'

interface ITuoCircleProgress {
  progress: number;
  max: number;
  className?: string;
  circleSize?:number;
  strokeWidth?: number;
  progressColor?: string;
  backgroundColor?: string;
  startDiretion?: 'left' | 'top' | 'right' | 'bottom';
  displayState?: 'percent' | 'state' | 'none';
  fontSize?: number;
  fontColor?: string;
  animation?: boolean;
  animationSpeed?: number;
  onAnimationState?: (props: number) => void;
}

const TuoCircleProgress = ({
  progress,
  max,
  className,
  circleSize = 100,
  strokeWidth= 10,
  progressColor = '#50586C',
  backgroundColor = '#DCE2F0',
  startDiretion = 'top',
  displayState = 'percent',
  fontSize = 22,
  fontColor = '#777',
  animation = true,
  animationSpeed = 10,
  onAnimationState
} : ITuoCircleProgress) => {

  const [state, setState] = useState<number>(0);
  const [handleAnimation, setHandleAnimation] = useState<boolean>(false);

  const progressInfo = useMemo(() => {
    const percent = Math.trunc(100 / max * state);
    const length = (circleSize * Math.PI) / max * state;
    const remainLength = (circleSize * Math.PI) - length;

    return { percent, length, remainLength };
  }, [max, state, circleSize]);


  const svgInfo = useMemo(() => {
    const size = circleSize + strokeWidth;
    const radius = circleSize / 2;
    const position = (circleSize / 2) + (strokeWidth / 2)

    return {size ,radius, position}
  },[circleSize, strokeWidth])

  const start = useCallback(() => {
      switch (startDiretion) {
        case 'left': return '180deg';
        case 'top' : return '270deg';
        case 'right' : return '0deg';
        case 'bottom' : return '90deg';
      }
  },[startDiretion])

  useEffect(() => {
    if (!progress || progress < 0 || !animation || state >= progress) {
      setHandleAnimation(false);
      if (!animation) setState(progress);
    } else {
      setHandleAnimation(true)
    }
  },[animation, progress, state])

  useEffect(() => {
    if (handleAnimation) {
      const intervalId = setInterval(() => {
        setState(prev => prev + 1);
      }, animationSpeed);
  
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [animationSpeed, handleAnimation]);

  useEffect(() => {
    if (!onAnimationState) return
    else {
      if (displayState === 'none') return
      else if (displayState === 'state') onAnimationState(state);
      else onAnimationState(progressInfo.percent);
    }
  },[displayState, onAnimationState, progressInfo.percent, state])

  return (
    <div
      className={`tuo-circle-progress-container ${className && className}`}
      style={{width: svgInfo.size,height: svgInfo.size}}
    >
      <svg style={{width: svgInfo.size,height: svgInfo.size,transform: `rotate(${start()})`}}>
        <circle
          r={svgInfo.radius}
          cy={svgInfo.position}
          cx={svgInfo.position}
          strokeDasharray={circleSize * Math.PI}
          className="tuo-circle-progress-dashes-background"
          strokeWidth={strokeWidth}
          stroke={backgroundColor}
        />
        <circle
          r={svgInfo.radius}
          cy={svgInfo.position}
          cx={svgInfo.position}
          strokeDasharray={`${progressInfo.length} ${progressInfo.remainLength}`}
          className="tuo-circle-progress-dashes"
          strokeWidth={strokeWidth}
          stroke={progressColor}
        />
      </svg>
      <div className="tuo-circle-progress-content"
        style={{
          fontSize: `${fontSize}px`,
          color: fontColor
        }}
      >
        {displayState !== 'none' &&
          <div className='tuo-circle-progress-text'>
            {displayState === 'percent' ? 
              <span>{progressInfo.percent}%</span> :
              <span>{state}/{max}</span>
            }
          </div>
        }
      </div>
    </div>
  );
};

export default TuoCircleProgress;