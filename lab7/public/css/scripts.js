document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('message-form');
  const messagesList = document.getElementById('messages');
  const roomName = window.location.pathname.split('/')[1];

  function refreshMessages() {
    fetch(`/${roomName}/messages`)
      .then(response => response.json())
      .then(messages => {
        messagesList.innerHTML = '';
        messages.forEach(msg => {
          const li = document.createElement('li');
          li.innerHTML = `<strong>${msg.nickname}:</strong> ${msg.text} <em>${new Date(msg.datetime).toLocaleTimeString()}</em>`;
          messagesList.appendChild(li);
        });
      })
      .catch(error => console.error('Error fetching messages:', error)); // Add error handling
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nickname = document.getElementById('nickname').value;
    const text = document.getElementById('text').value;

    fetch(`/${roomName}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nickname, text })
    })
    .then(response => {
      if (response.ok) {
        refreshMessages();
        form.reset();
      } else {
        console.error('Failed to send message:', response.status); // Add error handling
      }
    })
    .catch(error => console.error('Error sending message:', error)); // Add error handling
  });

  setInterval(refreshMessages, 3000);
  refreshMessages();
});
