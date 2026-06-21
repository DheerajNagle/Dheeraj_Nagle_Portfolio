// ==========================================================================
// PORTFOLIO INITIAL STATE & RENDER LOGIC
// ==========================================================================

// Default data matches the Dribbble design screenshot details
const DEFAULT_PORTFOLIO_DATA = {
    profile: {
        firstname: "DHEERAJ",
        lastname: "NAGLE",
        role: "Creative UI/UX Designer & Web Developer",
        heroWelcome: "Welcome to my portfolio! I'm Dheeraj Nagle, a passionate UI/UX designer and web developer. I craft visually stunning, functional websites that deliver exceptional user experiences.",
        aboutTitle: "Passionate & Creative Full-Stack Designer",
        aboutBio: "I'm Dheeraj Nagle, a designer and developer passionate about crafting intuitive, user-centered experiences. I love turning complex ideas into seamless interfaces.",
        profileImage: "assets/dheeraj_photo.jpg",
        cardImage: "assets/dheeraj_photo.jpg",
        contactPhone: "+91 98765 43210",
        contactEmail: "dheeraj.nagle@example.com",
        contactWebsite: "www.dheerajnagle.com",
        contactAddress: "Madhya Pradesh, India",
        socials: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        }
    },
    tags: [
        "#BRANDING", 
        "#UI/UX DESIGN", 
        "#DEVELOPMENT", 
        "#WEB DESIGN"
    ],
    experience: [
        {
            title: "UI/UX Designer",
            sub: "At Wegems",
            date: "2023 - Present",
            desc: "Designing intuitive interfaces, improving user flows, conducting usability tests, and collaborating with teams to create engaging digital experiences."
        },
        {
            title: "Product Designer",
            sub: "At LuminUI",
            date: "2022 - 2023",
            desc: "Crafting interactive designs, prototyping innovative features, analyzing user behavior, and ensuring products meet user needs and business goals."
        },
        {
            title: "Senior UX Designer",
            sub: "At Ugergency",
            date: "2020 - 2022",
            desc: "Leading UX projects, conducting user research and testing, and optimizing products for usability, engagement, and overall satisfaction."
        }
    ],
    education: [
        {
            title: "BSC in CSE",
            sub: "London University",
            date: "2023 - Present",
            desc: "Focusing on Software Engineering, human-computer interaction, and design systems."
        },
        {
            title: "Diploma in Web Design",
            sub: "Oxford College",
            date: "2022 - 2023",
            desc: "Specialized in CSS frameworks, grid layouts, visual hierarchy, and typography."
        }
    ],
    projects: [
        {
            name: "M-Mockups: MacBook Air",
            category: "UI/UX Design",
            image: "assets/project_macbook.png",
            url: "#"
        },
        {
            name: "LuminUI Dashboard",
            category: "Web Design",
            image: "assets/project_luminui.png",
            url: "#"
        }
    ],
    testimonials: [
        {
            stars: 5,
            text: "Navigating the portfolio feels natural. Everything aligned and easy to use.",
            name: "Sarah Jenkins",
            role: "Product Lead"
        },
        {
            stars: 5,
            text: "David captured our vision, turning it into a polished website.",
            name: "James Carter",
            role: "CEO at Wegems"
        },
        {
            stars: 5,
            text: "The experience feels smooth, fast, exactly how a portfolio should be.",
            name: "Elena Rostova",
            role: "Creative Director"
        },
        {
            stars: 5,
            text: "Portfolio navigation is extremely intuitive. Highly recommended!",
            name: "Tariq Al-Sabah",
            role: "Tech Founder"
        }
    ]
};

// Global portfolio data container
let portfolioData = {};

// Initialize application state
function initPortfolioState() {
    const savedData = localStorage.getItem("portfolio_state");
    let needsReset = false;
    
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            if (!parsed.profile || parsed.profile.firstname !== "DHEERAJ") {
                needsReset = true;
            }
        } catch (e) {
            needsReset = true;
        }
    }
    
    if (!savedData || needsReset) {
        localStorage.setItem("portfolio_state", JSON.stringify(DEFAULT_PORTFOLIO_DATA));
        portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    } else {
        try {
            portfolioData = JSON.parse(savedData);
        } catch (e) {
            localStorage.setItem("portfolio_state", JSON.stringify(DEFAULT_PORTFOLIO_DATA));
            portfolioData = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
        }
    }
}

