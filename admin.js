// ==========================================================================
// ADMIN DASHBOARD CONTROLS, INLINE EDITING, AND AUTHENTICATION
// ==========================================================================

const ADMIN_CREDENTIALS = {
    username: "admin",
    password: "admin123"
};

// Global Admin State
let adminState = {
    isLoggedIn: false,
    editMode: false
};

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showAdminToast(title, desc, type = "info") {
    const toast = document.getElementById("admin-toast");
    const iconContainer = document.getElementById("admin-toast-icon");
    const titleEl = document.getElementById("admin-toast-title");
    const descEl = document.getElementById("admin-toast-desc");

    if (!toast || !iconContainer || !titleEl || !descEl) return;

    // Set icons
    if (type === "success") {
        iconContainer.className = "toast-icon success";
        iconContainer.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else if (type === "error") {
        iconContainer.className = "toast-icon error";
        iconContainer.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
        iconContainer.style.color = "var(--accent-red)";
    } else {
        iconContainer.className = "toast-icon info";
        iconContainer.innerHTML = '<i class="fa-solid fa-circle-info"></i>';
    }

    titleEl.textContent = title;
    descEl.textContent = desc;

    toast.classList.remove("hidden");
    
    // Auto fadeout
    setTimeout(() => {
        toast.classList.add("hidden");
    }, 4500);
}

// ==========================================================================
// AUTHENTICATION FLOW
// ==========================================================================

function loginAdmin(username, password) {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        adminState.isLoggedIn = true;
        sessionStorage.setItem("admin_logged_in", "true");
        
        // Update DOM classes
        document.body.classList.add("admin-logged-in");
        document.getElementById("admin-banner").classList.remove("hidden");
        document.getElementById("admin-login-modal").classList.add("hidden");
        
        // Show inline triggers
        document.querySelectorAll(".admin-only-inline").forEach(el => el.classList.remove("hidden"));
        
        showAdminToast("Authenticated!", "You are now logged in. Press 'Enter Edit Mode' to begin customizing.", "success");
        
        // Re-render portfolio to display edit/delete buttons
        renderPortfolio();
        return true;
    }
    
    // Login failure
    const errorMsg = document.getElementById("login-error-msg");
    if (errorMsg) errorMsg.classList.remove("hidden");
    return false;
}

function logoutAdmin() {
    adminState.isLoggedIn = false;
    adminState.editMode = false;
    sessionStorage.removeItem("admin_logged_in");

    document.body.classList.remove("admin-logged-in");
    document.body.classList.remove("edit-mode-active");
    document.getElementById("admin-banner").classList.add("hidden");
    
    // Hide inline triggers
    document.querySelectorAll(".admin-only-inline").forEach(el => el.classList.add("hidden"));
    
    // Reset toggle button design
    const toggleEditBtn = document.getElementById("btn-toggle-edit");
    if (toggleEditBtn) {
        toggleEditBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Enter Edit Mode';
        toggleEditBtn.className = "btn btn-sm btn-outline-gold";
    }

    showAdminToast("Logged Out", "You have successfully logged out of admin session.", "info");
    
    // Re-render
    renderPortfolio();
}

function checkPersistedLogin() {
    if (sessionStorage.getItem("admin_logged_in") === "true") {
        adminState.isLoggedIn = true;
        document.body.classList.add("admin-logged-in");
        document.getElementById("admin-banner").classList.remove("hidden");
        document.querySelectorAll(".admin-only-inline").forEach(el => el.classList.remove("hidden"));
        renderPortfolio();
    }
}

// ==========================================================================
// EDIT MODE INTERACTION & LOCALSTORAGE COMMIT
// ==========================================================================

