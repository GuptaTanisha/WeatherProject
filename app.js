const express= require('express');
const app=express();
const https=require('https');
const bodyParser=require('body-parser');
var city;
var url,icon;
 var temp;
var weatherData;
var imageURL;
var flag=0;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',function(req,res){

if(flag===0){
  res.sendFile(__dirname+'/index.html');
}
if(flag===1)
{
  res.render("weather",{cityejs :city, imageURLejs : imageURL, tempejs : temp});
flag=0;
}
});

app.post('/',function(req,res){
   city= req.body.cityName;
   url='https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=6b48a1211b54c14ede15305c1a34eea3&units=metric#';
  https.get(url,function(response){
    console.log(response.statusCode);

  response.on('data',function(data){
   weatherData =JSON.parse(data);
   temp= weatherData.main.temp;
   icon= weatherData.weather[0].icon;
   imageURL='http://openweathermap.org/img/wn/'+icon+'@2x.png';
  flag=1;
  res.redirect("/");
  });
  });
  });


app.listen(3000,function()
{
  console.log('Server starts at port 3000');
});
