// ==============================
// LOADING SCREEN
// ==============================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
    document.body.classList.add('loaded');
  }, 1500); // 1.5 second delay
});

// ==============================
// THEME TOGGLE
// ==============================
const themeButton = document.getElementById("themeButton");
const root = document.documentElement;

// Initialize theme on page load
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  root.setAttribute("data-theme", savedTheme);
  updateThemeButton(savedTheme);
}

// Update theme button icon (Font Awesome)
function updateThemeButton(theme) {
  if (themeButton) {
    const icon = themeButton.querySelector('i');
    if (icon) {
      icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }
    themeButton.setAttribute("aria-label", `Switch to ${theme === "light" ? "dark" : "light"} mode`);
  }
}

// Toggle theme
function toggleTheme() {
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  console.log("Current Theme:", currentTheme)
  console.log("New Theme:", newTheme);
  
  root.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeButton(newTheme);
}

// Event listener for theme toggle
if (themeButton) {
  initTheme();
  themeButton.addEventListener("click", toggleTheme);
}

// ==============================
// DROPDOWN MENU
// ==============================
const menuButton = document.querySelector('.menu-button');
const dropdownMenu = document.getElementById('dropdownMenu');

// Toggle dropdown menu
function toggleMenu() {
  if (dropdownMenu) {
    dropdownMenu.classList.toggle('show');
  }
}

// Close dropdown menu
function closeMenu() {
  if (dropdownMenu) {
    dropdownMenu.classList.remove('show');
  }
}

// Toggle submenu
function toggleSubmenu(id) {
  const submenu = document.getElementById(id + 'Submenu');
  if (submenu) {
    submenu.classList.toggle('show');
  }
}

// Make functions globally available
window.toggleMenu = toggleMenu;
window.toggleSubmenu = toggleSubmenu;

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (menuButton && dropdownMenu) {
    if (!dropdownMenu.contains(e.target) && !menuButton.contains(e.target)) {
      closeMenu();
    }
  }
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dropdownMenu && dropdownMenu.classList.contains('show')) {
    closeMenu();
  }
});

// ==============================
// SMOOTH SCROLL TO SECTION
// ==============================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const offset = 80; // Offset for sticky nav
    const elementPosition = section.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// Make function globally available for inline onclick handlers
window.scrollToSection = scrollToSection;

// ==============================
// ACTIVE BUTTON HIGHLIGHT ON SCROLL
// ==============================
let observer;

if ('IntersectionObserver' in window) {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const buttons = document.querySelectorAll('.menu-buttons button');
        
        buttons.forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.section === id) {
            btn.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-100px 0px -50% 0px'
  });

  // Observe all menu sections when page loads
  window.addEventListener('load', () => {
    const sections = document.querySelectorAll('.menu-section');
    sections.forEach(section => {
      if (observer) {
        observer.observe(section);
      }
    });
  });
}

// ==============================
// BACK TO TOP BUTTON
// ==============================
const backToTop = document.getElementById("backToTop");

function toggleBackToTop() {
  if (backToTop) {
    if (window.scrollY > 350) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Event listeners for back to top
if (backToTop) {
  window.addEventListener("scroll", toggleBackToTop);
  backToTop.addEventListener("click", scrollToTop);
}

// Make function globally available
window.scrollToTop = scrollToTop;

// ==============================
// LIGHTBOX FOR MENU IMAGES
// ==============================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

// Open lightbox
function openLightbox(element) {
  if (!lightbox || !lightboxImg) return;
  
  // Get image source
  const imgSrc = element.src || element.querySelector('img')?.src;
  
  if (imgSrc) {
    lightboxImg.src = imgSrc;
    lightbox.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

// Close lightbox
function closeLightbox(event) {
  if (!lightbox) return;
  
  // Only close if clicking the overlay or close button
  if (event && event.target !== lightbox && event.target !== document.querySelector('.lightbox-close')) {
    return;
  }
  
  lightbox.classList.remove('show');
  document.body.style.overflow = '';
}

// Make functions globally available
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
    closeLightbox();
  }
});

// Prevent lightbox from closing when clicking the image
if (lightboxImg) {
  lightboxImg.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

// ==============================
// PAGE LOAD OPTIMIZATION
// ==============================
// Run theme initialization immediately
initTheme();

// Optional: Add smooth scroll behavior for anchor links
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

window.addEventListener("DOMContentLoaded", initTheme);