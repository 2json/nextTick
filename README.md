# nextTick

[![Build Status](https://travis-ci.org/2json/nextTick.svg?branch=master)](https://travis-ci.org/2json/nextTick)
[![2json](https://img.shields.io/badge/author-2json-green.svg)](https://github.com/2json/nextTick)

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
