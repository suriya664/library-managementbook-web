// ============================================
// HOME 2 JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    initHome2();
    initScrollIndicator();
    initBookStackAnimation();
    initFeatureCards();
});

// Initialize Home 2 functionality
function initHome2() {
    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.hero2-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features-section');
            if (featuresSection) {
                window.scrollTo({
                    top: featuresSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Initialize animations
    initScrollAnimations();
}

// Initialize scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero2-scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Initialize book stack animation
function initBookStackAnimation() {
    const bookStackItems = document.querySelectorAll('.book-stack-item');
    
    bookStackItems.forEach((item, index) => {
        // Add rotation values
        if (index === 0) {
            item.style.setProperty('--rotation', '-15deg');
        } else if (index === 2) {
            item.style.setProperty('--rotation', '15deg');
        } else {
            item.style.setProperty('--rotation', '0deg');
        }
        
        // Add hover effect
        item.addEventListener('mouseenter', function() {
            bookStackItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.style.opacity = '0.7';
                }
            });
        });
        
        item.addEventListener('mouseleave', function() {
            bookStackItems.forEach(otherItem => {
                otherItem.style.opacity = '1';
            });
        });
    });
}

// Initialize feature cards animation
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// Initialize scroll animations
function initScrollAnimations() {
    const popularBooks = document.querySelectorAll('.popular-book-card');
    const statItems = document.querySelectorAll('.stat-item-home2');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    [...popularBooks, ...statItems].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(item);
    });
    
    // Animate stats numbers
    const statNumbers = document.querySelectorAll('.stat-number-home2');
    statNumbers.forEach(stat => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumber(stat);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(stat);
    });
}

// Animate number counting
function animateNumber(element) {
    const target = parseInt(element.textContent.replace(/,/g, '').replace('+', ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    const hasPlus = element.textContent.includes('+');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + (hasPlus ? '+' : '');
        }
    }, 16);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero2 = document.querySelector('.hero2');
    
    if (hero2 && scrolled < window.innerHeight) {
        const hero2Content = hero2.querySelector('.hero2-content');
        if (hero2Content) {
            hero2Content.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero2Content.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }
});


