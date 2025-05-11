// Custom cursor - only for non-touch devices
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

// Initialize cursor effects only on non-touch devices
if (!isTouchDevice()) {
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 100);
  });

  document.addEventListener("mousedown", () => {
    cursor.style.transform = "scale(0.8)";
    cursorFollower.style.transform = "scale(0.8)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "scale(1)";
    cursorFollower.style.transform = "scale(1)";
  });
} else {
  // Remove cursor elements on touch devices
  const cursor = document.querySelector(".cursor");
  const cursorFollower = document.querySelector(".cursor-follower");
  if (cursor) cursor.remove();
  if (cursorFollower) cursorFollower.remove();
}

// Typing animation
const typedTextSpan = document.querySelector(".typed-text");
const textArray = ["Web Developer", "UI/UX Designer", "Problem Solver"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Prevent default navigation behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Function to scroll to home without using navigation
function scrollToHome() {
  const homeSection = document.getElementById("home");
  if (homeSection) {
    homeSection.scrollIntoView({ behavior: "instant" });
    window.scrollTo(0, 0);
  }
}

// Prevent scroll position from being saved
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Handle page load
window.addEventListener("load", function () {
  // Remove any active states from navigation
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });

  // Force scroll to home
  scrollToHome();
});

// Handle before unload
window.addEventListener("beforeunload", function () {
  window.scrollTo(0, 0);
});

// Create and add scroll to top button
const scrollTopBtn = document.createElement("button");
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.className = "scroll-top-btn";
document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener("click", () => {
  scrollToHome();
});

// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      menuBtn.classList.remove("open");
      navLinks.classList.remove("active");
    }
  });

  // Close menu when clicking on a nav link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("open");
      navLinks.classList.remove("active");
    });
  });
}

// Form submission
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);

  // Here you would typically send the data to a server
  console.log("Form submitted:", data);

  // Show success message
  alert("Thank you for your message! I will get back to you soon.");
  contactForm.reset();
});

// Scroll reveal animation
const revealElements = document.querySelectorAll(
  ".project-card, .stat-item, .skill-tag"
);

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.classList.add("revealed");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// Stats counter animation
const stats = document.querySelectorAll(".stat-number");
let counted = false;

const startCounting = () => {
  if (counted) return;

  stats.forEach((stat) => {
    const target = parseInt(stat.textContent);
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    const updateCount = () => {
      count += increment;
      if (count < target) {
        stat.textContent = Math.floor(count);
        requestAnimationFrame(updateCount);
      } else {
        stat.textContent = target;
      }
    };

    updateCount();
  });

  counted = true;
};

// Start counting when stats section is in view
const statsSection = document.querySelector(".stats");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(statsSection);

// Project Data
const projects = [
  {
    title: "TIC-TAC-TOE",
    description:
      "A Advanced Tic-Tac-Toe game built with HTML, CSS, and JavaScript With a modern and clean design and a advance AI opponent .",
    image: "https://raw.githubusercontent.com/Ravi1892/TTT/refs/heads/main/Screenshot%202025-05-11%20181229.png",
    tags: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://itsravi.online",
    githubLink: "https://github.com/Ravi1892/TTT",
  },
  // Add more projects here following the same structure
  {
    title: "E-commerce Website",
    description:
      "A full-stack e-commerce platform with user authentication, product management, and payment integration.",
    image:
      "https://static.vecteezy.com/system/resources/previews/006/547/178/original/creative-modern-abstract-ecommerce-logo-design-colorful-gradient-online-shopping-bag-logo-design-template-free-vector.jpg",
    tags: ["React", "Express", "MongoDB", "Stripe"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Tetris",
    description:
      "A Tetris game built with HTML, CSS, and JavaScript.",
    image: "https://cdn.theculturetrip.com/wp-content/uploads/2017/06/shutterstock_316193825.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://ravi1892.github.io/Tetris-Game/",
    githubLink: "https://github.com/Ravi1892/Tetris-Game",
  },
];

// Function to create project cards
function createProjectCard(project) {
  return `
        <div class="project-card">
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" />
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${
                          project.liveLink
                        }" class="project-link" target="_blank">
                            <i class="fas fa-link"></i>
                        </a>
                        <a href="${
                          project.githubLink
                        }" class="project-link" target="_blank">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
                </div>
            </div>
        </div>
    `;
}

// Function to render projects
function renderProjects() {
  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    projectsGrid.innerHTML = projects
      .map((project) => createProjectCard(project))
      .join("");
  }
}

