'use strict';

/**
 * Website Data Loader
 * Dynamically loads website content from JSON file
 * This works with Vercel deployment
 */

class WebsiteLoader {
  constructor() {
    this.data = null;
    this.init();
  }

  async init() {
    try {
      // Load data from localStorage or JSON file
      await this.loadData();
      // Apply data to website
      this.applyData();
      
      // Listen for storage events (when admin saves changes in another tab/window)
      window.addEventListener('storage', (e) => {
        if (e.key === 'websiteData') {
          console.log('🔄 Data updated in admin, reloading...');
          this.loadData().then(() => {
            this.applyData();
          });
        }
      });
      
      // Also listen for custom event (same window/tab)
      window.addEventListener('websiteDataUpdated', () => {
        console.log('🔄 Data updated, reloading...');
        this.loadData().then(() => {
          this.applyData();
        });
      });
    } catch (error) {
      console.error('Error loading website data:', error);
      // Fallback to default content if JSON fails to load
    }
  }

  async loadData() {
    try {
      // First, try to load from localStorage (always works, even with file://)
      const savedData = localStorage.getItem('websiteData');
      if (savedData) {
        console.log('✅ Loaded data from localStorage');
        this.data = JSON.parse(savedData);
        return;
      }
      
      // If no localStorage, try to load from website-data.json file
      const response = await fetch('./website-data.json');
      if (response.ok) {
        const fileData = await response.json();
        console.log('✅ Loaded data from website-data.json');
        // Also save to localStorage for faster future loads
        localStorage.setItem('websiteData', JSON.stringify(fileData));
        this.data = fileData;
      } else {
        console.warn('⚠️ website-data.json not found, using default content');
      }
    } catch (error) {
      console.warn('⚠️ Could not load website-data.json:', error.message);
      // Last resort: try localStorage again
      const savedData = localStorage.getItem('websiteData');
      if (savedData) {
        console.log('✅ Loaded data from localStorage (fallback)');
        this.data = JSON.parse(savedData);
      }
    }
  }

  applyData() {
    if (!this.data) return;

    // Apply personal info
    if (this.data.personalInfo) {
      this.applyPersonalInfo(this.data.personalInfo);
    }

    // Apply about section
    if (this.data.about) {
      this.applyAbout(this.data.about);
    }

    // Apply services
    if (this.data.services) {
      this.applyServices(this.data.services);
    }

    // Apply clients
    if (this.data.clients) {
      this.applyClients(this.data.clients);
    }

    // Apply resume
    if (this.data.experience || this.data.education || this.data.skills) {
      this.applyResume(this.data);
    }

    // Apply portfolio
    if (this.data.portfolio) {
      this.applyPortfolio(this.data.portfolio);
    }

    // Apply contact
    if (this.data.contact) {
      this.applyContact(this.data.contact);
    }

    // Apply settings
    if (this.data.settings) {
      this.applySettings(this.data.settings);
    }
  }

  applyPersonalInfo(info) {
    // Update title
    if (info.name) {
      document.title = `${info.name} - ${info.title || 'Portfolio'}`;
      const nameEl = document.querySelector('.name');
      if (nameEl) {
        nameEl.textContent = info.name;
        nameEl.setAttribute('title', info.name);
      }
    }

    // Update job title
    if (info.title) {
      const titleEl = document.querySelector('.sidebar .title');
      if (titleEl) titleEl.textContent = info.title;
    }

    // Update profile image
    if (info.image) {
      const imgEl = document.querySelector('.avatar-box img');
      if (imgEl) {
        imgEl.src = info.image;
        imgEl.alt = info.name || 'Profile';
      }
    }

    // Update email
    if (info.email) {
      const emailLink = document.querySelector('a[href^="mailto:"]');
      if (emailLink) {
        emailLink.href = `mailto:${info.email}`;
        emailLink.textContent = info.email;
      }
    }

    // Update phone
    if (info.phone) {
      const phoneLink = document.querySelector('a[href^="tel:"]');
      if (phoneLink) {
        const phoneClean = info.phone.replace(/\s/g, '');
        phoneLink.href = `tel:${phoneClean}`;
        phoneLink.textContent = info.phone;
      }
    }

    // Update location
    if (info.location) {
      const addressEl = document.querySelector('address');
      if (addressEl) addressEl.textContent = info.location;
    }

    // Update social links
    if (info.socialLinks && info.socialLinks.length > 0) {
      const socialList = document.querySelector('.social-list');
      if (socialList) {
        socialList.innerHTML = '';
        info.socialLinks.forEach(link => {
          const platform = link.platform.toLowerCase();
          const iconMap = {
            'instagram': 'logo-instagram',
            'facebook': 'logo-facebook',
            'twitter': 'logo-twitter',
            'linkedin': 'logo-linkedin',
            'youtube': 'logo-youtube',
            'github': 'logo-github'
          };
          const icon = iconMap[platform] || 'share-social';
          const li = document.createElement('li');
          li.className = 'social-item';
          li.innerHTML = `<a href="${link.url}" class="social-link"><ion-icon name="${icon}"></ion-icon></a>`;
          socialList.appendChild(li);
        });
      }
    }
  }

