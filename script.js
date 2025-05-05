document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');

        // Toggle hamburger icon to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));

        // When the first and third spans are active, transform them into an X
        if (spans[0].classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Tab Switching Functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = {
        'upcoming': document.getElementById('upcoming-content'),
        'results': document.getElementById('results-content'),
        'standings': document.getElementById('standings-content')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to the clicked tab
            this.classList.add('active');

            // Hide all tab contents
            Object.values(tabContents).forEach(content => {
                content.style.display = 'none';
            });

            // Show the corresponding tab content
            const tabId = this.getAttribute('data-tab');
            tabContents[tabId].style.display = 'block';
        });
    });

    // Current Time Display
    const updateTime = () => {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        const timeString = now.toLocaleDateString(undefined, options);
        document.getElementById('current-time').textContent = timeString;
    };

    updateTime();
    setInterval(updateTime, 60000); // Update every minute

    // Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value) {
                alert(`Thank you for subscribing with: ${emailInput.value}`);
                emailInput.value = '';
            }
        });
    }

    // Add animation to match cards on scroll
    const matchCards = document.querySelectorAll('.match-card');

    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const animateOnScroll = () => {
        matchCards.forEach(card => {
            if (isElementInViewport(card)) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animation
    matchCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Call once on load
    animateOnScroll();

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);

    // Watch live button functionality
    const watchLiveBtn = document.querySelector('.btn-watch');
    if (watchLiveBtn) {
        watchLiveBtn.addEventListener('click', function() {
            alert('Live streaming feature coming soon!');
        });
    }
});