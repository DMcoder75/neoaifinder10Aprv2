import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Star, TrendingUp, ChevronDown, X, Sparkles, Zap, Flame, Award, Users, MessageSquare, BookOpen, Globe, Lightbulb, ArrowRight, Heart, Share2, Eye, Code, Palette, Brain, Zap as ZapIcon } from "lucide-react";
import { VISIONARY_POSSIBILITIES, AI_TOOLS, AI_CATEGORIES } from "@/const";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-hero-main-c8UKjevBuE7vwGbmCHQkSK.webp";
const HALLUCINATIONS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-hallucinations-oDTEAAmdBE73KV5uE88oqp.webp";
const SPORTS_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-sports-ai-fjEGZq9HHKEiSjXHdnvtY8.webp";
const ASTRONOMY_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-astronomy-9W3sikTzdFSAQrV9vonEtL.webp";
const BIOTECH_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-biotech-n4gBCR4XE33a25pL6BvU.webp";

// AI Domains data
const AI_DOMAINS = [
  { id: "llms", name: "Large Language Models", icon: "🧠", color: "from-purple-500 to-purple-600", tools: 5 },
  { id: "vision", name: "Image & Vision", icon: "🎨", color: "from-pink-500 to-pink-600", tools: 4 },
  { id: "video", name: "Video & Animation", icon: "🎬", color: "from-red-500 to-red-600", tools: 3 },
  { id: "audio", name: "Audio & Voice", icon: "🎵", color: "from-blue-500 to-blue-600", tools: 3 },
  { id: "code", name: "Code Generation", icon: "💻", color: "from-green-500 to-green-600", tools: 4 },
  { id: "search", name: "Search & Discovery", icon: "🔍", color: "from-yellow-500 to-yellow-600", tools: 3 },
  { id: "healthcare", name: "Healthcare & Medical", icon: "⚕️", color: "from-red-500 to-rose-600", tools: 4 },
  { id: "finance", name: "Finance & Trading", icon: "💰", color: "from-emerald-500 to-emerald-600", tools: 3 },
  { id: "marketing", name: "Marketing & Sales", icon: "📊", color: "from-orange-500 to-orange-600", tools: 3 },
  { id: "education", name: "Education & Learning", icon: "📚", color: "from-indigo-500 to-indigo-600", tools: 3 },
  { id: "robotics", name: "Robotics & Automation", icon: "🤖", color: "from-cyan-500 to-cyan-600", tools: 2 },
  { id: "quantum", name: "Quantum Computing", icon: "⚛️", color: "from-violet-500 to-violet-600", tools: 2 },
];

// AI News Feed data
const AI_NEWS = [
  { id: 1, title: "GPT-5 Rumors: What We Know So Far", category: "LLMs", date: "Today", views: 2400, likes: 340 },
  { id: 2, title: "Midjourney v7 Releases with Real-time Generation", category: "Image AI", date: "Yesterday", views: 1800, likes: 290 },
  { id: 3, title: "OpenAI Announces New Reasoning Capabilities", category: "AI Research", date: "2 days ago", views: 3200, likes: 520 },
  { id: 4, title: "DeepSeek Challenges ChatGPT with Faster Inference", category: "LLMs", date: "3 days ago", views: 2100, likes: 380 },
  { id: 5, title: "Google Gemini 2.0 Multimodal Breakthrough", category: "Multimodal", date: "4 days ago", views: 2900, likes: 450 },
];

// AI of the Day
const AI_OF_THE_DAY = {
  id: "claude",
  name: "Claude 3.5 Sonnet",
  category: "Large Language Model",
  rating: 4.9,
  reviews: 5432,
  description: "Advanced conversational AI with exceptional reasoning and analysis capabilities",
  features: ["Long context windows", "Advanced reasoning", "Code generation", "Document analysis"],
  pricing: "$20/month or $200/year",
  url: "https://claude.ai",
  image: "🧠",
};

// Trending Tools (sorted by views/engagement)
const TRENDING_TOOLS = AI_TOOLS.slice(0, 5).map((tool, idx) => ({
  ...tool,
  trend: idx === 0 ? "🔥 Trending" : idx === 1 ? "📈 Rising" : "⭐ Popular",
  trendValue: 100 - idx * 15,
}));

