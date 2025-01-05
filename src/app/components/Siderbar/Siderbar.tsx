 

import * as React from "react";
import { Search, Home, Film, Settings, ChevronRight, Newspaper, DollarSign, Cloud } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const BeautifulSidebar = async () => {
  const session = await getServerSession(options);
  return (
    <Sidebar className="border-r bg-background">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ChevronRight className="h-4 w-4" />
          </div>
          <span className="text-lg font-semibold">MyApp</span>
        </div>
        {/* <div className="px-4 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="h-9 pl-8" />
          </div>
        </div> */}
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/weather">
                <Button variant="ghost" className="w-full justify-start">
                  <Cloud className="mr-2 h-4 w-4" />
                  Weather
                </Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/news">
                <Button variant="ghost" className="w-full justify-start">
                  <Newspaper className="mr-2 h-4 w-4" />
                  News
                </Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/finance">
                <Button variant="ghost" className="w-full justify-start">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Finance
                </Button>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 p-4">
          <Avatar>
            <AvatarImage src="xyz" alt="User" />
            <AvatarFallback>{":)"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{session?.user?.name}</span>
            <span className="text-xs text-muted-foreground">
              {session?.user?.name}@gmail.com
            </span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default BeautifulSidebar;
