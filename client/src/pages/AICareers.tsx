import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, TrendingUp, Users, DollarSign, Briefcase, ArrowLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXPANDED_AI_CAREERS } from "@/data/expandedContent";
import { useLocation } from "wouter";

export default function AICareers() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCareer, setSelectedCareer] = useState<typeof EXPANDED_AI_CAREERS[0] | null>(null);
  const [sortBy, setSortBy] = useState("demand");

  const sortedCareers = [...EXPANDED_AI_CAREERS].sort((a, b) => {
    if (sortBy === "salary") {
      return parseInt(b.salary.split("-")[1]) - parseInt(a.salary.split("-")[1]);
    }
    if (sortBy === "demand") {
      return b.demandLevel - a.demandLevel;
    }
    return 0;
  });

  const filteredCareers = sortedCareers.filter((career) =>
    career.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-3xl font-bold">💼 AI Careers & Opportunities</h1>
              <p className="text-gray-400 text-sm mt-1">50K+ AI jobs available - Find your next role</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input
                type="text"
                placeholder="Search careers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant={sortBy === "demand" ? "default" : "outline"}
                onClick={() => setSortBy("demand")}
                className="rounded-full text-xs"
              >
                Sort by Demand
              </Button>
              <Button
                size="sm"
                variant={sortBy === "salary" ? "default" : "outline"}
                onClick={() => setSortBy("salary")}
                className="rounded-full text-xs"
              >
                Sort by Salary
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {selectedCareer ? (
          // Detail View
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <button
              onClick={() => setSelectedCareer(null)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Careers
            </button>

            <div>
              <h1 className="text-4xl font-bold mb-4">{selectedCareer.title}</h1>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card className="bg-gray-900 border-gray-800 p-4">
                  <div className="text-xs text-gray-400 mb-1">Salary Range</div>
                  <div className="text-2xl font-bold text-green-400">{selectedCareer.salary}</div>
                </Card>
                <Card className="bg-gray-900 border-gray-800 p-4">
                  <div className="text-xs text-gray-400 mb-1">Demand Level</div>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold text-purple-400">{selectedCareer.demandLevel}%</div>
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                </Card>
                <Card className="bg-gray-900 border-gray-800 p-4">
                  <div className="text-xs text-gray-400 mb-1">Companies Hiring</div>
                  <div className="text-2xl font-bold text-blue-400">{selectedCareer.companies}+</div>
                </Card>
                <Card className="bg-gray-900 border-gray-800 p-4">
                  <div className="text-xs text-gray-400 mb-1">Growth Rate</div>
                  <div className="text-2xl font-bold text-green-400">{selectedCareer.growth}</div>
                </Card>
              </div>

              {/* Description */}
              <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-bold mb-3">Overview</h2>
                <p className="text-gray-300 leading-relaxed">{selectedCareer.description}</p>
              </div>

              {/* Responsibilities */}
              <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-bold mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {selectedCareer.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-3 text-gray-300">
                      <span className="text-purple-400 font-bold">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Skills */}
              <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-bold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.skills.map((skill) => (
                    <Badge key={skill} className="bg-purple-500/20 text-purple-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Top Companies */}
              <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
                <h2 className="text-xl font-bold mb-4">Top Companies Hiring</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {selectedCareer.companies_hiring.map((company) => (
                    <div
                      key={company}
                      className="bg-black rounded-lg p-3 text-center text-sm font-semibold text-gray-300 border border-gray-800 hover:border-purple-500/50 transition-colors"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </div>

              {/* Future Outlook */}
              <div className="bg-gradient-to-r from-purple-900/30 to-maroon-900/30 rounded-lg p-6 border border-purple-500/30">
                <h2 className="text-xl font-bold mb-2">Future Outlook</h2>
                <p className="text-gray-300">{selectedCareer.future_outlook}</p>
              </div>

              <Button className="w-full bg-purple-600 hover:bg-purple-700 py-3 text-lg">
                View Job Listings
              </Button>
            </div>
          </motion.div>
        ) : (
          // List View
          <div className="space-y-4">
            {filteredCareers.length > 0 ? (
              filteredCareers.map((career, idx) => (
                <motion.div
                  key={career.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => setSelectedCareer(career)}
                >
                  <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all cursor-pointer group p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                          {career.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3">{career.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Salary</div>
                        <div className="font-bold text-green-400">{career.salary}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Demand</div>
                        <div className="font-bold text-purple-400">{career.demand}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Companies</div>
                        <div className="font-bold text-blue-400">{career.companies}+</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Growth</div>
                        <div className="font-bold text-green-400">{career.growth}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {career.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} className="text-xs bg-purple-500/20 text-purple-300">
                          {skill}
                        </Badge>
                      ))}
                      {career.skills.length > 3 && (
                        <Badge className="text-xs bg-gray-800 text-gray-300">
                          +{career.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="mt-4 w-full bg-gray-800 rounded h-1">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-maroon-500 h-1 rounded"
                        style={{ width: `${career.demandLevel}%` }}
                      ></div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">No careers found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
