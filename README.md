# nextTick

Implementation for nextTick

### Usage

```js
const nextTick = require('./dist/nextTick')

console.log('render start')
nextTick(() => {
    console.log('next render')
})
console.log('render end')
```
The result output as below

```js
render start
render end
next render
```