function toggleEditMode() {
    if (!adminState.isLoggedIn) return;
    
    adminState.editMode = !adminState.editMode;
    const toggleEditBtn = document.getElementById("btn-toggle-edit");

    if (adminState.editMode) {
        document.body.classList.add("edit-mode-active");
        toggleEditBtn.innerHTML = '<i class="fa-solid fa-xmark"></i> Exit Edit Mode';
        toggleEditBtn.className = "btn btn-sm btn-gold";
        
        // Show file upload overlays
        document.querySelectorAll(".edit-image-overlay").forEach(el => el.classList.remove("hidden"));
        
        showAdminToast("Edit Mode Active", "Click on any bio text details or timeline items to modify content.", "info");
    } else {
        document.body.classList.remove("edit-mode-active");
        toggleEditBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Enter Edit Mode';
        toggleEditBtn.className = "btn btn-sm btn-outline-gold";
        
        // Hide file upload overlays
        document.querySelectorAll(".edit-image-overlay").forEach(el => el.classList.add("hidden"));
        
        showAdminToast("Edit Mode Closed", "Inline changes saved. Exit Edit Mode successfully.", "success");
    }
    
    // Re-render layout to add/remove edit/delete tags on items
    renderPortfolio();
}

function commitStateToLocalStorage() {
    localStorage.setItem("portfolio_state", JSON.stringify(portfolioData));
}

// ==========================================================================
// INLINE TEXT FIELD CONVERTOR LOGIC
// ==========================================================================

document.addEventListener("click", (e) => {
    // Check if we are in active edit mode
    if (!adminState.isLoggedIn || !adminState.editMode) return;

    // Find if the click was targetting an editable text element
    const editableEl = e.target.closest(".editable-text");
    const editableWrapper = e.target.closest(".editable-text-wrapper");

    // Clicked an active inputs inside editable text -> let typing function
    if (e.target.classList.contains("editable-text-input") || e.target.classList.contains("editable-textarea")) {
        return;
    }

    if (editableEl) {
        handleInlineTextClick(editableEl);
    } else if (editableWrapper) {
        handleInlineWrapperClick(editableWrapper);
    }
});

// For inline single-line text edits (Phone, Email, Titles, Website, Role)
function handleInlineTextClick(el) {
    const field = el.dataset.field;
    const currentValue = el.textContent.trim();
    
    const input = document.createElement("input");
    input.type = "text";
    input.className = "editable-text-input";
    input.value = currentValue;
    
    // Copy computed styles to retain alignment if needed
    input.style.textAlign = window.getComputedStyle(el).textAlign;

    el.innerHTML = "";
    el.appendChild(input);
    input.focus();

    // Listener to save changes on blur or pressing enter
    const saveValue = () => {
        const newValue = input.value.trim() || currentValue;
        
        // Update model
        if (field.startsWith("contact")) {
            portfolioData.profile[field] = newValue;
        } else {
            portfolioData.profile[field] = newValue;
        }
        
        commitStateToLocalStorage();
        el.textContent = newValue;
        showAdminToast("Saved", "Field details updated.", "success");
    };

    input.addEventListener("blur", saveValue);
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            saveValue();
        }
        if (event.key === "Escape") {
            input.removeEventListener("blur", saveValue);
            el.textContent = currentValue;
        }
    });
}

// For longer text block edits (Welcome paragraph and Narrative About biography)
function handleInlineWrapperClick(wrapper) {
    const field = wrapper.dataset.field;
    const innerTextEl = wrapper.querySelector("p");
    if (!innerTextEl) return;
    
    const currentValue = innerTextEl.textContent.trim();
    
    const textarea = document.createElement("textarea");
    textarea.className = "editable-textarea";
    textarea.rows = 4;
    textarea.value = currentValue;

    wrapper.innerHTML = "";
    wrapper.appendChild(textarea);
    textarea.focus();

    const saveTextValue = () => {
        const newValue = textarea.value.trim() || currentValue;
        
        portfolioData.profile[field] = newValue;
        
        commitStateToLocalStorage();
        
        // Restore wrapper elements
        wrapper.innerHTML = `<p class="hero-desc js-hero-welcome">${newValue}</p>`;
        // Check if it's bio instead of hero
        if (field === "aboutBio") {
            wrapper.querySelector("p").className = "about-text js-about-bio";
        }
        
        showAdminToast("Saved", "Text content committed successfully.", "success");
    };

    textarea.addEventListener("blur", saveTextValue);
    textarea.addEventListener("keydown", (event) => {
        // Save on Ctrl + Enter or Cmd + Enter
        if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
            saveTextValue();
        }
        if (event.key === "Escape") {
            textarea.removeEventListener("blur", saveTextValue);
            wrapper.innerHTML = `<p class="hero-desc js-hero-welcome">${currentValue}</p>`;
            if (field === "aboutBio") {
                wrapper.querySelector("p").className = "about-text js-about-bio";
            }
        }
    });
}

