'use strict';

//-----------------------------------*\
// #ADMIN DASHBOARD JS
//\*-----------------------------------*/

class AdminDashboard {
  constructor() {
    this.data = this.loadData();
    this.currentSection = 'personal-info';
    this.init();
  }

  // Initialize the dashboard
  init() {
    this.setupNavigation();
    this.setupEventListeners();
    this.loadAllSections();
    this.showToast('Dashboard loaded successfully', 'success');
  }

  // Load data from localStorage or initialize with defaults
  loadData() {
    const savedData = localStorage.getItem('websiteData');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return this.getDefaultData();
  }

  // Get default data structure
  getDefaultData() {
    return {
      personalInfo: {
        name: 'Efracia R. Ager',
        title: 'Freelance Graphics Designer',
        image: './assets/images/IMG-20250215-WA0021.jpg',
        email: 'efraciaager2@gmail.com',
        phone: '+255 782 386 913',
        location: 'Arusha, Tanzania',
        socialLinks: [
          { platform: 'Instagram', url: 'https://www.instagram.com/edes.igner924/?igsh=YjFyaDU4eHFteG03#' }
        ]
      },
      about: {
        text1: 'I am a 22 year old freelance Graphics Designer based in Arusha, Tanzania. As a dedicated Freelance Graphics Designer, I bring a strong passion for visual communication. My expertise lies in creating compelling designs that empower businesses and individuals to establish a distinctive and impactful brand presence.',
        text2: 'My approach is to understand your vision and translate it into impactful visuals. Whether it\'s crafting a memorable logo, designing engaging marketing materials, or developing a cohesive brand identity, I am dedicated to delivering high quality, creative solutions. I enjoy turning complex ideas into simple, beautiful, and intuitive designs that resonate with the target audience.'
      },
      services: [
        {
          id: 1,
          icon: 'fas fa-palette',
          title: 'Branding & Identity',
          description: 'Logo design, brand style guides, business cards, letterheads, and full corporate identity packages.'
        },
        {
          id: 2,
          icon: 'fas fa-bullhorn',
          title: 'Marketing & Advertising Design',
          description: 'Eye-catching social media graphics, posters, flyers, brochures, catalogs, and effective banner ads.'
        },
        {
          id: 3,
          icon: 'fas fa-desktop',
          title: 'Digital Graphics',
          description: 'Professional graphics for websites, presentations, and various digital platforms.'
        },
        {
          id: 4,
          icon: 'fas fa-print',
          title: 'Print Design',
          description: 'High quality designs for print media, ensuring consistency across all materials.'
        }
      ],
      clients: [
        { id: 1, image: './assets/images/logo001.jpeg', alt: 'client logo 1' },
        { id: 2, image: './assets/images/logo002.jpeg', alt: 'client logo 2' },
        { id: 3, image: './assets/images/logo003.jpeg', alt: 'client logo 3' },
        { id: 4, image: './assets/images/logo004.jpeg', alt: 'client logo 4' },
        { id: 5, image: './assets/images/logo005.jpeg', alt: 'client logo 5' },
        { id: 6, image: './assets/images/logo006.jpeg', alt: 'client logo 6' }
      ],
      experience: [
        {
          id: 1,
          title: 'Freelance Graphics Designer',
          period: '2020 — Present',
          description: 'Successfully collaborated with multiple companies and individual clients on a variety of graphics design projects, including RUWASA, Golden Ballers, Olkereyan Ladha, and Ghumshadi Group of Companies (Zanzibar). Key service areas include:',
          details: [
            'Branding & Identity: Logo design, comprehensive brand style guides, business cards, and letterheads.',
            'Marketing & Advertising Design: Engaging social media graphics, impactful posters & flyers, informative brochures & catalogs, and professional banner ads.'
          ]
        }
      ],
      education: [
        {
          id: 1,
          title: 'Institute of Accountancy Arusha',
          period: '2022 — Currently',
          description: 'Bachelor Degree in Computer Science.'
        },
        {
          id: 2,
          title: 'Ilulu Girls Advanced Secondary School',
          period: '2020 — 2022',
          description: 'Advanced Level Education: Chemistry, Biology, and Geography.'
        },
        {
          id: 3,
          title: 'Kisota Secondary School',
          period: '2016 — 2019',
          description: 'Secondary Education: General Science.'
        },
        {
          id: 4,
          title: 'Minazini Primary School',
          period: '2009 — 2015',
          description: 'Primary Education.'
        }
      ],
      skills: [
        { id: 1, name: 'Graphics Design', percentage: 90 },
        { id: 2, name: 'Adobe Creative Suite (Photoshop, Illustrator, InDesign)', percentage: 85 }
      ],
      portfolio: {
        categories: ['All', 'Logos', 'Posters', 'Social', 'Others'],
        items: [
          { id: 1, title: 'Logo Design 1', category: 'Logos', image: './assets/images/port-1.jpeg' },
          { id: 2, title: 'Logo Design 2', category: 'Logos', image: './assets/images/port-2.jpeg' },
          { id: 3, title: 'Logo Design 3', category: 'Logos', image: './assets/images/port-3.jpeg' },
          { id: 4, title: 'Logo Design 4', category: 'Logos', image: './assets/images/port-4.jpeg' },
          { id: 5, title: 'Logo Design 5', category: 'Logos', image: './assets/images/port-5.jpeg' },
          { id: 6, title: 'Logo Design 6', category: 'Logos', image: './assets/images/port-6.jpeg' },
          { id: 7, title: 'Logo Design 7', category: 'Logos', image: './assets/images/port-7.jpeg' },
          { id: 8, title: 'Logo Design 8', category: 'Logos', image: './assets/images/port-8.jpeg' },
          { id: 9, title: 'Logo Design 9', category: 'Logos', image: './assets/images/port-9.jpeg' },
          { id: 10, title: 'Social Media 1', category: 'Social', image: './assets/images/port-15.jpeg' },
          { id: 11, title: 'Social Media 2', category: 'Social', image: './assets/images/port-16.jpeg' },
          { id: 12, title: 'Social Media 3', category: 'Social', image: './assets/images/port-17.jpeg' },
          { id: 13, title: 'Social Media 4', category: 'Social', image: './assets/images/port-18.jpeg' },
          { id: 14, title: 'Social Media 5', category: 'Social', image: './assets/images/port-19.jpeg' },
          { id: 15, title: 'Social Media 6', category: 'Social', image: './assets/images/port-20.jpeg' },
          { id: 16, title: 'Social Media 7', category: 'Social', image: './assets/images/port-21.jpeg' },
          { id: 17, title: 'Social Media 8', category: 'Social', image: './assets/images/port-001.jpeg' },
          { id: 18, title: 'Social Media 9', category: 'Social', image: './assets/images/port-002.jpeg' },
          { id: 19, title: 'Social Media 10', category: 'Social', image: './assets/images/port-003.jpeg' },
          { id: 20, title: 'Social Media 11', category: 'Social', image: './assets/images/port-004.jpeg' },
          { id: 21, title: 'Social Media 12', category: 'Social', image: './assets/images/port-0005.jpeg' },
          { id: 22, title: 'Poster Design 1', category: 'Posters', image: './assets/images/port-101.jpeg' },
          { id: 23, title: 'Poster Design 2', category: 'Posters', image: './assets/images/port-102.jpeg' },
          { id: 24, title: 'Poster Design 3', category: 'Posters', image: './assets/images/port-103.jpeg' },
          { id: 25, title: 'Poster Design 4', category: 'Posters', image: './assets/images/port-104.jpeg' },
          { id: 26, title: 'Poster Design 5', category: 'Posters', image: './assets/images/port-105.jpeg' },
          { id: 27, title: 'Poster Design 6', category: 'Posters', image: './assets/images/port-106.jpeg' },
          { id: 28, title: 'Poster Design 7', category: 'Posters', image: './assets/images/port-00111.jpeg' },
          { id: 29, title: 'Poster Design 8', category: 'Posters', image: './assets/images/port-00112.jpeg' },
          { id: 30, title: 'Other Project 1', category: 'Others', image: './assets/images/port-300.jpeg' },
          { id: 31, title: 'Other Project 2', category: 'Others', image: './assets/images/port-301.jpeg' },
          { id: 32, title: 'Other Project 3', category: 'Others', image: './assets/images/port-302.jpeg' },
          { id: 33, title: 'Other Project 4', category: 'Others', image: './assets/images/port-303.jpeg' },
          { id: 34, title: 'Other Project 5', category: 'Others', image: './assets/images/port-0011.jpeg' },
          { id: 35, title: 'Other Project 6', category: 'Others', image: './assets/images/port-0012.jpeg' }
        ]
      },
      contact: {
        mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d509970.8804078088!2d36.52870059700168!3d-3.386925304649585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18371dd5c6019077%3A0xbe94c62fe15a8013!2sArusha%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1716499200000!5m2!1sen!2sus',
        email: 'efraciaager2@gmail.com'
      },
      settings: {
        siteTitle: 'Efracia R. Ager - Freelance Graphics Designer',
        favicon: './assets/images/custosvg.jpg',
        enableContactForm: true
      }
    };
  }

