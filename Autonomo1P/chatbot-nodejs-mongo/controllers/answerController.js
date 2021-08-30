
const Question = require('../models/question')
const venom = require('venom-bot');
const Reservation = require('../models/reservation')


const answerController = {

    validateAnswer: function () {
  
            venom
            .create()
            .then((client) => this.start(client))
            .catch((erro) => {
                console.log(erro);
            });
            
    },

    start:  function (client) {

        let inputClient;
        client.onMessage((message)  =>  {

            if ( message.body.length == 10 ) {

                inputClient = 'Por favor asegurese que su cédula sea con guión'
                client
                .sendText(message.from, inputClient )
                .then((result) => {
                    // console.log('Result: ', result); //return object success
                    // console.log({'cliente': message.body, 'bot': question[0].answer});
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro); //return object error
                });
                return

            }


     

            

            Question.find({
                "$or": [
                    { "question": { "$regex": message.body, "$options": "i" } },       
                ]

            }).exec((err, question) => {
    
                if (err) { inputClient =  'Lo siento no puedo contestar eso :( err'  }
                if (question.length == 0) { 


                    if (message.body.length == 14) {

                        const valor = message.body.slice(0, -3);
                        console.log(valor);

                        Reservation.find({'user': valor}).exec((err, reser) => {

                            if (reser.length !== 0) {
        
                                inputClient = `Este usuario ya posee una reservacion la fecha ${reser[0].createdAt.toLocaleDateString()	}`
                                client
                                .sendText(message.from, inputClient )
                                .then((result) => {
                                    // console.log('Result: ', result); //return object success
                                    // console.log({'cliente': message.body, 'bot': question[0].answer});
                                })
                                .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                });
                                
                                return

                            }else {

                             

                                inputClient = `Este usuario no posee reservaciones`
                                client
                                .sendText(message.from, inputClient )
                                .then((result) => {
                                    // console.log('Result: ', result); //return object success
                                    // console.log({'cliente': message.body, 'bot': question[0].answer});
                                })
                                .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                });
                                return


                            }
                            
                            
                        });
                        return
                    }

                
// hacer reservacion
                    if ( message.body.length == 11 ) {

                        // console.log(message.body.length)
        
                        Reservation.find({'user': message.body}).exec((err, reser) => {
        
                            if (reser.length !== 0) {
        
                                inputClient = `Este usuario ya posee una reservacion la fecha ${reser[0].createdAt.toLocaleDateString()	}`
                                client
                                .sendText(message.from, inputClient )
                                .then((result) => {
                                    // console.log('Result: ', result); //return object success
                                    // console.log({'cliente': message.body, 'bot': question[0].answer});
                                })
                                .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                });
                                return
                                

                            } else
                            
                            
                            {

                            
        
                                const reservation = new Reservation({user: message.body });
                                reservation.save().then(()=>{
                                })
        
                                inputClient = '¡Muy bien! \n su reservación ha sido realizada, presente su cédula de identidad cuando ingrese al establecimiento \n'
                                
                                client
                                .sendText(message.from, inputClient )
                                .then((result) => {
                                    // console.log('Result: ', result); //return object success
                                    // console.log({'cliente': message.body, 'bot': question[0].answer});
                                })
                                .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                });

                                inputClient = `Recuerde que puede hacer lo siguiente: \n *1. Información general* \n *2. Reservación* \n *3. Consultar Reservación*`

                                client
                                .sendText(message.from, inputClient )
                                .then((result) => {
                                    // console.log('Result: ', result); //return object success
                                    // console.log({'cliente': message.body, 'bot': question[0].answer});
                                })
                                .catch((erro) => {
                                    console.error('Error when sending: ', erro); //return object error
                                });


                              
                                return
                            }
        
                        });
                        return
                     


                   
                    } else {                   
                    
                    inputClient = 'Lo siento no puedo contestar eso :(' 
                    }
                
                }

                // if (message.body === 'Hola' && message.isGroupMsg === false) {
                if(question.length != 0) { 
                    inputClient = question[0].answer;
 
                
                }

                    client
                    .sendText(message.from, inputClient )
                    .then((result) => {
                        // console.log('Result: ', result); //return object success
                        console.log({'cliente': message.body, 'bot': question[0].answer});
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
                    // }
                });
        });
    
      },




}

module.exports = answerController;
    