// Render dynamic components to DOM
function renderPortfolio() {
    const p = portfolioData.profile;

    // Set Text Fields
    document.querySelectorAll(".js-profile-firstname").forEach(el => el.textContent = p.firstname);
    document.querySelectorAll(".js-profile-lastname").forEach(el => el.textContent = p.lastname);
    document.querySelectorAll(".js-profile-fullname").forEach(el => el.textContent = `${p.firstname} ${p.lastname}`);
    document.querySelectorAll(".js-profile-role").forEach(el => el.textContent = p.role);
    document.querySelectorAll(".js-hero-welcome").forEach(el => el.textContent = p.heroWelcome);
    document.querySelectorAll(".js-about-title").forEach(el => el.textContent = p.aboutTitle);
    document.querySelectorAll(".js-about-bio").forEach(el => el.textContent = p.aboutBio);
    document.querySelectorAll(".js-contact-phone").forEach(el => el.textContent = p.contactPhone);
    document.querySelectorAll(".js-contact-email").forEach(el => el.textContent = p.contactEmail);
    document.querySelectorAll(".js-contact-website").forEach(el => el.textContent = p.contactWebsite);
    document.querySelectorAll(".js-contact-address").forEach(el => el.textContent = p.contactAddress);

    // Set Social Links
    document.querySelectorAll(".js-social-fb").forEach(el => el.href = p.socials.facebook || "#");
    document.querySelectorAll(".js-social-ig").forEach(el => el.href = p.socials.instagram || "#");
    document.querySelectorAll(".js-social-in").forEach(el => el.href = p.socials.linkedin || "#");
    document.querySelectorAll(".js-social-x").forEach(el => el.href = p.socials.twitter || "#");

    // Set Images
    const heroImg = document.getElementById("hero-profile-img");
    if (heroImg) heroImg.src = p.profileImage;
    const cardImg = document.getElementById("about-card-img");
    if (cardImg) cardImg.src = p.cardImage;
    const navLogoImg = document.getElementById("nav-logo-img");
    if (navLogoImg) navLogoImg.src = p.profileImage;

    // Render Hero Tag Pills
    const tagsContainer = document.getElementById("js-hero-tags");
    if (tagsContainer) {
        tagsContainer.innerHTML = "";
        portfolioData.tags.forEach((tag, idx) => {
            const span = document.createElement("span");
            span.className = "tag-pill editable-tag";
            span.textContent = tag;
            span.dataset.index = idx;
            tagsContainer.appendChild(span);
        });
    }

    // Render Experiences timeline
    const expList = document.getElementById("js-experience-list");
    if (expList) {
        expList.innerHTML = "";
        portfolioData.experience.forEach((exp, index) => {
            const item = document.createElement("div");
            item.className = "timeline-item relative";
            item.dataset.index = index;
            item.dataset.type = "experience";

            // Add Admin Action Badges if Logged In
            const isAdmin = document.body.classList.contains("admin-logged-in");
            const adminButtonsHtml = isAdmin && document.body.classList.contains("edit-mode-active") ? `
                <div class="edit-badge js-btn-edit-entry" data-index="${index}" data-type="experience"><i class="fa-solid fa-pen"></i> Edit</div>
                <div class="delete-badge js-btn-delete-entry" data-index="${index}" data-type="experience"><i class="fa-solid fa-trash"></i> Delete</div>
            ` : "";

            item.innerHTML = `
                ${adminButtonsHtml}
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-title">${exp.title}</h3>
                        <span class="timeline-sub">${exp.sub}</span>
                    </div>
                    <span class="timeline-date">${exp.date}</span>
                </div>
                <p class="timeline-desc">${exp.desc || ""}</p>
            `;
            expList.appendChild(item);
        });
    }

    // Render Educations timeline
    const eduList = document.getElementById("js-education-list");
    if (eduList) {
        eduList.innerHTML = "";
        portfolioData.education.forEach((edu, index) => {
            const item = document.createElement("div");
            item.className = "timeline-item relative";
            item.dataset.index = index;
            item.dataset.type = "education";

            const isAdmin = document.body.classList.contains("admin-logged-in");
            const adminButtonsHtml = isAdmin && document.body.classList.contains("edit-mode-active") ? `
                <div class="edit-badge js-btn-edit-entry" data-index="${index}" data-type="education"><i class="fa-solid fa-pen"></i> Edit</div>
                <div class="delete-badge js-btn-delete-entry" data-index="${index}" data-type="education"><i class="fa-solid fa-trash"></i> Delete</div>
            ` : "";

            item.innerHTML = `
                ${adminButtonsHtml}
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-title">${edu.title}</h3>
                        <span class="timeline-sub">${edu.sub}</span>
                    </div>
                    <span class="timeline-date">${edu.date}</span>
                </div>
                ${edu.desc ? `<p class="timeline-desc">${edu.desc}</p>` : ""}
            `;
            eduList.appendChild(item);
        });
    }

    // Render Projects Grid
    const projGrid = document.getElementById("js-projects-list");
    if (projGrid) {
        projGrid.innerHTML = "";
        portfolioData.projects.forEach((proj, index) => {
            const card = document.createElement("div");
            card.className = "project-card relative";
            card.dataset.index = index;

            const isAdmin = document.body.classList.contains("admin-logged-in");
            const adminButtonsHtml = isAdmin && document.body.classList.contains("edit-mode-active") ? `
                <div class="edit-badge js-btn-edit-project" data-index="${index}"><i class="fa-solid fa-pen"></i> Edit</div>
                <div class="delete-badge js-btn-delete-project" data-index="${index}"><i class="fa-solid fa-trash"></i> Delete</div>
            ` : "";

            card.innerHTML = `
                ${adminButtonsHtml}
                <div class="project-img-wrapper">
                    <img src="${proj.image}" alt="${proj.name}" onerror="this.src='https://placehold.co/400x250?text=Mockup'">
                    <div class="project-overlay">
                        <a href="${proj.url || "#"}" class="btn btn-gold">View Project <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                    </div>
                </div>
                <div class="project-info">
                    <span class="project-category">${proj.category}</span>
                    <h3 class="project-name">${proj.name}</h3>
                </div>
            `;
            projGrid.appendChild(card);
        });
    }

    // Render Testimonials Carousel
    renderTestimonials();
}