// Use Cases
const USE_CASES = [
  { id: 1, name: "Content Creation", icon: "✍️", tools: 8, description: "Write blogs, articles, and social content" },
  { id: 2, name: "Code Development", icon: "💻", tools: 6, description: "Generate and debug code faster" },
  { id: 3, name: "Design & Prototyping", icon: "🎨", tools: 5, description: "Create stunning visuals and prototypes" },
  { id: 4, name: "Data Analysis", icon: "📊", tools: 4, description: "Analyze and visualize complex data" },
  { id: 5, name: "Customer Support", icon: "🎧", tools: 4, description: "Build intelligent chatbots and support systems" },
  { id: 6, name: "Marketing Automation", icon: "📢", tools: 5, description: "Automate campaigns and personalization" },
  { id: 7, name: "Video Production", icon: "🎬", tools: 4, description: "Generate and edit videos automatically" },
  { id: 8, name: "Research & Learning", icon: "🔬", tools: 6, description: "Accelerate research and knowledge discovery" },
];

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
      filtered = filtered.filter(
        (tool) =>
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
      {/* ==================== HERO SECTION ==================== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${HERO_IMAGE}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>

        <motion.div
          className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute w-96 h-96 bg-maroon-500/20 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          style={{ bottom: "10%", right: "5%" }}
        />

        <div className="relative z-10 text-center max-w-4xl px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6"
          >
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600/40 to-maroon-600/40 border border-purple-500/50 rounded-full backdrop-blur-sm mb-6">
              <span className="text-sm font-semibold text-purple-200">✨ Discover 50+ AI Frontiers</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-400 via-maroon-400 to-purple-300 bg-clip-text text-transparent leading-tight"
          >
            Neoaifinder
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Discover, Compare & Master 50+ AI Domains Across Every Industry
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Button className="bg-gradient-to-r from-purple-600 to-maroon-600 hover:from-purple-700 hover:to-maroon-700 text-white px-8 py-6 text-lg rounded-lg">
              Explore AI Tools
            </Button>
            <Button variant="outline" className="border-purple-500/50 text-white px-8 py-6 text-lg rounded-lg hover:bg-purple-500/10">
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* ==================== AI NEWS FEED ==================== */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h2 className="text-4xl font-bold">AI News & Updates</h2>
            </div>
            <p className="text-gray-400 text-lg">Stay updated with the latest breakthroughs in AI</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_NEWS.map((news, idx) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{news.category}</Badge>
                      <span className="text-xs text-gray-500">{news.date}</span>
                    </div>
                    <h3 className="text-lg font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">{news.title}</h3>
                    <div className="mt-auto flex items-center justify-between text-sm text-gray-400">
                      <span className="flex items-center gap-2"><Eye className="w-4 h-4" /> {news.views}</span>
                      <span className="flex items-center gap-2"><Heart className="w-4 h-4" /> {news.likes}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI OF THE DAY ==================== */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-bold">AI of the Day</h2>
            </div>
            <p className="text-gray-400 text-lg">Today's featured AI tool with deep insights</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-purple-900/30 to-maroon-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl mb-6">{AI_OF_THE_DAY.image}</div>
                <h3 className="text-4xl font-bold mb-2">{AI_OF_THE_DAY.name}</h3>
                <p className="text-purple-300 text-lg mb-4">{AI_OF_THE_DAY.category}</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(AI_OF_THE_DAY.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
                    ))}
                  </div>
                  <span className="text-gray-400">{AI_OF_THE_DAY.reviews.toLocaleString()} reviews</span>
                </div>
                <p className="text-gray-300 mb-6">{AI_OF_THE_DAY.description}</p>
                <div className="flex gap-3 mb-6">
                  {AI_OF_THE_DAY.features.map((feature, idx) => (
                    <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30">{feature}</Badge>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-maroon-600 hover:from-purple-700 hover:to-maroon-700 text-white px-8 py-3 rounded-lg">
                    Try Now
                  </Button>
                  <Button variant="outline" className="border-purple-500/50 text-white px-8 py-3 rounded-lg hover:bg-purple-500/10">
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-maroon-500/10 rounded-xl p-8 border border-purple-500/20">
                <h4 className="text-xl font-bold mb-4">Pricing</h4>
                <p className="text-2xl font-bold text-purple-300 mb-6">{AI_OF_THE_DAY.pricing}</p>
                <h4 className="text-xl font-bold mb-4">Key Capabilities</h4>
                <ul className="space-y-3">
                  {AI_OF_THE_DAY.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-300">
                      <Zap className="w-5 h-5 text-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== TRENDING TOOLS ==================== */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-red-400" />
              <h2 className="text-4xl font-bold">Trending Tools</h2>
            </div>
            <p className="text-gray-400 text-lg">Most viewed and loved AI tools right now</p>
          </motion.div>

          <div className="space-y-4">
            {TRENDING_TOOLS.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-r from-gray-900 to-gray-950 border-gray-800 hover:border-red-500/50 transition-all cursor-pointer group">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <div className="text-3xl font-bold text-red-500 w-12 text-center">#{idx + 1}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors">{tool.name}</h3>
                          <Badge className="bg-red-500/20 text-red-300 border-red-500/30">{tool.trend}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{tool.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-red-400 mb-2">{tool.trendValue}%</div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {tool.rating}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== AI DOMAINS EXPLORER ==================== */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-cyan-400" />
              <h2 className="text-4xl font-bold">Explore AI Domains</h2>
            </div>
            <p className="text-gray-400 text-lg">Discover AI applications across 67+ domains and industries</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {AI_DOMAINS.map((domain, idx) => (
              <motion.div
                key={domain.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <Card className={`bg-gradient-to-br ${domain.color} bg-opacity-10 border border-opacity-30 hover:border-opacity-100 transition-all cursor-pointer group h-full`}>
                  <div className="p-6">
                    <div className="text-4xl mb-3">{domain.icon}</div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">{domain.name}</h3>
                    <p className="text-sm text-gray-400">{domain.tools} tools</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== USE CASE EXPLORER ==================== */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl font-bold">Find Tools by Use Case</h2>
            </div>
            <p className="text-gray-400 text-lg">Discover the perfect AI tools for your specific needs</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {USE_CASES.map((useCase, idx) => (
              <motion.div
                key={useCase.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 hover:border-yellow-500/50 transition-all cursor-pointer group h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="text-4xl mb-4">{useCase.icon}</div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-400 transition-colors">{useCase.name}</h3>
                    <p className="text-sm text-gray-400 mb-4 flex-1">{useCase.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{useCase.tools} tools</span>
                      <ArrowRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOOLS DIRECTORY ==================== */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-purple-400" />
              <h2 className="text-4xl font-bold">AI Tools Directory</h2>
            </div>
            <p className="text-gray-400 text-lg">33+ hand-picked AI tools across 8 categories</p>
          </motion.div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search AI tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                className="rounded-full"
              >
                All Categories
              </Button>
              {AI_CATEGORIES.map((cat) => (
                <Button
                  key={cat.id}
                  variant={selectedCategory === cat.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat.id)}
                  className="rounded-full"
                >
                  {cat.name}
                </Button>
              ))}
            </div>

            <div className="flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="rating">Sort by Rating</option>
                <option value="reviews">Sort by Reviews</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
              >
                <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group h-full">
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">{tool.category}</Badge>
                      {tool.isFeatured && <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Featured</Badge>}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">{tool.description}</p>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(tool.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"}`} />
                        ))}
                        <span className="text-sm text-gray-400">{tool.reviews.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-gray-500">{tool.pricing}</p>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-maroon-600 hover:from-purple-700 hover:to-maroon-700 text-white rounded-lg">
                      Explore
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VISIONARY POSSIBILITIES ==================== */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-8 h-8 text-pink-400" />
              <h2 className="text-4xl font-bold">50+ Visionary AI Possibilities</h2>
            </div>
            <p className="text-gray-400 text-lg">Explore the future frontiers of artificial intelligence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VISIONARY_POSSIBILITIES.slice(0, 24).map((possibility, idx) => (
              <motion.div
                key={possibility.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.03 }}
              >
                <Card
                  onClick={() => setSelectedVisionaryId(possibility.id)}
                  className="bg-gradient-to-br from-gray-900 to-gray-950 border-gray-800 hover:border-pink-500/50 transition-all cursor-pointer group h-full"
                >
                  <div className="p-6">
                    <div className="text-3xl mb-3">{possibility.icon}</div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors">{possibility.title}</h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{possibility.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== COMMUNITY SECTION ==================== */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-green-400" />
              <h2 className="text-4xl font-bold">Community</h2>
            </div>
            <p className="text-gray-400 text-lg">Join thousands of AI enthusiasts and experts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 p-8">
                <MessageSquare className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Discussions</h3>
                <p className="text-gray-400 mb-4">Share ideas, ask questions, and learn from the community</p>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg">Join Discussions</Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 p-8">
                <BookOpen className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Learning Hub</h3>
                <p className="text-gray-400 mb-4">Tutorials, guides, and expert insights on AI tools</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Explore Guides</Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30 p-8">
                <Share2 className="w-12 h-12 text-orange-400 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Submit Tool</h3>
                <p className="text-gray-400 mb-4">Found an amazing AI tool? Share it with the community</p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg">Submit Now</Button>
              </Card>
            </motion.div>
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
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-5xl mb-4">{selectedVisionary.icon}</div>
                    <h2 className="text-3xl font-bold">{selectedVisionary.title}</h2>
                  </div>
                  <button
                    onClick={() => setSelectedVisionaryId(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-gray-300 mb-6">{selectedVisionary.description}</p>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Key Possibilities</h3>
                  <ul className="space-y-2">
                    {selectedVisionary.possibilities.map((possibility: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-300">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        {possibility}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-3">Powered by Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVisionary.tools.map((toolId: string, idx: number) => {
                      const tool = AI_TOOLS.find((t) => t.id === toolId);
                      return tool ? (
                        <Badge key={idx} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {tool.name}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3">Future Outlook</h3>
                  <p className="text-gray-300">{selectedVisionary.futureOutlook}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
