# tuo-progress (react)

## Screenshot

### TuoCircleProgress

![circle-percent](https://github.com/tuo-dev/tuo-progress/assets/137742986/36899970-22a5-492d-9629-b7f1b7ad7b02)
![circle-state](https://github.com/tuo-dev/tuo-progress/assets/137742986/9ca69711-256a-4120-abd0-c3601f3fa5f3)

### TuoBarProgress

![bar-percent](https://github.com/tuo-dev/tuo-progress/assets/137742986/c8d3cb32-1ba0-4c42-9e8f-e499a482dbb5)
![bar-state](https://github.com/tuo-dev/tuo-progress/assets/137742986/04c74462-95e7-42d6-96a8-7a3fbd424e6e)


## Development

```
npm install
yarn install

npm run dev
yarn dev
```

## Install

```
npm install tuo-progress
yarn add tuo-progress
```

## Usage

```
// circle progress
<TuoCircleProgress progress={40} max={100}/>

// bar progess
<TuoBarProgress progress={40} max={100}/>
```

## API

### TuoCircleProgress props

| name | description | type | defalut | 
| --- | --- | --- | --- |
| progress | value of progress | number | |
| max | maximum of progress | number | |
| className | additional css class of root dom node | string | |
| circleSize | diameter of circle | number | 100 |
| strokeWidth | width of stroke | number | 10 |
| progressColor | color of progress stroke | stiring | #50586C |
| backgroundColor | color of max progress stroke | string | #DCE2F0 |
| startDirection | direction where progress starts | 'left' / 'top' / 'right' / 'bottom' | 'top' |
| displayState | type of value shown | 'percent' / 'state' / 'none' | 'percent' |
| fontSize | font-size(px) of displayState | number | 22 |
| fontColor | color of displayState | string | '#777' |
| animation | animation enabled | boolean | true |
| animationSpeed | time(ms) to move by 1 of value | number | 10 |
| onAnimationState | value according to displayState | function(value) | |

### TuoBarProgress props

| name | description | type | defalut | 
| --- | --- | --- | --- |
| progress | value of progress | number | |
| max | maximum of progress | number | |
| className | additional css class of root dom node | string | |
| barWidth | width of bar| number | 100 |
| barHeight | height of bar | number | 10 |
| barRadius | border-radius of progress bar | number | 10 |
| progressColor | color of progress bar | stiring | #50586C |
| backgroundColor | color of max progress bar | string | #DCE2F0 |
| displayState | type of value shown | 'percent' / 'state' / 'none' | 'percent' |
| fontSize | font-size(px) of displayState | number | 12 |
| fontColor | color of displayState | string | '#777' |
| animation | animation enabled | boolean | true |
| animationSpeed | time(ms) to move by 1 of value | number | 10 |
| onAnimationState | value according to displayState | function(value) | |