import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-minify-es';

export default {
    input: 'layer_two_user_ui/l2-user-main.js',
    output: { 
    file: '../../../priv/static/js/l2-user-main.js',
    format: 'iife',
    name: 'l2_user_ui'
    },
    watch: {
        useChokidar: false
    },    
    plugins: [
        resolve(),
        commonjs(),
        minify()
    ]
}