// ==========================================================================
// FILE UPLOADER -> BASE64 CONVERTER
// ==========================================================================

function handleImageUpload(inputEl, fieldName) {
    const file = inputEl.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64Data = e.target.result;
        
        // Save base64 string to corresponding field
        portfolioData.profile[fieldName] = base64Data;
        commitStateToLocalStorage();
        
        // Trigger update to update image src across elements
        renderPortfolio();
        showAdminToast("Profile Photo Saved", "Successfully uploaded and updated visual asset.", "success");
    };
    reader.readAsDataURL(file);
}

// ==========================================================================
// ADD / EDIT / DELETE EXPERIENCES & EDUCATION TIMELINES
// ==========================================================================

function openEntryModal(type, index = -1) {
    const modal = document.getElementById("entry-edit-modal");
    const form = document.getElementById("entry-edit-form");
    const modalTitle = document.getElementById("entry-modal-title");
    const inputTitleLabel = document.getElementById("entry-title-label");
    const inputSubLabel = document.getElementById("entry-sub-label");
    const descGroup = document.getElementById("entry-desc-group");

    if (!modal || !form) return;

    // Reset Form Fields
    form.reset();

    // Populate Fields
    document.getElementById("entry-edit-index").value = index;
    document.getElementById("entry-edit-type").value = type;

    if (type === "experience") {
        modalTitle.textContent = index === -1 ? "Add Professional Experience" : "Edit Professional Experience";
        inputTitleLabel.textContent = "Job Title";
        inputSubLabel.textContent = "Company Name";
        descGroup.classList.remove("hidden");
        
        if (index !== -1) {
            const exp = portfolioData.experience[index];
            document.getElementById("entry-title").value = exp.title;
            document.getElementById("entry-sub").value = exp.sub;
            document.getElementById("entry-date").value = exp.date;
            document.getElementById("entry-desc").value = exp.desc || "";
        }
    } else if (type === "education") {
        modalTitle.textContent = index === -1 ? "Add Educational Experience" : "Edit Educational Experience";
        inputTitleLabel.textContent = "Degree / Course Name";
        inputSubLabel.textContent = "School / College / Institution";
        
        // Education descriptions are optional, keep group visible or simplify
        descGroup.classList.remove("hidden");
        
        if (index !== -1) {
            const edu = portfolioData.education[index];
            document.getElementById("entry-title").value = edu.title;
            document.getElementById("entry-sub").value = edu.sub;
            document.getElementById("entry-date").value = edu.date;
            document.getElementById("entry-desc").value = edu.desc || "";
        }
    }

    modal.classList.remove("hidden");
}

function handleEntryFormSubmit(e) {
    e.preventDefault();
    
    const index = parseInt(document.getElementById("entry-edit-index").value);
    const type = document.getElementById("entry-edit-type").value;
    
    const title = document.getElementById("entry-title").value.trim();
    const sub = document.getElementById("entry-sub").value.trim();
    const date = document.getElementById("entry-date").value.trim();
    const desc = document.getElementById("entry-desc").value.trim();

    const entryObj = { title, sub, date, desc };

    if (type === "experience") {
        if (index === -1) {
            portfolioData.experience.push(entryObj);
            showAdminToast("Success", "New professional entry created.", "success");
        } else {
            portfolioData.experience[index] = entryObj;
            showAdminToast("Success", "Professional entry modified.", "success");
        }
    } else if (type === "education") {
        if (index === -1) {
            portfolioData.education.push(entryObj);
            showAdminToast("Success", "New education entry created.", "success");
        } else {
            portfolioData.education[index] = entryObj;
            showAdminToast("Success", "Education entry modified.", "success");
        }
    }

    commitStateToLocalStorage();
    document.getElementById("entry-edit-modal").classList.add("hidden");
    renderPortfolio();
}

