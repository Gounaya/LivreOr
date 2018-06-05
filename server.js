let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

// Moteur de template
app.set('view engine', 'ejs')

// Middleware
app.use('/assets',express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
    secret: 'azeaze',
    resave: false,
    saveUninitialized: true,
    cookie:{secure: true}
}))

// Routes
app.get('/', (request, response) => {
    console.log(request.session.error)
    response.render('pages/index', {test: 'Salut'})
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === ''){
        request.session.error = "Il y a une erreur"
        response.redirect('/')
}
})
app.listen(8080)

