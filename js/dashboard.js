// ============================================
// DASHBOARD JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    
    initDashboard();
    initDashboardAnimations();
    initActionButtons();
});

// Initialize dashboard functionality
function initDashboard() {
    // Animate stats on load
    animateStats();
    
    // Initialize progress bars
    initProgressBars();
}

// Animate statistics numbers
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number-dashboard');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/,/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// Initialize progress bars animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Initialize dashboard animations
function initDashboardAnimations() {
    const cards = document.querySelectorAll('.dashboard-card, .stat-card-dashboard');
    
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
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// Initialize action buttons
function initActionButtons() {
    const actionButtons = document.querySelectorAll('.action-btn');
    
    actionButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            showNotification(`Action: ${action}`, 'success');
        });
    });
    
    // Recent book items click
    const recentBookItems = document.querySelectorAll('.recent-book-item');
    recentBookItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('.recent-book-title').textContent;
            showNotification(`Opening details for "${title}"...`, 'success');
        });
    });
    
    // Activity items click
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.activity-text').textContent;
            showNotification(`Viewing: ${text}`, 'success');
        });
    });
}

// Show notification (reuse from main.js if available)
function showNotification(message, type = 'success') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}


