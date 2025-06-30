import React, { useState } from 'react';
import { User, Linkedin, Facebook, Instagram, Github, Sparkles } from 'lucide-react';
import { FormData } from '../types/Profile';
import { validateUrl } from '../utils/profileGenerator';

interface ProfileFormProps {
  onSubmit: (data: FormData) => void;
  isGenerating: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    linkedin: '',
    facebook: '',
    instagram: '',
    github: ''
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Validate URLs on change
    if (['linkedin', 'facebook', 'instagram', 'github'].includes(field)) {
      if (value && !validateUrl(value, field)) {
        setErrors(prev => ({ ...prev, [field]: `Invalid ${field} URL` }));
      } else {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    Object.keys(formData).forEach(key => {
      const field = key as keyof FormData;
      if (['linkedin', 'facebook', 'instagram', 'github'].includes(field)) {
        const value = formData[field];
        if (value && !validateUrl(value, field)) {
          newErrors[field] = `Invalid ${field} URL`;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  const socialInputs = [
    {
      field: 'linkedin' as keyof FormData,
      label: 'LinkedIn',
      icon: Linkedin,
      placeholder: 'https://linkedin.com/in/your-profile',
      color: 'text-blue-600'
    },
    {
      field: 'facebook' as keyof FormData,
      label: 'Facebook',
      icon: Facebook,
      placeholder: 'https://facebook.com/your-profile',
      color: 'text-blue-700'
    },
    {
      field: 'instagram' as keyof FormData,
      label: 'Instagram',
      icon: Instagram,
      placeholder: 'https://instagram.com/your-profile',
      color: 'text-pink-600'
    },
    {
      field: 'github' as keyof FormData,
      label: 'GitHub',
      icon: Github,
      placeholder: 'https://github.com/your-profile',
      color: 'text-gray-800'
    }
  ];

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white">Create Your Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200 resize-none"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Social Media Links
          </h3>
          
          {socialInputs.map(({ field, label, icon: Icon, placeholder, color }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                <Icon className={`w-4 h-4 ${color}`} />
                {label}
              </label>
              <input
                type="url"
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/30 transition-all duration-200"
                placeholder={placeholder}
              />
              {errors[field] && (
                <p className="text-red-400 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Generating Profile...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate Profile
            </>
          )}
        </button>
      </form>
    </div>
  );
};