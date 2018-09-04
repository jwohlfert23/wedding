const app = require('./app')

app.listen(process.APP_PORT || 3000, () => {
    console.log('Example app listening on port 3000!')
})