// Call renderProjects when the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  renderProjects();
  // Force scroll to top immediately
  window.scrollTo(0, 0);
});

// Initialize particles.js
particlesJS("particles-js", {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
    color: {
      value: "#4a90e2",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
      random: false,
    },
    size: {
      value: 3,
      random: true,
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#4a90e2",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: true,
        mode: "grab",
      },
      onclick: {
        enable: true,
        mode: "push",
      },
      resize: true,
    },
  },
  retina_detect: true,
});

// Scroll Progress Bar
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

window.addEventListener("scroll", () => {
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (window.scrollY / windowHeight) * 100;
  progressBar.style.width = `${progress}%`;
});

// Section Reveal Animation
const sections = document.querySelectorAll("section");

const revealSection = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  threshold: 0.15,
});

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Enhanced Project Card Hover Effect
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  });
});

// Skill Tag Animation
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseover", () => {
    tag.style.transform = "translateY(-5px) scale(1.05)";
  });

  tag.addEventListener("mouseout", () => {
    tag.style.transform = "translateY(0) scale(1)";
  });
});

// Enhanced Form Interaction
document
  .querySelectorAll(".form-group input, .form-group textarea")
  .forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });
  });

// Add this in the head section of your HTML
document.head.innerHTML +=
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js"></script>';

// Initialize 3D tilt effect
VanillaTilt.init(document.querySelectorAll(".project-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.3,
  scale: 1.05,
});

// Initialize cursor trail only on non-touch devices
document.addEventListener("DOMContentLoaded", function () {
  if (!isTouchDevice()) {
    // Remove any existing cursor trail
    const existingTrail = document.querySelector(".cursor-trail");
    if (existingTrail) {
      existingTrail.remove();
    }

    // Create new cursor trail
    const cursorTrail = document.createElement("div");
    cursorTrail.className = "cursor-trail";
    document.body.appendChild(cursorTrail);

    const trail = [];
    const trailLength = 20;

    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement("div");
      dot.className = "trail-dot";
      cursorTrail.appendChild(dot);
      trail.push({
        element: dot,
        x: 0,
        y: 0,
      });
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateTrail() {
      let x = mouseX;
      let y = mouseY;

      trail.forEach((dot, index) => {
        const nextDot = trail[index + 1] || trail[0];

        x += (nextDot.x - x) * 0.3;
        y += (nextDot.y - y) * 0.3;

        dot.x = x;
        dot.y = y;

        dot.element.style.transform = `translate(${x}px, ${y}px)`;
      });

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
  } else {
    // Remove cursor trail if it exists on touch devices
    const existingTrail = document.querySelector(".cursor-trail");
    if (existingTrail) {
      existingTrail.remove();
    }
  }
});

// Add a dynamic typing effect for project descriptions
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Add hover effect to project descriptions
document.querySelectorAll(".project-info p").forEach((desc) => {
  const originalText = desc.textContent;

  desc.addEventListener("mouseenter", () => {
    typeWriter(desc, originalText, 30);
  });

  desc.addEventListener("mouseleave", () => {
    desc.textContent = originalText;
  });
});

// Add a dynamic color theme based on time of day
function updateTheme() {
  const hour = new Date().getHours();
  const root = document.documentElement;

  if (hour >= 6 && hour < 18) {
    // Day theme
    root.style.setProperty("--primary-color", "#4a90e2");
    root.style.setProperty("--secondary-color", "#2c3e50");
  } else {
    // Night theme
    root.style.setProperty("--primary-color", "#6c5ce7");
    root.style.setProperty("--secondary-color", "#a29bfe");
  }
}

updateTheme();
setInterval(updateTheme, 60000); // Update every minute

// Add a dynamic background pattern
const pattern = document.createElement("div");
pattern.className = "background-pattern";
document.body.appendChild(pattern);
