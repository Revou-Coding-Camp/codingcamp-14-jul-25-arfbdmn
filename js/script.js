// Greeting dengan nama dinamis
document.addEventListener("DOMContentLoaded", function () {
  // Fungsi untuk mendapatkan nama dari user
  function getUserName() {
    let userName = localStorage.getItem("userName");

    if (!userName) {
      userName = prompt("Masukkan nama Anda:");
      if (userName) {
        localStorage.setItem("userName", userName);
      } else {
        userName = "Pengunjung";
      }
    }

    return userName;
  }

  // Set greeting dengan nama user
  const greeting = document.getElementById("greeting");
  const userName = getUserName();
  greeting.textContent = `Hi ${userName}! Welcome To Website`;

  // Smooth scrolling untuk navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Mobile menu toggle
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("active");
  });

  // Form validation dan handling
  const form = document.getElementById("messageForm");
  const modal = document.getElementById("successModal");
  const closeModal = document.querySelector(".close");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      submitForm();
    }
  });

  // Fungsi validasi form
  function validateForm() {
    let isValid = true;

    // Reset error messages
    clearErrors();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate name
    if (name === "") {
      showError("nameError", "Nama harus diisi");
      isValid = false;
    } else if (name.length < 2) {
      showError("nameError", "Nama minimal 2 karakter");
      isValid = false;
    }

    // Validate email
    if (email === "") {
      showError("emailError", "Email harus diisi");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("emailError", "Format email tidak valid");
      isValid = false;
    }

    // Validate phone
    if (phone === "") {
      showError("phoneError", "Nomor telepon harus diisi");
      isValid = false;
    } else if (!isValidPhone(phone)) {
      showError("phoneError", "Format nomor telepon tidak valid");
      isValid = false;
    }

    // Validate message
    if (message === "") {
      showError("messageError", "Pesan harus diisi");
      isValid = false;
    } else if (message.length < 10) {
      showError("messageError", "Pesan minimal 10 karakter");
      isValid = false;
    }

    return isValid;
  }

  // Fungsi untuk menampilkan error
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = document.getElementById(
      elementId.replace("Error", "")
    );

    errorElement.textContent = message;
    inputElement.classList.add("error");
  }

  // Fungsi untuk clear errors
  function clearErrors() {
    const errorElements = document.querySelectorAll(".error-message");
    const inputElements = document.querySelectorAll(
      ".form-group input, .form-group textarea"
    );

    errorElements.forEach((element) => {
      element.textContent = "";
    });

    inputElements.forEach((element) => {
      element.classList.remove("error");
    });
  }

  // Fungsi validasi email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Fungsi validasi phone
  function isValidPhone(phone) {
    const phoneRegex = /^(\+62|62|0)[0-9]{8,13}$/;
    return phoneRegex.test(phone);
  }

  // Fungsi submit form
  function submitForm() {
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      message: document.getElementById("message").value,
      timestamp: new Date().toLocaleString("id-ID"),
    };

    // Tampilkan data di modal
    displaySubmittedData(formData);

    // Reset form
    form.reset();

    // Tampilkan modal
    modal.style.display = "block";

    // Simpan data ke localStorage (simulasi database)
    saveToLocalStorage(formData);
  }

  // Fungsi untuk menampilkan data yang disubmit
  function displaySubmittedData(data) {
    const submittedDataDiv = document.getElementById("submittedData");
    submittedDataDiv.innerHTML = `
            <div class="submitted-info">
                <h3>Data yang Dikirim:</h3>
                <p><strong>Nama:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Telepon:</strong> ${data.phone}</p>
                <p><strong>Pesan:</strong> ${data.message}</p>
                <p><strong>Waktu:</strong> ${data.timestamp}</p>
            </div>
        `;
  }

  // Fungsi untuk menyimpan data ke localStorage
  function saveToLocalStorage(data) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(data);
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  // Close modal
  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Real-time validation
  const inputs = document.querySelectorAll(
    ".form-group input, .form-group textarea"
  );
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateSingleField(this);
    });

    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        validateSingleField(this);
      }
    });
  });

  // Fungsi validasi single field
  function validateSingleField(field) {
    const fieldId = field.id;
    const fieldValue = field.value.trim();
    const errorElementId = fieldId + "Error";

    // Clear previous error
    document.getElementById(errorElementId).textContent = "";
    field.classList.remove("error");

    switch (fieldId) {
      case "name":
        if (fieldValue === "") {
          showError(errorElementId, "Nama harus diisi");
        } else if (fieldValue.length < 2) {
          showError(errorElementId, "Nama minimal 2 karakter");
        }
        break;

      case "email":
        if (fieldValue === "") {
          showError(errorElementId, "Email harus diisi");
        } else if (!isValidEmail(fieldValue)) {
          showError(errorElementId, "Format email tidak valid");
        }
        break;

      case "phone":
        if (fieldValue === "") {
          showError(errorElementId, "Nomor telepon harus diisi");
        } else if (!isValidPhone(fieldValue)) {
          showError(errorElementId, "Format nomor telepon tidak valid");
        }
        break;

      case "message":
        if (fieldValue === "") {
          showError(errorElementId, "Pesan harus diisi");
        } else if (fieldValue.length < 10) {
          showError(errorElementId, "Pesan minimal 10 karakter");
        }
        break;
    }
  }

  // Scroll to top button
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = "↑";
  scrollToTopBtn.setAttribute("id", "scrollToTop");
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Active navigation highlight
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === currentSection) {
        link.classList.add("active");
      }
    });
  });

  // Tambahkan CSS untuk active nav link
  const style = document.createElement("style");
  style.textContent = `
        .nav-link.active {
            color: #ffd700 !important;
            font-weight: bold;
        }
        
        .submitted-info {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 1rem;
        }
        
        .submitted-info h3 {
            color: #333;
            margin-bottom: 1rem;
        }
        
        .submitted-info p {
            margin-bottom: 0.5rem;
            color: #666;
        }
        
        .submitted-info strong {
            color: #333;
        }
    `;
  document.head.appendChild(style);

  // Animasi counter untuk statistik
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      element.textContent = Math.floor(start) + "+";

      if (start >= target) {
        element.textContent = target + "+";
        clearInterval(timer);
      }
    }, 16);
  }

  // Intersection Observer untuk animasi
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statItems = entry.target.querySelectorAll(".stat-item h4");
        statItems.forEach((item) => {
          const targetValue = parseInt(item.textContent);
          animateCounter(item, targetValue);
        });
        observer.unobserve(entry.target);
      }
    });
  });

  const statsSection = document.querySelector(".company-stats");
  if (statsSection) {
    observer.observe(statsSection);
  }
});

// Fungsi untuk scroll ke section tertentu (dipanggil dari button)
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 80;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// Fungsi untuk menampilkan semua pesan yang tersimpan (untuk debugging)
function showAllMessages() {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  console.log("Semua pesan yang tersimpan:", messages);
  return messages;
}

// Fungsi untuk menghapus semua pesan (untuk debugging)
function clearAllMessages() {
  localStorage.removeItem("messages");
  console.log("Semua pesan telah dihapus");
}

// Fungsi untuk mengubah nama user
function changeUserName() {
  const newName = prompt("Masukkan nama baru:");
  if (newName) {
    localStorage.setItem("userName", newName);
    const greeting = document.getElementById("greeting");
    greeting.textContent = `Hi ${newName}! Welcome To Website`;
  }
}
