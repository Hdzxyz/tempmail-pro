// ===============================
// TEMP MAIL PREMIUM SCRIPT
// ===============================

// Generate Random Email
function generateEmail() {
  const random = Math.random().toString(36).substring(2, 10);
  const domain = "hadzzmail.com";
  const email = `${random}@${domain}`;

  // Tampilkan ke UI
  document.getElementById("emailDisplay").innerText = email;

  // Simpan ke localStorage agar tidak hilang saat refresh
  localStorage.setItem("generatedEmail", email);
}

// Copy Email Modern
async function copyEmail() {
  const email = document.getElementById("emailDisplay").innerText;
  const btn = document.getElementById("copyBtn");

  if (!email || email === "-") {
    alert("Tidak ada email untuk di-copy!");
    return;
  }

  try {
    await navigator.clipboard.writeText(email);

    btn.innerText = "Copied ✓";
    btn.classList.add("copied");

    setTimeout(() => {
      btn.innerText = "Copy";
      btn.classList.remove("copied");
    }, 2000);

  } catch (error) {
    alert("Gagal menyalin email!");
  }
}

// Reset Email
function resetEmail() {
  localStorage.removeItem("generatedEmail");
  document.getElementById("emailDisplay").innerText = "-";
}

// Auto Load Saat Website Dibuka
window.onload = function () {
  const savedEmail = localStorage.getItem("generatedEmail");

  if (savedEmail) {
    document.getElementById("emailDisplay").innerText = savedEmail;
  }
};

// Optional: Anti Zoom Hardcore
document.addEventListener('wheel', function(e){
  if(e.ctrlKey){ e.preventDefault(); }
}, { passive:false });

document.addEventListener('keydown', function(e){
  if(e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0')){
    e.preventDefault();
  }
});
