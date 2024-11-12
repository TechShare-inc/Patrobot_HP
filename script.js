// script.js

document.addEventListener("DOMContentLoaded", function () {
    const offset = 160; // Adjust this value based on the height of your header and navbar

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    const imagesFolder = 'images/slide_show/'; // Path to your slide_show directory
    const images = [
        '3DMap1.png', // Replace with actual image names
        '3DMap2.png',
        'B2_rain.png',
        'DownStairs.png',
        'UpStairs.png',
    ];
    
    const imgElement = document.getElementById('slideshow-image');
    let currentIndex = 0; // Start at the first image
    
    function updateImage() {
        // Start fade-out
        imgElement.classList.remove('fade-in');
        imgElement.classList.add('fade-out');
    
        // After fade-out, update the image source and fade in
        setTimeout(() => {
            imgElement.src = imagesFolder + images[currentIndex];
            imgElement.classList.remove('fade-out');
            imgElement.classList.add('fade-in');
    
            // Move to the next image, looping back to start if at the end
            currentIndex = (currentIndex + 1) % images.length;
        }, 1000); // 1 second delay to match the fade-out duration
    }
    
    // Initial image load with fade-in effect
    imgElement.src = imagesFolder + images[currentIndex];
    imgElement.classList.add('fade-in');
    currentIndex = (currentIndex + 1) % images.length;
    
    // Change image every 5 seconds (5000 milliseconds)
    setInterval(updateImage, 5000);


    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once the section has appeared
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
