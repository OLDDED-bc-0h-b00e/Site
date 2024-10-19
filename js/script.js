
    // stripes
// ____________________________________________________________________________________________________________________________________________________________

    document.addEventListener('DOMContentLoaded', () => {
        const stripes = document.querySelectorAll('.stripe');
        const header = document.getElementById('header');
        
        let index = 0;
    
        function animateStripes() {
            stripes.forEach(stripe => {
                stripe.style.opacity = '0'; 
            });
    
            stripes[index].style.opacity = '1'; 
            stripes[(index + 1) % stripes.length].style.opacity = '1'; 
    
            index = (index + 1) % stripes.length; 
    
            setTimeout(animateStripes, 4500);
        }
    
        // Start animation
        animateStripes();
    
        document.getElementById('contactBtn').addEventListener('click', () => {
            alert('Напишите нам!');
        });
    
        document.getElementById('orderBtn').addEventListener('click', () => {
            alert('Заказ принят!');
        });
    
    });

    // Text
// _______________________________________________________________________________________________________________________________________________________________

    let animationTriggered = false; // Flag to prevent multiple triggers

function animateText(h2Element) {
    const text = "Our discs produce a lot of new emotions and give the car a new look";
    const to = text.length;

    animate({
        duration: 7000,
        timing: bounce,
        draw: function(progress) {
            let result = (to - 0) * progress;
            h2Element.textContent = text.slice(0, Math.ceil(result));
        }
    }).then(() => {
        // After the text is fully displayed, start erasing it
        eraseText(h2Element, text).then(() => {
            animateText(h2Element); // Restart animation
        });
    });
}

function bounce(timeFraction) {
    for (let a = 0, b = 1; ; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
    }
}

function animate({duration, timing, draw}) {
    return new Promise((resolve) => {
        let start = performance.now();

        function animation(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);
            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animation);
            } else {
                resolve(); // Resolve when animation is complete
            }
        }

        requestAnimationFrame(animation);
    });
}

function eraseText(h2Element, fullText) {
    return new Promise((resolve) => {
        let currentLength = fullText.length;

        const eraseInterval = setInterval(() => {
            if (currentLength > 1) {
                currentLength--;
                h2Element.textContent = fullText.slice(0, currentLength);
            } else {
                clearInterval(eraseInterval);
                resolve(); // Resolve when erasing is complete
            }
        }, 200); // Adjust speed of erasing here
    });
}

// Debounce function to limit how often the scroll event fires
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Trigger animation on scroll
const handleScroll = debounce(() => {
    const h2Element = document.getElementById('textExample');
    
    if (!animationTriggered) { // Start animation only once
        animationTriggered = true; // Set flag to prevent further triggers
        animateText(h2Element);
    }
}, 100); // Adjust debounce delay as needed

window.addEventListener('scroll', handleScroll);