import { motion } from "framer-motion";
import { MessageSquare, BookOpen, Plus, Users, TrendingUp, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import Header from "@/components/Header";

export default function Community() {
  const [, setLocation] = useLocation();

  const communityFeatures = [
    {
      icon: MessageSquare,
      title: "Discussions",
      description: "Join conversations about AI tools, trends, and best practices",
      color: "from-purple-600 to-purple-700",
      stats: "2.5K discussions",
    },
    {
      icon: BookOpen,
      title: "Learning Hub",
      description: "Access tutorials, guides, and expert content about AI",
      color: "from-blue-600 to-blue-700",
      stats: "500+ guides",
    },
    {
      icon: Plus,
      title: "Submit Tool",
      description: "Share new AI tools and help grow our community",
      color: "from-pink-600 to-pink-700",
      stats: "200+ submissions",
    },
    {
      icon: Users,
      title: "User Reviews",
      description: "Read and write reviews about AI tools",
      color: "from-green-600 to-green-700",
      stats: "100K+ reviews",
    },
    {
      icon: TrendingUp,
      title: "Trending",
      description: "See what's trending in the AI community",
      color: "from-orange-600 to-orange-700",
      stats: "Real-time updates",
    },
    {
      icon: Award,
      title: "Leaderboard",
      description: "Top contributors and most helpful community members",
      color: "from-red-600 to-red-700",
      stats: "Top 100 members",
    },
  ];

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
              Community
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join 500K+ AI enthusiasts exploring the future of artificial intelligence
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        {/* Community Features Grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {communityFeatures.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Card className={`bg-gradient-to-br ${feature.color} border border-purple-500/30 p-8 cursor-pointer hover:border-purple-500/50 transition-all h-full flex flex-col`}>
                <feature.icon className="w-12 h-12 text-white mb-4" />
                <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
                <p className="text-white/80 text-sm mb-6 flex-1">{feature.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-xs font-semibold">{feature.stats}</span>
                  <Button className="bg-white/20 hover:bg-white/30 text-white text-xs">Join</Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Activity Section */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="text-4xl font-bold mb-8">Recent Activity</h2>

          <div className="space-y-4">
            {[
              { user: "Sarah Chen", action: "shared a new AI tool", tool: "Claude 3 Opus", time: "2 hours ago" },
              { user: "Alex Rodriguez", action: "wrote a review for", tool: "ChatGPT Plus", time: "4 hours ago" },
              { user: "Emma Wilson", action: "started a discussion about", tool: "AI Ethics", time: "6 hours ago" },
              { user: "James Park", action: "published a guide on", tool: "Prompt Engineering", time: "8 hours ago" },
              { user: "Lisa Zhang", action: "reached 1000 helpful votes", tool: "Top Contributor", time: "1 day ago" },
            ].map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="bg-gray-900/50 border border-purple-500/20 hover:border-purple-500/50 transition-all p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white">
                        <span className="font-bold text-purple-400">{activity.user}</span>
                        {" "}{activity.action}{" "}
                        <span className="font-bold text-pink-400">{activity.tool}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {activity.user.charAt(0)}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="mt-16 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Become part of the largest AI community and help shape the future of artificial intelligence
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 text-lg font-bold">
            Get Started Now
          </Button>
        </motion.section>
      </div>
    </div>
  );
}
