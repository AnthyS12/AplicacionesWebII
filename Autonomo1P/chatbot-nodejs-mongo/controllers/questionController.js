
const  data  = require("../utils/data");
const Question = require('../models/question')



    exports.saveQuestions =  function (req, res) {

        Question.find().exec((err, questions) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
    
                });
    
            }
            if (questions.length == 0) {
           
                data.forEach(element => {

                    const question = new Question(element);
                    question.save().then(()=>{
                    })
                });
                
                console.log(`Datos creados`);
    
            } else {

                console.log(`Datos existen`);


            }
         
           
        });
      


    }



