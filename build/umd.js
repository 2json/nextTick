const path = require('path')
const buble = require('rollup-plugin-buble')
const rollup = require('rollup')
const fs = require('fs')
const resolve = _path => path.resolve(__dirname, '../', _path)

if(!fs.existsSync('dist')) {
    fs.mkdirSync('dist')
}

const config = {
    input: {
        input: resolve('lib/nextTick.js'),
        plugins: [
            buble()
        ]
    },
    output: {
        file: resolve('dist/nextTick.js'),
        format: 'umd',
        name: 'nextTick'
    }
}

function write(dest, code) {
    return new Promise((resolve, reject) => {
        fs.writeFile(dest, code, err => {
            if(err) return reject(err)
            resolve('Build Successfully!!!')
        })
    })
}

function build({ input, output }) {
    return rollup.rollup(input)
        .then(bundle => bundle.generate(output))
        .then(({ code }) => {
            write(output.file, code).then(value => console.log(green(value)))
        })
}

function green (str) {
    return '\x1b[1m\x1b[32m' + str + '\x1b[39m\x1b[22m'
}

build(config)
