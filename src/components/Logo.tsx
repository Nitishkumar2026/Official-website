import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => {
  return (
    <Link to="/" className="flex items-center space-x-3">
      <img 
        src="https://i.postimg.cc/6QvbzNWH/logo.png" 
        alt="Yubisaki Assistive Technology Logo" 
        className={`${className} object-contain rounded-full`}
      />
      <div className="hidden sm:block">
        <span className="text-2xl font-bold text-gray-900">Yubisaki</span>
        <span className="text-base text-gray-600 block -mt-1">Assistive Technology</span>
      </div>
    </Link>
  );
};

export default Logo;
