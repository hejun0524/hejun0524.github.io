document.addEventListener("DOMContentLoaded", () => {
    // 1. Determine the path prefix based on how deep the current page is
    // This handles root, /news/, and /events/ folders automatically
    const pathParts = window.location.pathname.split('/');
    const isSubfolder = pathParts.includes('news') || pathParts.includes('events');
    const prefix = isSubfolder ? '../' : '';

    // 2. Fetch and inject the Navigation Bar
    const loadNavbar = fetch(prefix + 'components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Fix image paths in navbar if we are in a subfolder
            if (isSubfolder) {
                const navLinks = document.querySelectorAll('.nav-link, .navbar-brand, .dropdown-item');
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        link.setAttribute('href', prefix + href);
                    }
                });
            }

            // Highlight the active page
            let currentPath = window.location.pathname.split("/").pop();
            if (currentPath === "" || currentPath === "index.html") currentPath = "/";
            
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // 3. Fetch and inject the Footer
    const loadFooter = fetch(prefix + 'components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

    // 4. Handle smooth scrolling for deep links (like #contact)
    Promise.all([loadNavbar, loadFooter]).then(() => {
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    });
});