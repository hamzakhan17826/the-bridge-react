import * as React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbPublicSiteButton,
  BreadcrumbSeparator,
  useBreadcrumb,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
// import { ModeToggle } from '@/components/mode-toggle';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <DashboardContent />
    </SidebarProvider>
  );
}

function DashboardContent() {
  const { items } = useBreadcrumb();
  const { setOpenMobile, isMobile } = useSidebar();
  const location = useLocation();

  // Close mobile sidebar when navigating to a new page
  React.useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [location.pathname, isMobile, setOpenMobile]);

  const handleContentClick = (event: React.MouseEvent) => {
    // Don't close sidebar if clicking on interactive elements
    const target = event.target as HTMLElement;
    const isInteractive = target.closest(
      '[data-sidebar-trigger], button, a, input, select, textarea'
    );

    if (isMobile && !isInteractive) {
      setOpenMobile(false);
    }
  };

  return (
    <SidebarInset onClick={handleContentClick}>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 flex-1">
          <SidebarTrigger className="-ml-1" data-sidebar-trigger />
          {/* <ModeToggle /> */}
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {index > 0 && (
                    <BreadcrumbSeparator className="hidden md:block" />
                  )}
                  <BreadcrumbItem className="hidden md:block">
                    {item.href ? (
                      <Link to={item.href}>
                        <BreadcrumbLink>{item.label}</BreadcrumbLink>
                      </Link>
                    ) : (
                      <BreadcrumbPage>{item.label}</BreadcrumbPage>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="px-4">
          <BreadcrumbPublicSiteButton
            onClick={() => window.open('/', '_blank')}
          >
            Visit The Bridge
          </BreadcrumbPublicSiteButton>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <Outlet />
      </div>
    </SidebarInset>
  );
}
