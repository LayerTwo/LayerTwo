import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';

export default {
    input: 'layer_two_web_app/l2-main.js',
    output: { 
    file: '../priv/static/js/l2-main.js',
    format: 'iife',
    name: 'l2_web_app'
    },
    watch: {
        useChokidar: false
    },    
    plugins: [
        uglify({}, minify)
    ]
}