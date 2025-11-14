// Countdown Timer
function updateCountdown() {
    const targetDate = new Date('2026-01-16T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Create Image Grid Background
function createImageGrid() {
    const grid = document.getElementById('imageGrid');
    if (!grid) {
        console.error('Grid element not found!');
        return;
    }
    
    // List of images from the images folder
    const images = [
        'images/69898462298__68CB9F16-887E-4055-97D3-7A1D4FDEBDA4.jpeg',
        'images/IMG_0019.JPG',
        'images/IMG_1449.JPG',
        'images/IMG_2765.PNG',
        'images/IMG_3066.jpeg',
        'images/IMG_3136.jpeg',
        'images/IMG_3142.JPG',
        'images/IMG_4131.jpeg',
        'images/IMG_4346.jpeg',
        'images/IMG_6100.jpeg',
        'images/IMG_6625.jpeg',
        'images/IMG_6663.jpeg',
        'images/IMG_7792.jpeg'
    ];
    
    // Calculate optimal grid size for even distribution
    const cellSize = 250; // Base cell size in pixels
    const gap = 2; // Gap between cells
    const padding = 2; // Grid padding
    
    // Calculate number of columns that fit evenly
    const viewportWidth = window.innerWidth;
    const availableWidth = viewportWidth - (padding * 2);
    const columns = Math.floor((availableWidth + gap) / (cellSize + gap));
    
    // Calculate number of rows needed to fill viewport height
    const viewportHeight = window.innerHeight;
    const availableHeight = viewportHeight - (padding * 2);
    const rows = Math.ceil((availableHeight + gap) / (cellSize + gap));
    
    // Total items needed to fill the grid evenly
    const gridItems = columns * rows;
    
    // Set grid template columns for even distribution
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    
    // Create grid items with images
    for (let i = 0; i < gridItems; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';
        
        // Randomly select an image
        const randomImage = images[Math.floor(Math.random() * images.length)];
        
        // Preload image first, then set as background
        const img = new Image();
        img.onload = function() {
            console.log('Image loaded:', randomImage);
            // Set background image after image loads - ensure square fit
            item.style.backgroundImage = `url('${randomImage}')`;
            item.style.backgroundSize = 'cover';
            item.style.backgroundPosition = 'center';
            item.style.backgroundRepeat = 'no-repeat';
            item.style.opacity = '0.8';
        };
        img.onerror = function() {
            console.error('Failed to load image:', randomImage);
            // Fallback to gradient if image fails
            item.style.background = 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(157, 0, 255, 0.1))';
        };
        img.src = randomImage;
        
        // Random delay for animation
        const delay = Math.random() * 5;
        item.style.animationDelay = `${delay}s`;
        
        grid.appendChild(item);
    }
    
    console.log(`Created ${gridItems} grid items (${columns} columns × ${rows} rows) with images`);
}

// Initialize image grid on load
document.addEventListener('DOMContentLoaded', () => {
    createImageGrid();
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.agenda-day, .joke-card, .rule-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// Add parallax effect to hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Add hover effects to agenda items
document.querySelectorAll('.day-events li').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(255, 255, 255, 0.05)';
        this.style.borderRadius = '5px';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
    });
});

// Quiz Modal Functionality
// CONFIGURE CORRECT ANSWERS HERE
const correctAnswers = {
    fiance: 'Hope', // Change this to the correct answer
    trouble: 'Burping', // Change this to the correct answer
    roomNumber: '207' // Change this to the correct room number (case-insensitive)
};

// Check if quiz is already completed (stored in localStorage)
const quizCompleted = localStorage.getItem('philQuizCompleted') === 'true';

// Initialize quiz modal and form handling
document.addEventListener('DOMContentLoaded', () => {
    const quizModal = document.getElementById('quizModal');
    const contentBlurOverlay = document.getElementById('contentBlurOverlay');
    const belowFoldContent = document.getElementById('belowFoldContent');
    const quizForm = document.getElementById('quizForm');
    const quizError = document.getElementById('quizError');
    
    // Show/hide blur overlay based on quiz status
    if (quizCompleted) {
        contentBlurOverlay.classList.add('hidden');
        belowFoldContent.classList.add('unlocked');
    } else {
        contentBlurOverlay.classList.remove('hidden');
        belowFoldContent.classList.remove('unlocked');
    }
    
    // Handle quiz form submission
    if (!quizForm) return;
    
    quizForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(quizForm);
    const fianceAnswer = formData.get('fiance');
    const troubleAnswer = formData.get('trouble');
    const roomNumberAnswer = formData.get('roomNumber').trim();
    
    // Validate answers (case-insensitive for all text inputs)
    const isFianceCorrect = fianceAnswer === correctAnswers.fiance;
    const isTroubleCorrect = troubleAnswer.trim().toLowerCase() === correctAnswers.trouble.toLowerCase();
    const isRoomCorrect = roomNumberAnswer.toLowerCase() === correctAnswers.roomNumber.toLowerCase();
    
    if (isFianceCorrect && isTroubleCorrect && isRoomCorrect) {
        // All answers correct - hide modal and show agenda
        quizError.classList.remove('show');
        quizError.textContent = '';
        
        // Store completion in localStorage
        localStorage.setItem('philQuizCompleted', 'true');
        
        // Hide blur overlay with animation
        const contentBlurOverlay = document.getElementById('contentBlurOverlay');
        const belowFoldContent = document.getElementById('belowFoldContent');
        contentBlurOverlay.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            contentBlurOverlay.classList.add('hidden');
            belowFoldContent.classList.add('unlocked');
            
            // Scroll to content
            belowFoldContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    } else {
        // Show error message
        const errors = [];
        if (!isFianceCorrect) errors.push('Wrong fiance name');
        if (!isTroubleCorrect) errors.push('Wrong trouble answer');
        if (!isRoomCorrect) errors.push('Wrong room number');
        
        quizError.textContent = `❌ ${errors.join(', ')}. Try again!`;
        quizError.classList.add('show');
        
        // Shake animation
        quizForm.style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            quizForm.style.animation = '';
        }, 500);
    }
    });
});

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

