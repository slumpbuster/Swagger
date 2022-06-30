const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json');

let port = process.env.PORT || 3001;

var concerts = [
    {id:1,artist:"Chris Stapelton",tour:"All-American Road Show",venue:"Blossom Music Center",date:"2022-07-07"},
    {id:2,artist:"Kid Rock",tour:"Bad Reputation",venue:"Blossom Music Center",date:"2022-07-07"},
    {id:3,artist:"Elton John",tour:"Farewell Yellow Brick Road The Final Tour",venue:"PNC Park",date:"2022-09-16"}
]

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get("/concerts", (req,res)=>{
    res.send(concerts);
})
app.post("/concert",(req,res)=>{
    concerts.push({id:req.body.id, artist:req.body.artist, tour:req.body.tour, venue:req.body.venue, date:req.body.date});
    let concert = concerts.filter(item=> item.id === req.body.id);
    res.send(`concert created:${JSON.stringify(concert)}`);
})
app.delete("/concert/:id", (req,res)=>{
    console.log('delete:id:'+req.params.id);
    concerts = concerts.filter(item=> item.id != req.params.id);
    res.send(`concerts left:${JSON.stringify(concerts)}`);
})

app.listen(port, function () {
    console.log(`Running on port ${port}`);
});