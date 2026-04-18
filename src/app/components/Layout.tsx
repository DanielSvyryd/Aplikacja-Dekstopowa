import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  MessageSquareCode,
  Github,
  HandHelping,
  ChevronRight,
  Search,
  User,
  HelpCircle,
  Moon,
  Sun,
  LogOut,
  Globe,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { studentProfile } from "./mock-data";
import { MessagesPopup } from "./MessagesPopup";
import { SupportButton } from "./SupportButton";
import { useApp } from "../contexts/AppContext";
import { translations } from "../utils/translations";

const navItems = [
  { path: "/", label: "dashboard", icon: LayoutDashboard },
  { path: "/homework", label: "homework", icon: BookOpen },
  { path: "/attendance", label: "attendance", icon: CalendarCheck },
  { path: "/grades", label: "grades", icon: GraduationCap },
  { path: "/activity", label: "activity", icon: HandHelping },
  { path: "/github", label: "github", icon: Github },
  { path: "/code-review", label: "codeReview", icon: MessageSquareCode },
  { path: "/profile", label: "profile", icon: User },
  { path: "/faq", label: "faq", icon: HelpCircle },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme, language, setLanguage, logout } = useApp();
  const t = translations[language];
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const currentPage = navItems.find(
    (item) =>
      item.path === location.pathname ||
      (item.path !== "/" && location.pathname.startsWith(item.path))
  );
  const pageTitle = currentPage ? t[currentPage.label as keyof typeof t] as string : t.dashboard;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 bg-sidebar text-sidebar-foreground flex flex-col">
        {/* Logo */}
        <div className="px-6 py-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h3 className="text-sm text-sidebar-foreground">ProgressTrack</h3>
            <p className="text-xs text-sidebar-foreground/50">Student Portal</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          <p className="px-3 py-2 text-xs text-sidebar-foreground/40 uppercase tracking-wider">
            {t.menu}
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 group ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className="w-[18px] h-[18px]" />
                  <span className="flex-1">{t[item.label as keyof typeof t] as string}</span>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-60" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              <div className="flex items-center gap-3 hover:bg-sidebar-accent rounded-lg p-2 transition-colors cursor-pointer">
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src={studentProfile.avatar}
                    alt={studentProfile.name}
                  />
                  <AvatarFallback>
                    {studentProfile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm text-sidebar-foreground truncate">
                    {studentProfile.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/50 truncate">
                    {studentProfile.id}
                  </p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>{studentProfile.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="w-4 h-4 mr-2" />
                {t.profile}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 flex-shrink-0 bg-card border-b border-border flex items-center justify-between px-8">
          <div>
            <h1 className="text-lg text-foreground">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div
              className="relative"
              onMouseEnter={() => setSearchExpanded(true)}
              onMouseLeave={() => {
                if (!searchQuery) setSearchExpanded(false);
              }}
            >
              {searchExpanded ? (
                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 h-9 animate-in fade-in-0 slide-in-from-right-2 duration-200">
                  <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <Input
                    type="text"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent h-7 p-0 focus-visible:ring-0 focus-visible:ring-offset-0 w-48"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSearchExpanded(false);
                      }}
                      className="flex-shrink-0 transition-colors"
                    >
                      <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </button>
                  )}
                </div>
              ) : (
                <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent transition-colors">
                  <Search className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Messages */}
            <MessagesPopup onHoverPreview />

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-accent transition-colors">
                  {theme === "dark" ? (
                    <Moon className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Sun className="w-4 h-4 text-muted-foreground" />
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="px-2 py-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="dark-mode" className="cursor-pointer">
                      {t.darkMode}
                    </Label>
                    <Switch
                      id="dark-mode"
                      checked={theme === "dark"}
                      onCheckedChange={toggleTheme}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t.language}</Label>
                    <Select
                      value={language}
                      onValueChange={(value) => setLanguage(value as "en" | "pl")}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="pl">Polski</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="w-px h-8 bg-border" />

            {/* User Avatar */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/profile")}>
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src={studentProfile.avatar}
                  alt={studentProfile.name}
                />
                <AvatarFallback>
                  {studentProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-foreground">
                {studentProfile.name}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>

      {/* Support Button */}
      <SupportButton />
    </div>
  );
}
