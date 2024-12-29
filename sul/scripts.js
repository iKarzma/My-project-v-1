document.addEventListener('DOMContentLoaded', function () {
  // Solutions data
  const solutions = [
    {
      id: 1,
      title: "Home Security",
      icon: "fa-house-lock",
      image: "../img/home-security.jpg",
      description: "Comprehensive home security solutions to protect your family and property",
      features: [
        "24/7 Monitoring",
        "Smart Home Integration",
        "Mobile App Control",
        "Video Surveillance",
        "Door & Window Sensors"
      ],
      details: "Our home security solutions provide complete peace of mind with advanced technology and professional monitoring services."
    },
    {
      id: 2,
      title: "Business Security",
      icon: "fa-building-shield",
      image: "../img/business-security.jpg",
      description: "Advanced security systems for businesses of all sizes",
      features: [
        "Access Control",
        "CCTV Systems",
        "Intrusion Detection",
        "Employee Management",
        "Asset Protection"
      ],
      details: "Protect your business with state-of-the-art security systems designed for commercial applications."
    },
    {
      id: 3,
      title: "Smart Integration",
      icon: "fa-mobile-screen-button",
      image: "../img/smart-integration.jpg",
      description: "Seamless integration of security with smart home technology",
      features: [
        "Voice Control",
        "Automated Schedules",
        "Remote Access",
        "Energy Management",
        "Custom Automation"
      ],
      details: "Experience the future of security with smart integration that puts control at your fingertips."
    },
    {
      id: 4,
      title: "Video Surveillance",
      icon: "fa-video",
      image: "../img/video-surveillance.jpg",
      description: "Professional video monitoring and recording solutions",
      features: [
        "HD Cameras",
        "Night Vision",
        "Cloud Storage",
        "Motion Detection",
        "Live Streaming"
      ],
      details: "Keep an eye on your property with advanced video surveillance systems that provide crystal-clear footage and smart detection."
    }
  ];

  // Render solutions
  const solutionsGrid = document.getElementById('solutionsGrid');

  solutions.forEach(solution => {
    const solutionCard = `
            <div class="col-lg-3 col-md-6">
                <div class="card solution-card h-100">
                    <div class="card-body text-center">
                        <i class="fas ${solution.icon} solution-icon"></i>
                        <h5 class="card-title">${solution.title}</h5>
                        <p class="card-text">${solution.description}</p>
                        <button class="btn btn-primary" onclick="showSolutionDetails(${solution.id})">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        `;
    solutionsGrid.insertAdjacentHTML('beforeend', solutionCard);
  });

  // Show solution details
  window.showSolutionDetails = function (solutionId) {
    const solution = solutions.find(s => s.id === solutionId);
    if (!solution) return;

    const modal = new bootstrap.Modal(document.getElementById('solutionModal'));
    const modalBody = document.querySelector('#solutionModal .modal-body');

    modalBody.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <img src="${solution.image}" class="img-fluid modal-img" alt="${solution.title}">
                </div>
                <div class="col-md-6">
                    <h4>${solution.title}</h4>
                    <p>${solution.details}</p>
                    <h5>Key Features:</h5>
                    <ul class="features-list">
                        ${solution.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                    <button class="btn btn-primary mt-3" onclick="scrollToContact()">
                        Request Consultation
                    </button>
                </div>
            </div>
        `;

    modal.show();
  };

  // Scroll to contact form
  window.scrollToContact = function () {
    const modal = bootstrap.Modal.getInstance(document.getElementById('solutionModal'));
    if (modal) {
      modal.hide();
    }
    document.querySelector('.contact-section').scrollIntoView({ behavior: 'smooth' });
  };

  // Form validation
  const form = document.getElementById('consultationForm');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!form.checkValidity()) {
      event.stopPropagation();
    } else {
      // Show success message
      alert('Thank you for your request! We will contact you soon.');
      form.reset();
    }
    form.classList.add('was-validated');
  });
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
// Solutions page script
document.addEventListener('DOMContentLoaded', function () {
  // Solutions filters with preventDefault
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent default button behavior
      filterSolutions(this.dataset.filter);
    });
  });

  // Consultation form with preventDefault
  const consultationForm = document.getElementById('consultationForm');
  if (consultationForm) {
    consultationForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent default form behavior

      if (this.checkValidity()) {
        const formData = new FormData(this);
        handleConsultationSubmit(formData);
      } else {
        this.classList.add('was-validated');
      }
    });
  }

  function handleConsultationSubmit(formData) {
    // Process consultation form submission
    console.log('Consultation form submitted:', Object.fromEntries(formData));
    consultationForm.reset();
    consultationForm.classList.remove('was-validated');
    showSuccessMessage('Your consultation request has been sent successfully!');
  }

  function showSuccessMessage(message) {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success mt-3';
    alert.textContent = message;
    consultationForm.insertAdjacentElement('beforebegin', alert);

    setTimeout(() => alert.remove(), 3000);
  }
});