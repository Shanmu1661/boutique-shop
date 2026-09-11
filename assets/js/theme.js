// Theme & Language / RTL Management
(function () {
    // Check local storage or system preference for dark mode
    const isDarkMode = localStorage.getItem('color-theme') === 'dark' || 
                       (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Check language/direction settings
    const currentDir = localStorage.getItem('doc-direction') || 'ltr';
    const currentLang = localStorage.getItem('doc-lang') || 'en';
    
    document.documentElement.setAttribute('dir', currentDir);
    document.documentElement.setAttribute('lang', currentLang);
})();

// Export utilities for execution in main UI
window.ThemeToggler = {
    toggleTheme: function () {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
        // Dispatch custom event so other components can react
        window.dispatchEvent(new Event('theme-changed'));
    },
    
    toggleRTL: function () {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        if (currentDir === 'ltr') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            localStorage.setItem('doc-direction', 'rtl');
            localStorage.setItem('doc-lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
            localStorage.setItem('doc-direction', 'ltr');
            localStorage.setItem('doc-lang', 'en');
        }
        window.dispatchEvent(new Event('direction-changed'));
    },

    setRTL: function(isRTL) {
        if (isRTL) {
            document.documentElement.setAttribute('dir', 'rtl');
            document.documentElement.setAttribute('lang', 'ar');
            localStorage.setItem('doc-direction', 'rtl');
            localStorage.setItem('doc-lang', 'ar');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.documentElement.setAttribute('lang', 'en');
            localStorage.setItem('doc-direction', 'ltr');
            localStorage.setItem('doc-lang', 'en');
        }
        window.dispatchEvent(new Event('direction-changed'));
    }
};
