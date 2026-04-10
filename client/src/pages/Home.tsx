import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, TrendingUp, ChevronDown, X, Sparkles, Zap, Flame, Award, Users, MessageSquare, BookOpen, Globe, Lightbulb, ArrowRight, Heart, Share2, Eye, Code, Palette, Brain, Zap as ZapIcon, Rocket, Target, Briefcase, TrendingDown, BarChart3, Cpu, Database, Shield, Microscope, Coins, Layers, Gauge, AlertCircle, CheckCircle, Lock, Unlock, GitBranch, Workflow, Wand2, Compass, Map, Telescope } from "lucide-react";
import { VISIONARY_POSSIBILITIES, AI_TOOLS, AI_CATEGORIES } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-hero-main-c8UKjevBuE7vwGbmCHQkSK.webp";

// ==================== EXPANDED AI DOMAINS ====================
const AI_DOMAINS = [
  { id: "llms", name: "Large Language Models", icon: "🧠", color: "from-purple-500 to-purple-600", tools: 8, description: "ChatGPT, Claude, Gemini, Llama - Advanced text generation and reasoning" },
  { id: "vision", name: "Image & Vision AI", icon: "🎨", color: "from-pink-500 to-pink-600", tools: 7, description: "DALL-E, Midjourney, Stable Diffusion - Create and understand images" },
  { id: "video", name: "Video Generation", icon: "🎬", color: "from-red-500 to-red-600", tools: 6, description: "Runway, Synthesia, Pika - Generate and edit videos with AI" },
  { id: "audio", name: "Audio & Voice", icon: "🎵", color: "from-blue-500 to-blue-600", tools: 5, description: "ElevenLabs, Suno - Voice cloning and music generation" },
  { id: "code", name: "Code Generation", icon: "💻", color: "from-green-500 to-green-600", tools: 6, description: "GitHub Copilot, Cursor - AI-powered development" },
  { id: "search", name: "Search & Discovery", icon: "🔍", color: "from-yellow-500 to-yellow-600", tools: 4, description: "Perplexity, You.com - Next-gen search engines" },
  { id: "healthcare", name: "Healthcare AI", icon: "⚕️", color: "from-red-500 to-rose-600", tools: 5, description: "Medical diagnosis, drug discovery, patient care" },
  { id: "finance", name: "Finance & Trading", icon: "💰", color: "from-emerald-500 to-emerald-600", tools: 5, description: "Predictive analytics, trading bots, risk management" },
  { id: "marketing", name: "Marketing Automation", icon: "📊", color: "from-orange-500 to-orange-600", tools: 6, description: "Content creation, personalization, analytics" },
  { id: "education", name: "EdTech & Learning", icon: "📚", color: "from-indigo-500 to-indigo-600", tools: 5, description: "Personalized tutoring, skill development" },
  { id: "robotics", name: "Robotics & Automation", icon: "🤖", color: "from-cyan-500 to-cyan-600", tools: 4, description: "Autonomous systems, manufacturing, logistics" },
  { id: "quantum", name: "Quantum Computing", icon: "⚛️", color: "from-violet-500 to-violet-600", tools: 3, description: "Next-gen computing power" },
];

// ==================== INNOVATIVE SECTIONS DATA ====================
const AI_NEWS = [
  { id: 1, title: "GPT-5 Rumors: What We Know So Far", category: "LLMs", date: "Today", views: 2400, likes: 340, trending: true },
  { id: 2, title: "Midjourney v7 Releases with Real-time Generation", category: "Image AI", date: "Yesterday", views: 1800, likes: 290 },
  { id: 3, title: "OpenAI Announces New Reasoning Capabilities", category: "AI Research", date: "2 days ago", views: 3200, likes: 520, trending: true },
  { id: 4, title: "DeepSeek Challenges ChatGPT with Faster Inference", category: "LLMs", date: "3 days ago", views: 2100, likes: 380 },
  { id: 5, title: "Google Gemini 2.0 Multimodal Breakthrough", category: "Multimodal", date: "4 days ago", views: 2900, likes: 450 },
];

