const nextTick = require('../dist/nextTick')
const assert = require('assert')
let num = 0

nextTick(() => {
    assert(num === 1)
})

nextTick(null, this).then(ctx => assert(ctx === this))

num++ 
