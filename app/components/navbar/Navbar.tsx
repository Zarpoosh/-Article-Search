"use client";

import { useState, useRef, useEffect } from "react";

// نوع داده‌ها
interface NavItem {
  id: string;
  label: string;
  href?: string;
  current?: boolean;
  children?: NavItem[]; // برای منوهای تودرتو
}

// کامپوننت بازگشتی Dropdown (چند سطحی)
function DropdownItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="relative">
      <button
        onClick={() => hasChildren && setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors ${
          !hasChildren ? "text-left" : ""
        }`}
      >
        {item.href ? (
          <a href={item.href} className="w-full text-left">
            {item.label}
          </a>
        ) : (
          item.label
        )}
        {hasChildren && (
          <svg
            className={`w-2.5 h-2.5 ms-2.5 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        )}
      </button>

      {/* زیرمنو */}
      {isOpen && hasChildren && (
        <div className="absolute left-full top-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 ml-1">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {item.children!.map((child) => (
              <li key={child.id}>
                <DropdownItem item={child} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// کامپوننت Dropdown سطح اول
function DropdownMenu({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // بستن منو با کلیک بیرون از آن
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // پاکسازی در زمان آن‌ماونت
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-fuchsia-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-fuchsia-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent transition-colors"
      >
        {item.label}
        <svg
          className={`w-2.5 h-2.5 ms-2.5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && item.children && (
        <div className="absolute z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 mt-1">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {item.children.map((child) => (
              <li key={child.id}>
                <DropdownItem item={child} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// لینک ساده
function NavLink({ item }: { item: NavItem }) {
  return (
    <a
      href={item.href}
      className={`block py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-fuchsia-700 md:p-0 transition-colors ${
        item.current
          ? "text-white bg-fuchsia-700 md:bg-transparent md:text-fuchsia-700 md:dark:text-fuchsia-500 dark:bg-fuchsia-600 md:dark:bg-transparent"
          : "text-gray-900 dark:text-white md:dark:hover:text-fuchsia-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
      }`}
      aria-current={item.current ? "page" : undefined}
    >
      {item.label}
    </a>
  );
}

// Navbar اصلی
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // 👈 مرحله ۱

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // 👈 مرحله ۲
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  // داده‌ها با ساختار ساده‌تر و قابل‌توسعه‌تر
  const navItems: NavItem[] = [
    { id: "home", label: "Home", href: "#", current: true },
    {
      id: "dropdown",
      label: "Dropdown",
      children: [
        { id: "dashboard", label: "Dashboard", href: "#" },
        {
          id: "features",
          label: "Features",
          children: [
            { id: "overview", label: "Overview", href: "#" },
            { id: "downloads", label: "My Downloads", href: "#" },
            { id: "billing", label: "Billing", href: "#" },
            { id: "rewards", label: "Rewards", href: "#" },
          ],
        },
        { id: "earnings", label: "Earnings", href: "#" },
      ],
    },
    { id: "services", label: "Services", href: "#" },
    { id: "pricing", label: "Pricing", href: "#" },
    { id: "contact", label: "Contact", href: "#" },
  ];

  return (

    
    <nav  ref={menuRef} className="border-gray-800 border-2  ">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* لوگو */}
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="/images/logo2.png"
            className="h-15 w-auto text-white"
            alt="Mohaghegh Ardabili University"
          />

          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            UMA
          </span>
        </a>

        {/* دکمه منوی موبایل */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors"
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* منوی اصلی */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:block md:w-auto`}
          id="navbar-menu"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.children ? (
                  <DropdownMenu item={item} />
                ) : (
                  <NavLink item={item} />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