const AI_CAREERS = [
  { id: 1, title: "AI Prompt Engineer", salary: "$120K-180K", demand: "🔥 Very High", skills: ["Prompt Design", "LLM Knowledge", "Creative Writing"], companies: 500 },
  { id: 2, title: "ML Engineer", salary: "$150K-250K", demand: "🔥 Very High", skills: ["Python", "TensorFlow", "Data Science"], companies: 1200 },
  { id: 3, title: "AI Product Manager", salary: "$140K-220K", demand: "📈 High", skills: ["Product Strategy", "AI Knowledge", "Analytics"], companies: 800 },
  { id: 4, title: "Data Scientist", salary: "$130K-200K", demand: "📈 High", skills: ["Statistics", "Python", "SQL"], companies: 950 },
  { id: 5, title: "AI Ethics Specialist", salary: "$110K-170K", demand: "📈 High", skills: ["Ethics", "Policy", "AI Knowledge"], companies: 300 },
];

const AI_RESEARCH_PAPERS = [
  { id: 1, title: "Attention Is All You Need", authors: "Vaswani et al.", year: 2017, citations: 85000, field: "Transformers", impact: "🌟🌟🌟🌟🌟" },
  { id: 2, title: "BERT: Pre-training of Deep Bidirectional Transformers", authors: "Devlin et al.", year: 2018, citations: 45000, field: "NLP", impact: "🌟🌟🌟🌟🌟" },
  { id: 3, title: "Generative Adversarial Networks", authors: "Goodfellow et al.", year: 2014, citations: 68000, field: "Image Generation", impact: "🌟🌟🌟🌟🌟" },
  { id: 4, title: "Deep Residual Learning for Image Recognition", authors: "He et al.", year: 2015, citations: 92000, field: "Computer Vision", impact: "🌟🌟🌟🌟🌟" },
];

const AI_STARTUP_IDEAS = [
  { id: 1, title: "AI-Powered Legal Document Review", market: "$50B Legal Tech", difficulty: "Medium", potential: "🚀 High", description: "Automate contract review and legal research" },
  { id: 2, title: "Real-time AI Translation for Meetings", market: "$30B Communication", difficulty: "Hard", potential: "🚀 Very High", description: "Live translation with cultural context" },
  { id: 3, title: "Personalized AI Health Coach", market: "$100B Healthcare", difficulty: "Very Hard", potential: "🚀 Extreme", description: "AI-powered personalized health guidance" },
  { id: 4, title: "AI Code Review & Security Scanner", market: "$20B DevTools", difficulty: "Medium", potential: "🚀 High", description: "Automated code quality and security analysis" },
];

const AI_ETHICS_TOPICS = [
  { id: 1, title: "AI Bias & Fairness", icon: "⚖️", concern: "Critical", description: "Ensuring AI systems treat all groups fairly" },
  { id: 2, title: "Privacy & Data Protection", icon: "🔒", concern: "Critical", description: "Protecting user data in AI systems" },
  { id: 3, title: "Transparency & Explainability", icon: "👁️", concern: "High", description: "Understanding how AI makes decisions" },
  { id: 4, title: "Accountability & Liability", icon: "⚖️", concern: "High", description: "Who's responsible when AI fails?" },
  { id: 5, title: "Job Displacement", icon: "👥", concern: "High", description: "Impact of AI on employment" },
];

const INDUSTRY_INSIGHTS = [
  { id: 1, industry: "Healthcare", adoption: 65, growth: "45% YoY", topUse: "Diagnosis & Drug Discovery", investment: "$12B" },
  { id: 2, industry: "Finance", adoption: 72, growth: "52% YoY", topUse: "Trading & Risk Management", investment: "$18B" },
  { id: 3, industry: "Retail", adoption: 58, growth: "38% YoY", topUse: "Personalization & Inventory", investment: "$8B" },
  { id: 4, industry: "Manufacturing", adoption: 48, growth: "35% YoY", topUse: "Quality Control & Optimization", investment: "$6B" },
  { id: 5, industry: "Education", adoption: 42, growth: "60% YoY", topUse: "Personalized Learning", investment: "$4B" },
];

const AI_BENCHMARKS = [
  { id: 1, model: "GPT-4", reasoning: 95, coding: 92, creativity: 88, speed: 75, cost: "$$$" },
  { id: 2, model: "Claude 3.5", reasoning: 94, coding: 95, creativity: 90, speed: 85, cost: "$$" },
  { id: 3, model: "Gemini 2.0", reasoning: 92, coding: 90, creativity: 85, speed: 88, cost: "$$" },
  { id: 4, model: "Llama 3", reasoning: 85, coding: 88, creativity: 80, speed: 95, cost: "$" },
];

