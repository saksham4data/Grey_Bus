   // Toggle mobile menu
        function toggleMenu() {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        }
         
        // Scroll to search form
        function scrollToSearch() {
            document.getElementById('searchForm').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }

        // Handle search form submission
        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fromLocation = document.getElementById('fromInput').value;
            const toLocation = document.getElementById('toInput').value;
            
            if (!fromLocation || !toLocation) {
                alert('Please enter both departure and destination locations.');
                return;
            }
            
            // Simulate search functionality
                window.location.href = `/bus_results/?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}`;

        });

        // Add floating animation to travel images
        function animateImages() {
            const images = document.querySelectorAll('.travel-image');
            images.forEach((img, index) => {
                img.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
            });
        }

        // CSS animation for floating effect
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);

        // Initialize animations when page loads
        window.addEventListener('load', animateImages);

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.querySelector('.hamburger');
            
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });

        // Add smooth scrolling for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
        window.onload = function() {
  const modal = document.getElementById("loginModal");
  const closeBtn = document.getElementById("closeModal");

  // Show modal immediately on page load
  modal.style.display = "flex";

  // Close on "×"
  closeBtn.onclick = () => { modal.style.display = "none"; }

  // Close when clicking outside the box
  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }
};