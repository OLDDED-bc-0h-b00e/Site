
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



let timer;
let timerDuration = 1500; // Время в миллисекундах, когда ползунок исчезнет
SmoothScroll({
animationTime: 800, // Время анимации прокрутки
stepSize: 75, // Размер шага прокрутки в пикселях
accelerationDelta: 30, // Ускорение скроллаs
accelerationMax: 2, // Максимальное ускорение
keyboardSupport: true, // Поддержка клавиатуры
arrowScroll: 50, // Шаг прокрутки стрелками на клавиатуре в пикселях
pulseAlgorithm: true, // Алгоритм пульсации
pulseScale: 4, // Масштаб пульсации
pulseNormalize: 1, // Нормализация пульсации
touchpadSupport: true, // Поддержка тачпада
});

document.addEventListener('DOMContentLoaded', function () {
    const thumb = document.querySelector('.custom-scrollbar-thumb-md');
    const scrollbar = document.querySelector('.custom-scrollbar-md');
    const ucScroll = document.querySelector('.uc-scroll-md');
    let isDragging = false;
    let startY, startThumbTop;
    function updateThumbHeight() {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const thumbHeight = clientHeight / scrollHeight * clientHeight;
    thumb.style.height = thumbHeight + 'px';
    }
    function updateScroll() {
    const scrollPercentage = thumb.offsetTop / (scrollbar.offsetHeight - thumb.offsetHeight);
    const scrollAmount = scrollPercentage * (document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo(0, scrollAmount);
    }
    function resetTimer() {
    clearTimeout(timer); 
    timer = setTimeout(function() {
    thumb.classList.add('hide'); 
    }, timerDuration); 
    }
    updateThumbHeight();
    resetTimer(); 
    window.addEventListener('resize', updateThumbHeight); 
    window.addEventListener('scroll', function () {
    thumb.classList.remove('hide'); 
    const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    const thumbPosition = scrollPercentage * (scrollbar.offsetHeight - thumb.offsetHeight);
    thumb.style.top = thumbPosition + 'px';
    resetTimer(); 
    });
    thumb.addEventListener('mousedown', function (e) {
    isDragging = true;
    startY = e.clientY;
    startThumbTop = thumb.offsetTop;
    resetTimer(); 
    });
    document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    const deltaY = e.clientY - startY;
    thumb.style.top = Math.min(scrollbar.offsetHeight - thumb.offsetHeight, Math.max(0, startThumbTop + deltaY)) + 'px';
    updateScroll();
    resetTimer(); 
    });
    thumb.addEventListener('mouseenter', function () {
    clearTimeout(timer);
    });
    thumb.addEventListener('mouseleave', function () {
    resetTimer();
    });
    document.addEventListener('mouseup', function () {
    isDragging = false;
    resetTimer(); 
    });
    scrollbar.addEventListener('mouseenter', function () {
    thumb.classList.remove('hide');
    thumb.classList.add('active');
    ucScroll.classList.add('active');
    });
    scrollbar.addEventListener('mouseleave', function () {
    ucScroll.classList.remove('active');
    resetTimer(); 
    });
    scrollbar.addEventListener('mousedown', function () {
    thumb.classList.remove('hide');
    thumb.classList.add('active');
    ucScroll.classList.remove('active');
    resetTimer(); 
    });
    scrollbar.addEventListener('mouseup', function () {
    resetTimer(); 
    });
    });

    