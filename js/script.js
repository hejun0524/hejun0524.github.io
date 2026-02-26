document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Fetch and inject the Navigation Bar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-placeholder').innerHTML = data;
            
            // Automatically highlight the active page in the navbar
            let currentPath = window.location.pathname.split("/").pop();
            if (currentPath === "") currentPath = "index.html"; // Default to home
            
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // 2. Fetch and inject the Footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });

});