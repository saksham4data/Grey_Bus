function checkStatus() {
            const trainInput = document.querySelector('.input-field');
            const startDay = document.querySelector('.date-input');
            
            // Simulate status check
            alert(`Checking status for: ${trainInput.value} on ${startDay.value}`);
        }

        function changeStatus() {
            // Simulate change functionality
            const newTrain = prompt('Enter new train number:', '12607 - Lalbagh SF Express');
            if (newTrain) {
                document.querySelector('.input-field').value = newTrain;
                document.querySelector('.status-details h4').textContent = newTrain + ' Running Status';
            }
        }

        function showBetweenStations() {
            // Simulate showing between stations
            alert('Showing intermediate stations...');
        }

        // Add some interactive functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Add hover effects to timeline dots
            const timelineDots = document.querySelectorAll('.timeline-dot');
            timelineDots.forEach((dot, index) => {
                dot.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(-50%) scale(1.2)';
                });
                
                dot.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(-50%) scale(1)';
                });
            });

            // Add click functionality to navigation buttons
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                });
            });
        });