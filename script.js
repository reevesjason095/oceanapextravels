// 1. Target date: August 23, 2026 at 11:00 AM Eastern Time
const cruiseDate = new Date("2026-08-23T11:00:00-04:00");

function updateCountdown() {
    const timerElement = document.getElementById("timer");
    if (!timerElement) return;

    const now = new Date();
    const difference = cruiseDate - now;

    if (difference <= 0) {
        timerElement.innerHTML = "Welcome aboard, happy sailing!";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function updateLocalClock() {
    const clockElement = document.getElementById("currentTime");
    if (!clockElement) return;

    const now = new Date();
    const dateTimeOptions = {
        timeZone: "America/New_York",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    };

    const easternTime = now.toLocaleString("en-US", dateTimeOptions);
    clockElement.innerHTML = `Current Local Time: ${easternTime} ET`;
}

const topButton = document.getElementById("backToTopBtn");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function toggleTopButton() {
    if (!topButton) return;
    if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
        topButton.style.setProperty("display", "flex", "important");
    } else {
        topButton.style.setProperty("display", "none", "important");
    }
}

function toggleMenu() {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.toggle("show");
    const expanded = navLinks.classList.contains("show");
    menuToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    menuToggle.innerHTML = expanded
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

if (navLinks) {
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) toggleMenu();
        });
    });
}

window.addEventListener("scroll", toggleTopButton);
window.addEventListener("load", toggleTopButton);

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

updateCountdown();
updateLocalClock();

setInterval(updateCountdown, 1000);
setInterval(updateLocalClock, 1000);