function deleteTimelineEntry(type, index) {
    if (!confirm(`Are you sure you want to delete this ${type} timeline item?`)) return;

    if (type === "experience") {
        portfolioData.experience.splice(index, 1);
    } else if (type === "education") {
        portfolioData.education.splice(index, 1);
    }

    commitStateToLocalStorage();
    renderPortfolio();
    showAdminToast("Deleted", "Timeline item removed.", "success");
}

// ==========================================================================
// ADD / EDIT / DELETE PROJECT DETAILS
// ==========================================================================

function openProjectModal(index = -1) {
    const modal = document.getElementById("project-edit-modal");
    const form = document.getElementById("project-edit-form");
    const previewImg = document.getElementById("project-edit-preview");
    
    if (!modal || !form) return;

    form.reset();
    document.getElementById("project-edit-index").value = index;
    
    if (index === -1) {
        document.getElementById("project-modal-title").textContent = "Add Recent Project";
        previewImg.src = "https://placehold.co/400x250?text=Mockup";
    } else {
        document.getElementById("project-modal-title").textContent = "Edit Project Settings";
        const proj = portfolioData.projects[index];
        
        document.getElementById("project-title").value = proj.name;
        document.getElementById("project-category").value = proj.category;
        document.getElementById("project-url").value = proj.url || "#";
        previewImg.src = proj.image;
    }

    modal.classList.remove("hidden");
}

function handleProjectFormSubmit(e) {
    e.preventDefault();
    
    const index = parseInt(document.getElementById("project-edit-index").value);
    const name = document.getElementById("project-title").value.trim();
    const category = document.getElementById("project-category").value.trim();
    const url = document.getElementById("project-url").value.trim();
    const image = document.getElementById("project-edit-preview").src;

    const projectObj = { name, category, image, url };

    if (index === -1) {
        portfolioData.projects.push(projectObj);
        showAdminToast("Project Created", "Successfully added new project showcase.", "success");
    } else {
        portfolioData.projects[index] = projectObj;
        showAdminToast("Project Saved", "Project configurations updated.", "success");
    }

    commitStateToLocalStorage();
    document.getElementById("project-edit-modal").classList.add("hidden");
    renderPortfolio();
}

function deleteProjectCard(index) {
    if (!confirm("Are you sure you want to delete this project portfolio?")) return;

    portfolioData.projects.splice(index, 1);
    commitStateToLocalStorage();
    renderPortfolio();
    showAdminToast("Project Removed", "Portfolio card has been deleted.", "success");
}

// ==========================================================================
// ADD / EDIT / DELETE SKILL DETAILS
// ==========================================================================

function openSkillModal(index = -1) {
    const modal = document.getElementById("skill-edit-modal");
    const form = document.getElementById("skill-edit-form");
    if (!modal || !form) return;

    form.reset();
    document.getElementById("skill-edit-index").value = index;

    if (index === -1) {
        document.getElementById("skill-modal-title").textContent = "Add Skill Details";
    } else {
        document.getElementById("skill-modal-title").textContent = "Edit Skill Details";
        const skill = portfolioData.skills[index];
        document.getElementById("skill-name-input").value = skill.name;
        document.getElementById("skill-category-input").value = skill.category || "";
        document.getElementById("skill-level-input").value = skill.level;
        document.getElementById("skill-icon-input").value = skill.icon || "";
    }

    modal.classList.remove("hidden");
}

function handleSkillFormSubmit(e) {
    e.preventDefault();
    const index = parseInt(document.getElementById("skill-edit-index").value);
    const name = document.getElementById("skill-name-input").value.trim();
    const category = document.getElementById("skill-category-input").value.trim();
    const level = parseInt(document.getElementById("skill-level-input").value);
    const icon = document.getElementById("skill-icon-input").value.trim();

    const skillObj = { name, category, level, icon };

    if (!portfolioData.skills) portfolioData.skills = [];

    if (index === -1) {
        portfolioData.skills.push(skillObj);
        showAdminToast("Skill Created", "Successfully added new skill details.", "success");
    } else {
        portfolioData.skills[index] = skillObj;
        showAdminToast("Skill Saved", "Skill configuration updated.", "success");
    }

    commitStateToLocalStorage();
    document.getElementById("skill-edit-modal").classList.add("hidden");
    renderPortfolio();
}

