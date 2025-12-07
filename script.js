// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize video playlist
    initVideoPlaylist();
});

// Video Playlist Functionality
function initVideoPlaylist() {
    const video = document.getElementById('heroVideo');
    if (!video) return;

    // Define your video playlist - add as many videos as you want
    // Make sure these files actually exist in your pictures folder
    const videoPlaylist = [
        'pictures/front-page-video1.mp4',     
        'pictures/front-page-video2.mp4',
    ];

    let currentVideoIndex = 0;

    // Function to load next video (only if there are multiple videos)
    function loadNextVideo() {
        if (videoPlaylist.length <= 1) {
            // If only one video, just replay it
            video.currentTime = 0;
            video.play().catch(e => console.log('Video autoplay prevented:', e));
            return;
        }

        currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
        const nextVideo = videoPlaylist[currentVideoIndex];
        
        console.log('Loading next video:', nextVideo, 'Index:', currentVideoIndex);
        
        // Clear all existing sources and reload with new video
        const sources = video.getElementsByTagName('source');
        while(sources.length > 0) {
            sources[0].remove();
        }
        
        // Create new source element
        const newSource = document.createElement('source');
        newSource.src = nextVideo;
        newSource.type = 'video/mp4';
        video.appendChild(newSource);
        
        // Force reload and play
        video.load();
        
        // Wait for video to be ready before playing
        video.addEventListener('canplay', function playNext() {
            video.removeEventListener('canplay', playNext);
            video.play().catch(e => console.log('Video autoplay prevented:', e));
        });
    }

    // Listen for video end event
    video.addEventListener('ended', function() {
        console.log('Video ended, current index:', currentVideoIndex);
        loadNextVideo();
    });

    // Add error handling for video loading
    video.addEventListener('error', function(e) {
        console.log('Video error:', e);
        console.log('Failed to load video:', video.currentSrc);
    });

    // Add canplay event to confirm video loads
    video.addEventListener('canplay', function() {
        console.log('Video loaded successfully:', video.currentSrc);
    });

    // Optional: Add controls to manually navigate videos
    window.nextVideo = loadNextVideo;
    window.previousVideo = function() {
        if (videoPlaylist.length <= 1) return;
        
        currentVideoIndex = currentVideoIndex === 0 ? videoPlaylist.length - 1 : currentVideoIndex - 1;
        const prevVideo = videoPlaylist[currentVideoIndex];
        
        console.log('Loading previous video:', prevVideo, 'Index:', currentVideoIndex);
        
        // Clear all existing sources and reload with new video
        const sources = video.getElementsByTagName('source');
        while(sources.length > 0) {
            sources[0].remove();
        }
        
        // Create new source element
        const newSource = document.createElement('source');
        newSource.src = prevVideo;
        newSource.type = 'video/mp4';
        video.appendChild(newSource);
        
        // Force reload and play
        video.load();
        
        // Wait for video to be ready before playing
        video.addEventListener('canplay', function playPrev() {
            video.removeEventListener('canplay', playPrev);
            video.play().catch(e => console.log('Video autoplay prevented:', e));
        });
    };
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animation on Scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll(
        '.product-card, .advantage-item, .cert-item, .philosophy-text, .contact-form'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Handling (Placeholder - not functional)
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // This is a placeholder - form is not functional as requested
    alert('Thank you for your message! This is a placeholder form. Functionality will be added later.');
    
    // Reset form
    this.reset();
});

// Product Card Hover Effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-5px)';
    });
});

// Add active states for navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #0066cc !important;
        font-weight: 600;
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
    }
`;
document.head.appendChild(style);
