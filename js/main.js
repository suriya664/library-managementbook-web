// ============================================
// IMPERIAL LIBRARY - MAIN JAVASCRIPT
// ============================================

// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    // Initialize all functionality
    initNavbar();
    initCarousel();
    initFilters();
    initSearch();
    initForms();
    initScrollEffects();
    initLazyLoading();
    initLoader();
    initActiveLinks();
    initImageErrorHandling();
});

// ============================================
// NAVBAR FUNCTIONALITY
// ============================================
function initNavbar() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.setAttribute('data-feather', 'x');
            } else {
                icon.setAttribute('data-feather', 'menu');
            }
            feather.replace();
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 1024) {
                navMenu.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-feather', 'menu');
                feather.replace();
            }
        });
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ============================================
// ACTIVE LINK HIGHLIGHTING
// ============================================
function initActiveLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Initial call
}

// ============================================
// CAROUSEL FUNCTIONALITY
// ============================================
function initCarousel() {
    const carouselContainer = document.getElementById('carouselContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carouselContainer || !prevBtn || !nextBtn) return;
    
    const scrollAmount = 320; // card width + gap
    
    prevBtn.addEventListener('click', function() {
        carouselContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        carouselContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    // Auto-hide buttons at edges
    function updateCarouselButtons() {
        const { scrollLeft, scrollWidth, clientWidth } = carouselContainer;
        
        prevBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
        prevBtn.style.pointerEvents = scrollLeft > 0 ? 'auto' : 'none';
        
        nextBtn.style.opacity = scrollLeft < scrollWidth - clientWidth - 10 ? '1' : '0.5';
        nextBtn.style.pointerEvents = scrollLeft < scrollWidth - clientWidth - 10 ? 'auto' : 'none';
    }
    
    carouselContainer.addEventListener('scroll', updateCarouselButtons);
    updateCarouselButtons();
}

// ============================================
// FILTER FUNCTIONALITY
// ============================================
function initFilters() {
    const genreFilter = document.getElementById('genreFilter');
    const authorFilter = document.getElementById('authorFilter');
    const ratingFilter = document.getElementById('ratingFilter');
    const yearFilter = document.getElementById('yearFilter');
    const booksGrid = document.getElementById('booksGrid');
    
    if (!booksGrid) return;
    
    const bookCards = Array.from(booksGrid.querySelectorAll('.book-card'));
    
    function filterBooks() {
        const genreValue = genreFilter ? genreFilter.value : 'all';
        const authorValue = authorFilter ? authorFilter.value : 'all';
        const ratingValue = ratingFilter ? ratingFilter.value : 'all';
        const yearValue = yearFilter ? yearFilter.value : 'all';
        
        bookCards.forEach(card => {
            const cardGenre = card.getAttribute('data-genre') || '';
            const cardAuthor = card.getAttribute('data-author') || '';
            const cardRating = parseFloat(card.querySelector('.book-rating span')?.textContent || '0');
            const cardYear = card.getAttribute('data-year') || '';
            
            const genreMatch = genreValue === 'all' || cardGenre === genreValue;
            const authorMatch = authorValue === 'all' || cardAuthor === authorValue;
            const ratingMatch = ratingValue === 'all' || cardRating >= parseFloat(ratingValue);
            const yearMatch = yearValue === 'all' || cardYear === yearValue;
            
            if (genreMatch && authorMatch && ratingMatch && yearMatch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    if (genreFilter) genreFilter.addEventListener('change', filterBooks);
    if (authorFilter) authorFilter.addEventListener('change', filterBooks);
    if (ratingFilter) ratingFilter.addEventListener('change', filterBooks);
    if (yearFilter) yearFilter.addEventListener('change', filterBooks);
}

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const heroSearchInput = document.querySelector('.hero-search-input');
    const booksGrid = document.getElementById('booksGrid');
    
    function performSearch(query) {
        if (!booksGrid) return;
        
        const bookCards = booksGrid.querySelectorAll('.book-card');
        const queryLower = query.toLowerCase().trim();
        
        if (queryLower === '') {
            bookCards.forEach(card => {
                card.style.display = 'flex';
                card.style.opacity = '1';
            });
            return;
        }
        
        bookCards.forEach(card => {
            const title = card.querySelector('.book-title')?.textContent.toLowerCase() || '';
            const author = card.querySelector('.book-author')?.textContent.toLowerCase() || '';
            const description = card.querySelector('.book-description')?.textContent.toLowerCase() || '';
            
            const matches = title.includes(queryLower) || 
                          author.includes(queryLower) || 
                          description.includes(queryLower);
            
            if (matches) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.classList.add('fade-in');
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            performSearch(e.target.value);
        });
    }
    
    if (heroSearchInput) {
        heroSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(e.target.value);
                const browseSection = document.getElementById('browse');
                if (browseSection) {
                    window.scrollTo({
                        top: browseSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
        
        const heroSearchBtn = heroSearchInput.nextElementSibling;
        if (heroSearchBtn && heroSearchBtn.classList.contains('btn-primary')) {
            heroSearchBtn.addEventListener('click', function() {
                performSearch(heroSearchInput.value);
                const browseSection = document.getElementById('browse');
                if (browseSection) {
                    window.scrollTo({
                        top: browseSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        }
    }
}

// ============================================
// FORM HANDLING
// ============================================
function initForms() {
    const reviewForm = document.getElementById('reviewForm');
    const contactForm = document.getElementById('contactForm');
    
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you! Your review has been submitted successfully.', 'success');
            
            // Reset form
            this.reset();
        });
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#1B4D3E' : '#8B0000'};
        color: #F0F5F0;
        padding: 20px 30px;
        border: 2px solid #D4AF37;
        border-radius: 4px;
        box-shadow: 0 8px 30px rgba(212, 175, 55, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        font-family: 'Poppins', sans-serif;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SCROLL EFFECTS & ANIMATIONS
// ============================================
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const elementsToAnimate = document.querySelectorAll(
        '.book-card, .review-card, .category-card, .stat-card, .info-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger load
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.classList.add('loaded');
        });
    }
}

// ============================================
// LOADER
// ============================================
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (loader) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500);
        });
    }
}

// ============================================
// BOOK CARD INTERACTIONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const bookCards = document.querySelectorAll('.book-card');
    
    bookCards.forEach(card => {
        const btn = card.querySelector('.btn-card');
        
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const bookTitle = card.querySelector('.book-title')?.textContent || 'Book';
                showNotification(`Opening details for "${bookTitle}"...`, 'success');
            });
        }
    });
    
    // Review card buttons
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        const btn = card.querySelector('.btn-card');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const reviewTitle = card.querySelector('.review-book-title')?.textContent || 'Review';
                showNotification(`Loading full review for "${reviewTitle}"...`, 'success');
            });
        }
    });
    
    // Category card clicks
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryName = card.querySelector('.category-name')?.textContent || 'Category';
            showNotification(`Browsing ${categoryName}...`, 'success');
            // Scroll to browse section
            const browseSection = document.getElementById('browse');
            if (browseSection) {
                window.scrollTo({
                    top: browseSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// SMOOTH SCROLL POLYFILL FOR OLDER BROWSERS
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15/dist/smooth-scroll.polyfills.min.js';
    document.head.appendChild(script);
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const scrollHandlers = [
    initActiveLinks,
    function() {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        }
    }
];

scrollHandlers.forEach(handler => {
    window.addEventListener('scroll', throttle(handler, 16));
});

