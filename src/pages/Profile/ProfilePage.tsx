import React from 'react';
import { CameraIcon, PencilIcon, DotsHorizontalIcon, PlusIcon } from '@heroicons/react/solid';
import PostFeed from '../../components/Post/PostFeed';
import IntroCard from './components/IntroCard';
import FriendsCard from './components/FriendsCard';
import PhotosCard from './components/PhotosCard';
import CreatePostBox from '../../components/Post/CreatePostBox';

// Mock Data for the profile (in a real app, this would come from a Redux store or API call)
const mockProfile = {
  name: "محمد الأحمد",
  username: "@mohammed.alahmad",
  bio: "مهندس برمجيات | محب للتكنولوجيا والابتكار.",
  profilePic: "https://via.placeholder.com/150/0000FF/FFFFFF?text=MA",
  coverPhoto: "https://images.unsplash.com/photo-1517430852959-1e37ec2e5d79?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  isOwner: true,
};

const ProfilePage: React.FC = () => {
  const { name, coverPhoto, profilePic, isOwner } = mockProfile;

  return (
    <div className="bg-gray-100 min-h-screen pt-14">
      <div className="max-w-6xl mx-auto">
        
        {/* Profile Header Area */}
        <div className="bg-white shadow-md rounded-b-lg">
          
          {/* Cover Photo */}
          <div className="relative h-48 sm:h-80 md:h-96 overflow-hidden">
            <img 
              src={coverPhoto} 
              alt="Cover Photo" 
              className="w-full h-full object-cover" 
            />
            {isOwner && (
              <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-700 font-semibold py-2 px-4 rounded-lg flex items-center shadow-md transition duration-150 text-sm">
                <CameraIcon className="w-5 h-5 ml-2" />
                تغيير صورة الغلاف
              </button>
            )}
          </div>

          {/* Profile Info and Buttons */}
          <div className="px-4 pb-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-16 sm:-mt-24 md:-mt-32">
              
              {/* Profile Picture */}
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full border-4 border-white bg-white flex-shrink-0 z-10">
                <img 
                  src={profilePic} 
                  alt={name} 
                  className="w-full h-full object-cover rounded-full" 
                />
                {isOwner && (
                  <button className="absolute bottom-2 right-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-150">
                    <CameraIcon className="w-5 h-5 text-gray-700" />
                  </button>
                )}
              </div>

              {/* Name and Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between w-full mt-4 sm:mt-0 sm:mr-6 items-center sm:items-end">
                <div className="text-center sm:text-right mb-4 sm:mb-0">
                  <h1 className="text-3xl font-bold text-gray-800">{name}</h1>
                  <p className="text-gray-500 text-sm">3.4K صديق</p>
                </div>
                
                <div className="flex space-x-2">
                  {isOwner ? (
                    <>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition">
                        <PencilIcon className="w-5 h-5 ml-2" />
                        تعديل الملف الشخصي
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-3 rounded-lg flex items-center transition">
                        <DotsHorizontalIcon className="w-6 h-6" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition">
                        <PlusIcon className="w-5 h-5 ml-2" />
                        إضافة صديق
                      </button>
                      <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition">
                        إرسال رسالة
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-start items-center space-x-8 px-4 text-gray-600 text-lg" style={{direction: 'rtl'}}>
            <NavItem label="المنشورات" isActive />
            <NavItem label="حول" />
            <NavItem label="الأصدقاء" />
            <NavItem label="الصور" />
            <NavItem label="المزيد" />
          </div>

        </div>

        {/* Main Content Body */}
        <div className="mt-4 p-4 lg:p-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* Right Column (Sidebar - Intro, Photos, Friends) - R-L layout convention */}
            <div className="col-span-1 space-y-4 order-2 lg:order-1">
              <IntroCard profile={mockProfile} isOwner={isOwner} />
              <PhotosCard />
              <FriendsCard />
            </div>

            {/* Left Column (Post Feed) - R-L layout convention */}
            <div className="col-span-1 lg:col-span-2 space-y-4 order-1 lg:order-2">
              {isOwner && <CreatePostBox profilePic={profilePic} />}
              <PostFeed />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Helper component for Navigation Tabs
const NavItem: React.FC<{ label: string, isActive?: boolean }> = ({ label, isActive = false }) => (
  <button className={`py-3 ${isActive ? 'text-blue-600 font-semibold border-b-4 border-blue-600' : 'hover:bg-gray-100 px-3 rounded-lg'}`}>
    {label}
  </button>
);

export default ProfilePage;