let currentEmail = ""

function generateEmail() {
  const random = Math.random().toString(36).substring(2, 10);
  const email = random + "@hadzzmail.com";

  document.getElementById("emailDisplay").innerText = email;

  // Simpan ke localStorage
  localStorage.setItem("generatedEmail", email);

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

async function copyEmail() {
  const email = document.getElementById("emailDisplay").innerText;

  if (!email || email === "-") {
    alert("Tidak ada email untuk di-copy!");
    return;
  }

  try {
    await navigator.clipboard.writeText(email);

    const btn = document.getElementById("copyBtn");
    btn.innerText = "Copied ✓";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.innerText = "Copy";
      btn.classList.remove("copied");
    }, 2000);

  } catch (err) {
    alert("Gagal menyalin email!");
  }
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