function deleteSkillEntry(index) {
    if (!confirm("Are you sure you want to delete this skill entry?")) return;
    portfolioData.skills.splice(index, 1);
    commitStateToLocalStorage();
    renderPortfolio();
    showAdminToast("Skill Removed", "Skill card has been deleted.", "success");
}

// ==========================================================================
// RESET & EXPORT ACTIONS
// ==========================================================================

function resetToDefaultProfile() {
    if (!confirm("Caution: This will clear ALL custom settings, images, and text additions and restore the template profile. Do you want to proceed?")) {
        return;
    }

    localStorage.removeItem("portfolio_state");
    
    // Re-initialize state structures
    initPortfolioState();
    
    // Re-render layout
    renderPortfolio();
    
    showAdminToast("Reset Complete", "The portfolio has been restored to default David Michel mock details.", "success");
}

function exportPortfolioJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(portfolioData, null, 4));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolio_profile_backup.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    showAdminToast("Export Complete", "Backup portfolio configuration JSON file downloaded successfully.", "success");
}

// ==========================================================================
// DOM EVENTS BINDINGS & DRIVER LOGIC
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // Check if session has active admin token
    checkPersistedLogin();

    // Trigger Admin Login Modal
    const btnTriggerLogin = document.getElementById("btn-admin-login-trigger");
    const loginModal = document.getElementById("admin-login-modal");
    if (btnTriggerLogin && loginModal) {
        btnTriggerLogin.addEventListener("click", () => {
            if (adminState.isLoggedIn) {
                // If already logged in, clicking trigger should scroll to top or alert
                showAdminToast("Active Session", "You are already authenticated. Enable Edit Mode on the top panel.", "info");
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                loginModal.classList.remove("hidden");
                document.getElementById("login-username").focus();
            }
        });
    }

    // Secret keyboard shortcut triggers admin modal (Ctrl + Alt + A)
    window.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "a") {
            if (!adminState.isLoggedIn) {
                loginModal.classList.remove("hidden");
                document.getElementById("login-username").focus();
            }
        }
    });

    // Close Login Modal Trigger
    const btnCloseLogin = document.getElementById("btn-close-login");
    if (btnCloseLogin) {
        btnCloseLogin.addEventListener("click", () => {
            loginModal.classList.add("hidden");
            document.getElementById("login-error-msg").classList.add("hidden");
        });
    }

    // Modal click out overlay close
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.classList.add("hidden");
                document.getElementById("login-error-msg").classList.add("hidden");
            }
        });
    });

    // Admin Submit Form
    const adminLoginForm = document.getElementById("admin-login-form");
    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const user = document.getElementById("login-username").value.trim();
            const pass = document.getElementById("login-password").value.trim();
            loginAdmin(user, pass);
        });
    }

    // Sticky Control Panel Actions
    const btnToggleEdit = document.getElementById("btn-toggle-edit");
    if (btnToggleEdit) {
        btnToggleEdit.addEventListener("click", toggleEditMode);
    }

    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
        btnLogout.addEventListener("click", logoutAdmin);
    }

    const btnResetData = document.getElementById("btn-reset-data");
    if (btnResetData) {
        btnResetData.addEventListener("click", resetToDefaultProfile);
    }

    const btnExportData = document.getElementById("btn-export-data");
    if (btnExportData) {
        btnExportData.addEventListener("click", exportPortfolioJson);
    }

    // Profile Images Upload Bindings
    const inputHeroImage = document.getElementById("input-hero-image");
    if (inputHeroImage) {
        inputHeroImage.addEventListener("change", () => handleImageUpload(inputHeroImage, "profileImage"));
    }

    const inputCardImage = document.getElementById("input-card-image");
    if (inputCardImage) {
        inputCardImage.addEventListener("change", () => handleImageUpload(inputCardImage, "cardImage"));
    }

    // Timeline entries Close buttons
    const btnCloseEntryModal = document.getElementById("btn-close-entry-modal");
    if (btnCloseEntryModal) {
        btnCloseEntryModal.addEventListener("click", () => {
            document.getElementById("entry-edit-modal").classList.add("hidden");
        });
    }

    const entryEditForm = document.getElementById("entry-edit-form");
    if (entryEditForm) {
        entryEditForm.addEventListener("submit", handleEntryFormSubmit);
    }

    const btnAddExp = document.getElementById("btn-add-experience");
    if (btnAddExp) {
        btnAddExp.addEventListener("click", () => openEntryModal("experience"));
    }

    const btnAddEdu = document.getElementById("btn-add-education");
    if (btnAddEdu) {
        btnAddEdu.addEventListener("click", () => openEntryModal("education"));
    }

    // Event Delegation for dynamic timeline buttons (Edit/Delete)
    document.addEventListener("click", (e) => {
        const editEntryBtn = e.target.closest(".js-btn-edit-entry");
        if (editEntryBtn) {
            const index = parseInt(editEntryBtn.dataset.index);
            const type = editEntryBtn.dataset.type;
            openEntryModal(type, index);
            return;
        }

        const deleteEntryBtn = e.target.closest(".js-btn-delete-entry");
        if (deleteEntryBtn) {
            const index = parseInt(deleteEntryBtn.dataset.index);
            const type = deleteEntryBtn.dataset.type;
            deleteTimelineEntry(type, index);
            return;
        }

        // Project Delegations
        const editProjBtn = e.target.closest(".js-btn-edit-project");
        if (editProjBtn) {
            const index = parseInt(editProjBtn.dataset.index);
            openProjectModal(index);
            return;
        }

        const deleteProjBtn = e.target.closest(".js-btn-delete-project");
        if (deleteProjBtn) {
            const index = parseInt(deleteProjBtn.dataset.index);
            deleteProjectCard(index);
            return;
        }

        // Skill Delegations
        const editSkillBtn = e.target.closest(".js-btn-edit-skill");
        if (editSkillBtn) {
            const index = parseInt(editSkillBtn.dataset.index);
            openSkillModal(index);
            return;
        }

        const deleteSkillBtn = e.target.closest(".js-btn-delete-skill");
        if (deleteSkillBtn) {
            const index = parseInt(deleteSkillBtn.dataset.index);
            deleteSkillEntry(index);
            return;
        }
    });

    // Project Dialog Modals Close & Form Actions
    const btnCloseProjectModal = document.getElementById("btn-close-project-modal");
    if (btnCloseProjectModal) {
        btnCloseProjectModal.addEventListener("click", () => {
            document.getElementById("project-edit-modal").classList.add("hidden");
        });
    }

    const btnAddProj = document.getElementById("btn-add-project");
    if (btnAddProj) {
        btnAddProj.addEventListener("click", () => openProjectModal(-1));
    }

    const projectEditForm = document.getElementById("project-edit-form");
    if (projectEditForm) {
        projectEditForm.addEventListener("submit", handleProjectFormSubmit);
    }

    // Skill Modal Dialog Close & Actions
    const btnCloseSkillModal = document.getElementById("btn-close-skill-modal");
    if (btnCloseSkillModal) {
        btnCloseSkillModal.addEventListener("click", () => {
            document.getElementById("skill-edit-modal").classList.add("hidden");
        });
    }

    const btnAddSkill = document.getElementById("btn-add-skill");
    if (btnAddSkill) {
        btnAddSkill.addEventListener("click", () => openSkillModal(-1));
    }

    const skillEditForm = document.getElementById("skill-edit-form");
    if (skillEditForm) {
        skillEditForm.addEventListener("submit", handleSkillFormSubmit);
    }

    // Project form image file reader binding
    const projectImageInput = document.getElementById("project-image-file");
    if (projectImageInput) {
        projectImageInput.addEventListener("change", () => {
            const file = projectImageInput.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById("project-edit-preview").src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }
});
