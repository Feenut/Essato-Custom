// Improved mobile navigation script
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Handle hamburger click
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            
            if (!navMenu.classList.contains('active')) {
                // Open menu
                navMenu.classList.add('active');
                navMenu.style.display = 'flex';
                navMenu.style.left = '0';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                // Close menu
                closeMenu();
            }
        });
        
        // Close menu function
        function closeMenu() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            navMenu.style.left = '-100%';
            document.body.style.overflow = ''; // Restore scrolling
            
            setTimeout(() => {
                if (!navMenu.classList.contains('active')) {
                    navMenu.style.display = 'none';
                }
            }, 300);
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Close menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Prevent menu from closing when clicking inside it
        navMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Handle resize events
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMenu();
                navMenu.style.display = 'flex'; // Restore desktop display
                navMenu.style.left = '0';
            } else if (window.innerWidth <= 768 && !navMenu.classList.contains('active')) {
                navMenu.style.display = 'none';
                navMenu.style.left = '-100%';
            }
        });
    }
    
    // Fix for iOS devices - prevent zoom on input focus
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        viewportMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1';
    }
}); 