  applyAbout(about) {
    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
      aboutText.innerHTML = `
        <p>${about.text1 || ''}</p>
        <p>${about.text2 || ''}</p>
      `;
    }
  }

  applyServices(services) {
    const serviceList = document.querySelector('.service-list');
    if (serviceList && services.length > 0) {
      serviceList.innerHTML = services.map(service => `
        <li class="service-item">
          <div class="service-icon-box">
            <i class="${service.icon} fa-2x"></i>
          </div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">${service.title}</h4>
            <p class="service-item-text">${service.description}</p>
          </div>
        </li>
      `).join('');
    }
  }

  applyClients(clients) {
    const clientsList = document.querySelector('.clients-list');
    if (clientsList && clients.length > 0) {
      clientsList.innerHTML = clients.map(client => `
        <li class="clients-item">
          <a href="#">
            <img src="${client.image}" alt="${client.alt}">
          </a>
        </li>
      `).join('');
    }
  }

  applyResume(data) {
    // Apply experience
    if (data.experience && data.experience.length > 0) {
      const expList = document.querySelector('.resume .timeline-list');
      if (expList && expList.parentElement.querySelector('.h3').textContent.includes('Experience')) {
        expList.innerHTML = data.experience.map(exp => {
          const details = exp.details && exp.details.length > 0 
            ? `<ul style="margin-left: 20px; margin-top: 10px; list-style-type: disc;">${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>`
            : '';
          return `
            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">${exp.title}</h4>
              <span>${exp.period}</span>
              <p class="timeline-text">${exp.description || ''}</p>
              ${details}
            </li>
          `;
        }).join('');
      }
    }

    // Apply education
    if (data.education && data.education.length > 0) {
      const eduSections = document.querySelectorAll('.timeline');
      if (eduSections.length > 1) {
        const eduSection = Array.from(eduSections).find(section => 
          section.querySelector('.h3')?.textContent.includes('Education')
        );
        if (eduSection) {
          const eduList = eduSection.querySelector('.timeline-list');
          if (eduList) {
            eduList.innerHTML = data.education.map(edu => `
              <li class="timeline-item">
                <h4 class="h4 timeline-item-title">${edu.title}</h4>
                <span>${edu.period}</span>
                <p class="timeline-text">${edu.description}</p>
              </li>
            `).join('');
          }
        }
      }
    }

    // Apply skills
    if (data.skills && data.skills.length > 0) {
      const skillsList = document.querySelector('.skills-list');
      if (skillsList) {
        skillsList.innerHTML = data.skills.map(skill => `
          <li class="skills-item">
            <div class="title-wrapper">
              <h5 class="h5">${skill.name}</h5>
              <data value="${skill.percentage}">${skill.percentage}%</data>
            </div>
            <div class="skill-progress-bg">
              <div class="skill-progress-fill" style="width: ${skill.percentage}%;"></div>
            </div>
          </li>
        `).join('');
      }
    }
  }

  applyPortfolio(portfolio) {
    // Update filter buttons
    if (portfolio.categories && portfolio.categories.length > 0) {
      const filterList = document.querySelector('.filter-list');
      if (filterList) {
        filterList.innerHTML = portfolio.categories.map((cat, index) => `
          <li class="filter-item">
            <button class="${index === 0 ? 'active' : ''}" data-filter-btn>${cat}</button>
          </li>
        `).join('');
      }
    }

    // Update portfolio items
    if (portfolio.items && portfolio.items.length > 0) {
      const projectList = document.querySelector('.project-list');
      if (projectList) {
        projectList.innerHTML = portfolio.items.map(item => `
          <li class="project-item active" data-filter-item data-category="${item.category.toLowerCase()}">
            <a href="#">
              <figure class="project-img">
                <div class="project-item-icon-box">
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <img src="${item.image}" alt="${item.title}" loading="lazy">
              </figure>
              <h3 class="project-title">${item.title}</h3>
              <p class="project-category">${item.category}</p>
            </a>
          </li>
        `).join('');
      }
    }
  }

  applyContact(contact) {
    // Update map embed
    if (contact.mapEmbed) {
      const iframe = document.querySelector('.mapbox iframe');
      if (iframe) {
        iframe.src = contact.mapEmbed;
      }
    }
  }

  applySettings(settings) {
    // Update document title
    if (settings.siteTitle) {
      document.title = settings.siteTitle;
    }

    // Update favicon
    if (settings.favicon) {
      let link = document.querySelector('link[rel="shortcut icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = settings.favicon;
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new WebsiteLoader();
  });
} else {
  new WebsiteLoader();
}

