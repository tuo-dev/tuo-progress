import { useEffect, useMemo, useRef, useState } from "react";

import './index.scss';

interface ITuoBarProgress {
  progress: number;
  max: number;
  className?: string;
  barWidth?:number | 'auto';
  barHeight?: number;
  barRadius?: number;
  progressColor?: string;
  backgroundColor?: string;
  displayState?: 'percent' | 'state' | 'none';
  fontSize?: number;
  fontColor?: string;
  animation?: boolean;
  animationSpeed?: number;
  onAnimationState?: (props: number) => void;
}

const TuoBarProgress = ({
  progress,
  max,
  className,
  barWidth = 100,
  barHeight = 10,
  barRadius = 10,
  progressColor = '#50586C',
  backgroundColor = '#DCE2F0',
  displayState = 'percent',
  fontSize = 12,
  fontColor = '#777',
  animation = true,
  animationSpeed = 10,
  onAnimationState
}:ITuoBarProgress) => {

  const barRef = useRef<HTMLDivElement | null>(null)
  
  const [state, setState] = useState<number>(0);
  const [handleAnimation, setHandleAnimation] = useState<boolean>(false);

  const progressInfo = useMemo(() => {
    let length:number | 'auto' = -1 
    const percent = Math.trunc(100 / max * state);
    if (barWidth === 'auto' && barRef.current) {
      length = barRef.current.offsetWidth / max * state;
    }
    if (barWidth !== 'auto') length = barWidth / max * state;

    return { percent, length };
  }, [max, state, barWidth]);

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
      ref={barRef}
      className={`tuo-bar-progress-container ${className && className}`}
      style={{
        width: barWidth
      }}
    >
      <div className="tuo-bar-progress-dashes-background"
        style={{
          height: barHeight,
          borderRadius: barRadius,
          background: backgroundColor
        }}
      >
        <div className="tuo-bar-progress-dashes"
          style={{
            width: progressInfo.length,
            height: barHeight,
            background: progressColor,
          }}
        />
      </div>
      <div className="tuo-bar-progress-content">
        {displayState !== 'none' &&
          <div className='tuo-circle-progress-text'
            style={{
              fontSize: `${fontSize}px`,
              color: fontColor
            }}
          >
            {displayState === 'percent' ? 
              <span>{progressInfo.percent}%</span> :
              <span>{state}/{max}</span>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default TuoBarProgress