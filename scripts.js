// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    let angle = 0;
    const items = document.querySelectorAll('.carousel-item');
    const numItems = items.length;

    setInterval(() => {
        angle += 360 / numItems;
        items.forEach((item, index) => {
            const currentAngle = angle + (index * 360 / numItems);
            item.style.transform = `rotateY(${currentAngle}deg) translateZ(300px)`;
        });
    }, 2000);
});
// scripts.js
function showForm() {
    document.getElementById('modalForm').style.display = 'flex';
}

function closeForm() {
    document.getElementById('modalForm').style.display = 'none';
}

// Close the modal when the user clicks anywhere outside of the modal
window.onclick = function(event) {
    if (event.target == document.getElementById('modalForm')) {
        document.getElementById('modalForm').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.createElement('div');

    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    hamburgerMenu.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
    });
});


//library meeting room 
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.library-carousel');
    const items = document.querySelectorAll('.library-carousel-item');
    const prevButton = document.querySelector('.library-prev');
    const nextButton = document.querySelector('.library-next');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        items.forEach(item => {
            item.style.transform = `translateX(${offset}%)`;
        });
    }

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Optional: Auto-slide
    setInterval(() => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 3000);
});
