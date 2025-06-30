import { SocialLink, Profile, FormData } from '../types/Profile';

export const extractUsername = (url: string, platform: string): string => {
  if (!url) return '';
  
  try {
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(cleanUrl);
    const pathname = urlObj.pathname;
    
    switch (platform) {
      case 'linkedin':
        const linkedinMatch = pathname.match(/\/in\/([^\/]+)/);
        return linkedinMatch ? linkedinMatch[1] : '';
      case 'facebook':
        const facebookMatch = pathname.match(/\/([^\/]+)/);
        return facebookMatch ? facebookMatch[1] : '';
      case 'instagram':
        const instagramMatch = pathname.match(/\/([^\/]+)/);
        return instagramMatch ? instagramMatch[1] : '';
      case 'github':
        const githubMatch = pathname.match(/\/([^\/]+)/);
        return githubMatch ? githubMatch[1] : '';
      default:
        return '';
    }
  } catch {
    return '';
  }
};

export const generateProfile = (formData: FormData): Profile => {
  const socialLinks: SocialLink[] = [];
  
  if (formData.linkedin) {
    socialLinks.push({
      platform: 'linkedin',
      url: formData.linkedin,
      username: extractUsername(formData.linkedin, 'linkedin')
    });
  }
  
  if (formData.facebook) {
    socialLinks.push({
      platform: 'facebook',
      url: formData.facebook,
      username: extractUsername(formData.facebook, 'facebook')
    });
  }
  
  if (formData.instagram) {
    socialLinks.push({
      platform: 'instagram',
      url: formData.instagram,
      username: extractUsername(formData.instagram, 'instagram')
    });
  }
  
  if (formData.github) {
    socialLinks.push({
      platform: 'github',
      url: formData.github,
      username: extractUsername(formData.github, 'github')
    });
  }
  
  return {
    name: formData.name || 'Anonymous User',
    bio: formData.bio || 'Social media enthusiast',
    socialLinks,
    avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop`,
    createdAt: new Date()
  };
};

export const validateUrl = (url: string, platform: string): boolean => {
  if (!url) return true; // Empty is valid
  
  try {
    const cleanUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(cleanUrl);
    
    switch (platform) {
      case 'linkedin':
        return urlObj.hostname.includes('linkedin.com');
      case 'facebook':
        return urlObj.hostname.includes('facebook.com') || urlObj.hostname.includes('fb.com');
      case 'instagram':
        return urlObj.hostname.includes('instagram.com');
      case 'github':
        return urlObj.hostname.includes('github.com');
      default:
        return false;
    }
  } catch {
    return false;
  }
};