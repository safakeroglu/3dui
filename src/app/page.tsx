import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Scene3D from "@/components/Scene3D"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#121212] text-white overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0">
        <Scene3D />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed w-full top-4 z-50 px-4">
        <div className="container mx-auto max-w-[70%]">
          <div className="bg-gradient-to-r from-black/90 to-zinc-800/90 backdrop-blur-md border border-white/10 rounded-full shadow-lg shadow-black/10">
            <div className="px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-8">
                <h1 className="text-xl font-bold">Spline</h1>
                <NavigationMenu>
                  <NavigationMenuList className="hidden md:flex gap-6">
                    <NavigationMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white/80">
                          Product <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gradient-to-b from-zinc-900/70 to-zinc-800/70 backdrop-blur-sm border-white/10">
                          <DropdownMenuItem className="hover:bg-white/5">3D Design Tools</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Real-time Collaboration</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Asset Library</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Export Options</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Version Control</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Integrations</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white/80">
                          Resources <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gradient-to-b from-zinc-900/70 to-zinc-800/70 backdrop-blur-sm border-white/10">
                          <DropdownMenuItem className="hover:bg-white/5">Getting Started Guide</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Video Tutorials</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">API Documentation</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Best Practices</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Case Studies</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Developer Resources</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 hover:text-white/80">
                          Community <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-gradient-to-b from-zinc-900/70 to-zinc-800/70 backdrop-blur-sm border-white/10">
                          <DropdownMenuItem className="hover:bg-white/5">Discord Community</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">User Showcase</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Events & Meetups</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Community Blog</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Feature Requests</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-white/5">Support Forum</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <NavigationMenuLink className="hover:text-white/80">Pricing</NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" className="text-white hover:bg-white/10">Log In</Button>
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-full">Get Started</Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Spline, a place to design and collaborate in 3D
          </h2>
          <div className="flex justify-center gap-8 mb-8">
            <span className="text-white/80">Web-Based</span>
            <span className="text-white/80">Real-time</span>
            <span className="text-white/80">Collaborative</span>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600 text-lg px-8 py-6 rounded-full">
            Get started — it's free
          </Button>
          <p className="mt-4 text-white/60">Press and drag to orbit</p>
        </div>
      </section>
    </main>
  )
}
