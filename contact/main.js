document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.spinner-border');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!contactForm.checkValidity()) {
            e.stopPropagation();
            contactForm.classList.add('was-validated');
            return;
        }

        // Show loading state
        buttonText.textContent = 'Sending...';
        spinner.classList.remove('d-none');
        submitButton.disabled = true;

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success simulation
            showAlert('Message sent successfully!', 'success');
            contactForm.reset();
            contactForm.classList.remove('was-validated');

            // Reset button state
            buttonText.textContent = 'Send Message';
            spinner.classList.add('d-none');
            submitButton.disabled = false;
        }, 2000);
    });

    // Alert function
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;

        contactForm.parentElement.insertBefore(alertDiv, contactForm);

        // Auto dismiss after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
});
// Back to Top Button
document.addEventListener('DOMContentLoaded', function () {
    const backToTopButton = document.getElementById('backToTop');

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Contact page script
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent default form behavior

            if (this.checkValidity()) {
                // Collect form data
                const formData = new FormData(this);
                handleContactSubmit(formData);
            } else {
                this.classList.add('was-validated');
            }
        });
    }

    function handleContactSubmit(formData) {
        // Process contact form submission
        console.log('Contact form submitted:', Object.fromEntries(formData));
        contactForm.reset();
        contactForm.classList.remove('was-validated');
        showSuccessMessage('Your message has been sent successfully!');
    }

    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success mt-3';
        alert.textContent = message;
        contactForm.insertAdjacentElement('beforebegin', alert);

        setTimeout(() => alert.remove(), 3000);
    }
});