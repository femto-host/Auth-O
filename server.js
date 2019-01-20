const expressSession = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')(expressSession)
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const flash = require('express-flash')
const mongoose = require('mongoose')
const favicon = require('serve-favicon')
const express = require('express')
const reload = require('reload')
const path = require('path')

//const Passport = require('./modules/Passport')

const port = 20001
const secret = "Get_A_Better_Secret_#'.,35858"
const dbname = "auth-o"

;(async () => {
    const app = express()
    //const passport = new Passport()

    const db = (await MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true })).db(dbname)
    mongoose.connect('mongodb://localhost:27017/' + dbname, { useNewUrlParser: true })

    //app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon', 'faviconSmall.ico')))
    app.set('view engine', 'pug')
    app.set('views', 'renders/views')
    app.use(express.static('public'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cookieParser(process.env.PG_SECRET || secret))
    app.use(expressSession({
        secret: process.env.PG_SECRET || secret,
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({ db }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 4 // 28 days
        }
    }))
    app.use(flash())
    app.use((req, res, next) => {
        Object.assign(res.locals, {
            success: req.flash('success'),
            error: req.flash('error')
        })
        res.locals.req = req
        res.locals.development = process.env.NODE_ENV === 'development'
        app.locals.pretty = process.env.NODE_ENV === 'development'
        res.locals.path = req.path
        next()
    })
    //app.use(passport.router)

    reload(app)

    app.listen(port, () => console.log(`Listening on port ${port}`))
})()

