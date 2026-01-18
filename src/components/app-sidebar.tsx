'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { getCookie } from '@/lib/auth';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userRoleCookie = getCookie('userRole');
  let userRoles: string[] = [];

  if (userRoleCookie) {
    try {
      // Try to parse as JSON array
      const parsed = JSON.parse(userRoleCookie);
      userRoles = Array.isArray(parsed) ? parsed : [userRoleCookie];
    } catch {
      // If not JSON, treat as single role string
      userRoles = [userRoleCookie];
    }
  }

  const isAdmin = userRoles.includes('admin');
  // console.log('User Roles in Sidebar:', userRoles, 'Is Admin:', isAdmin);
  const data = {
    user: {
      name: 'Spiritual Seeker',
      email: 'seeker@thebridge.com',
      avatar: '/images/team/default-avatar.png',
    },
    teams: [
      {
        name: 'The Bridge',
        logo: GalleryVerticalEnd,
        plan: 'Spiritual Platform',
      },
      {
        name: 'Medium Community',
        logo: AudioWaveform,
        plan: 'Connected',
      },
      {
        name: 'Spiritual Network',
        logo: Command,
        plan: 'Active',
      },
    ],
    navMain: [
      {
        title: 'Home',
        url: '/',
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: 'Dashboard',
            url: '/dashboard',
          },
        ],
      },
      {
        title: 'Profile',
        url: '/dashboard/profile',
        icon: Bot,
        items: [
          {
            title: 'My Profile',
            url: '/dashboard/profile',
          },
        ],
      },
      {
        title: 'Membership',
        url: '/dashboard/membership',
        icon: Settings2,
        items: [
          {
            title: 'Upgrade Account',
            url: '/dashboard/membership',
          },
        ],
      },
      {
        title: 'Professional Medium',
        url: '/dashboard/pm/onboarding',
        icon: Settings2,
        items: [
          { title: 'Onboarding', url: '/dashboard/pm/onboarding' },
          { title: 'Bookings', url: '/dashboard/pm/bookings' },
          { title: 'Schedule', url: '/dashboard/pm/schedule' },
          { title: 'Services', url: '/dashboard/pm/services' },
          { title: 'Earnings', url: '/dashboard/pm/earnings' },
          { title: 'Payout', url: '/dashboard/pm/payout' },
        ],
      },
      ...(isAdmin
        ? [
            {
              title: 'Admin',
              url: '/dashboard/activity-logs',
              icon: Settings2,
              items: [
                {
                  title: 'Activity Logs',
                  url: '/dashboard/activity-logs',
                },
                {
                  title: 'User Management',
                  url: '/dashboard/users',
                },
                {
                  title: 'Orders History',
                  url: '/dashboard/admin/orders-history',
                },
              ],
            },
          ]
        : []),
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
