import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronRight, ArrowRight, Eye, Newspaper, Briefcase, BookOpen, Lightbulb, Scale, TrendingUp, GraduationCap, BarChart3, Globe, Compass, Users, MessageSquare, Plus, Star, Zap, Sparkles, Flame, Clock, Users2 } from "lucide-react";
import { VISIONARY_POSSIBILITIES, AI_TOOLS, AI_CATEGORIES } from "@/const";
import { NEWS_ARTICLES, CAREER_LISTINGS, RESEARCH_PAPERS, STARTUP_IDEAS, DOMAINS_DETAILED, USE_CASES_DETAILED, ETHICS_TOPICS } from "@/data/richContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import Header from "@/components/Header";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663537154081/CryiRNCQAU6hTHfxuq7rHm/neoaifinder-hero-main-c8UKjevBuE7vwGbmCHQkSK.webp";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTools = AI_TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative h-screen overflow-hidden pt-20">
        <img src={HERO_IMAGE} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black"></div>

        {/* Animated background elements */}
        <motion.div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" animate={{ y: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity }} />

        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Discover the Future of AI</span>
              <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>

            <h1 className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-purple-200 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Neoaifinder
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore 1000+ AI tools, 67 domains, and the infinite possibilities of artificial intelligence
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button onClick={() => setLocation("/tools")} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-bold rounded-lg shadow-lg shadow-purple-500/50">
                  Explore Tools
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-purple-500 px-8 py-4 text-lg font-bold rounded-lg hover:bg-purple-500/10">
                  Learn More
                </Button>
              </motion.div>
            </div>

            {/* Quick Stats */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-6 gap-6 text-center">
              {[
                { label: "Tools", value: "1000+" },
                { label: "Domains", value: "67" },
                { label: "Possibilities", value: "50+" },
                { label: "Reviews", value: "100K+" },
                { label: "Users", value: "500K+" },
                { label: "Updates", value: "24/7" },
              ].map((stat, idx) => (
                <motion.div key={idx} variants={itemVariants} className="bg-white/5 backdrop-blur-md border border-purple-500/20 rounded-lg p-4">
                  <div className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-10 left-1/2 transform -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronRight className="w-6 h-6 text-purple-400 rotate-90" />
        </motion.div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-32">

        {/* TRENDING TOOLS */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-red-500" />
              <h2 className="text-4xl font-bold">Trending Now</h2>
            </div>
            <button onClick={() => setLocation("/tools")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {AI_TOOLS.slice(0, 3).map((tool, idx) => (
              <motion.div key={tool.id} variants={itemVariants} whileHover={{ y: -10 }} className="group">
                <Card className="bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden bg-gradient-to-br from-purple-600/20 to-pink-600/20">
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0" animate={{ x: [-200, 200] }} transition={{ duration: 3, repeat: Infinity }} />
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                      <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    </div>
                    <Badge className="mb-3 bg-purple-500/20 text-purple-300">{tool.category}</Badge>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{tool.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⭐ {tool.rating} ({tool.reviews})</span>
                      <ArrowRight className="w-3 h-3 text-purple-400" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* AI NEWS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Newspaper className="w-6 h-6 text-blue-500" />
              <h2 className="text-4xl font-bold">AI News & Breakthroughs</h2>
            </div>
            <button onClick={() => setLocation("/ai-news")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NEWS_ARTICLES.slice(0, 3).map((article) => (
              <motion.div key={article.id} variants={itemVariants} whileHover={{ y: -10 }} onClick={() => setLocation("/ai-news")} className="group cursor-pointer">
                <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {article.trending && <Badge className="absolute top-3 right-3 bg-red-500/80 text-white text-xs">Trending</Badge>}
                  </div>
                  <div className="p-4">
                    <Badge className="mb-2 bg-blue-500/20 text-blue-300 text-xs">{article.category}</Badge>
                    <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">{article.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{article.date}</span>
                      <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {article.views}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}m</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* AI CAREERS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-green-500" />
              <h2 className="text-4xl font-bold">AI Careers & Opportunities</h2>
            </div>
            <button onClick={() => setLocation("/ai-careers")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CAREER_LISTINGS.slice(0, 2).map((career) => (
              <motion.div key={career.id} variants={itemVariants} whileHover={{ y: -10 }} onClick={() => setLocation("/ai-careers")} className="group cursor-pointer">
                <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={career.image} alt={career.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">{career.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{career.company}</p>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <div className="text-xs text-green-400 font-bold">{career.salary}</div>
                        <div className="text-xs text-gray-500">Salary</div>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                        <div className="text-xs text-purple-400 font-bold">{career.demand}</div>
                        <div className="text-xs text-gray-500">Demand</div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <div className="text-xs text-blue-400 font-bold">{career.growth}</div>
                        <div className="text-xs text-gray-500">Growth</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* RESEARCH PAPERS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-orange-500" />
              <h2 className="text-4xl font-bold">Groundbreaking Research</h2>
            </div>
            <button onClick={() => setLocation("/research")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH_PAPERS.slice(0, 3).map((paper) => (
              <motion.div key={paper.id} variants={itemVariants} whileHover={{ y: -10 }} className="group">
                <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={paper.image} alt={paper.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <Badge className="mb-2 bg-orange-500/20 text-orange-300 text-xs">{paper.field}</Badge>
                    <h3 className="font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">{paper.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{paper.authors}</p>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{paper.year}</span>
                      <span className="text-purple-400 font-bold">{paper.citations.toLocaleString()} citations</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* AI DOMAINS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Globe className="w-6 h-6 text-cyan-500" />
              <h2 className="text-4xl font-bold">AI Domains</h2>
            </div>
            <button onClick={() => setLocation("/domains")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS_DETAILED.slice(0, 3).map((domain) => (
              <motion.div key={domain.id} variants={itemVariants} whileHover={{ y: -10 }} onClick={() => setLocation("/domains")} className="group cursor-pointer">
                <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={domain.image} alt={domain.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">{domain.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{domain.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {domain.applications.slice(0, 2).map((app, idx) => (
                        <Badge key={idx} className="bg-cyan-500/20 text-cyan-300 text-xs">{app}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* USE CASES SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-indigo-500" />
              <h2 className="text-4xl font-bold">Use Cases Explorer</h2>
            </div>
            <button onClick={() => setLocation("/use-cases")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES_DETAILED.slice(0, 2).map((usecase) => (
              <motion.div key={usecase.id} variants={itemVariants} whileHover={{ y: -10 }} onClick={() => setLocation("/use-cases")} className="group cursor-pointer">
                <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={usecase.image} alt={usecase.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">{usecase.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">{usecase.description}</p>
                    <Badge className="bg-indigo-500/20 text-indigo-300 text-xs">{usecase.tools} tools</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* STARTUP IDEAS SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              <h2 className="text-4xl font-bold">AI Startup Ideas</h2>
            </div>
            <button onClick={() => setLocation("/startup-ideas")} className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STARTUP_IDEAS.slice(0, 2).map((idea) => (
              <motion.div key={idea.id} variants={itemVariants} whileHover={{ y: -10 }} className="group">
                <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full">
                  <div className="relative h-40 overflow-hidden">
                    <img src={idea.image} alt={idea.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">{idea.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{idea.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <div className="text-xs text-green-400 font-bold">{idea.market}</div>
                        <div className="text-xs text-gray-500">Market</div>
                      </div>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
                        <div className="text-xs text-yellow-400 font-bold">{idea.difficulty}</div>
                        <div className="text-xs text-gray-500">Difficulty</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* COMMUNITY SECTION */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold mb-12">Join Our Community</h2>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: "Discussions", desc: "Join conversations about AI", color: "from-purple-600 to-purple-700" },
              { icon: BookOpen, title: "Learning Hub", desc: "Master AI tools with guides", color: "from-blue-600 to-blue-700" },
              { icon: Plus, title: "Submit Tool", desc: "Share new AI discoveries", color: "from-pink-600 to-pink-700" },
            ].map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} whileHover={{ y: -10 }}>
                <Card className={`bg-gradient-to-br ${item.color} border border-purple-500/30 p-8 cursor-pointer hover:border-purple-500/50 transition-all text-center`}>
                  <item.icon className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                  <Button className="w-full mt-6 bg-white/20 hover:bg-white/30 text-white">Join Now</Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-purple-500/20 mt-32">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Neoaifinder</h3>
              <p className="text-gray-400 text-sm">Discover the future of AI</p>
            </div>
            {[
              { title: "Explore", links: ["Tools", "News", "Careers"] },
              { title: "Learn", links: ["Guides", "Research", "Domains"] },
              { title: "Community", links: ["Discussions", "Submit", "Reviews"] },
            ].map((col, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-sm mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link} className="text-gray-400 text-sm hover:text-purple-400 cursor-pointer transition-colors">
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-purple-500/20 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; 2024 Neoaifinder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
