document.addEventListener('DOMContentLoaded', function() {
    // Parallax effect
    const parallaxElements = document.querySelectorAll('.parallax-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.backgroundPositionY = yPos + 'px';
            
            // Fade effect on sections
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const fadeStart = elementTop - window.innerHeight;
            const fadeEnd = elementTop - (window.innerHeight / 2);
            const opacity = Math.min(1, Math.max(0, (scrolled - fadeStart) / (fadeEnd - fadeStart)));
            element.style.opacity = opacity;
        });
    });

		// Animation boxes
		const animationBoxes = document.querySelectorAll('.animation-box');

		animationBoxes.forEach(box => {
			box.addEventListener('click', function() {
				const animation = this.getAttribute('animation');
				const content = this.querySelector('.animation-content');
				
				// Remove any existing animation classes
				content.classList.remove('rotate-animation', 'scale-animation', 'slide-animation', 'bounce-animation');
				
				// Force a reflow to ensure the animation plays again even if the same button is clicked
				void content.offsetWidth;
				
				// Add the new animation class
				content.classList.add(`${animation}-animation`);
				
				// Optional: Remove the animation class when it's complete
				content.addEventListener('animationend', function() {
					content.classList.remove(`${animation}-animation`);
				}, { once: true });
			});

			// Simple hover effect
			box.addEventListener('mouseover', function() {
				this.style.transform = 'translateY(-5px)';
				this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
			});

			box.addEventListener('mouseout', function() {
				this.style.transform = 'translateY(0)';
				this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
			});
		});

    // Event handling demo
    const eventDemo = document.getElementById('event-demo');
    const logContent = document.getElementById('log-content');
    let logCount = 0;
    const maxLogs = 8;

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createRipple(event) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        const rect = eventDemo.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = event.clientX - rect.left - size/2 + 'px';
        ripple.style.top = event.clientY - rect.top - size/2 + 'px';
        eventDemo.appendChild(ripple);
        setTimeout(() => ripple.remove(), 1000);
    }

    function logEvent(event) {
        const timestamp = new Date().toLocaleTimeString();
        const color = getRandomColor();
        const message = `
            <div class="log-entry" style="border-left: 3px solid ${color}">
                <span class="log-time">${timestamp}</span>
                <span class="log-type">${event.type}</span>
            </div>
        `;
        
        if (logCount >= maxLogs) {
            const entries = logContent.querySelectorAll('.log-entry');
            entries[entries.length - 1].remove();
        } else {
            logCount++;
        }
        
        logContent.insertAdjacentHTML('afterbegin', message);
        eventDemo.style.backgroundColor = color;
    }

    // Event listeners
    eventDemo.addEventListener('mouseover', logEvent);
    eventDemo.addEventListener('mouseout', logEvent);
    eventDemo.addEventListener('click', (e) => {
        createRipple(e);
        logEvent(e);
    });
    eventDemo.addEventListener('mousedown', logEvent);
    eventDemo.addEventListener('mouseup', logEvent);

    // Back to Top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.classList.add('back-to-top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fade-in animations on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFade);
    checkFade(); // Check on initial load
});