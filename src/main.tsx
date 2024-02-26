import React from 'react'
import ReactDOM from 'react-dom/client'
import TuoCircleProgress from './lib/components/TuoCircleProgress';
import TuoBarProgress from './lib/components/TuoBarProgress';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <TuoCircleProgress progress={40} max={100} />
    <br />
    <TuoBarProgress progress={40} max={100} />
  </>
)
