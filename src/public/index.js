const socket = io()
let user;
let chatBox = document.getElementById('chatBox')
let form = document.getElementById('foodForm')


form.addEventListener('submit',(evt)=>{
    evt.preventDefault()
    let data= new FormData(form)
    let obj={}
    data.forEach((val,key)=>obj[key]=val)
    socket.emit('sendFood',obj)
    form.reset()
})

socket.on('foodLog', (data)=>{
    let foods = data.payload
    let table = document.getElementById('table')
    let foodsStryng=''
    foods.forEach(food=>{
        foodsStryng = foodsStryng+`
      <tr>
        <th scope="col">${food.name}</th>
        <td scope="col">${food.ingredients}</td>
        <td scope="col">${food.steeps}</td>
        <td scope="col">${food.thumbnail}</td>
      </tr>
    `
    })
    
    table.innerHTML=foodsStryng
    moment().format('MMMM Do YYYY, h:mm:ss a')
})

swal.fire({
    title:'IDENTIFY YOURSELF',
    input:'text',
    text:"Please, enter you're user",
    inputValidator:(value)=>{
        return !value && "Please login!"
    },
    allowOutsideClick:false
}).then(result=>{
    user=result.value
})

socket.on('newUserConnected',(data)=>{
    Swal.fire({
        icon:'succes',
        text:`New user connected: ${user}`,
        toast:true,
        position:'top-right'
    })
})
socket.on('log', data=>{
    let history = document.getElementById('history')
    let messages=''
    data.forEach(message=>{
        messages= messages+ `</br>${message.user} Says: ${message.message}</br>`
    })
    history.innerHTML=messages
})

chatBox.addEventListener('keyup', (evt)=>{
    if(evt.key==='Enter'){
        if(chatBox.value.trim().length>0 || chatBox.value===''){
            socket.emit('message', {user:user, message:chatBox.value})
            chatBox.value=''
        }

    }
})