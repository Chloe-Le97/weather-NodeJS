const path = require('path');
const express = require("express");
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Define paths for Express config
const viewPath = path.join(__dirname,'../templates/views');
const publicDirectoryPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('views',viewPath);
app.set('view engine','hbs');
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.get("", (req, res) => {
  res.render('index',{
    title: 'Weather APP',
    name: 'Chloe'
  })
});

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About Me',
    name:'Chloe'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    message:'Help is here',
    title:'HELP',
    name: 'Chloe'
  })
})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return res.send({
    error:'You must provide a search term'
  })}
  console.log(req.query.search);
  res.send({
    products:[]
  })
})

app.get("/weather", (req, res) => {
  // res.send({
  //   location: "Helsinki",
  //   temperature: 15,
  // });
  if(!req.query.address){
    return res.send({
      error:'You must provide an address'
    })
  }
  // res.send({
  //   temperature: 15,
  //   address: req.query.address
  // })
  const address= req.query.address;
  geocode(address, (error, { latitude, longitude,location }={}) => {
    if (error) {
      return res.send({error})
    }
    forecast(latitude, longitude, (error, foreCastData) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        forecast: foreCastData,
        location,
        address});
    });
  });
});

app.get('/help/*',(req,res)=>{
  res.render('404',{title:'404',message:'Help article not found', name: 'Chloe Le'})
})

app.get('*',(req,res)=>{
  res.render('404',{title:'404', message:'My 404 page', name: 'Chloe Le'})
})


app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
