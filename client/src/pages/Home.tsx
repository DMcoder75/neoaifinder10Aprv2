import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, X, ArrowRight, Heart, Share2, Eye, Newspaper, Briefcase, BookOpen, Lightbulb, Scale, TrendingUp, GraduationCap, BarChart3, Globe, Compass, Users, MessageSquare, Plus, Star, Zap, Sparkles, Flame } from "lucide-react";
import { VISIONARY_POSSIBILITIES, AI_TOOLS, AI_CATEGORIES } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-hero-main-c8UKjevBuE7vwGbmCHQkSK.webp";

// Professional Icon Mapping
const SECTION_ICONS = {
  news: Newspaper,
  careers: Briefcase,
  research: BookOpen,
  ideas: Lightbulb,
  ethics: Scale,
  trends: TrendingUp,
  learning: GraduationCap,
  benchmarks: BarChart3,
  domains: Globe,
  tools: Compass,
  usecases: Users,
  community: MessageSquare,
  submit: Plus,
};

const AI_DOMAINS = [
  { id: "llms", name: "LLMs", tools: 8 },
  { id: "vision", name: "Vision", tools: 7 },
  { id: "video", name: "Video", tools: 6 },
  { id: "audio", name: "Audio", tools: 5 },
  { id: "code", name: "Code Gen", tools: 6 },
  { id: "search", name: "Search", tools: 4 },
  { id: "healthcare", name: "Healthcare", tools: 5 },
  { id: "finance", name: "Finance", tools: 5 },
  { id: "marketing", name: "Marketing", tools: 6 },
  { id: "education", name: "Education", tools: 5 },
  { id: "robotics", name: "Robotics", tools: 4 },
  { id: "quantum", name: "Quantum", tools: 3 },
];

const AI_NEWS = [
  { id: 1, title: "GPT-5 Rumors: What We Know So Far", category: "LLMs", date: "Today", views: 2400, trending: true },
  { id: 2, title: "Midjourney v7 Releases with Real-time Generation", category: "Image AI", date: "Yesterday", views: 1800 },
  { id: 3, title: "OpenAI Announces New Reasoning Capabilities", category: "AI Research", date: "2 days ago", views: 3200, trending: true },
];

const AI_CAREERS = [
  { id: 1, title: "AI Prompt Engineer", salary: "$120K-180K", demand: "Very High", skills: 3, companies: 500 },
  { id: 2, title: "ML Engineer", salary: "$150K-250K", demand: "Very High", skills: 5, companies: 1200 },
  { id: 3, title: "AI Product Manager", salary: "$140K-220K", demand: "High", skills: 4, companies: 800 },
];

const AI_RESEARCH_PAPERS = [
  { id: 1, title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, citations: 85000 },
  { id: 2, title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: 2018, citations: 45000 },
  { id: 3, title: "Generative Adversarial Networks", authors: "Goodfellow et al.", year: 2014, citations: 68000 },
];

const AI_STARTUP_IDEAS = [
  { id: 1, title: "AI-Powered Legal Document Review", market: "$50B", difficulty: "Medium" },
  { id: 2, title: "Real-time AI Translation for Meetings", market: "$30B", difficulty: "Hard" },
  { id: 3, title: "Personalized AI Health Coach", market: "$100B", difficulty: "Very Hard" },
];

const AI_ETHICS_TOPICS = [
  { id: 1, title: "AI Bias & Fairness", concern: "Critical" },
  { id: 2, title: "Privacy & Data Protection", concern: "Critical" },
  { id: 3, title: "Transparency & Explainability", concern: "High" },
];

const USE_CASES = [
  { id: 1, name: "Content Creation", tools: 12 },
  { id: 2, name: "Code Development", tools: 8 },
  { id: 3, name: "Design & Prototyping", tools: 7 },
  { id: 4, name: "Data Analysis", tools: 6 },
  { id: 5, name: "Customer Support", tools: 5 },
  { id: 6, name: "Marketing", tools: 8 },
  { id: 7, name: "Video Production", tools: 5 },
  { id: 8, name: "Research", tools: 7 },
];

