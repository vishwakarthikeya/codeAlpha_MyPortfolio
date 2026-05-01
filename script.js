/**
 * Portfolio Website JavaScript
 * Modern, modular JavaScript with clean code practices
 * Author: Chinthakindi Vishwa Karthikeya
 * Date: 2024
 */

// IIFE to encapsulate code and avoid global namespace pollution
(function() {
    'use strict';
    
    // ===========================================
    // DOM Elements
    // ===========================================
    const DOM = {
        navMenu: document.getElementById('navMenu'),
        navToggle: document.getElementById('navToggle'),
        navClose: document.getElementById('navClose'),
        navLinks: document.querySelectorAll('.nav-link'),
        profileImage: document.getElementById('profileImage'),
        typingText: document.getElementById('typing-text'),
        resumeBtn: document.getElementById('resumeBtn'),
        contactForm: document.getElementById('contactForm'),
        formMessage: document.getElementById('formMessage'),
        currentYear: document.getElementById('currentYear'),
        achievementsGrid: document.querySelector('.achievements-grid'),
        sections: document.querySelectorAll('.section'),
        scrollIndicator: document.querySelector('.scroll-indicator')
    };
    
    // ===========================================
    // Configuration & Constants
    // ===========================================
    const CONFIG = {
        typingTexts: [
            'Frontend Developer',
            'Web Enthusiast',
            'Problem Solver'
        ],
        typingSpeed: 100,
        erasingSpeed: 50,
        newTextDelay: 2000,
        achievements: [
            {
                title: 'CodeNovate DS Club Event',
                description: 'Participated and contributed to the CodeNovate DS Club event at Sri Indu College.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_codenovate-dsclub-sriinducollegeofengineering-activity-7422693324274417664--Vsl'
            },
            {
                title: 'NSS Volunteer Proud Moment',
                description: 'Active participation and contribution as an NSS volunteer.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_nss-nssvolunteer-proudmoment-activity-7405654376406618113-9CYk'
            },
            {
                title: 'Yukti College Achievement',
                description: 'Achievement in Yukti college event showcasing technical skills.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_achievement-collegelife-yukti-activity-7398421361070624769-jz8z'
            },
            {
                title: 'Microsoft AI & Data Certification',
                description: 'Successfully completed Microsoft AI and Data certification program.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_microsoft-ai-data-activity-7396216321513943040-ebfs'
            },
            {
                title: 'Generative AI Workshop',
                description: 'Participated in Generative AI workshop to enhance AI/ML knowledge.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_generativeai-outskill-aiworkshop-activity-7395163214994497536-9i6g'
            },
            {
                title: 'Hackathon Participation',
                description: 'Active participation in Hack with Hyderabad hackathon event.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_hackathon-hackwithhyderabad-innovation-activity-7383556106629042176-ZzvX'
            },
            {
                title: 'Microsoft AI Copilot & GitHub Copilot',
                description: 'Explored and utilized Microsoft AI Copilot and GitHub Copilot tools.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_microsoftai-copilothorizon-githubcopilot-activity-7377748056487882752-DBCN'
            },
            {
                title: 'Intellicon 2025 Conference',
                description: 'Attended Intellicon 2025 Global AI Hyderabad conference.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_intellicon2025-globalaihyderabad-grafana-activity-7373005901223567360-RL_u'
            },
            {
                title: 'CodeMania Hackathon',
                description: 'Participated in CodeMania hackathon focusing on cybersecurity.',
                link: 'https://www.linkedin.com/posts/vishwakarthikeya_hackathon-codemania-cybersecurity-activity-7366847360301211650-d5Et'
            }
        ]
    };
    
    // ===========================================
    // Utility Functions
    // ===========================================
    
    /**
     * Debounce function to limit the rate at which a function fires
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
    
    /**
     * Check if element is in viewport
     * @param {HTMLElement} element - DOM element to check
     * @returns {boolean} True if element is in viewport
     */
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    };
    
    // ===========================================
    // Core Functions
    // ===========================================
    
    /**
     * Initialize typing animation
     */
    const initTypingAnimation = () => {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        const type = () => {
            const currentText = CONFIG.typingTexts[textIndex];
            
            if (isDeleting) {
                DOM.typingText.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                DOM.typingText.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(type, CONFIG.newTextDelay);
                return;
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % CONFIG.typingTexts.length;
            }
            
            const speed = isDeleting ? CONFIG.erasingSpeed : CONFIG.typingSpeed;
            setTimeout(type, isEnd ? CONFIG.newTextDelay : speed);
        };
        
        // Start typing animation after a short delay
        setTimeout(type, 1000);
    };
    
    /**
     * Initialize navigation functionality
     */
    const initNavigation = () => {
        // Toggle mobile menu
        DOM.navToggle.addEventListener('click', () => {
            DOM.navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Close mobile menu
        DOM.navClose.addEventListener('click', () => {
            DOM.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close menu when clicking on nav links
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOM.navMenu.classList.remove('active');
                document.body.style.overflow = '';
                
                // Update active link
                DOM.navLinks.forEach(item => item.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!DOM.navMenu.contains(e.target) && !DOM.navToggle.contains(e.target)) {
                DOM.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    };
    
    /**
     * Initialize smooth scrolling
     */
    const initSmoothScrolling = () => {
        // Handle anchor link clicks
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    /**
     * Initialize section animations on scroll
     */
    const initScrollAnimations = () => {
        // Add scroll animation to sections
        const handleScrollAnimation = () => {
            DOM.sections.forEach(section => {
                if (isInViewport(section)) {
                    section.classList.add('animated');
                }
            });
            
            // Hide scroll indicator when scrolling down
            if (window.scrollY > 100) {
                DOM.scrollIndicator.style.opacity = '0';
            } else {
                DOM.scrollIndicator.style.opacity = '1';
            }
        };
        
        // Initial check
        handleScrollAnimation();
        
        // Debounced scroll handler for performance
        window.addEventListener('scroll', debounce(handleScrollAnimation, 100));
    };
    
    /**
     * Initialize achievements section
     */
    const initAchievements = () => {
        const achievementsHTML = CONFIG.achievements.map((achievement, index) => `
            <div class="achievement-card">
                <div class="achievement-number">0${index + 1}</div>
                <h3 class="achievement-title">${achievement.title}</h3>
                <p class="achievement-description">${achievement.description}</p>
                <a href="${achievement.link}" target="_blank" class="achievement-link">
                    View LinkedIn Post
                    <i class="fas fa-external-link-alt"></i>
                </a>
            </div>
        `).join('');
        
        DOM.achievementsGrid.innerHTML = achievementsHTML;
    };
    
    /**
     * Initialize contact form
     */
    const initContactForm = () => {
        DOM.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(DOM.contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const message = formData.get('message').trim();
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll simulate a successful submission
            
            // Show success message
            showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
            
            // Reset form
            DOM.contactForm.reset();
            
            // Reset form labels
            DOM.contactForm.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                input.dispatchEvent(new Event('blur'));
            });
        });
    };
    
    /**
     * Validate email format
     * @param {string} email - Email address to validate
     * @returns {boolean} True if email is valid
     */
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
    
    /**
     * Show form message
     * @param {string} message - Message to display
     * @param {string} type - Message type (success/error)
     */
    const showFormMessage = (message, type) => {
        DOM.formMessage.textContent = message;
        DOM.formMessage.className = `form-message ${type}`;
        DOM.formMessage.style.display = 'block';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            DOM.formMessage.style.display = 'none';
        }, 5000);
    };
    
    /**
     * Initialize resume button
     */
    const initResumeButton = () => {
        DOM.resumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            window.open('file:///C:/Users/vishw/OneDrive/Desktop/epass/frontend%20resume.pdf', '_blank');
        });
    };
    
    /**
     * Set current year in footer
     */
    const setCurrentYear = () => {
        const year = new Date().getFullYear();
        DOM.currentYear.textContent = year;
    };
    
    /**
     * Initialize profile image with fallback
     */
    const initProfileImage = () => {
        // Try to fetch LinkedIn profile picture
        // Note: LinkedIn doesn't allow direct image access due to CORS
        // In a real implementation, you would need to use LinkedIn API
        // or host the image locally
        
        // For this demo, we'll use a placeholder and show initials
        // In production, you would replace this with actual LinkedIn photo URL
        
        const placeholderURL = 'https://via.placeholder.com/350/0f172a/38bdf8?text=VK';
        
        DOM.profileImage.src = placeholderURL;
        DOM.profileImage.onerror = () => {
            // If image fails to load, hide it and show initials
            DOM.profileImage.style.display = 'none';
        };
    };
    
    /**
     * Initialize intersection observer for section animations
     */
    const initIntersectionObserver = () => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                }
            });
        };
        
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        // Observe all sections
        DOM.sections.forEach(section => {
            observer.observe(section);
        });
    };
    
    /**
     * Initialize ripple effect on buttons
     */
    const initRippleEffect = () => {
        document.addEventListener('click', function(e) {
            // Check if clicked element is a button with ripple effect
            const target = e.target.closest('.btn');
            
            if (target) {
                const rect = target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Create ripple element
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                // Add ripple to button
                target.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            }
        });
    };
    
    // ===========================================
    // Initialize Application
    // ===========================================
    
    /**
     * Main initialization function
     */
    const init = () => {
        console.log('Portfolio website initializing...');
        
        // Initialize all components
        initNavigation();
        initSmoothScrolling();
        initScrollAnimations();
        initTypingAnimation();
        initAchievements();
        initContactForm();
        initResumeButton();
        initProfileImage();
        initIntersectionObserver();
        initRippleEffect();
        setCurrentYear();
        
        // Set current year in footer
        DOM.currentYear.textContent = new Date().getFullYear();
        
        console.log('Portfolio website initialized successfully!');
    };
    
    // ===========================================
    // Event Listeners
    // ===========================================
    
    // Initialize when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            DOM.navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250));
    
    // Handle scroll for active navigation highlighting
    window.addEventListener('scroll', debounce(() => {
        const scrollPosition = window.scrollY + 100;
        
        // Update active navigation link based on scroll position
        DOM.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                DOM.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100));
    
})();