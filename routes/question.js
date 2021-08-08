const express = require('express')
const router = express.Router()


const Question = require('../models/question')

const {  ensureGuest } = require('../middleware/auth')



/*Admin Section  */


router.get('/new',  (req, res) => {
    res.render('questions/new', { question: new Question() })


})

router.get('/',  async (req, res) => {
    const questions = await Question.find().sort({ createdAt: 'desc' })

    res.render('questions/index', { questions: questions })
})



router.get('/:id', async (req, res) => {
    const question = await Question.findById(req.params.id)
    if (question == null) { res.redirect('/') }
    res.render('questions/show', { question: question })
})



router.post('/', async (req, res, next) => {
    req.question = new Question()
    next()
}, saveQuestionAndRedirect('new'))


router.get('/edit/:id',  async (req, res) => {
    const question = await Question.findById(req.params.id)
    res.render('questions/edit', { question: question })
})

router.put('/:id', async (req, res, next) => {
    req.question = await Question.findById(req.params.id)
    next()
}, saveQuestionAndRedirect('edit'))


function saveQuestionAndRedirect(path) {
    return async (req, res) => {
        let question = req.question
        question.text = req.body.text
        question.type = req.body.type
        question.service = req.body.service
      


        try {
            question = await question.save()

            res.redirect(`/questions/${question.id}`)
        } catch (e) {
            console.log(e)
            res.render(`questions/${path}`, { question: question })

        }
    }
}


router.delete('/:id', async (req, res) => {
    await Question.findByIdAndDelete(req.params.id)
    res.redirect('/questions')
})


/* End of Admin Section */



/* Clien Section */
router.post('/client/save', (req, res) => {
    const data = req.body
    console.log(data)
    const newquestion = new Question(data)

    newquestion.save((error) => {
        if (error) {
            res.status(500).json({ msg: error })

        } else {
            res.json({
                msg: 'Data has been saved'
            })
        }
    })







})


/* End of client Section */


module.exports = router