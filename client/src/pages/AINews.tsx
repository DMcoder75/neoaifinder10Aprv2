import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Clock, Eye, Heart, Share2, ChevronRight, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXPANDED_AI_NEWS } from "@/data/expandedContent";
import { useLocation } from "wouter";

export default function AINews() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedNews, setSelectedNews] = useState<typeof EXPANDED_AI_NEWS[0] | null>(null);

  const categories = ["all", "Large Language Models", "Image Generation", "AI Research", "Multimodal"];

  const filteredNews = EXPANDED_AI_NEWS.filter((news) => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-black to-black/80 border-b border-purple-500/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setLocation("/")}
              className="p-2 hover:bg-purple-500/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-purple-400" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">📰 AI News & Breakthroughs</h1>
              <p className="text-gray-400 text-sm mt-1">Stay updated with the latest in AI</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat}
                  size="sm"
                  variant={selectedCategory === cat ? "default" : "outline"}
                  onClick={() => setSelectedCategory(cat)}
                  className="rounded-full text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {selectedNews ? (
          // Detail View
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <button
              onClick={() => setSelectedNews(null)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to News
            </button>

            <div>
              <Badge className="mb-4 bg-purple-500/20 text-purple-300">{selectedNews.category}</Badge>
              <h1 className="text-4xl font-bold mb-4">{selectedNews.title}</h1>

              <div className="flex flex-wrap gap-6 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedNews.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedNews.readTime}
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {selectedNews.views.toLocaleString()} views
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {selectedNews.likes.toLocaleString()} likes
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden mb-8 h-96">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="prose prose-invert max-w-none mb-8">
                <p className="text-lg text-gray-300 leading-relaxed mb-6">{selectedNews.content}</p>
                <p className="text-gray-400">{selectedNews.summary}</p>
              </div>

              <div className="flex gap-3 mb-8">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Heart className="w-4 h-4 mr-2" />
                  Like
                </Button>
                <Button variant="outline" className="border-purple-500/50">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="font-bold mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNews.tags.map((tag) => (
                    <Badge key={tag} className="bg-purple-500/20 text-purple-300">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredNews.length > 0 ? (
              filteredNews.map((news, idx) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => setSelectedNews(news)}
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group overflow-hidden">
                    <div className="flex gap-4 p-4">
                      <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className="text-xs bg-purple-500/20 text-purple-300">
                            {news.category}
                          </Badge>
                          {news.trending && (
                            <Badge className="text-xs bg-red-500/20 text-red-300">🔥 Trending</Badge>
                          )}
                        </div>

                        <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                          {news.title}
                        </h3>

                        <p className="text-sm text-gray-400 mb-3 line-clamp-1">
                          {news.content}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex gap-4">
                            <span>{news.date}</span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {news.views.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {news.likes}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No news found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
