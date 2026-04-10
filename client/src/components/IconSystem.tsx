import { 
  Newspaper, Briefcase, BookOpen, Lightbulb, Scale, TrendingUp, 
  GraduationCap, Zap, Grid3x3, Users, MessageSquare, Share2,
  Search, Star, Home, Menu, X, ChevronRight, ChevronLeft,
  ArrowRight, Filter, Download, Share, Heart, Eye, Clock,
  BarChart3, PieChart, LineChart, Activity, Settings, Bell,
  User, LogOut, LogIn, Plus, Edit, Trash2, Check, AlertCircle,
  Code, Database, Server, Cloud, Cpu, Microscope, Rocket,
  Globe, Map, Compass, Layers, Lock, Unlock, Shield
} from "lucide-react";

// Professional icon wrapper with consistent styling
export const IconWrapper = ({ icon: Icon, className = "", size = 24 }: { icon: any; className?: string; size?: number }) => (
  <Icon className={`w-${size} h-${size} ${className}`} strokeWidth={1.5} />
);

// Icon mapping for sections
export const SECTION_ICONS = {
  news: Newspaper,
  careers: Briefcase,
  research: BookOpen,
  ideas: Lightbulb,
  ethics: Scale,
  trends: TrendingUp,
  learning: GraduationCap,
  benchmarks: BarChart3,
  domains: Globe,
  tools: Grid3x3,
  usecases: Compass,
  community: Users,
  discussions: MessageSquare,
  submit: Share2,
  search: Search,
  rating: Star,
  home: Home,
  menu: Menu,
  close: X,
  next: ChevronRight,
  prev: ChevronLeft,
  arrow: ArrowRight,
  filter: Filter,
  download: Download,
  share: Share,
  like: Heart,
  view: Eye,
  time: Clock,
  chart: BarChart3,
  pie: PieChart,
  line: LineChart,
  activity: Activity,
  settings: Settings,
  notification: Bell,
  profile: User,
  logout: LogOut,
  login: LogIn,
  add: Plus,
  edit: Edit,
  delete: Trash2,
  check: Check,
  alert: AlertCircle,
  code: Code,
  database: Database,
  server: Server,
  cloud: Cloud,
  processor: Cpu,
  microscope: Microscope,
  rocket: Rocket,
  map: Map,
  layers: Layers,
  security: Lock,
  unlock: Unlock,
  shield: Shield,
};

// Professional color palette (single purple theme)
export const ICON_COLORS = {
  primary: "text-purple-500",
  secondary: "text-purple-400",
  muted: "text-gray-500",
  success: "text-green-500",
  warning: "text-yellow-500",
  danger: "text-red-500",
  info: "text-blue-500",
};

// Icon component with professional styling
export function ProfessionalIcon({ 
  name, 
  color = "primary", 
  size = 24,
  className = ""
}: { 
  name: keyof typeof SECTION_ICONS; 
  color?: keyof typeof ICON_COLORS;
  size?: number;
  className?: string;
}) {
  const Icon = SECTION_ICONS[name];
  if (!Icon) return null;

  return (
    <Icon 
      className={`w-${size} h-${size} ${ICON_COLORS[color]} ${className}`}
      strokeWidth={1.5}
    />
  );
}

// Icon grid for display
export function IconGrid() {
  return (
    <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4">
      {Object.entries(SECTION_ICONS).map(([name, Icon]) => (
        <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-900 transition-colors">
          <Icon className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
          <span className="text-xs text-gray-400 text-center">{name}</span>
        </div>
      ))}
    </div>
  );
}
