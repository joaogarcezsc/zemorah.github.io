// Pop-up logic
let popup1, popup2;

// Initialize popups when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  popup1 = document.getElementById("popup1");
  popup2 = document.getElementById("popup2");

  // Add click event listeners to all close buttons
  const closeButtons = document.querySelectorAll(".close-button");
  closeButtons.forEach((button) => {
    button.addEventListener("click", closePopup);
  });

  // Also allow clicking outside the popup to close it
  const popups = document.querySelectorAll(".popup");
  popups.forEach((popup) => {
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        closePopup();
      }
    });
  });
});

function showPopup() {
  if (!popup1 || !popup2) return; // Safety check

  // Get current popup state from localStorage, default to 1 (pre-venda first)
  let currentPopup = parseInt(localStorage.getItem("zemorahPopupState")) || 1;

  if (currentPopup === 1) {
    popup1.style.display = "flex";
    popup2.style.display = "none";
    // Set next popup to be 2
    localStorage.setItem("zemorahPopupState", "2");
  } else {
    popup1.style.display = "none";
    popup2.style.display = "flex";
    // Set next popup to be 1
    localStorage.setItem("zemorahPopupState", "1");
  }
}

function closePopup() {
  if (popup1) popup1.style.display = "none";
  if (popup2) popup2.style.display = "none";
}

// Show a popup after a delay when the page loads
window.addEventListener("load", () => {
  setTimeout(showPopup, 1000); // Show after 1 second
});

// Share site function for the second popup
function shareSite() {
  const siteUrl = window.location.href; // Get the current site URL
  const shareText = "Confira a Zemorah - Moda Cristã Urbana! " + siteUrl;

  // Try to use Web Share API first
  if (navigator.share) {
    navigator
      .share({
        title: "Zemorah - Moda Cristã Urbana",
        text: shareText,
        url: siteUrl,
      })
      .then(() => console.log("Compartilhado com sucesso!"))
      .catch((error) => console.error("Erro ao compartilhar:", error));
  } else {
    // Fallback for browsers that do not support Web Share API
    // Open WhatsApp Web/App with pre-filled message
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`,
      "_blank"
    );
  }
}

// Carousel functionality for ads at the bottom
let currentAdSlide = 0;

function showAdSlide(index) {
  const adSlides = document.querySelectorAll(".ad-carousel-item");
  adSlides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });

  // Update dots
  const adDots = document.querySelectorAll(".ad-dot");
  adDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });

  currentAdSlide = index;
}

function nextAdSlide() {
  const adSlides = document.querySelectorAll(".ad-carousel-item");
  currentAdSlide = (currentAdSlide + 1) % adSlides.length;
  showAdSlide(currentAdSlide);
}

function currentAdSlideFunc(index) {
  showAdSlide(index - 1);
}

// Initialize ad carousel when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const adSlides = document.querySelectorAll(".ad-carousel-item");

  if (adSlides.length > 0) {
    showAdSlide(0);

    // Auto-advance every 5 seconds
    setInterval(nextAdSlide, 5000);
  }

  // Add click handlers for ad dots
  const adDots = document.querySelectorAll(".ad-dot");
  adDots.forEach((dot, index) => {
    dot.addEventListener("click", () => currentAdSlideFunc(index + 1));
  });
});
