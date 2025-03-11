// Toggle mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Toggle dark mode
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    // Store preference in localStorage
    if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('darkMode', 'true');
    } else {
        localStorage.setItem('darkMode', 'false');
    }
}

// Apply dark mode on page load if previously set
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        if (localStorage.getItem('darkMode') === 'true') {
            document.documentElement.classList.add('dark');
        }
        
        // Check for authenticated session
        checkAuthStatus();
    });
}

// Check if user is authenticated
function checkAuthStatus() {
    // We're allowing access to the generator without authentication now
    // The payment check will happen after the questionnaire is filled out
    
    // For more restricted areas, we might still need auth checks
    // This was previously checking if the user was authenticated to access the generator
    // const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    // if (window.location.pathname.includes('generator.html') && !isAuthenticated) {
    //    window.location.href = 'pricing.html';
    // }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleMobileMenu,
        toggleDarkMode,
        checkAuthStatus
    };
}