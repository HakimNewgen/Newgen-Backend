const express= require('express')

const router = express.Router()
const {  ensureGuest } = require('../middleware/auth')


const multer = require('multer');


const Article = require('../models/article')




//define storage for the images

const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
        callback(null, './public/uploads/images');
    },

    //add back the extension
    filename: function (request, file, callback) {
        callback(null,   file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});



router.get('/new', (req,res)=>{
    res.render('articles/new' , {article: new Article()})

    
    
})


router.get('/',  async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })

    res.render('articles/index',{articles: articles})

})


router.get('/data', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' }).then(document => res.send(document))

   

})



router.get('/data/:id', async (req, res) => {
    const article = await Article.findById(req.params.id).then(document => res.send(document))
    
   




})










router.get('/:id',  async (req, res)=>{
     const article =  await Article.findById(req.params.id)
     if (article== null){res.redirect('/')}
    res.render('articles/show', { article: article})
   

         
        
})





router.post('/', upload.single('image'),async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))


router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    let article = req.article
    article.title = req.body.title
    article.description = req.body.description
    article.markdown = req.body.markdown
    article.author = req.body.author
    article.subject = req.body.subject
    try {
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    } catch (e) {
        console.log(e)
        res.render(`articles/${path}`, { article: article })
    }
   
})



function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        article.author = req.body.author
        article.subject = req.body.subject
        article.image = req.file.originalname
        try {
            article = await article.save()
            res.redirect(`/articles/${article.id}`)
        } catch (e) {
            console.log(e)
            res.render(`articles/${path}`, { article: article })
        }
    }
}



router.get('/edit/:id',  async (req, res)=>{
    const article= await Article.findById(req.params.id)
    res.render('articles/edit', {article: article})
})


router.delete('/:id',  async (req,res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})









module.exports= router