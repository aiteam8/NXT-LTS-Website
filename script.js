// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const observerScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove 'active' from all nav links
                navItems.forEach(link => {
                    link.classList.remove('active');
                });
                // Add 'active' to the matching link
                const matchingLink = document.querySelector(`a[href="#${id}"]`);
                if (matchingLink) {
                    matchingLink.classList.add('active');
                }
            }
        });
    },
    {
        threshold: 0.6 // Only trigger when 60% of the section is in view
    }
);

sections.forEach(section => observerScroll.observe(section));


// Form Submission
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    const data = Object.fromEntries(formData);

    // Send data to backend
    console.log('Form submitted:', data);
    
    alert('Thank you for your message! We will get back to you shortly.');
    contactForm.reset();
});


// Cards appearing when they get into view
const observerCards = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }else{
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)'
        }
    });
}, {threshold: 0.5});

document.querySelectorAll('.service-card, .highlight-card, .price-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observerCards.observe(card);
});