// Render Testimonials & Handle Carousel Init
let testimonialInterval;
let currentTestimonialIndex = 0;

function renderTestimonials() {
    const track = document.getElementById("js-testimonials-track");
    const dotsContainer = document.getElementById("js-testimonials-dots");
    if (!track || !dotsContainer) return;

    track.innerHTML = "";
    dotsContainer.innerHTML = "";
    
    // Clear auto-slide interval
    if (testimonialInterval) clearInterval(testimonialInterval);

    if (portfolioData.testimonials.length === 0) {
        track.innerHTML = "<div class='testimonial-card'>No reviews added yet.</div>";
        return;
    }

    portfolioData.testimonials.forEach((test, index) => {
        // Create Stars
        let starsHtml = "";
        for (let i = 0; i < 5; i++) {
            starsHtml += `<i class="${i < test.stars ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
        }

        const card = document.createElement("div");
        card.className = "testimonial-card";
        card.innerHTML = `
            <div class="testimonial-stars">${starsHtml}</div>
            <p class="testimonial-text">${test.text}</p>
            <div class="testimonial-author">
                <span class="testimonial-name">${test.name}</span>
                <span class="testimonial-role">${test.role}</span>
            </div>
        `;
        track.appendChild(card);

        // Dot
        const dot = document.createElement("div");
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;
        dot.addEventListener("click", () => {
            goToTestimonial(index);
        });
        dotsContainer.appendChild(dot);
    });

    currentTestimonialIndex = 0;
    updateCarouselPosition();

    // Start auto slide if more than 1
    if (portfolioData.testimonials.length > 1) {
        testimonialInterval = setInterval(() => {
            let next = currentTestimonialIndex + 1;
            if (next >= portfolioData.testimonials.length) next = 0;
            goToTestimonial(next);
        }, 5000);
    }
}

function goToTestimonial(index) {
    currentTestimonialIndex = index;
    updateCarouselPosition();
}

function updateCarouselPosition() {
    const track = document.getElementById("js-testimonials-track");
    if (!track) return;
    track.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;

    // Update active dot
    const dots = document.querySelectorAll("#js-testimonials-dots .dot");
    dots.forEach((dot, idx) => {
        if (idx === currentTestimonialIndex) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

// ==========================================================================
// CORE PAGE ACTIONS & SCROLL INTERACTION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    initPortfolioState();
    renderPortfolio();

    // Set Copyright Year
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Sticky Navbar Scroll Listener
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // Active Link Highlight
        highlightActiveNavLink();
    });

    // Highlight initial nav link on load
    highlightActiveNavLink();

    // Mobile Navbar Drawer Toggle
    const mobileToggle = document.querySelector(".mobile-toggle");
    const mobileDrawer = document.querySelector(".mobile-drawer");
    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener("click", () => {
            mobileToggle.classList.toggle("active");
            mobileDrawer.classList.toggle("active");
        });

        // Close drawer on link click
        document.querySelectorAll(".mobile-link, .mobile-btn").forEach(link => {
            link.addEventListener("click", () => {
                mobileToggle.classList.remove("active");
                mobileDrawer.classList.remove("active");
            });
        });
    }

    // Scroll Fade-In Animations using IntersectionObserver
    initScrollAnimations();

    // Handle Contact Form Submit Simulation
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Simulating API loading state
            const submitBtn = contactForm.querySelector("button[type='submit']");
            const origHtml = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...`;

            setTimeout(() => {
                // Success feedback
                submitBtn.disabled = false;
                submitBtn.innerHTML = origHtml;
                contactForm.reset();

                const successPopup = document.getElementById("form-success-popup");
                if (successPopup) {
                    successPopup.classList.remove("hidden");
                    // Auto hide after 5 seconds
                    setTimeout(() => {
                        successPopup.classList.add("hidden");
                    }, 5000);
                }
            }, 1500);
        });
    }

    // Resume Download Simulator
    const downloadResumeBtn = document.getElementById("btn-download-resume");
    if (downloadResumeBtn) {
        downloadResumeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Create a virtual text file acting as a mock PDF resume for Dheeraj Nagle
            const textContent = `
========================================
DHEERAJ NAGLE - PORTFOLIO RESUME
Role: ${portfolioData.profile.role}
Email: ${portfolioData.profile.contactEmail}
Phone: ${portfolioData.profile.contactPhone}
Website: ${portfolioData.profile.contactWebsite}
Address: ${portfolioData.profile.contactAddress}
========================================

SUMMARY:
${portfolioData.profile.aboutBio}

WORK EXPERIENCE:
${portfolioData.experience.map(exp => `
- ${exp.title} | ${exp.sub} (${exp.date})
  ${exp.desc}
`).join('')}

EDUCATION:
${portfolioData.education.map(edu => `
- ${edu.title} | ${edu.sub} (${edu.date})
  ${edu.desc || ''}
`).join('')}

========================================
Generated from Portfolio Website (2026)
            `;

            const blob = new Blob([textContent], { type: "text/plain;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${portfolioData.profile.firstname.toLowerCase()}_${portfolioData.profile.lastname.toLowerCase()}_resume.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
});

// Navigation links highlight based on scroll coordinate
function highlightActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    let scrollPos = window.scrollY + 150; // offset for sticky nav

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < (section.offsetTop + section.offsetHeight)) {
            const id = section.getAttribute("id");
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}

// Fade in elements when entering view screen
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(".timeline-item, .project-card, .contact-form-card, .profile-card, .about-info-col, .hero-grid");
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translate(0, 0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        // Initial state before animating
        el.style.opacity = "0";
        el.style.transform = "translateY(25px)";
        el.style.transition = "opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)";
        observer.observe(el);
    });
}
