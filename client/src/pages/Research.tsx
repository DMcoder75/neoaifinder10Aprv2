import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen, Loader2 } from "lucide-react";
import { RESEARCH_PAPERS } from "@/data/richContent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import { getImageForIndex } from "@/data/images";

export default function Research() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingPapers, setLoadingPapers] = useState<number[]>([]);

  const filteredPapers = RESEARCH_PAPERS.filter((paper) =>
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.field.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageLoad = (paperId: number) => {
    setLoadingPapers(prev => prev.filter(id => id !== paperId));
  };

  const handleImageLoadStart = (paperId: number) => {
    setLoadingPapers(prev => [...prev, paperId]);
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
              Groundbreaking Research
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the most influential AI research papers and breakthroughs
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search research papers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Papers Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPapers.map((paper, idx) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full flex flex-col">
                {/* Image with loading state */}
                <div className="relative h-48 overflow-hidden bg-gray-800">
                  {loadingPapers.includes(paper.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                    </div>
                  )}
                  <img
                    src={getImageForIndex("research", idx)}
                    alt={paper.title}
                    onLoad={() => handleImageLoad(paper.id)}
                    onLoadStart={() => handleImageLoadStart(paper.id)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <Badge className="mb-3 w-fit bg-orange-500/20 text-orange-300">{paper.field}</Badge>

                  <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">{paper.title}</h3>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{paper.authors}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Year</span>
                      <span className="text-purple-400 font-bold">{paper.year}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Citations</span>
                      <span className="text-purple-400 font-bold">{paper.citations.toLocaleString()}</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-semibold transition-colors">
                    Read Paper
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No research papers found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
