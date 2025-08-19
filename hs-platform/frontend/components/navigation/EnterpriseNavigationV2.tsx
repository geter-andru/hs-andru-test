'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  PlusIcon,
  ChartBarIcon,
  CalculatorIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  UserGroupIcon,
  ClockIcon,
  BoltIcon,
  BellIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  ChevronRightIcon,
  HomeIcon,
  DocumentTextIcon,
  ChartPieIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useLogout } from '@/lib/hooks/useAPI';
import { useTheme } from '@/components/theme/ThemeProvider';

interface EnterpriseNavigationV2Props {
  children: React.ReactNode;
}

const navigationItems = {
  main: [
    {
      id: 'revenue-intelligence',
      label: 'Revenue Intelligence',
      description: 'Overview and insights',
      icon: HomeIcon,
      href: '/dashboard',
      badge: null
    }
  ],
  salesTools: [
    {
      id: 'prospect-qualification',
      label: 'Prospect Qualification',
      description: 'Rate companies 1-100',
      icon: UserGroupIcon,
      href: '/icp',
      badge: null
    },
    {
      id: 'deal-value-calculator',
      label: 'Deal Value Calculator', 
      description: 'Show cost of waiting',
      icon: CalculatorIcon,
      href: '/cost-calculator',
      badge: null
    },
    {
      id: 'advanced-analytics',
      label: 'Advanced Analytics',
      description: 'Predictive intelligence',
      icon: ArrowTrendingUpIcon,
      href: '/analytics',
      badge: 'Pro'
    },
    {
      id: 'sales-materials',
      label: 'Sales Materials',
      description: 'Ready-to-use assets',
      icon: DocumentTextIcon,
      href: '/exports',
      badge: null
    }
  ],
  quickActions: [
    {
      id: 'new-analysis',
      label: 'New Analysis',
      description: 'Analyze prospect',
      icon: PlusIcon,
      href: '/icp',
      badge: null
    },
    {
      id: 'search-materials',
      label: 'Search Materials',
      description: 'Find assets',
      icon: MagnifyingGlassIcon,
      href: '/exports',
      badge: null
    },
    {
      id: 'export-center',
      label: 'Export Center',
      description: 'CRM integration',
      icon: ArrowDownTrayIcon,
      href: '/exports',
      badge: null
    }
  ],
  development: [
    {
      id: 'professional-development',
      label: 'Professional Development',
      description: 'Customer Analysis: Advanced',
      icon: ChartBarIcon,
      href: '/dashboard',
      badge: '73%',
      progress: 73
    },
    {
      id: 'recent-activity',
      label: 'Recent Activity',
      description: 'View latest actions',
      icon: ChartPieIcon,
      href: '/dashboard',
      badge: null
    }
  ]
};

const NavItem = ({ item, isActive, onClick }: { item: any, isActive: boolean, onClick: (id: string) => void }) => {
  const Icon = item.icon;
  
  return (
    <Link
      href={item.href}
      onClick={() => onClick(item.id)}
      className={`
        w-full group relative flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ease-out
        ${isActive 
          ? 'bg-blue-500/10 text-white shadow-sm' 
          : 'text-white hover:text-white hover:bg-gray-800/50'
        }
      `}
    >
      <div className={`
        flex items-center justify-center w-8 h-8 rounded-md transition-colors duration-200
        ${isActive 
          ? 'bg-blue-500/20 text-white' 
          : 'text-white group-hover:text-white group-hover:bg-gray-800/30'
        }
      `}>
        <Icon className="w-4 h-4" strokeWidth={1.5} />
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`
            text-sm font-medium truncate
            ${isActive ? 'text-white' : 'text-white group-hover:text-white'}
          `}>
            {item.label}
          </span>
          {item.badge && (
            <span className={`
              px-2 py-0.5 text-xs font-medium rounded-full ml-2
              ${item.progress 
                ? 'bg-emerald-500/20 text-emerald-400' 
                : item.badge === 'Pro'
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-gray-800 text-gray-300'
              }
            `}>
              {item.badge}
            </span>
          )}
        </div>
        <p className={`
          text-xs mt-0.5 truncate
          ${isActive ? 'text-white' : 'text-white group-hover:text-white'}
        `}>
          {item.description}
        </p>
      </div>
      
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-blue-400 rounded-full" />
      )}
    </Link>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <div className="px-3 py-2 mb-2">
    <h3 className="text-xs font-semibold tracking-wider uppercase text-white">
      {title}
    </h3>
  </div>
);

