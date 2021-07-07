module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `@import "@/assets/scss/main.scss";`
            }
        }
    },
    devServer:{
        proxy:"http://localhost:3000",
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Origin, X-Requested-With, Content-Type, Accept,x-access-token',
        },
    }
};