import React, { useState } from 'react';
import { Calendar, Download, Share2, Copy, Check } from 'lucide-react';
import { Profile } from '../types/Profile';
import { SocialLink } from './SocialLink';

interface ProfileCardProps {
  profile: Profile;
  onEdit: () => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: `${profile.name}'s Profile`,
      text: `Check out ${profile.name}'s social media profile: ${profile.bio}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to copy to clipboard
        copyProfileLink();
      }
    } else {
      copyProfileLink();
    }
  };

  const copyProfileLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const profileData = {
      name: profile.name,
      bio: profile.bio,
      socialLinks: profile.socialLinks,
      createdAt: profile.createdAt
    };

    const dataStr = JSON.stringify(profileData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${profile.name.replace(/\s+/g, '_')}_profile.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white/20"></div>
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-2">{profile.name}</h2>
        <p className="text-white/80 text-sm leading-relaxed">{profile.bio}</p>
        
        <div className="flex items-center justify-center gap-2 mt-3 text-white/60 text-xs">
          <Calendar className="w-4 h-4" />
          <span>Created {profile.createdAt.toLocaleDateString()}</span>
        </div>
      </div>

      {/* Social Links */}
      {profile.socialLinks.length > 0 && (
        <div className="space-y-3 mb-6">
          <h3 className="text-white/90 font-semibold text-sm uppercase tracking-wide">
            Social Media
          </h3>
          {profile.socialLinks.map((socialLink, index) => (
            <SocialLink key={index} socialLink={socialLink} />
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onEdit}
          className="flex-1 px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200 font-medium text-sm"
        >
          Edit Profile
        </button>
        
        <button
          onClick={handleShare}
          className="px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
        >
          {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
        </button>
        
        <button
          onClick={handleDownload}
          className="px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-200"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};