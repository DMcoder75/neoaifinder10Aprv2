import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Star, ArrowLeft, Loader2 } from "lucide-react";
import { AI_TOOLS, AI_CATEGORIES } from "@/const";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import { getImageForIndex } from "@/data/images";

export default function Tools() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("rating");
  const [loadingTools, setLoadingTools] = useState<number[]>([]);

  const filteredTools = AI_TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "reviews") return b.reviews - a.reviews;
    return a.name.localeCompare(b.name);
  });

  const handleImageLoad = (toolId: number) => {
    setLoadingTools(prev => prev.filter(id => id !== toolId));
  };

  const handleImageLoadStart = (toolId: number) => {
    setLoadingTools(prev => [...prev, toolId]);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <Header />

      {/* Hero Section */}
      <section className="relative h-80 overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 to-black"></div>
        <motion.div className="absolute top-10 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" animate={{ y: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} />

        <div className="relative h-full flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Tools Directory
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore 1000+ AI tools across all categories and use cases
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Search & Filter Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Categories</option>
                {AI_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-gray-900 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:border-purple-500"
              >
                <option value="rating">Highest Rating</option>
                <option value="reviews">Most Reviews</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="text-gray-400 mb-8">{filteredTools.length} tools found</p>

        {/* Tools Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool, idx) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full flex flex-col">
                {/* Image with loading state */}
                <div className="relative h-40 overflow-hidden bg-gray-800">
                  {loadingTools.includes(tool.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                    </div>
                  )}
                  <img
                    src={getImageForIndex(tool.category, idx)}
                    alt={tool.name}
                    onLoad={() => handleImageLoad(tool.id)}
                    onLoadStart={() => handleImageLoadStart(tool.id)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg group-hover:text-purple-400 transition-colors">{tool.name}</h3>
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                  </div>

                  <Badge className="mb-3 w-fit bg-purple-500/20 text-purple-300">{tool.category}</Badge>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{tool.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Rating</span>
                      <span className="text-purple-400 font-bold">{tool.rating}/5</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Reviews</span>
                      <span className="text-purple-400 font-bold">{tool.reviews.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                    Visit Tool
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tools found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
