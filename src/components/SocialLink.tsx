import React from 'react';
import { Linkedin, Facebook, Instagram, Github, ExternalLink } from 'lucide-react';
import { SocialLink as SocialLinkType } from '../types/Profile';

interface SocialLinkProps {
  socialLink: SocialLinkType;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ socialLink }) => {
  const getIcon = () => {
    switch (socialLink.platform) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (socialLink.platform) {
      case 'linkedin':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'facebook':
        return 'bg-blue-700 hover:bg-blue-800 text-white';
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white';
      case 'github':
        return 'bg-gray-800 hover:bg-gray-900 text-white';
      default:
        return 'bg-gray-600 hover:bg-gray-700 text-white';
    }
  };

  const getPlatformName = () => {
    return socialLink.platform.charAt(0).toUpperCase() + socialLink.platform.slice(1);
  };

  const handleClick = () => {
    const url = socialLink.url.startsWith('http') ? socialLink.url : `https://${socialLink.url}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleClick}
      className={`${getStyles()} px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-200 hover:scale-105 hover:shadow-lg w-full group`}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1 text-left">
        <div className="font-medium text-sm">{getPlatformName()}</div>
        <div className="text-xs opacity-90 truncate">
          @{socialLink.username || 'profile'}
        </div>
      </div>
      <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
    </button>
  );
};