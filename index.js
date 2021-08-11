const express = require('express')
const app = express()

const session = require('express-session')
const passport = require('passport')
const methodOverride = require('method-override')

const articleRouter= require('./routes/articles')

const answerRouter = require('./routes/answers')

const questionRouter = require('./routes/question')

var cors = require('cors')

const port = process.env.PORT || 5000

app.use(cors())

const mongoose= require('mongoose')

mongoose.connect('mongodb+srv://Abdelhakim_Jebabra:JYc73lnFuEhp1lUA@newgen-cluster.uocci.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true , useUnifiedTopology: true })


app.use(methodOverride('_method'))

require('./config/passport')(passport)

// Sessions
app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: false,
       
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/articles', articleRouter)
app.use('/answers', answerRouter)

app.use('/questions', questionRouter)

app.use('/auth', require('./routes/auth'))



app.set('view engine','ejs')


app.get('/', async (req,res)=>{
   
    
    res.render('manage')
})

app.use('/', require('./routes/index'))
app.use('/public', express.static(__dirname + '/public'));





app.listen(port)