// Move allItems outside component to prevent recreating on every render
const allItems = [
  ...navigationItems.main,
  ...navigationItems.salesTools,
  ...navigationItems.quickActions,
  ...navigationItems.development
];

export function EnterpriseNavigationV2({ children }: EnterpriseNavigationV2Props) {
  const router = useRouter();
  const pathname = usePathname();
  const logout = useLogout();
  const [activeItem, setActiveItem] = useState('revenue-intelligence');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  // Set active item based on current path
  useEffect(() => {
    const currentItem = allItems.find(item => item.href === pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    }
  }, [pathname]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className={`
        bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-200 ease-out relative
        before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-600/5 before:to-purple-600/5 before:pointer-events-none
        ${sidebarCollapsed ? 'w-16' : 'w-72'}
      `}>
        {/* Header */}
        <div className="p-4 border-b border-slate-800 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg opacity-50"></div>
          <div className="relative">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">H&S</span>
              </div>
              {!sidebarCollapsed && (
                <div className="ml-3">
                  <h1 className="text-white font-semibold text-sm">Platform</h1>
                  <p className="text-white text-xs">Revenue Intelligence</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            >
              <ChevronRightIcon 
                className={`w-3.5 h-3.5 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'}`}
              />
            </button>
          </div>
          </div>
          
          {!sidebarCollapsed && (
            <div className="mt-4">
              <div className="relative">
                <MagnifyingGlassIcon className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                <input
                  type="text"
                  placeholder="Search materials, data..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-6">
            {/* MAIN */}
            <div>
              {!sidebarCollapsed && <SectionHeader title="MAIN" />}
              <div className="space-y-1 px-2">
                {navigationItems.main.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={setActiveItem}
                  />
                ))}
              </div>
            </div>

            {/* SALES TOOLS */}
            <div>
              {!sidebarCollapsed && <SectionHeader title="SALES TOOLS" />}
              <div className="space-y-1 px-2">
                {navigationItems.salesTools.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={setActiveItem}
                  />
                ))}
              </div>
            </div>

            {/* QUICK ACTIONS */}
            <div>
              {!sidebarCollapsed && <SectionHeader title="QUICK ACTIONS" />}
              <div className="space-y-1 px-2">
                {navigationItems.quickActions.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={setActiveItem}
                  />
                ))}
              </div>
            </div>

            {/* DEVELOPMENT */}
            <div>
              {!sidebarCollapsed && <SectionHeader title="DEVELOPMENT" />}
              <div className="space-y-1 px-2">
                {navigationItems.development.map((item) => (
                  <NavItem
                    key={item.id}
                    item={item}
                    isActive={activeItem === item.id}
                    onClick={setActiveItem}
                  />
                ))}
              </div>
            </div>
          </nav>
        </div>

        {/* Footer */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-slate-800 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5"></div>
            <div className="relative">
            <div className="flex items-center justify-between text-xs text-white mb-3">
              <span>Customer ID: CUST_2</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mr-1"></div>
                <span className="text-white">Live</span>
              </div>
            </div>
            <div className="space-y-1">
              <Link
                href="/settings"
                className="flex items-center px-3 py-2 text-sm font-medium text-white rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
              >
                <Cog6ToothIcon className="h-4 w-4 mr-3 text-white" />
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-white rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
              >
                <UserCircleIcon className="h-4 w-4 mr-3 text-white" />
                Logout
              </button>
            </div>
          </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5"></div>
          <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <h1 className="text-xl font-semibold text-white mr-8">Revenue Intelligence</h1>
              <div className="max-w-md w-full">
                <div className="relative">
                  <MagnifyingGlassIcon className="w-4.5 h-4.5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                  <input
                    type="text"
                    placeholder="Search materials, customers, data..."
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-700 bg-gray-800 rounded-lg text-white text-sm placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <PlusIcon className="w-4 h-4 mr-2" />
                Quick Actions
              </button>
              
              <button className="relative p-2 text-white hover:text-white transition-colors">
                <BellIcon className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button className="p-2 text-white hover:text-white transition-colors">
                <Cog6ToothIcon className="w-5 h-5" />
              </button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-slate-700">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <UserCircleIcon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-white">Sarah C.</span>
              </div>
            </div>
          </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
}