import { ChevronRight, type LucideIcon } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();

  const isUrlActive = useCallback(
    (url: string, exact = false) => {
      if (exact || url === '/' || url === '/dashboard') {
        return location.pathname === url;
      }
      return location.pathname.startsWith(url);
    },
    [location.pathname]
  );

  // Initialize state based on current URL to avoid layout shift and cascading renders
  const [openSection, setOpenSection] = useState<string | null>(() => {
    const activeItem = items.find(
      (item) =>
        isUrlActive(item.url) ||
        item.items?.some((subItem) => isUrlActive(subItem.url))
    );
    return activeItem?.title || null;
  });

  // Only update open section if URL changes to a different functional area
  useEffect(() => {
    const activeItem = items.find(
      (item) =>
        isUrlActive(item.url) ||
        item.items?.some((subItem) => isUrlActive(subItem.url))
    );

    if (activeItem && activeItem.title !== openSection) {
      setOpenSection(activeItem.title);
    }
    // We specifically want to react to pathname and items changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, items, isUrlActive]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isParentActive =
            isUrlActive(item.url) ||
            item.items?.some((subItem) => isUrlActive(subItem.url));

          const isOpen = openSection === item.title;

          return (
            <Collapsible
              key={item.title}
              asChild
              open={isOpen}
              onOpenChange={(open) => {
                if (open) {
                  setOpenSection(item.title);
                } else if (openSection === item.title) {
                  setOpenSection(null);
                }
              }}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isParentActive}
                    className="data-[active=true]:bg-gray-200 data-[active=true]:font-bold"
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={isUrlActive(subItem.url, true)}
                          className="data-[active=true]:bg-gray-100 data-[active=true]:text-primary data-[active=true]:font-semibold"
                        >
                          <Link to={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
