// =========================================================
// MOBILE MENU
// =========================================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    // Close menu after clicking a link

    document
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("show");

                const icon =
                    menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

}



// =========================================================
// HEADER SCROLL EFFECT
// =========================================================

const header =
    document.querySelector(".header");


function handleHeaderScroll() {

    if (!header) return;


    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    handleHeaderScroll, { passive: true }
);


// Run once when page loads

handleHeaderScroll();



// =========================================================
// ACTIVE NAVIGATION
// =========================================================

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


function updateActiveNav() {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionBottom =
            sectionTop + section.offsetHeight;


        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");


        const href =
            link.getAttribute("href");


        if (
            href === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav, { passive: true }
);


updateActiveNav();



// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements =
    document.querySelectorAll(
        ".section-heading, " +
        ".about-text, " +
        ".info-card, " +
        ".skill-card, " +
        ".project-card, " +
        ".contact-box"
    );


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            }, {
                threshold: 0.12
            }
        );


    revealElements.forEach((element) => {

        element.classList.add(
            "reveal-hidden"
        );

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });

}



// =========================================================
// PROJECT STAGGER ANIMATION
// =========================================================

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


projectCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    }
);



// =========================================================
// SKILLS STAGGER ANIMATION
// =========================================================

const skillCards =
    document.querySelectorAll(
        ".skill-card"
    );


skillCards.forEach(
    (card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    }
);



// =========================================================
// BUTTON RIPPLE EFFECT
// =========================================================

const buttons =
    document.querySelectorAll(".btn");


buttons.forEach((button) => {

    button.addEventListener(
        "click",
        function(event) {

            const ripple =
                document.createElement("span");


            const rect =
                button.getBoundingClientRect();


            const size =
                Math.max(
                    rect.width,
                    rect.height
                );


            ripple.style.width =
                `${size}px`;

            ripple.style.height =
                `${size}px`;


            ripple.style.left =
                `${
                    event.clientX -
                    rect.left -
                    size / 2
                }px`;


            ripple.style.top =
                `${
                    event.clientY -
                    rect.top -
                    size / 2
                }px`;


            ripple.classList.add(
                "ripple"
            );


            button.appendChild(
                ripple
            );


            setTimeout(() => {

                ripple.remove();

            }, 600);

        }
    );

});



// =========================================================
// SMOOTH SCROLL
// =========================================================

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (!targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {

                    return;

                }


                event.preventDefault();


                const headerHeight =
                    header ?
                    header.offsetHeight :
                    0;


                const targetPosition =
                    target.offsetTop -
                    headerHeight;


                window.scrollTo({

                    top: targetPosition,

                    behavior: "smooth"

                });

            }
        );

    });



// =========================================================
// CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
// =========================================================

document.addEventListener(
    "click",
    (event) => {

        if (!menuBtn ||
            !navLinks
        ) {

            return;

        }


        const clickedInsideMenu =
            navLinks.contains(
                event.target
            );


        const clickedMenuButton =
            menuBtn.contains(
                event.target
            );


        if (!clickedInsideMenu &&
            !clickedMenuButton &&
            navLinks.classList.contains(
                "show"
            )
        ) {

            navLinks.classList.remove(
                "show"
            );


            const icon =
                menuBtn.querySelector("i");


            icon.classList.remove(
                "fa-xmark"
            );

            icon.classList.add(
                "fa-bars"
            );

        }

    }
);



// =========================================================
// UPDATE FOOTER YEAR
// =========================================================

const footerYear =
    document.querySelector(
        ".footer-bottom p"
    );


if (footerYear) {

    const year =
        new Date().getFullYear();


    footerYear.textContent =
        `© ${year} Mahmoud Esmail. All rights reserved.`;

}



// =========================================================
// CODE CARD FLOATING EFFECT
// =========================================================

const codeCard =
    document.querySelector(
        ".code-card"
    );


if (
    codeCard &&
    window.matchMedia(
        "(min-width: 1001px)"
    ).matches
) {

    let animationFrame;


    window.addEventListener(
        "scroll",
        () => {

            if (animationFrame) {

                cancelAnimationFrame(
                    animationFrame
                );

            }


            animationFrame =
                requestAnimationFrame(
                    () => {

                        const scroll =
                            window.scrollY;


                        const movement =
                            Math.min(
                                scroll * 0.04,
                                15
                            );


                        codeCard.style.transform =
                            `
                            perspective(1000px)
                            rotateY(-5deg)
                            translateY(${movement}px)
                            `;

                    }
                );

        }, { passive: true }
    );

}



// =========================================================
// CONSOLE MESSAGE
// =========================================================

console.log(
    "%c Mahmoud Esmail | Flutter Developer 🚀 ",
    "background:#c8ff4d;color:#091008;padding:8px 14px;border-radius:6px;font-weight:600;"
);