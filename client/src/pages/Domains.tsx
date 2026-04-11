import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, Loader2 } from "lucide-react";
import { DOMAINS_DETAILED } from "@/data/richContent";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import { getImageForIndex } from "@/data/images";

export default function Domains() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingDomains, setLoadingDomains] = useState<number[]>([]);

  const filteredDomains = DOMAINS_DETAILED.filter((domain) =>
    domain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    domain.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageLoad = (domainId: number) => {
    setLoadingDomains(prev => prev.filter(id => id !== domainId));
  };

  const handleImageLoadStart = (domainId: number) => {
    setLoadingDomains(prev => [...prev, domainId]);
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
              AI Domains
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore AI applications across 67 different domains and industries
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Search Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search domains..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* Domains Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDomains.map((domain, idx) => (
            <motion.div
              key={domain.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden h-full flex flex-col">
                {/* Image with loading state */}
                <div className="relative h-40 overflow-hidden bg-gray-800">
                  {loadingDomains.includes(domain.id) && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                      <Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
                    </div>
                  )}
                  <img
                    src={getImageForIndex("domains", idx)}
                    alt={domain.name}
                    onLoad={() => handleImageLoad(domain.id)}
                    onLoadStart={() => handleImageLoadStart(domain.id)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-purple-400 transition-colors">{domain.name}</h3>

                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">{domain.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {domain.applications.slice(0, 3).map((app, i) => (
                      <Badge key={i} className="bg-cyan-500/20 text-cyan-300 text-xs">{app}</Badge>
                    ))}
                    {domain.applications.length > 3 && (
                      <Badge className="bg-gray-500/20 text-gray-300 text-xs">+{domain.applications.length - 3}</Badge>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredDomains.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No domains found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
