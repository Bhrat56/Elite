document.addEventListener('DOMContentLoaded', () => {
            // Intersection Observer for scroll animations
            const animateElements = document.querySelectorAll('.animate__fade-in-up, .animate__slide-in-left, .animate__slide-in-right, .animate__scale-in');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        // Optional: Stop observing once animated to prevent re-triggering
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.2 // Trigger when 20% of the element is visible
            });

            animateElements.forEach(element => {
                observer.observe(element);
            });

            // Typewriter effect for Hero Section H1
            const typewriterTextElement = document.getElementById('typewriter-text');
            const textToType = "Innovate. Create. Elevate.";
            let i = 0;
            let currentText = '';
            let isDeleting = false;
            let typingSpeed = 100; // milliseconds per character

            function typeWriter() {
                const fullText = textToType;

                if (isDeleting) {
                    currentText = fullText.substring(0, currentText.length - 1);
                    typingSpeed = 50; // Faster deleting
                } else {
                    currentText = fullText.substring(0, i + 1);
                    typingSpeed = 100; // Normal typing speed
                }

                typewriterTextElement.textContent = currentText;

                let delay = typingSpeed;

                if (!isDeleting && currentText === fullText) {
                    delay = 2000; // Pause at the end of typing
                    isDeleting = true;
                } else if (isDeleting && currentText === '') {
                    isDeleting = false;
                    i = 0; // Reset index to start typing again
                    delay = 500; // Short pause before re-typing
                }

                if (!isDeleting) {
                    i++;
                }

                setTimeout(typeWriter, delay);
            }

            // Start typewriter effect once the element is animated into view
            const heroH1Observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !typewriterTextElement.classList.contains('typed')) {
                        typeWriter();
                        typewriterTextElement.classList.add('typed'); // Mark as typed
                        heroH1Observer.unobserve(entry.target); // Stop observing after it starts
                    }
                });
            }, {
                threshold: 0.5 // Trigger when 50% of the H1 is visible
            });

            heroH1Observer.observe(document.querySelector('.hero-content h1'));


            // Initialize Bootstrap Carousel
            const testimonialCarousel = document.getElementById('testimonialCarousel');
            if (testimonialCarousel) {
                new bootstrap.Carousel(testimonialCarousel);
            }
        });
