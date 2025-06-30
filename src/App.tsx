import React, { useState } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { ProfileForm } from './components/ProfileForm';
import { ProfileCard } from './components/ProfileCard';
import { Profile, FormData } from './types/Profile';
import { generateProfile } from './utils/profileGenerator';

function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = async (formData: FormData) => {
    setIsGenerating(true);
    
    // Simulate profile generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newProfile = generateProfile(formData);
    setProfile(newProfile);
    setIsGenerating(false);
  };

  const handleEditProfile = () => {
    setProfile(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Bolt Badge */}
      <div className="fixed top-4 right-4 z-50">
        <img
          src="/black_circle_360x360.png"
          alt="Powered by Bolt"
          className="w-16 h-16 hover:scale-105 transition-transform duration-200 cursor-pointer opacity-90 hover:opacity-100"
        />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Profile Generator
              </h1>
            </div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Create a beautiful profile showcase from your social media links
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {!profile ? (
            <div className="max-w-lg mx-auto">
              <ProfileForm 
                onSubmit={handleFormSubmit} 
                isGenerating={isGenerating}
              />
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <button
                onClick={handleEditProfile}
                className="flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                Back to Form
              </button>
              
              <ProfileCard 
                profile={profile} 
                onEdit={handleEditProfile}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-white/60 text-sm">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;