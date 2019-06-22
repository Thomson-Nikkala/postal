const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 5000

// tell it to use the public directory as one where static files live
app.use(express.static(path.join(__dirname, 'public')))
// views is directory for all template files
app.set('views', path.join(__dirname, 'views'))
// using 'ejs' template engine and default extension is 'ejs'
app.set('view engine', 'ejs')
//res.render compiles your template, inserts locals, and creates html
app.get('/', (req, res) => res.render('pages/index'))
//app.get('/', (req, res) => res.send('Hello World!'))

// start the server listening
app.listen(PORT, () => console.log('Listening on ${PORT}'))

//error handler
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// 404 handler
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})
