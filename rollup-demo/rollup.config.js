import json from 'rollup-plugin-json'

export default {
    input:['./src/index.js','./src/album.js'],
    output:{
        // file:'dist/bundile.js',
        // format:'iife'
        dir:'dist',
        format:'amd'
    },
    plugins:[
        json()
    ]
}