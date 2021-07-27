const express = require('express')
const router = express.Router()


const Answer = require('../models/answer')

const { ensureAuth, ensureGuest } = require('../middleware/auth')



/*Admin Section  */


router.get('/new', ensureAuth, (req, res) => {
    res.render('answers/new', { answer: new Answer() })


})

router.get('/', ensureAuth, async (req, res) => {
    const answers = await Answer.find().sort({ createdAt: 'desc' })

    res.render('answers/index', { answers: answers })
})



router.get('/:id', async (req, res) => {
    const answer = await Answer.findById(req.params.id)
    if (answer == null) { res.redirect('/') }
    res.render('answers/show', { answer: answer })
})



router.post('/', async (req, res, next) => {
    req.answer = new Answer()
    next()
}, saveAnswerAndRedirect('new'))


router.get('/edit/:id', ensureAuth, async (req, res) => {
    const answer = await Answer.findById(req.params.id)
    res.render('answers/edit', { answer: answer})
})

router.put('/:id', async (req, res, next) => {
    req.answer = await Answer.findById(req.params.id)
    next()
}, saveAnswerAndRedirect('edit'))


function saveAnswerAndRedirect(path) {
    return async (req, res) => {
        let answer = req.answer
        answer.firstName = req.body.firstName
        answer.lastName = req.body.lastName
        answer.nickName = req.body.nickName
        answer.address = req.body.address

        answer.city = req.body.city
        answer.state = req.body.state

        answer.zip = req.body.zip
        answer.phone = req.body.phone

        answer.email = req.body.email
        

       
        try {
            answer = await answer.save()
          
           res.redirect(`/answers/${answer.id}`)
        } catch (e) {
            console.log(e)
            res.render(`answers/${path}`, { answer: answer })
            
        }
    }
}


router.delete('/:id', async (req, res) => {
    await Answer.findByIdAndDelete(req.params.id)
    res.redirect('/answers')
})


/* End of Admin Section */



/* Clien Section */
 router.post('/client/save' ,  (req , res)=>{
     const data= req.body
     console.log(data)
     const newAnswer = new Answer(data)

     newAnswer.save((error)=>{
         if(error){
             res.status(500).json({msg:error})
             
         }else{
             res.json({
                 msg: 'Data has been saved'
             })
         }
     })

  
  



     
 })


/* End of client Section */


module.exports = router