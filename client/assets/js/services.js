/* =========================================
   COASTNOVA SERVICES PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. HEADER SCROLL EFFECT

    const header = document.getElementById("header");

    function updateHeader() {
        if (!header) return;

        header.classList.toggle(
            "scrolled",
            window.scrollY > 30
        );
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    // 2. MOBILE NAVIGATION

    const menuToggle = document.getElementById("menuToggle");
    const navigation = document.getElementById("navigation");

    function closeMenu() {
        if (!menuToggle || !navigation) return;

        menuToggle.classList.remove("active");
        navigation.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navigation) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navigation.classList.toggle("open");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

        navigation.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        document.addEventListener("click", event => {

            if (
                navigation.classList.contains("open") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 850) {
                closeMenu();
            }

        });

    }


    // 3. REVEAL ANIMATIONS

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(element => {
            element.classList.add("active");
        });

    } else {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -30px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    }


    // 4. STAGGER SERVICE CARDS

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.transitionDelay = `${(index % 2) * 100}ms`;

    });


    // 5. SMOOTH SCROLL FOR LOCAL PAGE ANCHORS

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const href = link.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            const target = document.getElementById(href.slice(1));

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });

});