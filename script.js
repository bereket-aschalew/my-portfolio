// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const loader = document.querySelector('.loader');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.querySelector('.theme-toggle');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1000);
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Theme toggle (dark/light mode)
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference to localStorage
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
    
    // Project filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Scroll animations
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('fade-in');
                
                // Animate elements inside the section
                const animElements = section.querySelectorAll('.scroll-animation');
                animElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('active');
                    }, 200 * index);
                });
            }
        });
    }
    
    // Initial check on page load
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Add scroll-animation class to elements
    document.querySelectorAll('.skill-card, .project-card, .about-img, .about-text, .contact-info, .contact-form').forEach(el => {
        el.classList.add('scroll-animation');
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.height = '80px';
        }
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});