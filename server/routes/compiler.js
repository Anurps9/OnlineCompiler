const express = require('express')
const router = express.Router()
const axios = require('axios')

router.use(express.json())

router
.post('/', (req, res) => {
    console.log(req.body.data);
    const input = "3 4";
    const output = `7`;
    const eoptokens = output.match(/\S+/g)
    axios
    .post('http://coliru.stacked-crooked.com/compile', {
        "cmd": `echo ${input} > "input1234.txt" && g++ main.cpp && ./a.out < "input1234.txt"`, 
        "src": `${req.body.data}`
    })
    .then((result) => {
        let aoutput = '';
        if(typeof(result.data) !== 'string'){
            aoutput = result.data.toString();
        }else{
            aoutput = result.data;
        }
        const aoptokens = aoutput.match(/\S+/g)
        if(eoptokens.length !== aoptokens.length){
            res.json(0);
        }else{
            var correct = 1;
            for(var i=0; i<eoptokens.length; ++i){
                if(eoptokens[i] !== aoptokens[i]){
                    correct = 0;
                    break;
                }
            }
            if(correct) res.json(1);
            else res.json(0);
        }
    })
})

const catchError = (err, res) => {
    if(err){
        res.sendStatus(500)
        throw err;
    }
}

module.exports = router;
