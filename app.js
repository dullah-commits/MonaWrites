document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Loading animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loaded');
        }
    });
}, observerOptions);

document.querySelectorAll('.loading').forEach(el => {
    observer.observe(el);
});

// Contact form handling


// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        mobileMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('mobile-open');
        mobileMenu.classList.remove('active');
    }
});

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    heroTitle.style.opacity = '1';
    
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 80);
    }, 1000);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Calculator functionality
const calculateBtn = document.getElementById('calculateBtn');
const calculatorResult = document.getElementById('calculatorResult');
const requestQuoteBtn = document.getElementById('requestQuoteBtn');

calculateBtn.addEventListener('click', function() {
    const wordCount = parseInt(document.getElementById('wordCount').value);
    const packageRate = parseFloat(document.getElementById('packageType').value);
    const contentMultiplier = parseFloat(document.getElementById('contentType').value);
    const urgencyMultiplier = parseFloat(document.getElementById('urgency').value);

    if (!wordCount || wordCount <= 0) {
        alert('Please enter a valid number of words');
        return;
    }

    // Calculate costs
    const baseCost = wordCount * packageRate;
    const finalCost = baseCost * contentMultiplier * urgencyMultiplier;

    // Update result display
    document.getElementById('baseCost').textContent = `${baseCost.toFixed(2)}`;
    document.getElementById('contentMultiplier').textContent = `${contentMultiplier}x`;
    document.getElementById('urgencyMultiplier').textContent = `${urgencyMultiplier}x`;
    document.getElementById('totalCost').textContent = `${finalCost.toFixed(2)}`;

    // Show result
    calculatorResult.classList.add('show');
    calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

// Request quote button
requestQuoteBtn.addEventListener('click', function() {
    const wordCount = document.getElementById('wordCount').value;
    const packageType = document.getElementById('packageType').selectedOptions[0].text;
    const contentType = document.getElementById('contentType').selectedOptions[0].text;
    const urgency = document.getElementById('urgency').selectedOptions[0].text;
    const totalCost = document.getElementById('totalCost').textContent;

    const message = `Hi! I'd like to request a custom quote for my project:

Word Count: ${wordCount} words
Package: ${packageType}
Content Type: ${contentType}
Timeline: ${urgency}
Estimated Cost: ${totalCost}

Please provide a detailed quote for this project.`;

    // Pre-fill contact form or create mailto link
    const contactSection = document.getElementById('contact');
    const messageTextarea = document.getElementById('message');
    const subjectInput = document.getElementById('subject');
    
    if (messageTextarea && subjectInput) {
        subjectInput.value = 'Custom Quote Request';
        messageTextarea.value = message;
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Pricing button handlers
document.querySelectorAll('.pricing-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.pricing-card');
        let packageValue = '0.12'; // default to standard
        
        if (card.classList.contains('basic')) {
            packageValue = '0.08';
        } else if (card.classList.contains('premium')) {
            packageValue = '0.15';
        }
        
        // Scroll to calculator and pre-select package
        const calculatorSection = document.getElementById('calculator');
        const packageSelect = document.getElementById('packageType');
        
        packageSelect.value = packageValue;
        calculatorSection.scrollIntoView({ behavior: 'smooth' });
        
        // Add a subtle highlight effect
        const calculatorCard = document.querySelector('.calculator-card');
        calculatorCard.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            calculatorCard.style.animation = '';
        }, 1000);
    });
});
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});