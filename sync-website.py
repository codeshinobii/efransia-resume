#!/usr/bin/env python3
"""
Sync script to update index.html from admin dashboard data
This script reads the website data from localStorage JSON and updates index.html
"""

import json
import re
from pathlib import Path

def load_website_data():
    """Load website data from localStorage JSON file"""
    # Try to read from a JSON file (exported from admin dashboard)
    json_file = Path('website-data.json')
    if json_file.exists():
        with open(json_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    # If no JSON file, return None (will use default data structure)
    print("Warning: website-data.json not found. Please export data from admin dashboard first.")
    return None

def update_index_html(data):
    """Update index.html with data from admin dashboard"""
    index_file = Path('index.html')
    
    if not index_file.exists():
        print("Error: index.html not found!")
        return False
    
    # Read the HTML file
    with open(index_file, 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    if not data:
        print("No data to sync. Exiting.")
        return False
    
    # Update personal info
    if 'personalInfo' in data:
        pi = data['personalInfo']
        
        # Update title
        html_content = re.sub(
            r'<title>.*?</title>',
            f'<title>{data.get("settings", {}).get("siteTitle", "Efracia R. Ager - Freelance Graphics Designer")}</title>',
            html_content
        )
        
        # Update favicon
        if 'settings' in data and 'favicon' in data['settings']:
            html_content = re.sub(
                r'<link rel="shortcut icon" href="[^"]*"',
                f'<link rel="shortcut icon" href="{data["settings"]["favicon"]}"',
                html_content
            )
        
        # Update profile image
        html_content = re.sub(
            r'<img src="\.\/assets\/images\/[^"]*" alt="[^"]*" width="80">',
            f'<img src="{pi["image"]}" alt="{pi["name"]}" width="80">',
            html_content
        )
        
        # Update name
        html_content = re.sub(
            r'<h1 class="name"[^>]*>.*?</h1>',
            f'<h1 class="name" title="{pi["name"]}">{pi["name"]}</h1>',
            html_content
        )
        
        # Update title/job
        html_content = re.sub(
            r'<p class="title">.*?</p>',
            f'<p class="title">{pi["title"]}</p>',
            html_content
        )
        
        # Update email
        html_content = re.sub(
            r'<a href="mailto:[^"]*" class="contact-link">.*?</a>',
            f'<a href="mailto:{pi["email"]}" class="contact-link">{pi["email"]}</a>',
            html_content
        )
        
        # Update phone
        phone_clean = pi["phone"].replace(" ", "")
        html_content = re.sub(
            r'<a href="tel:\+?[^"]*" class="contact-link">.*?</a>',
            f'<a href="tel:{phone_clean}" class="contact-link">{pi["phone"]}</a>',
            html_content
        )
        
        # Update location
        html_content = re.sub(
            r'<address>.*?</address>',
            f'<address>{pi["location"]}</address>',
            html_content
        )
        
        # Update social links
        if 'socialLinks' in pi and pi['socialLinks']:
            social_list_pattern = r'<ul class="social-list">.*?</ul>'
            social_items = []
            for link in pi['socialLinks']:
                platform_lower = link['platform'].lower()
                icon_map = {
                    'instagram': 'logo-instagram',
                    'facebook': 'logo-facebook',
                    'twitter': 'logo-twitter',
                    'linkedin': 'logo-linkedin',
                    'youtube': 'logo-youtube',
                    'github': 'logo-github'
                }
                icon = icon_map.get(platform_lower, 'share-social')
                social_items.append(f'''
          <li class="social-item">
            <a href="{link["url"]}" class="social-link">
              <ion-icon name="{icon}"></ion-icon>
            </a>
          </li>''')
            
            social_html = f'<ul class="social-list">{"".join(social_items)}\n        </ul>'
            html_content = re.sub(social_list_pattern, social_html, html_content, flags=re.DOTALL)
    
    # Update about section
    if 'about' in data:
        about = data['about']
        
        # Find and update about paragraphs
        about_section_pattern = r'<section class="about-text">.*?</section>'
        about_html = f'''<section class="about-text">
          <p>
            {about['text1']}
          </p>

          <p>
            {about['text2']}
          </p>
        </section>'''
        
        html_content = re.sub(about_section_pattern, about_html, html_content, flags=re.DOTALL)
    
    # Update services
    if 'services' in data:
        services = data['services']
        services_list_pattern = r'<ul class="service-list">.*?</ul>'
        service_items = []
        
        for service in services:
            service_items.append(f'''
            <li class="service-item">
              <div class="service-icon-box">
                <i class="{service["icon"]} fa-2x"></i>
              </div>
              <div class="service-content-box">
                <h4 class="h4 service-item-title">{service["title"]}</h4>
                <p class="service-item-text">
                  {service["description"]}
                </p>
              </div>
            </li>''')
        
        services_html = f'<ul class="service-list">{"".join(service_items)}\n          </ul>'
        html_content = re.sub(services_list_pattern, services_html, html_content, flags=re.DOTALL)
    
    # Update clients
    if 'clients' in data:
        clients = data['clients']
        clients_list_pattern = r'<ul class="clients-list has-scrollbar">.*?</ul>'
        client_items = []
        
        for client in clients:
            client_items.append(f'''
            <li class="clients-item">
              <a href="#">
                <img src="{client["image"]}" alt="{client["alt"]}">
              </a>
            </li>''')
        
        clients_html = f'<ul class="clients-list has-scrollbar">{"".join(client_items)}\n          </ul>'
        html_content = re.sub(clients_list_pattern, clients_html, html_content, flags=re.DOTALL)
    
    # Update experience
    if 'experience' in data:
        experience = data['experience']
        experience_list_pattern = r'<ol class="timeline-list">.*?</ol>'
        exp_items = []
        
        for exp in experience:
            details_html = ''
            if 'details' in exp and exp['details']:
                details_list = '\n'.join([f'<li><strong>{d.split(":")[0]}:</strong> {":".join(d.split(":")[1:])}</li>' if ':' in d else f'<li>{d}</li>' for d in exp['details']])
                details_html = f'<ul style="margin-left: 20px; margin-top: 10px; list-style-type: disc;">\n{details_list}\n              </ul>'
            
            exp_items.append(f'''
            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">{exp["title"]}</h4>
              <span>{exp["period"]}</span>
              <p class="timeline-text">
                {exp.get("description", "")}
              </p>
              {details_html}
            </li>''')
        
        exp_html = f'<ol class="timeline-list">{"".join(exp_items)}\n          </ol>'
        html_content = re.sub(experience_list_pattern, exp_html, html_content, flags=re.DOTALL)
    
    # Update education
    if 'education' in data:
        education = data['education']
        education_list_pattern = r'<ol class="timeline-list">.*?</ol>'
        # Find the second timeline-list (education section)
        edu_items = []
        
        for edu in education:
            edu_items.append(f'''
            <li class="timeline-item">
              <h4 class="h4 timeline-item-title">{edu["title"]}</h4>
              <span>{edu["period"]}</span>
              <p class="timeline-text">
                {edu["description"]}
              </p>
            </li>''')
        
        edu_html = f'<ol class="timeline-list">{"".join(edu_items)}\n          </ol>'
        # Replace the second occurrence (education section)
        matches = list(re.finditer(education_list_pattern, html_content, flags=re.DOTALL))
        if len(matches) > 1:
            html_content = html_content[:matches[1].start()] + edu_html + html_content[matches[1].end():]
    
    # Update skills
    if 'skills' in data:
        skills = data['skills']
        skills_list_pattern = r'<ul class="skills-list content-card">.*?</ul>'
        skill_items = []
        
        for skill in skills:
            skill_items.append(f'''
            <li class="skills-item">
              <div class="title-wrapper">
                <h5 class="h5">{skill["name"]}</h5>
                <data value="{skill["percentage"]}">{skill["percentage"]}%</data>
              </div>
              <div class="skill-progress-bg">
                <div class="skill-progress-fill" style="width: {skill["percentage"]}%;"></div>
              </div>
            </li>''')
        
        skills_html = f'<ul class="skills-list content-card">{"".join(skill_items)}\n          </ul>'
        html_content = re.sub(skills_list_pattern, skills_html, html_content, flags=re.DOTALL)
    
    # Update portfolio
    if 'portfolio' in data:
        portfolio = data['portfolio']
        
        # Update filter buttons
        filter_list_pattern = r'<ul class="filter-list">.*?</ul>'
        filter_items = []
        for category in portfolio.get('categories', []):
            active = 'active' if category == 'All' else ''
            filter_items.append(f'''
            <li class="filter-item">
              <button class="{active}" data-filter-btn>{category}</button>
            </li>''')
        
        filter_html = f'<ul class="filter-list">{"".join(filter_items)}\n          </ul>'
        html_content = re.sub(filter_list_pattern, filter_html, html_content, flags=re.DOTALL)
        
        # Update portfolio items
        if 'items' in portfolio:
            portfolio_list_pattern = r'<ul class="project-list">.*?</ul>'
            portfolio_items = []
            
            for item in portfolio['items']:
                category_lower = item['category'].lower()
                portfolio_items.append(f'''
            <li class="project-item active" data-filter-item data-category="{category_lower}">
              <a href="#">
                <figure class="project-img">
                  <div class="project-item-icon-box">
                    <ion-icon name="eye-outline"></ion-icon>
                  </div>
                  <img src="{item["image"]}" alt="{item["title"]}" loading="lazy">
                </figure>
                <h3 class="project-title">{item["title"]}</h3>
                <p class="project-category">{item["category"]}</p>
              </a>
            </li>''')
            
            portfolio_html = f'<ul class="project-list">{"".join(portfolio_items)}\n          </ul>'
            html_content = re.sub(portfolio_list_pattern, portfolio_html, html_content, flags=re.DOTALL)
    
    # Update contact section
    if 'contact' in data:
        contact = data['contact']
        
        # Update map embed
        map_pattern = r'src="https://www\.google\.com/maps/embed[^"]*"'
        html_content = re.sub(
            map_pattern,
            f'src="{contact["mapEmbed"]}"',
            html_content
        )
        
        # Update contact email in PHP file
        php_file = Path('send_email.php')
        if php_file.exists():
            with open(php_file, 'r', encoding='utf-8') as f:
                php_content = f.read()
            
            php_content = re.sub(
                r'\$recipient = "[^"]*";',
                f'$recipient = "{contact["email"]}";',
                php_content
            )
            
            with open(php_file, 'w', encoding='utf-8') as f:
                f.write(php_content)
    
    # Write updated HTML
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print("✓ Successfully updated index.html!")
    return True

def main():
    """Main function"""
    print("Starting website sync...")
    data = load_website_data()
    
    if data:
        if update_index_html(data):
            print("✓ Website synchronized successfully!")
        else:
            print("✗ Failed to sync website.")
    else:
        print("No data to sync. Please export data from admin dashboard first.")

if __name__ == '__main__':
    main()
