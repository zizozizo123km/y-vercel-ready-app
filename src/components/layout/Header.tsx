import { Bell, ChevronDown, Flag, Home, MessageSquare, Plus, Search, Settings, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

// Placeholder for profile image
const PROFILE_IMAGE_URL = "/images/profile-placeholder.jpg";

// --- Components ---

interface NavItemProps {
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, href, isActive = false, label }) => {
  const activeClasses = isActive
    ? "text-blue-600 border-b-4 border-blue-600"
    : "text-gray-500 hover:bg-gray-100 hover:text-blue-600";
  const iconClasses = isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600 transition-colors duration-150";

  return (
    <Link href={href} aria-label={label} className="h-full">
      <div
        className={`group flex items-center justify-center h-full px-8 xl:px-10 cursor-pointer transition-colors duration-150 relative ${activeClasses}`}
        title={label}
      >
        <Icon className={`w-7 h-7 ${iconClasses}`} strokeWidth={isActive ? 2.5 : 2} />
        {/* Active state indicator - hidden when inactive, visible as border-b above */}
      </div>
    </Link>
  );
};

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  count?: number; // Optional notification count
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, onClick, count }) => {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="relative flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-150"
    >
      <Icon className="w-5 h-5 text-black" />
      {count && count > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
};

const UserProfileButton: React.FC = () => {
  // Mock User Data
  const userName = "Jane Doe";

  return (
    <Link href="/profile" className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-150 cursor-pointer">
      <div className="relative w-7 h-7">
        <Image
          src={PROFILE_IMAGE_URL}
          alt={userName}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <span className="hidden lg:inline text-sm font-semibold text-gray-800 pr-1">{userName.split(" ")[0]}</span>
    </Link>
  );
};

// --- Main Header Component ---

const Header: React.FC = () => {
  // Mock current path for active state demonstration
  const currentPath = "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-14 bg-white border-b border-gray-200 shadow-sm px-4">
      
      {/* 1. Left Section (Logo & Search) */}
      <div className="flex items-center space-x-2 min-w-[280px]">
        
        {/* Logo (Facebook Blue F Icon) */}
        <Link href="/" aria-label="Facebook Home">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-10 h-10 text-blue-600">
            <path
              fill="currentColor"
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-3v-1c0-.552.448-1 1-1h2v-3h-3c-2.761 0-5 2.239-5 5v2h-2v3h2v7h3v-7h3l1-3h-4v-2z"
            />
          </svg>
        </Link>
        
        {/* Search Bar */}
        <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-2 w-full max-w-xs">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="البحث في فيسبوك" // Arabic: Search in Facebook
            className="bg-transparent outline-none text-sm text-gray-700 w-full placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* 2. Middle Section (Navigation Icons) */}
      <nav className="hidden md:flex flex-grow h-full justify-center max-w-[700px]">
        <NavItem 
          icon={Home} 
          href="/" 
          isActive={currentPath === "/"}
          label="الصفحة الرئيسية" // Home
        />
        <NavItem 
          icon={Flag} 
          href="/pages" 
          isActive={currentPath === "/pages"}
          label="الصفحات" // Pages
        />
        <NavItem 
          icon={MessageSquare} 
          href="/messenger" 
          isActive={currentPath === "/messenger"}
          label="الرسائل" // Messenger
        />
        <NavItem 
          icon={ShoppingCart} 
          href="/marketplace" 
          isActive={currentPath === "/marketplace"}
          label="سوق" // Marketplace
        />
        <NavItem 
          icon={User} 
          href="/friends" 
          isActive={currentPath === "/friends"}
          label="الأصدقاء" // Friends
        />
      </nav>

      {/* 3. Right Section (Actions & Profile) */}
      <div className="flex items-center space-x-2 min-w-[280px] justify-end">
        
        {/* User Profile Button (Mobile/Tablet Hidden Name) */}
        <UserProfileButton />
        
        {/* Action Buttons */}
        <ActionButton icon={Plus} label="إنشاء" /> {/* Create */}
        <ActionButton icon={Bell} label="الإشعارات" count={3} /> {/* Notifications */}
        <ActionButton icon={Settings} label="القائمة" /> {/* Menu (using Settings as a placeholder for the 3-line menu icon) */}
        <ActionButton icon={ChevronDown} label="الحساب" /> {/* Account */}
      </div>
    </header>
  );
};

export default Header;