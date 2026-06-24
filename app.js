// ==========================================================================
// PORTFOLIO INITIAL STATE & RENDER LOGIC
// ==========================================================================

// Default data matches the Dribbble design screenshot details
const DEFAULT_PORTFOLIO_DATA = {
    profile: {
        firstname: "DHEERAJ",
        lastname: "NAGLE",
        role: "Creative UI/UX Designer & Web Developer",
        heroWelcome: "I'm Dheeraj Nagle, a developer who enjoys turning ideas into real products. Over the past few years, I've worked on web applications, mobile apps, and learning platforms using React, React Native, Node.js, and Python. I love building intuitive user experiences and writing clean, maintainable code. I'm currently open to freelance projects and full-time opportunities where I can contribute, learn, and grow as a developer.",
        aboutTitle: "Frontend & Full-Stack Developer",
        aboutBio: "I'm Dheeraj Nagle, a Frontend & Full-Stack Developer with experience building web and mobile applications using React, React Native, Node.js, and Python. I enjoy transforming ideas into scalable, user-friendly digital products that solve real-world problems. From responsive websites to custom applications, I focus on writing clean code, delivering great user experiences, and continuously learning modern technologies.",
        profileImage: "assets/dheeraj_photo.jpg",
        cardImage: "assets/dheeraj_photo.jpg",
        contactPhone: "+91 83193 00602",
        contactEmail: "nagledheeraj94@gmail.com",
        contactAddress: "Madhya Pradesh, India",
        socials: {
            facebook: "https://facebook.com",
            instagram: "https://instagram.com",
            linkedin: "https://www.linkedin.com/in/dheeraj-nagle-8a37a6197/",
            twitter: "https://twitter.com",
            github: "https://github.com/DheerajNagle"
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
            title: "Lead Software Engineer & System Architect",
            sub: "At NaviPark Project (GitHub)",
            date: "2026 - Present",
            desc: "Architected and developed NaviPark, a smart public parking coordination and interaction dashboard. Designed user interfaces for real-time space tracking, navigation, and automated billing interfaces."
        },
        {
            title: "TypeScript & Full-Stack Developer",
            sub: "At WealthTrack & LMS (GitHub)",
            date: "2025 - 2026",
            desc: "Engineered LMS, a scalable Learning Management System, and WealthTrack, a personal finance tracker. Utilized TypeScript and modern development principles to deliver robust, secure, and clean web applications."
        },
        {
            title: "Mobile Application Specialist",
            sub: "At Learnify App (GitHub)",
            date: "2024 - 2025",
            desc: "Developed the Learnify mobile app using React Native and Expo. Integrated user authentication, custom WebView navigation components, and implemented offline caching strategies for high-performance micro-learning delivery."
        }
    ],
    education: [
        {
            title: "B.Tech in Computer Science & Engineering",
            sub: "Institute of Engineering & Science, IPS Academy Indore",
            date: "2018 - 2022",
            desc: "Specialized in core Computer Science, engineering subjects, algorithms, data structures, and software methodologies."
        }
    ],
    projects: [
        {
            name: "Learnify App",
            category: "React Native Mobile App",
            image: "assets/project_learnify.png",
            url: "https://github.com/DheerajNagle/Learnify-app"
        },
        {
            name: "NaviPark Dashboard",
            category: "System Design & Web App",
            image: "assets/project_navipark.png",
            url: "https://github.com/DheerajNagle/NaviPark"
        },
        {
            name: "WealthTrack Portfolio",
            category: "TypeScript FinTech App",
            image: "assets/project_wealthtrack.png",
            url: "https://github.com/DheerajNagle/WealthTrack"
        },
        {
            name: "Learning Management System (LMS)",
            category: "TypeScript Web Platform",
            image: "assets/project_luminui.png",
            url: "https://github.com/DheerajNagle/LMS"
        },
        {
            name: "PII Detection Software",
            category: "AI & Python Tooling",
            image: "assets/project_macbook.png",
            url: "https://github.com/DheerajNagle/PII-Detection-software"
        }
    ],
    testimonials: [],
    skills: [
        // Frontend
        { name: "React.js", category: "Frontend", level: 90, icon: "fa-brands fa-react" },
        { name: "Next.js", category: "Frontend", level: 80, icon: "fa-solid fa-code" },
        { name: "React Native", category: "Frontend", level: 85, icon: "fa-solid fa-mobile-screen-button" },
        { name: "JavaScript", category: "Frontend", level: 90, icon: "fa-brands fa-js" },
        { name: "TypeScript", category: "Frontend", level: 80, icon: "fa-solid fa-code" },
        { name: "HTML5 & CSS3", category: "Frontend", level: 95, icon: "fa-brands fa-html5" },
        { name: "Tailwind CSS", category: "Frontend", level: 90, icon: "fa-solid fa-wind" },
        // Backend
        { name: "Node.js", category: "Backend", level: 85, icon: "fa-brands fa-node-js" },
        { name: "Express.js", category: "Backend", level: 80, icon: "fa-solid fa-server" },
        { name: "REST APIs", category: "Backend", level: 90, icon: "fa-solid fa-gears" },
        { name: "Authentication & Authorization", category: "Backend", level: 80, icon: "fa-solid fa-shield-halved" },
        // Database
        { name: "PostgreSQL", category: "Database", level: 80, icon: "fa-solid fa-database" },
        { name: "MongoDB", category: "Database", level: 80, icon: "fa-solid fa-leaf" },
        { name: "MySQL", category: "Database", level: 75, icon: "fa-solid fa-database" },
        // AI & Modern Development
        { name: "AI Agents", category: "AI & Modern Development", level: 85, icon: "fa-solid fa-robot" },
        { name: "OpenAI API", category: "AI & Modern Development", level: 85, icon: "fa-solid fa-brain" },
        { name: "Prompt Engineering", category: "AI & Modern Development", level: 90, icon: "fa-solid fa-wand-magic-sparkles" },
        { name: "NLP", category: "AI & Modern Development", level: 75, icon: "fa-solid fa-language" },
        // Tools & Cloud
        { name: "Git & GitHub", category: "Tools & Cloud", level: 90, icon: "fa-brands fa-github" },
        { name: "AWS", category: "Tools & Cloud", level: 70, icon: "fa-brands fa-aws" },
        { name: "Postman", category: "Tools & Cloud", level: 85, icon: "fa-solid fa-paper-plane" }
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
            let updated = false;
            const hasReact = portfolioData.skills && portfolioData.skills.some(s => s.name === "React.js");
            const hasFigma = portfolioData.skills && portfolioData.skills.some(s => s.name === "Figma");
            if (!portfolioData.skills || !hasReact || hasFigma || portfolioData.skills.length < 15) {
                portfolioData.skills = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.skills));
                updated = true;
            }
            if (portfolioData.profile && (!portfolioData.profile.heroWelcome || portfolioData.profile.heroWelcome.includes("Welcome to my portfolio!"))) {
                portfolioData.profile.heroWelcome = DEFAULT_PORTFOLIO_DATA.profile.heroWelcome;
                updated = true;
            }
            if (portfolioData.profile && (portfolioData.profile.aboutTitle === "Passionate & Creative Full-Stack Designer" || !portfolioData.profile.aboutTitle)) {
                portfolioData.profile.aboutTitle = DEFAULT_PORTFOLIO_DATA.profile.aboutTitle;
                updated = true;
            }
            if (portfolioData.profile && (portfolioData.profile.aboutBio === "I'm Dheeraj Nagle, a designer and developer passionate about crafting intuitive, user-centered experiences. I love turning complex ideas into seamless interfaces." || !portfolioData.profile.aboutBio)) {
                portfolioData.profile.aboutBio = DEFAULT_PORTFOLIO_DATA.profile.aboutBio;
                updated = true;
            }
            if (portfolioData.profile && (portfolioData.profile.contactPhone === "+91 98765 43210" || !portfolioData.profile.contactPhone)) {
                portfolioData.profile.contactPhone = DEFAULT_PORTFOLIO_DATA.profile.contactPhone;
                updated = true;
            }
            if (portfolioData.profile && (portfolioData.profile.contactEmail === "dheeraj.nagle@example.com" || !portfolioData.profile.contactEmail)) {
                portfolioData.profile.contactEmail = DEFAULT_PORTFOLIO_DATA.profile.contactEmail;
                updated = true;
            }
            if (portfolioData.profile && portfolioData.profile.socials) {
                if (!portfolioData.profile.socials.github || portfolioData.profile.socials.github === "https://github.com") {
                    portfolioData.profile.socials.github = DEFAULT_PORTFOLIO_DATA.profile.socials.github;
                    updated = true;
                }
                if (portfolioData.profile.socials.linkedin === "https://linkedin.com") {
                    portfolioData.profile.socials.linkedin = DEFAULT_PORTFOLIO_DATA.profile.socials.linkedin;
                    updated = true;
                }
            }
            const hasLearnify = portfolioData.projects && portfolioData.projects.some(p => p.name === "Learnify App");
            if (!hasLearnify) {
                portfolioData.projects = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.projects));
                portfolioData.experience = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.experience));
                updated = true;
            }
            if (portfolioData.projects) {
                const originalLength = portfolioData.projects.length;
                portfolioData.projects = portfolioData.projects.filter(p => 
                    p.url && 
                    p.url.toLowerCase().includes("github.com/dheerajnagle") &&
                    !p.url.toLowerCase().includes("frontend_technical_assessment") &&
                    !p.url.toLowerCase().includes("charli-work")
                );
                if (portfolioData.projects.length !== originalLength) {
                    updated = true;
                }
            }
            if (!portfolioData.projects || portfolioData.projects.length === 0) {
                portfolioData.projects = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.projects));
                updated = true;
            }
            const hasBTech = portfolioData.education && portfolioData.education.some(e => e.title.includes("B.Tech") || e.title.includes("BTECH"));
            if (!portfolioData.education || portfolioData.education.length === 0 || !hasBTech) {
                portfolioData.education = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.education));
                updated = true;
            }
            // Migrate testimonials: if they contain Sarah Jenkins or James Carter (the fake reviews), we clear them out!
            const hasFakeTestimonials = portfolioData.testimonials && portfolioData.testimonials.some(t => t.name === "Sarah Jenkins" || t.name === "James Carter");
            if (!portfolioData.testimonials || hasFakeTestimonials) {
                portfolioData.testimonials = [];
                updated = true;
            }
            if (updated) {
                localStorage.setItem("portfolio_state", JSON.stringify(portfolioData));
            }
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
    document.querySelectorAll(".js-contact-address").forEach(el => el.textContent = p.contactAddress);

    // Set Social Links
    document.querySelectorAll(".js-social-fb").forEach(el => el.href = p.socials.facebook || "#");
    document.querySelectorAll(".js-social-ig").forEach(el => el.href = p.socials.instagram || "#");
    document.querySelectorAll(".js-social-in").forEach(el => el.href = p.socials.linkedin || "#");
    document.querySelectorAll(".js-social-x").forEach(el => el.href = p.socials.twitter || "#");
    document.querySelectorAll(".js-social-gh").forEach(el => el.href = p.socials.github || "#");

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

    // Render Skills Grid
    const skillsGrid = document.getElementById("js-skills-list");
    if (skillsGrid) {
        skillsGrid.innerHTML = "";
        if (portfolioData.skills) {
            portfolioData.skills.forEach((skill, index) => {
                const card = document.createElement("div");
                card.className = "skill-card relative";
                card.dataset.index = index;

                const isAdmin = document.body.classList.contains("admin-logged-in");
                const adminButtonsHtml = isAdmin && document.body.classList.contains("edit-mode-active") ? `
                    <div class="edit-badge js-btn-edit-skill" data-index="${index}"><i class="fa-solid fa-pen"></i> Edit</div>
                    <div class="delete-badge js-btn-delete-skill" data-index="${index}"><i class="fa-solid fa-trash"></i> Delete</div>
                ` : "";

                card.innerHTML = `
                    ${adminButtonsHtml}
                    <div class="skill-icon-wrapper">
                        <i class="${skill.icon || 'fa-solid fa-code'}"></i>
                    </div>
                    <div class="skill-info">
                        <span class="skill-category">${skill.category || 'General'}</span>
                        <h3 class="skill-name">${skill.name}</h3>
                        <div class="skill-progress-wrapper">
                            <div class="skill-progress-bar">
                                <div class="skill-progress-fill" style="width: ${skill.level}%"></div>
                            </div>
                            <span class="skill-percentage">${skill.level}%</span>
                        </div>
                    </div>
                `;
                skillsGrid.appendChild(card);
            });
        }
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
    const testimonialsSection = document.getElementById("testimonials");
    if (!track || !dotsContainer) return;

    track.innerHTML = "";
    dotsContainer.innerHTML = "";
    
    // Clear auto-slide interval
    if (testimonialInterval) clearInterval(testimonialInterval);

    const isAdmin = document.body.classList.contains("admin-logged-in");

    if (portfolioData.testimonials.length === 0) {
        if (isAdmin && document.body.classList.contains("edit-mode-active")) {
            if (testimonialsSection) testimonialsSection.classList.remove("hidden");
            track.innerHTML = "<div class='testimonial-card'>No reviews added yet. Click 'Add Review' to create one.</div>";
        } else {
            if (testimonialsSection) testimonialsSection.classList.add("hidden");
        }
        return;
    } else {
        if (testimonialsSection) testimonialsSection.classList.remove("hidden");
    }

    portfolioData.testimonials.forEach((test, index) => {
        // Create Stars
        let starsHtml = "";
        for (let i = 0; i < 5; i++) {
            starsHtml += `<i class="${i < test.stars ? 'fa-solid' : 'fa-regular'} fa-star"></i>`;
        }

        const card = document.createElement("div");
        card.className = "testimonial-card relative";
        
        const adminButtonsHtml = isAdmin && document.body.classList.contains("edit-mode-active") ? `
            <div class="edit-badge js-btn-edit-testimonial" data-index="${index}"><i class="fa-solid fa-pen"></i> Edit</div>
            <div class="delete-badge js-btn-delete-testimonial" data-index="${index}"><i class="fa-solid fa-trash"></i> Delete</div>
        ` : "";

        card.innerHTML = `
            ${adminButtonsHtml}
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

SKILLS:
${portfolioData.skills ? portfolioData.skills.map(s => `- ${s.name} (${s.category}) | Proficiency: ${s.level}%`).join('\n') : ''}

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
    const animateElements = document.querySelectorAll(".timeline-item, .project-card, .skill-card, .contact-form-card, .profile-card, .about-info-col, .hero-grid");
    
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
