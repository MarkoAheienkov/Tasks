const socket = io('http://localhost:3000/');

const form = document.querySelector('#form');
const input = document.querySelector('#message');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(input.value);
  socket.emit('message', input.value);
  input.value = '';
});

socket.on('message', (data) => {
  console.log(data);
});
