'use strict'
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');


const app = express()
// const port = 3000

//Dynamic port for deploy
const port = process.env.PORT

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))

app.listen(port || 3000, ()=>{
  console.log(`Server is UP⬆️ on port: ${port}`);
})

app.get('/',(req,res)=>{
  res.sendFile(__dirname +'/signup.html')
})



app.post('/', (req,res)=>{
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email

  const data = {
    members : [
      {
        'email_address' : email,
        'status' : "subscribed",
        merge_fields:{
          'FNAME' : firstName,
          'LNAME' : lastName,
        }
      }
    ]
  }
  const jsonData = JSON.stringify(data);
  const dc = `us20`
  const url = `https://${dc}.api.mailchimp.com/3.0/lists/7bd83ce600`

  const options = {
    method: 'POST',
    'auth': 'user:cafd43bbcb5099977c0c271e64bec2a5-us20'
  }

  const url_ = `http://localhost:3000/`;
  const options_ = {
    method: 'GET',
    'auth': 'user:cafd43bbcb5099977c0c271e64bec2a5-us20'
  }

  const request = https.request(url, options, (response)=>{
    console.log('Status: '+ response.statusCode);
    if (response.statusCode === 200) {
      res.sendFile(__dirname +'/success.html')
    } else {
      res.sendFile(__dirname +'/error.html')
    }

    response.on('data', (data)=>{
      console.log(JSON.parse(data));
    })
  })
    request.write(jsonData)
    request.end()
})

//WHen redirected to error Page
app.post('/error.html', (req,res)=>{
  res.redirect('/')
})


//API KEY: cafd43bbcb5099977c0c271e64bec2a5-us20
//ID: 7bd83ce600
