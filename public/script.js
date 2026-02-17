let currentEmail = ""

async function generateEmail() {
  const res = await fetch("/api/generate")
  const data = await res.json()
  currentEmail = data.email

  const emailElement = document.getElementById("email")
  emailElement.style.opacity = "0"
  
  setTimeout(() => {
    emailElement.innerText = currentEmail
    emailElement.style.opacity = "1"
  }, 200)
}

function copyEmail() {
  if (!currentEmail) return
  navigator.clipboard.writeText(currentEmail)
  alert("Email copied!")
}

async function loadInbox() {
  if (!currentEmail) return

  const [login, domain] = currentEmail.split("@")
  const res = await fetch(`/api/inbox?login=${login}&domain=${domain}`)
  const data = await res.json()

  let html = ""
  if (data.length === 0) {
    html = "No messages"
  } else {
    data.forEach(msg => {
      html += `<div>
        <b>${msg.from}</b><br>
        ${msg.subject}
      </div><hr>`
    })
  }

  document.getElementById("inbox").innerHTML = html
}

setInterval(loadInbox, 5000)
