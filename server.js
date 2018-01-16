var express=require('express');
var app=express();
var request=require('request');
var bodyParser=require('body-parser');
var port_number = process.env.PORT || 3000;
app.listen(port_number);
app.set('view engine','ejs');
app.use(express.static(__dirname+'/views'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/',function(req,res){

  res.render('index');
});

app.get('/fullcontact',function(req,res){
  res.render('fullcontact');
})

app.post('/email', function(req, res) {
    var user_email = req.body.email;

    const u='https://api.fullcontact.com/v2/person.json?apiKey=248c47a928941dc8&email=';
    const r=u+user_email;
    request(r, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    var data =JSON.parse(body);
    if(response.statusCode==200)
    {
      res.render('fullcontactresult',{data:data});
    }
    else {
      res.render('redirect');
    }
    });

});
