const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {


    
let counter = 0;

while (counter <= 100) {
  console.log(counter);
  counter++;
}

res.json({message: 'Hola desde Docker', response: counter})
});

    


module.exports = router;