const USE_CASES = [
  { id: 1, name: "Content Creation", icon: "✍️", tools: 12, description: "Write blogs, articles, and social content" },
  { id: 2, name: "Code Development", icon: "💻", tools: 8, description: "Generate and debug code faster" },
  { id: 3, name: "Design & Prototyping", icon: "🎨", tools: 7, description: "Create stunning visuals and prototypes" },
  { id: 4, name: "Data Analysis", icon: "📊", tools: 6, description: "Analyze and visualize complex data" },
  { id: 5, name: "Customer Support", icon: "🎧", tools: 5, description: "Build intelligent chatbots" },
  { id: 6, name: "Marketing", icon: "📢", tools: 8, description: "Automate campaigns and personalization" },
  { id: 7, name: "Video Production", icon: "🎬", tools: 5, description: "Generate and edit videos" },
  { id: 8, name: "Research", icon: "🔬", tools: 7, description: "Accelerate research and discovery" },
];

const AI_SKILL_PATHS = [
  { id: 1, title: "Beginner to AI Expert", duration: "6 months", level: "Beginner", skills: ["Python", "ML Basics", "Deep Learning", "LLMs"], jobs: 500 },
  { id: 2, title: "Prompt Engineering Mastery", duration: "4 weeks", level: "Beginner", skills: ["Prompt Design", "LLM Knowledge"], jobs: 1200 },
  { id: 3, title: "Advanced ML Engineering", duration: "12 months", level: "Advanced", skills: ["TensorFlow", "PyTorch", "MLOps"], jobs: 800 },
  { id: 4, title: "AI Product Management", duration: "8 weeks", level: "Intermediate", skills: ["Product Strategy", "AI Knowledge"], jobs: 600 },
];

const AI_INTEGRATIONS = [
  { id: 1, name: "Zapier + AI", description: "Connect AI tools to 5000+ apps", tools: 150 },
  { id: 2, name: "Make.com Workflows", description: "Automate complex AI workflows", tools: 200 },
  { id: 3, name: "API Integrations", description: "Direct API connections for developers", tools: 300 },
  { id: 4, name: "No-Code Platforms", description: "Build AI apps without coding", tools: 50 },
];

const AI_TRENDS = [
  { id: 1, trend: "Multimodal AI", growth: "📈 +150%", description: "AI that understands text, images, video, audio" },
  { id: 2, trend: "Reasoning Models", growth: "📈 +200%", description: "AI that can think step-by-step" },
  { id: 3, trend: "Edge AI", growth: "📈 +180%", description: "AI running on devices, not in cloud" },
  { id: 4, trend: "AI Agents", growth: "📈 +220%", description: "Autonomous AI that takes actions" },
  { id: 5, trend: "Specialized Models", growth: "📈 +160%", description: "Domain-specific AI models" },
];

const AI_OF_THE_DAY = {
  id: "claude",
  name: "Claude 3.5 Sonnet",
  category: "Large Language Model",
  rating: 4.9,
  reviews: 5432,
  description: "Advanced conversational AI with exceptional reasoning",
  features: ["Long context", "Advanced reasoning", "Code generation"],
  pricing: "$20/month",
  url: "https://claude.ai",
  image: "🧠",
};

