'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Bot,
  Calendar,
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
import { useAuthUser } from '@/hooks/useAuthUser';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: authUser, isAdmin, hasMembershipTier } = useAuthUser();
  const isProfessionalMedium = hasMembershipTier('PROFESSIONALMEDIUM');
  const canManageContent = isAdmin || isProfessionalMedium;

  // Create user object from auth store
  const user = authUser
    ? {
        name:
          authUser.firstName && authUser.lastName
            ? `${authUser.firstName} ${authUser.lastName}`
            : authUser.userName || 'User',
        email: authUser.email,
        avatar: authUser.profilePictureUrl || '/images/team/default-avatar.png',
      }
    : {
        name: 'Spiritual Seeker',
        email: 'seeker@thebridge.com',
        avatar: '/images/team/default-avatar.png',
      };

  const data = {
    user,
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
            title: 'Overview',
            url: '/dashboard/membership/overview',
          },
          {
            title: 'Upgrade Account',
            url: '/dashboard/membership',
          },
          {
            title: 'Order History',
            url: '/dashboard/membership/orders',
          },
        ],
      },
      ...(isProfessionalMedium
        ? [
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
          ]
        : []),
      ...(canManageContent
        ? [
            {
              title: 'Events',
              url: '/dashboard/events/create',
              icon: Calendar,
              items: [
                {
                  title: 'Event List',
                  url: '/dashboard/events',
                },
                {
                  title: 'Create Event',
                  url: '/dashboard/events/create',
                },
              ],
            },
            {
              title: 'Books',
              url: '/dashboard/books/create',
              icon: SquareTerminal,
              items: [
                {
                  title: 'My Books',
                  url: '/dashboard/books',
                },
                {
                  title: 'Create Book',
                  url: '/dashboard/books/create',
                },
              ],
            },
            {
              title: 'Blogs',
              url: '/dashboard/blogs/create',
              icon: Command,
              items: [
                {
                  title: 'My Blogs',
                  url: '/dashboard/blogs',
                },
                {
                  title: 'Create Blog',
                  url: '/dashboard/blogs/create',
                },
              ],
            },
          ]
        : []),
      ...(canManageContent
        ? [
            {
              title: 'Podcasts',
              url: '/dashboard/podcasts',
              icon: Calendar,
              items: [
                {
                  title: 'Create Podcast',
                  url: '/dashboard/add-podcast',
                },
              ],
            },
          ]
        : []),
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
                  url: '/dashboard/orders-history',
                },
                {
                  title: 'Send Emails',
                  url: '/dashboard/send-emails',
                },
                {
                  title: 'User Memberships',
                  url: '/dashboard/user-memberships',
                },
                {
                  title: 'Tags Management',
                  url: '/dashboard/tags',
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
