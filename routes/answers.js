const express = require('express')
const router = express.Router()


const Answer = require('../models/answer')
// var fs = require('fs');
// var pdf = require('html-pdf');
// var html = fs.readFileSync('../views/answers/show', 'utf8');
// var options = { format: 'Letter' };

const {  ensureGuest } = require('../middleware/auth')






/*Admin Section  */


router.get('/new',  (req, res) => {
    res.render('answers/new', { answer: new Answer() })


})

router.get('/',  async (req, res) => {
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


router.get('/edit/:id',  async (req, res) => {
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
        answer.service = req.body.service
        answer.name = req.body.name
        answer.secteur = req.body.secteur
        answer.login = req.body.login
        answer.type = req.body.type

        answer.design = req.body.design
        answer.nbrpage = req.body.nbrpage
        

        answer.infosupp1 = req.body.infosupp1
        answer.infosupp2 = req.body.infosupp2

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




router.delete('/generate', async (req, res) => {
    pdf.create(html, options).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' }
    });
})






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