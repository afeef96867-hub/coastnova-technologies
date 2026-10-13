/* ==========================================
   1. FRONT LOADER — FIRST VISIT ONLY
========================================== */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    // If this page has no loader, do nothing.
    if (!loader) return;

    // Check whether the loader has already appeared
    // during this browser session.
    const hasVisited = sessionStorage.getItem("coastnovaVisited");

    if (hasVisited) {
        // Returning visitor: hide immediately.
        loader.classList.add("hide");
        return;
    }

    // Mark the first visit.
    sessionStorage.setItem("coastnovaVisited", "true");

    // Show the loader for 4 seconds, then hide it.
    setTimeout(() => {
        loader.classList.add("hide");
    }, 4000);
});

/* ==========================================
   2. NAVBAR SCROLL EFFECT
========================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (header) {
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }
});


/* ==========================================
   3. MOBILE MENU
========================================== */

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");

if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        mobileMenu.classList.toggle("open");
    });
}

function closeMobileMenu() {
    if (hamburger && mobileMenu) {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("open");
    }
}


/* ==========================================
   4. SCROLL REVEAL ANIMATION
========================================== */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("active");
    });
}


/* ==========================================
   5. PROCESS TIMELINE ANIMATION
========================================== */

const processSection = document.querySelector(".process-section");
const processLine = document.getElementById("processLine");

if (processSection && processLine) {
    const processObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    processLine.style.width = "100%";
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    processObserver.observe(processSection);
}


/* ==========================================
   6. STATISTICS COUNTER
========================================== */

const statItems = document.querySelectorAll(
    ".stat-number[data-target]"
);

const statsSection = document.querySelector(".stats-section");

let statsCounted = false;

if (statsSection && statItems.length > 0) {
    const statsObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !statsCounted) {
                    statsCounted = true;

                    statItems.forEach((item) => {
                        const target = parseInt(
                            item.getAttribute("data-target"),
                            10
                        );

                        const originalText = item.textContent.trim();
                        const suffix = originalText.includes("%")
                            ? "%"
                            : "+";

                        let current = 0;
                        const duration = 1200;
                        const interval = 30;
                        const steps = duration / interval;
                        const increment = target / steps;

                        const timer = setInterval(() => {
                            current += increment;

                            if (current >= target) {
                                const formattedTarget =
                                    target < 10
                                        ? "0" + target
                                        : target;

                                item.textContent =
                                    formattedTarget + suffix;

                                clearInterval(timer);
                            } else {
                                const value = Math.floor(current);

                                item.textContent =
                                    (value < 10 ? "0" + value : value) +
                                    suffix;
                            }
                        }, interval);
                    });

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.3
        }
    );

    statsObserver.observe(statsSection);
}


/* ==========================================
   7. CONTACT FORM FEEDBACK
========================================== */


/* ==========================================
   CONTACT FORM — OPEN GMAIL
========================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            return;
        }

        const formData = new FormData(contactForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone") || "Not provided";
        const projectType = formData.get("projectType");
        const message = formData.get("message");

        const subject = encodeURIComponent(
            "CoastNova Website Inquiry - " + projectType
        );

        const body = encodeURIComponent(
            "Name: " + name + "\n" +
            "Email: " + email + "\n" +
            "Phone: " + phone + "\n" +
            "Project Type: " + projectType + "\n\n" +
            "Message:\n" + message
        );

        const gmailURL =
            "https://mail.google.com/mail/?view=cm&fs=1" +
            "&to=coastnovatechnologies@gmail.com" +
            "&su=" + subject +
            "&body=" + body;

        
const gmailWindow = window.open(gmailURL, "_blank");

if (gmailWindow) {
    contactForm.reset();
}


    });
}

