import { TemplateMetadata } from './templateManager';

export interface UserData {
  name: string;
  email?: string;
  bio?: string;
  tagline?: string;
  skills?: Array<{ name: string; proficiency?: number; category?: string }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
  }>;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface RenderedTemplate {
  html: string;
  css: string;
  sections: Array<{
    id: string;
    type: string;
    content: string;
    html: string;
  }>;
}

export class TemplateRenderer {
  /**
   * Render template with user data, replacing placeholders like {{user.name}}
   */
  render(
    template: TemplateMetadata,
    userData: UserData,
    aiContent?: Record<string, string>
  ): RenderedTemplate {
    const sections = template.layoutJson?.sections || [];
    const styles = template.layoutJson?.styles || {};

    const renderedSections = sections.map((section: any) => {
      let content = section.content || '';

      // Replace placeholders
      content = this.replacePlaceholders(content, userData, aiContent, section.type);

      return {
        id: section.id || section.type,
        type: section.type,
        content,
        html: this.renderSectionHTML(section.type, content, userData)
      };
    });

    const html = this.generateHTML(renderedSections, styles);
    const css = this.generateCSS(styles);

    return { html, css, sections: renderedSections };
  }

  private replacePlaceholders(
    content: string,
    userData: UserData,
    aiContent?: Record<string, string>,
    sectionType?: string
  ): string {
    let result = content;

    // Replace user data placeholders
    result = result.replace(/\{\{user\.name\}\}/g, userData.name || '');
    result = result.replace(/\{\{user\.email\}\}/g, userData.email || '');
    result = result.replace(/\{\{user\.bio\}\}/g, userData.bio || '');
    result = result.replace(/\{\{user\.tagline\}\}/g, userData.tagline || '');

    // Replace AI-generated content
    if (aiContent) {
      Object.keys(aiContent).forEach(key => {
        const placeholder = `{{ai_generated_${key}}}`;
        result = result.replace(
          new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
          aiContent[key] || ''
        );
      });
    }

    // Replace data source placeholders
    if (content.includes('{{user.projects}}')) {
      result = result.replace('{{user.projects}}', this.renderProjects(userData.projects || []));
    }

    // Generic placeholder handler
    result = result.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
      return this.getNestedValue(userData, path) || match;
    });

    return result;
  }

  private getNestedValue(obj: any, path: string): string {
    return path.split('.').reduce((current, prop) => current?.[prop], obj) || '';
  }

  private renderSectionHTML(type: string, content: string, userData: UserData): string {
    switch (type) {
      case 'header':
        return `<header class="portfolio-header"><h1>${userData.name}</h1></header>`;
      case 'hero':
        return `<section class="hero-section"><h2>${content}</h2></section>`;
      case 'about':
        return `<section class="about-section"><p>${content}</p></section>`;
      case 'projects':
        return `<section class="projects-section">${this.renderProjects(userData.projects || [])}</section>`;
      case 'skills':
        return `<section class="skills-section">${this.renderSkills(userData.skills || [])}</section>`;
      case 'contact':
        return `<section class="contact-section">${this.renderContact(userData)}</section>`;
      default:
        return `<section class="section-${type}">${content}</section>`;
    }
  }

  private renderProjects(projects: UserData['projects']): string {
    if (!projects || projects.length === 0) return '<p>No projects yet.</p>';

    return projects
      .map(
        p => `
      <div class="project-card">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="tech-stack">${(p.technologies || []).join(', ')}</div>
        ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank">GitHub</a>` : ''}
        ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank">Live Demo</a>` : ''}
      </div>
    `
      )
      .join('');
  }

  private renderSkills(skills: UserData['skills']): string {
    if (!skills || skills.length === 0) return '<p>Skills coming soon!</p>';

    return skills
      .map(
        s =>
          `<div class="skill-item">
        <span class="skill-name">${s.name}</span>
        ${s.proficiency ? `<span class="skill-proficiency">${s.proficiency}%</span>` : ''}
      </div>`
      )
      .join('');
  }

  private renderContact(userData: UserData): string {
    const links = [];
    if (userData.socials?.github)
      links.push(`<a href="${userData.socials.github}" target="_blank">GitHub</a>`);
    if (userData.socials?.linkedin)
      links.push(`<a href="${userData.socials.linkedin}" target="_blank">LinkedIn</a>`);
    if (userData.socials?.twitter)
      links.push(`<a href="${userData.socials.twitter}" target="_blank">Twitter</a>`);
    if (userData.email) links.push(`<a href="mailto:${userData.email}">Email</a>`);
    return links.length > 0 ? links.join(' | ') : '<p>Contact information coming soon.</p>';
  }

  private generateHTML(sections: RenderedTemplate['sections'], styles: any): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Portfolio</title>
          <style>${this.generateCSS(styles)}</style>
        </head>
        <body>
          ${sections.map(s => s.html).join('\n')}
        </body>
      </html>
    `;
  }

  private generateCSS(styles: any): string {
    const primaryColor = styles.primaryColor || styles.colors?.primary || '#1D4ED8';
    const font = styles.font || styles.fonts?.body || 'Inter';

    return `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        font-family: ${font}, sans-serif; 
        line-height: 1.6;
        color: #333;
        padding: 20px;
      }
      .portfolio-header { 
        text-align: center; 
        padding: 2rem 0;
        border-bottom: 2px solid ${primaryColor};
      }
      .portfolio-header h1 { 
        color: ${primaryColor}; 
        font-size: 2.5rem;
      }
      .hero-section { 
        text-align: center; 
        padding: 4rem 0;
        background: linear-gradient(135deg, ${primaryColor}, #3B82F6);
        color: white;
        border-radius: 8px;
        margin: 2rem 0;
      }
      .hero-section h2 { font-size: 2rem; }
      .about-section { 
        padding: 2rem 0;
        max-width: 800px;
        margin: 0 auto;
      }
      .projects-section { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
        gap: 1.5rem;
        padding: 2rem 0;
      }
      .project-card { 
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 1.5rem;
        background: white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .project-card h3 { 
        color: ${primaryColor};
        margin-bottom: 0.5rem;
      }
      .tech-stack { 
        color: #666;
        font-size: 0.9rem;
        margin: 1rem 0;
      }
      .project-card a { 
        color: ${primaryColor};
        text-decoration: none;
        margin-right: 1rem;
      }
      .project-card a:hover { text-decoration: underline; }
      .skills-section { 
        padding: 2rem 0;
      }
      .skill-item { 
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid #eee;
      }
      .contact-section { 
        text-align: center;
        padding: 2rem 0;
      }
      .contact-section a { 
        color: ${primaryColor};
        text-decoration: none;
        margin: 0 1rem;
      }
      .contact-section a:hover { text-decoration: underline; }
    `;
  }
}