  // Save data to localStorage
  saveData() {
    localStorage.setItem('websiteData', JSON.stringify(this.data));
    
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new CustomEvent('websiteDataUpdated'));
  }

  // Setup navigation
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;
        this.switchSection(section);
      });
    });
  }

  // Switch between sections
  switchSection(section) {
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === section) {
        link.classList.add('active');
      }
    });

    // Update active section
    document.querySelectorAll('.admin-section').forEach(sec => {
      sec.classList.remove('active');
    });
    document.getElementById(section).classList.add('active');
    this.currentSection = section;
  }

  // Setup event listeners
  setupEventListeners() {
    // Save all button
    document.getElementById('save-all-btn').addEventListener('click', () => {
      this.saveAllChanges();
    });

    // Preview button
    document.getElementById('preview-btn').addEventListener('click', () => {
      window.open('index.html', '_blank');
    });

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
      }
    });

    // Export data
    document.getElementById('export-data-btn').addEventListener('click', () => {
      this.exportData();
    });

    // Import data
    document.getElementById('import-data-btn').addEventListener('click', () => {
      document.getElementById('import-file').click();
    });

    document.getElementById('import-file').addEventListener('change', (e) => {
      this.importData(e.target.files[0]);
    });

    // Add item buttons
    document.getElementById('add-service-btn').addEventListener('click', () => this.addService());
    document.getElementById('add-client-btn').addEventListener('click', () => this.addClient());
    document.getElementById('add-experience-btn').addEventListener('click', () => this.addExperience());
    document.getElementById('add-education-btn').addEventListener('click', () => this.addEducation());
    document.getElementById('add-skill-btn').addEventListener('click', () => this.addSkill());
    document.getElementById('add-portfolio-btn').addEventListener('click', () => this.addPortfolioItem());
    document.getElementById('add-category-btn').addEventListener('click', () => this.addCategory());
    document.getElementById('add-social-link').addEventListener('click', () => this.addSocialLink());
  }

  // Load all sections
  loadAllSections() {
    this.loadPersonalInfo();
    this.loadAbout();
    this.loadServices();
    this.loadClients();
    this.loadResume();
    this.loadPortfolio();
    this.loadContact();
    this.loadSettings();
  }

  // Load Personal Info Section
  loadPersonalInfo() {
    const info = this.data.personalInfo;
    document.getElementById('profile-name').value = info.name;
    document.getElementById('profile-title').value = info.title;
    document.getElementById('profile-image').value = info.image;
    document.getElementById('profile-email').value = info.email;
    document.getElementById('profile-phone').value = info.phone;
    document.getElementById('profile-location').value = info.location;

    // Load social links
    const container = document.getElementById('social-links-container');
    container.innerHTML = '';
    info.socialLinks.forEach((link, index) => {
      container.appendChild(this.createSocialLinkItem(link, index));
    });

    // Add input listeners
    ['profile-name', 'profile-title', 'profile-image', 'profile-email', 'profile-phone', 'profile-location'].forEach(id => {
      document.getElementById(id).addEventListener('input', () => this.updatePersonalInfo());
    });
  }

  createSocialLinkItem(link, index) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <h4>Social Link ${index + 1}</h4>
        <div class="item-card-actions">
          <button class="btn btn-danger btn-sm" onclick="admin.removeSocialLink(${index})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="item-card-body">
        <div class="form-group">
          <label>Platform</label>
          <input type="text" class="form-control" value="${link.platform}" oninput="admin.updateSocialLink(${index}, 'platform', this.value)">
        </div>
        <div class="form-group">
          <label>URL</label>
          <input type="url" class="form-control" value="${link.url}" oninput="admin.updateSocialLink(${index}, 'url', this.value)">
        </div>
      </div>
    `;
    return div;
  }

  addSocialLink() {
    this.data.personalInfo.socialLinks.push({ platform: 'New Platform', url: '' });
    this.loadPersonalInfo();
    this.saveData();
    this.showToast('Social link added', 'success');
  }

  removeSocialLink(index) {
    this.data.personalInfo.socialLinks.splice(index, 1);
    this.loadPersonalInfo();
    this.saveData();
    this.showToast('Social link removed', 'success');
  }

  updateSocialLink(index, field, value) {
    this.data.personalInfo.socialLinks[index][field] = value;
    this.saveData();
  }

  updatePersonalInfo() {
    this.data.personalInfo = {
      name: document.getElementById('profile-name').value,
      title: document.getElementById('profile-title').value,
      image: document.getElementById('profile-image').value,
      email: document.getElementById('profile-email').value,
      phone: document.getElementById('profile-phone').value,
      location: document.getElementById('profile-location').value,
      socialLinks: this.data.personalInfo.socialLinks
    };
    this.saveData();
  }

  // Load About Section
  loadAbout() {
    document.getElementById('about-text-1').value = this.data.about.text1;
    document.getElementById('about-text-2').value = this.data.about.text2;

    document.getElementById('about-text-1').addEventListener('input', () => {
      this.data.about.text1 = document.getElementById('about-text-1').value;
      this.saveData();
    });

    document.getElementById('about-text-2').addEventListener('input', () => {
      this.data.about.text2 = document.getElementById('about-text-2').value;
      this.saveData();
    });
  }

  // Load Services Section
  loadServices() {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
    
    if (this.data.services.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><p>No services added yet</p></div>';
      return;
    }

    this.data.services.forEach(service => {
      container.appendChild(this.createServiceCard(service));
    });
  }

  createServiceCard(service) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <h4>${service.title}</h4>
        <div class="item-card-actions">
          <button class="btn btn-danger btn-sm" onclick="admin.removeService(${service.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="item-card-body">
        <div class="form-group">
          <label>Icon Class (Font Awesome)</label>
          <input type="text" class="form-control" value="${service.icon}" oninput="admin.updateService(${service.id}, 'icon', this.value)">
        </div>
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" value="${service.title}" oninput="admin.updateService(${service.id}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" rows="3" oninput="admin.updateService(${service.id}, 'description', this.value)">${service.description}</textarea>
        </div>
      </div>
    `;
    return div;
  }

  addService() {
    const newId = Math.max(...this.data.services.map(s => s.id), 0) + 1;
    this.data.services.push({
      id: newId,
      icon: 'fas fa-star',
      title: 'New Service',
      description: 'Service description here'
    });
    this.loadServices();
    this.saveData();
    this.showToast('Service added', 'success');
  }

  removeService(id) {
    this.data.services = this.data.services.filter(s => s.id !== id);
    this.loadServices();
    this.saveData();
    this.showToast('Service removed', 'success');
  }

  updateService(id, field, value) {
    const service = this.data.services.find(s => s.id === id);
    if (service) {
      service[field] = value;
      this.saveData();
    }
  }

  // Load Clients Section
  loadClients() {
    const container = document.getElementById('clients-container');
    container.innerHTML = '';
    
    if (this.data.clients.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-building"></i><p>No clients added yet</p></div>';
      return;
    }

    this.data.clients.forEach(client => {
      container.appendChild(this.createClientCard(client));
    });
  }

  createClientCard(client) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <h4>Client Logo ${client.id}</h4>
        <div class="item-card-actions">
          <button class="btn btn-danger btn-sm" onclick="admin.removeClient(${client.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="item-card-body">
        <div class="form-group">
          <label>Image Upload</label>
          <input type="file" class="form-control" accept="image/*" onchange="admin.handleClientImageUpload(${client.id}, this)" style="padding: 0.5rem;">
          <small style="color: var(--light-gray-70); margin-top: 0.5rem; display: block;">Or enter image URL below</small>
        </div>
        <div class="form-group">
          <label>Image URL</label>
          <input type="text" class="form-control" value="${client.image}" oninput="admin.updateClient(${client.id}, 'image', this.value)" placeholder="./assets/images/logo001.jpeg">
          <img src="${client.image}" class="image-preview" alt="Preview" onerror="this.style.display='none'">
        </div>
        <div class="form-group">
          <label>Alt Text</label>
          <input type="text" class="form-control" value="${client.alt}" oninput="admin.updateClient(${client.id}, 'alt', this.value)">
        </div>
      </div>
    `;
    return div;
  }

  // Handle client image upload
  async handleClientImageUpload(clientId, fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showToast('Please select an image file', 'error');
      return;
    }

    // Show loading
    this.showToast('Uploading image...', 'info');

    try {
      // Try to save file via server first (if available)
      const filePath = await this.saveImageFile(file, `client-${clientId}-${file.name}`);
      
      if (filePath) {
        // Server saved the file - use the file path
        this.updateClient(clientId, 'image', filePath);
        this.showToast('Image uploaded and saved to server!', 'success');
      } else {
        // No server - convert to base64 for localStorage
        const base64 = await this.fileToBase64(file);
        this.updateClient(clientId, 'image', base64);
        this.showToast('Image uploaded! (saved as base64)', 'success');
      }
      
      // Update preview
      const preview = fileInput.closest('.item-card-body').querySelector('.image-preview');
      if (preview) {
        const imageSrc = filePath || await this.fileToBase64(file);
        preview.src = imageSrc;
        preview.style.display = 'block';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      this.showToast('Error uploading image', 'error');
    }
  }

  addClient() {
    const newId = Math.max(...this.data.clients.map(c => c.id), 0) + 1;
    this.data.clients.push({
      id: newId,
      image: './assets/images/logo001.jpeg',
      alt: `client logo ${newId}`
    });
    this.loadClients();
    this.saveData();
    this.showToast('Client logo added', 'success');
  }

  removeClient(id) {
    this.data.clients = this.data.clients.filter(c => c.id !== id);
    this.loadClients();
    this.saveData();
    this.showToast('Client logo removed', 'success');
  }

  updateClient(id, field, value) {
    const client = this.data.clients.find(c => c.id === id);
    if (client) {
      client[field] = value;
      this.saveData();
    }
  }

  // Load Resume Section
  loadResume() {
    this.loadExperience();
    this.loadEducation();
    this.loadSkills();
  }

  loadExperience() {
    const container = document.getElementById('experience-container');
    container.innerHTML = '';
    
    if (this.data.experience.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-briefcase"></i><p>No experience added yet</p></div>';
      return;
    }

    this.data.experience.forEach(exp => {
      container.appendChild(this.createExperienceCard(exp));
    });
  }

  createExperienceCard(exp) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <h4>${exp.title}</h4>
        <div class="item-card-actions">
          <button class="btn btn-danger btn-sm" onclick="admin.removeExperience(${exp.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="item-card-body">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" value="${exp.title}" oninput="admin.updateExperience(${exp.id}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Period</label>
          <input type="text" class="form-control" value="${exp.period}" oninput="admin.updateExperience(${exp.id}, 'period', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" rows="3" oninput="admin.updateExperience(${exp.id}, 'description', this.value)">${exp.description || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Details (one per line)</label>
          <textarea class="form-control" rows="4" oninput="admin.updateExperienceDetails(${exp.id}, this.value)">${(exp.details || []).join('\n')}</textarea>
        </div>
      </div>
    `;
    return div;
  }

  addExperience() {
    const newId = Math.max(...this.data.experience.map(e => e.id), 0) + 1;
    this.data.experience.push({
      id: newId,
      title: 'New Experience',
      period: '2020 — Present',
      description: '',
      details: []
    });
    this.loadExperience();
    this.saveData();
    this.showToast('Experience added', 'success');
  }

  removeExperience(id) {
    this.data.experience = this.data.experience.filter(e => e.id !== id);
    this.loadExperience();
    this.saveData();
    this.showToast('Experience removed', 'success');
  }

  updateExperience(id, field, value) {
    const exp = this.data.experience.find(e => e.id === id);
    if (exp) {
      exp[field] = value;
      this.saveData();
    }
  }

  updateExperienceDetails(id, value) {
    const exp = this.data.experience.find(e => e.id === id);
    if (exp) {
      exp.details = value.split('\n').filter(d => d.trim());
      this.saveData();
    }
  }

  loadEducation() {
    const container = document.getElementById('education-container');
    container.innerHTML = '';
    
    if (this.data.education.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-graduation-cap"></i><p>No education added yet</p></div>';
      return;
    }

    this.data.education.forEach(edu => {
      container.appendChild(this.createEducationCard(edu));
    });
  }

  createEducationCard(edu) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <h4>${edu.title}</h4>
        <div class="item-card-actions">
          <button class="btn btn-danger btn-sm" onclick="admin.removeEducation(${edu.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="item-card-body">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" value="${edu.title}" oninput="admin.updateEducation(${edu.id}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Period</label>
          <input type="text" class="form-control" value="${edu.period}" oninput="admin.updateEducation(${edu.id}, 'period', this.value)">
        </div>
        <div class="form-group">
          <label>Description</label>
          <textarea class="form-control" rows="3" oninput="admin.updateEducation(${edu.id}, 'description', this.value)">${edu.description}</textarea>
        </div>
      </div>
    `;
    return div;
  }

  addEducation() {
    const newId = Math.max(...this.data.education.map(e => e.id), 0) + 1;
    this.data.education.push({
      id: newId,
      title: 'New Education',
      period: '2020 — 2024',
      description: 'Education description here'
    });
    this.loadEducation();
    this.saveData();
    this.showToast('Education added', 'success');
  }

  removeEducation(id) {
    this.data.education = this.data.education.filter(e => e.id !== id);
    this.loadEducation();
    this.saveData();
    this.showToast('Education removed', 'success');
  }

  updateEducation(id, field, value) {
    const edu = this.data.education.find(e => e.id === id);
    if (edu) {
      edu[field] = value;
      this.saveData();
    }
  }

  loadSkills() {
    const container = document.getElementById('skills-container');
    container.innerHTML = '';
    
    if (this.data.skills.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-chart-bar"></i><p>No skills added yet</p></div>';
      return;
    }

    this.data.skills.forEach(skill => {
      container.appendChild(this.createSkillCard(skill));
    });
  }

  createSkillCard(skill) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <h4>${skill.name}</h4>
        <div class="item-card-actions">
          <button class="btn btn-danger btn-sm" onclick="admin.removeSkill(${skill.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="item-card-body">
        <div class="form-group">
          <label>Skill Name</label>
          <input type="text" class="form-control" value="${skill.name}" oninput="admin.updateSkill(${skill.id}, 'name', this.value)">
        </div>
        <div class="form-group">
          <label>Percentage (0-100)</label>
          <input type="number" class="form-control" min="0" max="100" value="${skill.percentage}" oninput="admin.updateSkill(${skill.id}, 'percentage', parseInt(this.value))">
        </div>
      </div>
    `;
    return div;
  }

  addSkill() {
    const newId = Math.max(...this.data.skills.map(s => s.id), 0) + 1;
    this.data.skills.push({
      id: newId,
      name: 'New Skill',
      percentage: 50
    });
    this.loadSkills();
    this.saveData();
    this.showToast('Skill added', 'success');
  }

  removeSkill(id) {
    this.data.skills = this.data.skills.filter(s => s.id !== id);
    this.loadSkills();
    this.saveData();
    this.showToast('Skill removed', 'success');
  }

  updateSkill(id, field, value) {
    const skill = this.data.skills.find(s => s.id === id);
    if (skill) {
      skill[field] = value;
      this.saveData();
    }
  }

  // Load Portfolio Section
  loadPortfolio() {
    this.loadCategories();
    this.loadPortfolioItems();
  }

  loadCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    this.data.portfolio.categories.forEach(category => {
      const div = document.createElement('div');
      div.className = 'item-card';
      div.innerHTML = `
        <div class="item-card-header">
          <h4>${category}</h4>
          <div class="item-card-actions">
            ${category !== 'All' ? `<button class="btn btn-danger btn-sm" onclick="admin.removeCategory('${category}')"><i class="fas fa-trash"></i></button>` : ''}
          </div>
        </div>
      `;
      container.appendChild(div);
    });
  }

  addCategory() {
    const category = prompt('Enter category name:');
    if (category && !this.data.portfolio.categories.includes(category)) {
      this.data.portfolio.categories.push(category);
      this.loadCategories();
      this.saveData();
      this.showToast('Category added', 'success');
    }
  }

  removeCategory(category) {
    if (confirm(`Are you sure you want to remove "${category}"? All portfolio items in this category will be moved to "Others".`)) {
      this.data.portfolio.categories = this.data.portfolio.categories.filter(c => c !== category);
      this.data.portfolio.items.forEach(item => {
        if (item.category === category) {
          item.category = 'Others';
        }
      });
      this.loadCategories();
      this.loadPortfolioItems();
      this.saveData();
      this.showToast('Category removed', 'success');
    }
  }

  loadPortfolioItems() {
    const container = document.getElementById('portfolio-container');
    container.innerHTML = '';
    
    if (this.data.portfolio.items.length === 0) {
      container.innerHTML = '<div class="empty-state"><i class="fas fa-images"></i><p>No portfolio items added yet</p></div>';
      return;
    }

    this.data.portfolio.items.forEach(item => {
      container.appendChild(this.createPortfolioCard(item));
    });
  }

  createPortfolioCard(item) {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <div class="item-card-header">
        <h4>${item.title}</h4>
        <div class="item-card-actions">
          <button class="btn btn-danger btn-sm" onclick="admin.removePortfolioItem(${item.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
      <div class="item-card-body">
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" value="${item.title}" oninput="admin.updatePortfolioItem(${item.id}, 'title', this.value)">
        </div>
        <div class="form-group">
          <label>Category</label>
          <select class="form-control" onchange="admin.updatePortfolioItem(${item.id}, 'category', this.value)">
            ${this.data.portfolio.categories.map(cat => 
              `<option value="${cat}" ${cat === item.category ? 'selected' : ''}>${cat}</option>`
            ).join('')}
          </select>
        </div>
        <div class="form-group">
          <label>Image Upload</label>
          <input type="file" class="form-control" accept="image/*" onchange="admin.handlePortfolioImageUpload(${item.id}, this)" style="padding: 0.5rem;">
          <small style="color: var(--light-gray-70); margin-top: 0.5rem; display: block;">Or enter image URL below</small>
        </div>
        <div class="form-group">
          <label>Image URL</label>
          <input type="text" class="form-control" value="${item.image}" oninput="admin.updatePortfolioItem(${item.id}, 'image', this.value)" placeholder="./assets/images/port-1.jpeg">
          <img src="${item.image}" class="image-preview" alt="Preview" onerror="this.style.display='none'">
        </div>
      </div>
    `;
    return div;
  }

  // Handle portfolio image upload
  async handlePortfolioImageUpload(itemId, fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      this.showToast('Please select an image file', 'error');
      return;
    }

    // Show loading
    this.showToast('Uploading image...', 'info');

    try {
      // Try to save file via server first (if available)
      const filePath = await this.saveImageFile(file, `portfolio-${itemId}-${file.name}`);
      
      if (filePath) {
        // Server saved the file - use the file path
        this.updatePortfolioItem(itemId, 'image', filePath);
        this.showToast('Image uploaded and saved to server!', 'success');
      } else {
        // No server - convert to base64 for localStorage
        const base64 = await this.fileToBase64(file);
        this.updatePortfolioItem(itemId, 'image', base64);
        this.showToast('Image uploaded! (saved as base64)', 'success');
      }
      
      // Update preview
      const preview = fileInput.closest('.item-card-body').querySelector('.image-preview');
      if (preview) {
        const imageSrc = filePath || await this.fileToBase64(file);
        preview.src = imageSrc;
        preview.style.display = 'block';
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      this.showToast('Error uploading image', 'error');
    }
  }

  // Convert file to base64
  fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // Save image file via server if available
  async saveImageFile(file, filename) {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('filename', filename);

      const response = await fetch('http://localhost:3001/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Image saved to server:', result.path);
        // Update the image URL to use the saved file path instead of base64
        return result.path;
      }
    } catch (error) {
      // Server not running - that's okay, base64 is stored in localStorage
      console.log('Server not available, using base64 storage');
    }
    return null;
  }

  addPortfolioItem() {
    const newId = Math.max(...this.data.portfolio.items.map(p => p.id), 0) + 1;
    this.data.portfolio.items.push({
      id: newId,
      title: 'New Portfolio Item',
      category: 'Others',
      image: './assets/images/port-1.jpeg'
    });
    this.loadPortfolioItems();
    this.saveData();
    this.showToast('Portfolio item added', 'success');
  }

  removePortfolioItem(id) {
    this.data.portfolio.items = this.data.portfolio.items.filter(p => p.id !== id);
    this.loadPortfolioItems();
    this.saveData();
    this.showToast('Portfolio item removed', 'success');
  }

  updatePortfolioItem(id, field, value) {
    const item = this.data.portfolio.items.find(p => p.id === id);
    if (item) {
      item[field] = value;
      this.saveData();
    }
  }

  // Load Contact Section
  loadContact() {
    document.getElementById('map-embed').value = this.data.contact.mapEmbed;
    document.getElementById('contact-email').value = this.data.contact.email;

    document.getElementById('map-embed').addEventListener('input', () => {
      this.data.contact.mapEmbed = document.getElementById('map-embed').value;
      this.saveData();
    });

    document.getElementById('contact-email').addEventListener('input', () => {
      this.data.contact.email = document.getElementById('contact-email').value;
      this.saveData();
    });
  }

  // Load Settings Section
  loadSettings() {
    document.getElementById('site-title').value = this.data.settings.siteTitle;
    document.getElementById('favicon').value = this.data.settings.favicon;
    document.getElementById('enable-contact-form').checked = this.data.settings.enableContactForm;

    document.getElementById('site-title').addEventListener('input', () => {
      this.data.settings.siteTitle = document.getElementById('site-title').value;
      this.saveData();
    });

    document.getElementById('favicon').addEventListener('input', () => {
      this.data.settings.favicon = document.getElementById('favicon').value;
      this.saveData();
    });

    document.getElementById('enable-contact-form').addEventListener('change', () => {
      this.data.settings.enableContactForm = document.getElementById('enable-contact-form').checked;
      this.saveData();
    });
  }

  // Save all changes
  async saveAllChanges() {
    this.showLoading();
    this.saveData(); // Always save to localStorage first
    
    // Try to save via local server (writes to website-data.json) - optional
    const savedViaServer = await this.saveToLocalServer();
    
    setTimeout(() => {
      this.hideLoading();
      if (savedViaServer) {
        this.showToast('✅ All changes saved! File updated. Refresh website to see changes.', 'success');
      } else {
        // Just localStorage - works immediately!
        this.showToast('✅ Changes saved! Refresh website (index.html) to see updates immediately!', 'success');
      }
    }, 500);
    
    // Don't download file if server is available or if we're using localStorage
    if (!savedViaServer) {
      // Only download if user explicitly wants a backup
      // Commented out - user doesn't need to download anymore
      // this.exportDataToFile();
    }
  }

  // Save to local server (simpler workflow)
  async saveToLocalServer() {
    try {
      const response = await fetch('http://localhost:3001/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.data)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('✅ Data saved via local server:', result.message);
        return true;
      }
    } catch (error) {
      // Server not running - that's okay, will use file download
      console.log('💡 Local server not running. Start it with: node server.js');
      return false;
    }
    return false;
  }

  // Export data to file for sync script (fallback)
  exportDataToFile() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Update website HTML file
  updateWebsite() {
    // This would typically require a backend API
    // For now, we'll just save the data and show a message
    console.log('Website data updated:', this.data);
    // Use the sync-website.py script to update index.html
    // Run: python3 sync-website.py
  }

  // Export data
  exportData() {
    const dataStr = JSON.stringify(this.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'website-data.json';
    link.click();
    URL.revokeObjectURL(url);
    this.showToast('Data exported successfully', 'success');
  }

  // Import data
  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        this.data = importedData;
        this.saveData();
        this.loadAllSections();
        this.showToast('Data imported successfully', 'success');
      } catch (error) {
        this.showToast('Error importing data: Invalid JSON', 'error');
      }
    };
    reader.readAsText(file);
  }

  // Show toast notification
  showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // Show loading overlay
  showLoading() {
    document.getElementById('loading-overlay').classList.add('show');
  }

  // Hide loading overlay
  hideLoading() {
    document.getElementById('loading-overlay').classList.remove('show');
  }
}

// Initialize admin dashboard
const admin = new AdminDashboard();

