const getPlace = document.querySelector('input');
const msg_1 = document.querySelector('#message-1');
const msg_2 = document.querySelector('#message-2');

document.querySelector('form').addEventListener('submit', (eve) => {
    eve.preventDefault();

    msg_1.textContent = 'Fetching forecase information...'
    msg_2.textContent = ''
    fetch('http://localhost:3000/weather?search='+getPlace.value).then((response) =>{
    response.json().then((data) => {
       if(data.error){
            msg_1.textContent = data.error
       }
       else{
           msg_1.textContent = 'City Name : ' +data.city
           msg_2.textContent = 'Temperature : ' + data.temperature
       }
    })
})

    
}) 