const TRENDING_TOOLS = [
  { id: 1, name: "ChatGPT", category: "LLM", views: 15000, trend: "+45%" },
  { id: 2, name: "Midjourney", category: "Image", views: 12000, trend: "+32%" },
  { id: 3, name: "Claude", category: "LLM", views: 11000, trend: "+28%" },
];

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVisionaryId, setSelectedVisionaryId] = useState<number | null>(null);

  const filteredTools = AI_TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedVisionary = VISIONARY_POSSIBILITIES.find((v) => v.id === selectedVisionaryId);

  const renderIcon = (iconKey: string) => {
    const Icon = SECTION_ICONS[iconKey as keyof typeof SECTION_ICONS];
    return Icon ? <Icon className="w-5 h-5 text-purple-400" strokeWidth={1.5} /> : null;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-[65vh] overflow-hidden">
        <img src={HERO_IMAGE} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black"></div>

        <div className="relative h-full flex flex-col justify-center items-center text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 text-sm font-semibold">Discover the Future of AI</span>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Neoaifinder
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore 1000+ AI tools, 67 domains, and the future of artificial intelligence
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
              <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 text-lg">Explore Tools</Button>
              <Button variant="outline" className="border-purple-500 px-8 py-3 text-lg">Learn More</Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 text-sm">
              <div><div className="text-2xl font-bold text-purple-400">1000+</div><div className="text-gray-400 text-xs">Tools</div></div>
              <div><div className="text-2xl font-bold text-purple-400">67</div><div className="text-gray-400 text-xs">Domains</div></div>
              <div><div className="text-2xl font-bold text-purple-400">50+</div><div className="text-gray-400 text-xs">Possibilities</div></div>
              <div><div className="text-2xl font-bold text-purple-400">100K+</div><div className="text-gray-400 text-xs">Reviews</div></div>
              <div><div className="text-2xl font-bold text-purple-400">500K+</div><div className="text-gray-400 text-xs">Users</div></div>
              <div><div className="text-2xl font-bold text-purple-400">24/7</div><div className="text-gray-400 text-xs">Updates</div></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 space-y-20">

        {/* TRENDING TOOLS - MOVED UP */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Flame className="w-5 h-5 text-red-400" />
              <h2 className="text-3xl font-bold">Trending Now</h2>
            </div>
            <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRENDING_TOOLS.map((tool) => (
              <Card key={tool.id} className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                  <Badge className="bg-red-500/20 text-red-300 text-xs">{tool.trend}</Badge>
                </div>
                <p className="text-sm text-gray-400 mb-3">{tool.category}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {tool.views.toLocaleString()}</span>
                  <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* AI TOOLS DIRECTORY - MOVED UP */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              {renderIcon("tools")}
              <h2 className="text-3xl font-bold">AI Tools Directory</h2>
            </div>

            {/* Search and Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search 1000+ tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="rounded-full text-xs"
                >
                  All
                </Button>
                {AI_CATEGORIES.map((cat) => (
                  <Button
                    key={cat.id}
                    size="sm"
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat.id)}
                    className="rounded-full text-xs"
                  >
                    {cat.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.slice(0, 12).map((tool) => (
              <Card key={tool.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all group p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                    <Badge className="text-xs mt-1 bg-purple-500/20 text-purple-300">{tool.category}</Badge>
                  </div>
                  <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                </div>
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{tool.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>⭐ {tool.rating} ({tool.reviews})</span>
                  <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-purple-600 hover:bg-purple-700">View All {filteredTools.length} Tools</Button>
          </div>
        </motion.section>

        {/* AI DOMAINS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {renderIcon("domains")}
              <h2 className="text-3xl font-bold">AI Domains</h2>
            </div>
            <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {AI_DOMAINS.map((domain) => (
              <Card key={domain.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-3 text-center">
                <h3 className="font-bold text-sm mb-1 group-hover:text-purple-400 transition-colors">{domain.name}</h3>
                <p className="text-xs text-gray-500">{domain.tools} tools</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* AI NEWS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {renderIcon("news")}
              <h2 className="text-3xl font-bold">AI News & Breakthroughs</h2>
            </div>
            <button onClick={() => setLocation("/ai-news")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_NEWS.map((news) => (
              <Card key={news.id} onClick={() => setLocation("/ai-news")} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="text-xs bg-purple-500/20 text-purple-300">{news.category}</Badge>
                  {news.trending && <Badge className="text-xs bg-red-500/20 text-red-300">Trending</Badge>}
                </div>
                <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">{news.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{news.date}</span>
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {news.views}</span>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* AI CAREERS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {renderIcon("careers")}
              <h2 className="text-3xl font-bold">AI Careers & Opportunities</h2>
            </div>
            <button onClick={() => setLocation("/ai-careers")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_CAREERS.map((career) => (
              <Card key={career.id} onClick={() => setLocation("/ai-careers")} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4">
                <h3 className="font-bold mb-3 group-hover:text-purple-400 transition-colors">{career.title}</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-400">Salary:</span> <span className="text-green-400 font-bold">{career.salary}</span></div>
                  <div><span className="text-gray-400">Demand:</span> <span className="text-purple-400 font-bold">{career.demand}</span></div>
                  <div><span className="text-gray-400">Companies:</span> <span className="text-blue-400 font-bold">{career.companies}+</span></div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* RESEARCH PAPERS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {renderIcon("research")}
              <h2 className="text-3xl font-bold">Groundbreaking Research Papers</h2>
            </div>
            <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_RESEARCH_PAPERS.map((paper) => (
              <Card key={paper.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4">
                <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">{paper.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{paper.authors}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{paper.year}</span>
                  <span>{paper.citations.toLocaleString()} citations</span>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* STARTUP IDEAS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {renderIcon("ideas")}
              <h2 className="text-3xl font-bold">AI Startup Ideas</h2>
            </div>
            <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_STARTUP_IDEAS.map((idea) => (
              <Card key={idea.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4">
                <h3 className="font-bold mb-3 group-hover:text-purple-400 transition-colors">{idea.title}</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="text-gray-400">Market:</span> <span className="text-green-400 font-bold">{idea.market}</span></div>
                  <div><span className="text-gray-400">Difficulty:</span> <span className="text-yellow-400 font-bold">{idea.difficulty}</span></div>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* USE CASES SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {renderIcon("usecases")}
              <h2 className="text-3xl font-bold">Use Cases Explorer</h2>
            </div>
            <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {USE_CASES.map((usecase) => (
              <Card key={usecase.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4">
                <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors">{usecase.name}</h3>
                <p className="text-xs text-gray-500">{usecase.tools} tools</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* AI ETHICS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              {renderIcon("ethics")}
              <h2 className="text-3xl font-bold">AI Ethics & Responsibility</h2>
            </div>
            <button onClick={() => setLocation("/")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AI_ETHICS_TOPICS.map((topic) => (
              <Card key={topic.id} className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4">
                <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors">{topic.title}</h3>
                <Badge className={`text-xs ${topic.concern === "Critical" ? "bg-red-500/20 text-red-300" : "bg-yellow-500/20 text-yellow-300"}`}>
                  {topic.concern}
                </Badge>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* VISIONARY POSSIBILITIES */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-400" />
              <h2 className="text-3xl font-bold">50+ Visionary AI Possibilities</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VISIONARY_POSSIBILITIES.slice(0, 12).map((possibility) => (
              <Card
                key={possibility.id}
                onClick={() => setSelectedVisionaryId(possibility.id)}
                className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-4"
              >
                <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">{possibility.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{possibility.description}</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* COMMUNITY SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-500/30 p-6 cursor-pointer hover:border-purple-500/50 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                {renderIcon("community")}
                <h3 className="font-bold text-lg">Community Discussions</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Join conversations about AI tools and trends</p>
              <Button variant="outline" className="w-full text-xs">Join Now</Button>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-500/30 p-6 cursor-pointer hover:border-purple-500/50 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                {renderIcon("learning")}
                <h3 className="font-bold text-lg">Learning Hub</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Master AI tools with tutorials and guides</p>
              <Button variant="outline" className="w-full text-xs">Explore</Button>
            </Card>

            <Card className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-500/30 p-6 cursor-pointer hover:border-purple-500/50 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                {renderIcon("submit")}
                <h3 className="font-bold text-lg">Submit Tool</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Found a new AI tool? Share it with us</p>
              <Button variant="outline" className="w-full text-xs">Submit</Button>
            </Card>
          </div>
        </motion.section>
      </div>

      {/* VISIONARY MODAL */}
      <AnimatePresence>
        {selectedVisionaryId && selectedVisionary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVisionaryId(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">{selectedVisionary.title}</h2>
                <button onClick={() => setSelectedVisionaryId(null)} className="text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-300">{selectedVisionary.description}</p>

                {selectedVisionary.possibilities && (
                  <div>
                    <h3 className="font-bold mb-2">Key Possibilities:</h3>
                    <ul className="space-y-1 text-sm text-gray-400">
                      {selectedVisionary.possibilities.map((p, idx) => (
                        <li key={idx}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedVisionary.poweredBy && (
                  <div>
                    <h3 className="font-bold mb-2">Powered By:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedVisionary.poweredBy.map((tool, idx) => (
                        <Badge key={idx} className="bg-purple-500/20 text-purple-300">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
