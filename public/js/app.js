const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const weatherIcon = document.querySelector('#weather-img')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  // Reset my elements accordingly
  messageOne.textContent = 'Loading'
  messageTwo.textContent = ''
  weatherIcon.innerHTML = ''

  if(!location) {
    messageOne.textContent = 'You must provide an address'
    return
  }

  fetch(`/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error
      } else {
        let icon = document.createElement('img')
        icon.src = data.iconURL
        icon.alt = 'weather icon'
        icon.height = 80
        icon.width = 80

        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast

        weatherIcon.appendChild(icon)
      }
    })
})