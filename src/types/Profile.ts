export interface SocialLink {
  platform: 'linkedin' | 'facebook' | 'instagram' | 'github';
  url: string;
  username: string;
}

export interface Profile {
  name: string;
  bio: string;
  socialLinks: SocialLink[];
  avatar: string;
  createdAt: Date;
}

export interface FormData {
  name: string;
  bio: string;
  linkedin: string;
  facebook: string;
  instagram: string;
  github: string;
}