module.exports = {
    plugins: [
        require('autoprefixer'),
        require('cssnano'),
        require('postcss-pxtorem')({ propList: ['*'] })
    ]
};