const TRENDING_TOOLS = AI_TOOLS.slice(0, 5).map((tool, idx) => ({
  ...tool,
  trend: idx === 0 ? "🔥 Trending" : "📈 Rising",
  trendValue: 100 - idx * 15,
}));

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [selectedVisionaryId, setSelectedVisionaryId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("tools");
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const filteredTools = useMemo(() => {
    let filtered = AI_TOOLS;
    if (searchTerm) {
      filtered = filtered.filter((tool) =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((tool) => tool.category === selectedCategory);
    }
    filtered.sort((a: typeof AI_TOOLS[0], b: typeof AI_TOOLS[0]) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviews - a.reviews;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const selectedVisionary = selectedVisionaryId
    ? VISIONARY_POSSIBILITIES.find((v: typeof VISIONARY_POSSIBILITIES[0]) => v.id === selectedVisionaryId)
    : null;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ==================== OPTIMIZED HERO SECTION ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-20"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>

        <motion.div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: "20%", left: "10%" }}
        />

        <div className="relative z-10 max-w-5xl px-4 w-full">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600/40 to-maroon-600/40 border border-purple-500/50 rounded-full backdrop-blur-sm">
              <span className="text-sm font-semibold text-purple-200">✨ 67 AI Domains • 1000+ Tools • Infinite Possibilities</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-400 via-maroon-400 to-purple-300 bg-clip-text text-transparent leading-tight"
          >
            Neoaifinder
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl"
          >
            Discover, Compare & Master AI Across Every Domain. From LLMs to Quantum Computing, Find Your Perfect AI Tool.
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex gap-3 flex-wrap"
          >
            <Button className="bg-gradient-to-r from-purple-600 to-maroon-600 hover:from-purple-700 hover:to-maroon-700 text-white px-6 py-2 rounded-lg">
              Explore Tools
            </Button>
            <Button variant="outline" className="border-purple-500/50 text-white px-6 py-2 rounded-lg hover:bg-purple-500/10">
              Learn More
            </Button>
            <Button variant="outline" className="border-purple-500/50 text-white px-6 py-2 rounded-lg hover:bg-purple-500/10">
              View Careers
            </Button>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 text-center"
          >
            <div><div className="text-2xl font-bold text-purple-400">1000+</div><div className="text-xs text-gray-400">AI Tools</div></div>
            <div><div className="text-2xl font-bold text-purple-400">67</div><div className="text-xs text-gray-400">Domains</div></div>
            <div><div className="text-2xl font-bold text-purple-400">50+</div><div className="text-xs text-gray-400">Possibilities</div></div>
            <div><div className="text-2xl font-bold text-purple-400">100K+</div><div className="text-xs text-gray-400">Reviews</div></div>
            <div><div className="text-2xl font-bold text-purple-400">500K+</div><div className="text-xs text-gray-400">Users</div></div>
            <div><div className="text-2xl font-bold text-purple-400">24/7</div><div className="text-xs text-gray-400">Updates</div></div>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== QUICK STATS BAR ==================== */}
      <section className="py-6 px-4 md:px-8 bg-gradient-to-r from-purple-900/20 to-maroon-900/20 border-y border-purple-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center text-sm">
            <div><span className="text-purple-400 font-bold">🔥 Trending:</span> <span className="text-gray-300">GPT-5 Rumors</span></div>
            <div><span className="text-purple-400 font-bold">⭐ Top Tool:</span> <span className="text-gray-300">Claude 3.5</span></div>
            <div><span className="text-purple-400 font-bold">📈 Growth:</span> <span className="text-gray-300">+150% YoY</span></div>
            <div><span className="text-purple-400 font-bold">💼 Jobs:</span> <span className="text-gray-300">50K+ Open</span></div>
            <div><span className="text-purple-400 font-bold">💰 Market:</span> <span className="text-gray-300">$500B+</span></div>
          </div>
        </div>
      </section>

      {/* ==================== AI DOMAINS SHOWCASE ==================== */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <h2 className="text-4xl font-bold mb-2">🌍 Explore 67 AI Domains</h2>
            <p className="text-gray-400">Master AI across every industry and use case</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {AI_DOMAINS.map((domain, idx) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.03 }}
              >
                <Card className={`bg-gradient-to-br ${domain.color} bg-opacity-10 border border-opacity-30 hover:border-opacity-100 transition-all cursor-pointer group h-full p-4`}>
                  <div className="text-3xl mb-2">{domain.icon}</div>
                  <h3 className="font-bold text-sm mb-1 group-hover:text-white transition-colors">{domain.name}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-2">{domain.description}</p>
                  <Badge className="text-xs">{domain.tools} tools</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI NEWS FEED ==================== */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">📰 AI News & Breakthroughs</h2>
          <p className="text-gray-400 mb-8">Stay updated with the latest in AI</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_NEWS.map((news, idx) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group h-full p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="text-xs bg-purple-500/20 text-purple-300">{news.category}</Badge>
                    {news.trending && <Badge className="text-xs bg-red-500/20 text-red-300">🔥 Trending</Badge>}
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-purple-400 line-clamp-2">{news.title}</h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{news.date}</span>
                    <span>{news.views} views</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI CAREERS & OPPORTUNITIES ==================== */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">💼 AI Careers & Opportunities</h2>
          <p className="text-gray-400 mb-8">50K+ AI jobs available right now</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_CAREERS.map((career, idx) => (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 hover:border-green-500/100 transition-all p-4 h-full">
                  <h3 className="font-bold mb-2">{career.title}</h3>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between"><span className="text-gray-400">Salary:</span><span className="text-green-400 font-bold">{career.salary}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Demand:</span><span>{career.demand}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Companies:</span><span className="text-green-400">{career.companies}+</span></div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {career.skills.map((skill, i) => (
                      <Badge key={i} className="text-xs bg-green-500/20 text-green-300">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI BENCHMARKS & COMPARISONS ==================== */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">📊 AI Model Benchmarks</h2>
          <p className="text-gray-400 mb-8">Compare performance across leading AI models</p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4">Model</th>
                  <th className="text-center py-3 px-4">Reasoning</th>
                  <th className="text-center py-3 px-4">Coding</th>
                  <th className="text-center py-3 px-4">Creativity</th>
                  <th className="text-center py-3 px-4">Speed</th>
                  <th className="text-center py-3 px-4">Cost</th>
                </tr>
              </thead>
              <tbody>
                {AI_BENCHMARKS.map((bench) => (
                  <tr key={bench.id} className="border-b border-gray-900 hover:bg-gray-900/50 transition-colors">
                    <td className="py-3 px-4 font-bold">{bench.model}</td>
                    <td className="text-center py-3 px-4"><div className="w-full bg-gray-800 rounded h-2"><div className="bg-purple-500 h-2 rounded" style={{width: `${bench.reasoning}%`}}></div></div></td>
                    <td className="text-center py-3 px-4"><div className="w-full bg-gray-800 rounded h-2"><div className="bg-blue-500 h-2 rounded" style={{width: `${bench.coding}%`}}></div></div></td>
                    <td className="text-center py-3 px-4"><div className="w-full bg-gray-800 rounded h-2"><div className="bg-pink-500 h-2 rounded" style={{width: `${bench.creativity}%`}}></div></div></td>
                    <td className="text-center py-3 px-4"><div className="w-full bg-gray-800 rounded h-2"><div className="bg-green-500 h-2 rounded" style={{width: `${bench.speed}%`}}></div></div></td>
                    <td className="text-center py-3 px-4">{bench.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==================== AI RESEARCH PAPERS ==================== */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">🔬 Groundbreaking Research Papers</h2>
          <p className="text-gray-400 mb-8">Most influential AI research of all time</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_RESEARCH_PAPERS.map((paper, idx) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30 hover:border-blue-500/100 transition-all p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold flex-1">{paper.title}</h3>
                    <span className="text-xs text-blue-400 ml-2 whitespace-nowrap">{paper.year}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{paper.authors}</p>
                  <div className="flex items-center justify-between text-xs">
                    <Badge className="bg-blue-500/20 text-blue-300">{paper.field}</Badge>
                    <span className="text-yellow-400">{paper.citations.toLocaleString()} citations</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI STARTUP IDEAS ==================== */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">🚀 AI Startup Ideas</h2>
          <p className="text-gray-400 mb-8">Billion-dollar opportunities waiting to be built</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_STARTUP_IDEAS.map((idea, idx) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30 hover:border-orange-500/100 transition-all p-4">
                  <h3 className="font-bold mb-2">{idea.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{idea.description}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-gray-400">Market:</span><span className="text-orange-400">{idea.market}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Difficulty:</span><span>{idea.difficulty}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Potential:</span><span>{idea.potential}</span></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI ETHICS & RESPONSIBILITY ==================== */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">⚖️ AI Ethics & Responsibility</h2>
          <p className="text-gray-400 mb-8">Understanding the impact and challenges of AI</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_ETHICS_TOPICS.map((topic, idx) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-red-900/20 to-pink-900/20 border-red-500/30 hover:border-red-500/100 transition-all p-4">
                  <div className="text-2xl mb-2">{topic.icon}</div>
                  <h3 className="font-bold mb-1">{topic.title}</h3>
                  <p className="text-sm text-gray-400 mb-3">{topic.description}</p>
                  <Badge className={`text-xs ${topic.concern === 'Critical' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{topic.concern}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INDUSTRY INSIGHTS ==================== */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">📈 Industry AI Adoption</h2>
          <p className="text-gray-400 mb-8">How different industries are leveraging AI</p>

          <div className="space-y-4">
            {INDUSTRY_INSIGHTS.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gray-900 border-gray-800 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">{insight.industry}</h3>
                    <Badge className="bg-green-500/20 text-green-300">{insight.growth}</Badge>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Adoption Rate</span>
                      <span className="font-bold">{insight.adoption}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded h-2">
                      <div className="bg-gradient-to-r from-purple-500 to-maroon-500 h-2 rounded" style={{width: `${insight.adoption}%`}}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-gray-400">Top Use:</span> <span className="text-gray-300">{insight.topUse}</span></div>
                    <div><span className="text-gray-400">Investment:</span> <span className="text-green-400 font-bold">{insight.investment}</span></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI TRENDS ==================== */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">🔮 Emerging AI Trends</h2>
          <p className="text-gray-400 mb-8">What's hot in AI right now</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_TRENDS.map((trend, idx) => (
              <motion.div
                key={trend.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-purple-900/20 to-maroon-900/20 border-purple-500/30 hover:border-purple-500/100 transition-all p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold">{trend.trend}</h3>
                    <Badge className="text-xs bg-green-500/20 text-green-300">{trend.growth}</Badge>
                  </div>
                  <p className="text-sm text-gray-400">{trend.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI SKILL PATHS ==================== */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">🎓 AI Learning Paths</h2>
          <p className="text-gray-400 mb-8">Structured paths to master AI</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_SKILL_PATHS.map((path, idx) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-500/30 hover:border-indigo-500/100 transition-all p-4">
                  <h3 className="font-bold mb-2">{path.title}</h3>
                  <div className="space-y-2 text-sm mb-3">
                    <div className="flex justify-between"><span className="text-gray-400">Duration:</span><span className="text-indigo-400">{path.duration}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Level:</span><span>{path.level}</span></div>
                    <div className="flex justify-between"><span className="text-gray-400">Jobs:</span><span className="text-indigo-400">{path.jobs}+</span></div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill, i) => (
                      <Badge key={i} className="text-xs bg-indigo-500/20 text-indigo-300">{skill}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== USE CASES ==================== */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">💡 Find Tools by Use Case</h2>
          <p className="text-gray-400 mb-8">Discover the perfect AI tools for your needs</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {USE_CASES.map((useCase, idx) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 hover:border-yellow-500/50 transition-all cursor-pointer group h-full p-4">
                  <div className="text-3xl mb-2">{useCase.icon}</div>
                  <h3 className="font-bold mb-1 group-hover:text-yellow-400 transition-colors">{useCase.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{useCase.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{useCase.tools} tools</span>
                    <ArrowRight className="w-3 h-3 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOOLS DIRECTORY ==================== */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">🛠️ AI Tools Directory</h2>
          <p className="text-gray-400 mb-8">1000+ hand-picked AI tools</p>

          <div className="mb-6 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
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
              {AI_CATEGORIES.slice(0, 7).map((cat) => (
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.slice(0, 12).map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.03 }}
              >
                <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group h-full p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="text-xs bg-purple-500/20 text-purple-300">{tool.category}</Badge>
                    {tool.isFeatured && <Badge className="text-xs bg-yellow-500/20 text-yellow-300">⭐</Badge>}
                  </div>
                  <h3 className="font-bold mb-1 group-hover:text-purple-400 transition-colors text-sm">{tool.name}</h3>
                  <p className="text-xs text-gray-400 mb-2 line-clamp-1">{tool.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span>{tool.rating}</span>
                    </div>
                    <span className="text-gray-500">{tool.reviews} reviews</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMMUNITY ==================== */}
      <section className="py-16 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-2">👥 Join the Community</h2>
          <p className="text-gray-400 mb-8">Connect with 500K+ AI enthusiasts</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 p-6">
              <MessageSquare className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold mb-2">Discussions</h3>
              <p className="text-sm text-gray-400 mb-4">Share ideas and learn from experts</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg">Join</Button>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30 p-6">
              <BookOpen className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold mb-2">Learning Hub</h3>
              <p className="text-sm text-gray-400 mb-4">Tutorials and expert guides</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg">Explore</Button>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30 p-6">
              <Share2 className="w-8 h-8 text-orange-400 mb-3" />
              <h3 className="font-bold mb-2">Submit Tool</h3>
              <p className="text-sm text-gray-400 mb-4">Share your favorite AI tool</p>
              <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 rounded-lg">Submit</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* ==================== VISIONARY MODAL ==================== */}
      <AnimatePresence>
        {selectedVisionary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedVisionaryId(null)}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl mb-2">{selectedVisionary.icon}</div>
                    <h2 className="text-2xl font-bold">{selectedVisionary.title}</h2>
                  </div>
                  <button onClick={() => setSelectedVisionaryId(null)} className="text-gray-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-gray-300 mb-4">{selectedVisionary.description}</p>
                <div className="mb-4">
                  <h3 className="font-bold mb-2">Key Possibilities</h3>
                  <ul className="space-y-1">
                    {selectedVisionary.possibilities.map((p: string, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <Sparkles className="w-3 h-3 text-purple-400" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
