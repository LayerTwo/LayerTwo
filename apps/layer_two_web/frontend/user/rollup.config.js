import uglify from 'rollup-plugin-uglify';
import {minify} from 'uglify-es';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


export default {
    input: 'layer_two_user_ui/l2-user-main.js',
    output: { 
    file: '../../priv/static/js/l2-user-main.js',
    format: 'iife',
    name: 'l2_user_ui'
    },
    watch: {
        useChokidar: false
    },    
    plugins: [
        resolve(),
        commonjs(),
        uglify({}, minify)
    ]
}