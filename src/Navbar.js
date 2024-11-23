import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const DropdownIndicator = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="icon-style" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M19 9l-7 7-7-7" 
    />
  </svg>
);

const MobileDropdownItem = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b last:border-b-0">
      <div 
        className="flex justify-between items-center px-4 py-3 cursor-pointer"
        onClick={() => children && setIsOpen(!isOpen)}
      >
        {label}
        {children && (
          <DropdownIndicator />
        )}
      </div>
      
      {children && isOpen && (
        <div className="pl-4">
          {children.map((child, index) => (
            <MobileDropdownItem key={index} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

const DesktopNavItem = ({ label, children }) => (
  <div className="relative-group">
    <button
      className="flex-items-center"
    >
      {label}
      {children && <DropdownIndicator />}
    </button>

    {children && (
      <div
        className="absolute-style"
      >
        {children.map((child, index) => (
          <DesktopDropdownItem key={index} {...child} />
        ))}
      </div>
    )}
  </div>
);

const DesktopDropdownItem = ({ label, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative-group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex-items">
        {label}
        {children && (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="icon-style" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 9l-7 7-7-7" 
            />
          </svg>
        )}
      </div>
      
      {children && isOpen && (
        <div className="absolute-positioned">
          {children.map((child, index) => (
            <div 
              key={index} 
              className="button-style"
            >
              {child.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { 
      label: 'Products', 
      children: [
        { 
          label: 'Electronics', 
          children: [
            { label: 'Smartphones' },
            { label: 'Laptops' },
            { label: 'Tablets' }
          ]
        },
        { 
          label: 'Clothing', 
          children: [
            { label: 'Men' },
            { label: 'Women' },
            { label: 'Kids' }
          ]
        }
      ]
    },
    { 
      label: 'Services', 
      children: [
        { label: 'Consulting' },
        { label: 'Support' },
        { 
          label: 'Training', 
          children: [
            { label: 'Online Courses' },
            { label: 'Workshops' }
          ]
        }
      ]
    },
    { label: 'About Us' },
    { label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-bar-content">
          {/* Logo */}
          <div className=".flex-center">
            <span className="text-styling">LOGO</span>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            {menuItems.map((item, index) => (
              <DesktopNavItem key={index} {...item} />
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="hidden-md">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-hover"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md-hidden absolute-position">
            <div className="padding-top-bottom">
              {menuItems.map((item, index) => (
                <MobileDropdownItem key={index} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;