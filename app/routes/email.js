const express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const fs = require('fs');
const emailConfig = fs.readFileSync('./emailConfig.json');

/*****************************
1. check for session validity
    1a. If bad session, redirect to login
    1b. Otherwise continue
2. get options
    2a. filename
    2b. destination email address
    2c. Subject (?) 
    2d. Message body
    2e. Award filename
3. Send the email
4. Send a successful response
******************************/

router.post('/', (req, res) => {
    // TODO: check session validity
    var transporter = nodemailer.createTransport({
        host: emailConfig['hostname'],
        port: emailConfig['port']
    })
    var message = {
        "from" : 'company_awards@rigel.com',
        "to" : req.body['deliverTo'],
        "subject" : req.body['subject'],
        "text" : "Congratulations you receive the big award!",
        "attachments" : [
            {
                "filename" : req.body['awardFile'],
                "path": "./app/awards_images/" + req.body['awardFile']  
            }
        ]
    }
    transporter.sendMail(message, (err, info) => {
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
});

module.exports = router;