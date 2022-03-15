const express = require('express')
const {Server} = require('socket.io')
const FoodManager= require('./Manager/foodManager')
const newFood = new FoodManager()
const app = express()
const PORT = process.env.PORT||8080
const server = app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}`)})
const io = new Server(server)

app.use(express.static(__dirname+'/public'))

let log=[]
io.on('connection', (socket)=>{
    console.log('Scoket connected')
    socket.broadcast.emit('newUserConnected')
    socket.emit('log', log)
    socket.on('message',data=>{
        log.push(data)
        
        io.emit('log',log)
        
    })
    socket.on('sendFood',async data=>{
        await newFood.createNewFood(data)
        let foods = await newFood.getAllfoods()
        io.emit('foodLog',foods)
    })
})