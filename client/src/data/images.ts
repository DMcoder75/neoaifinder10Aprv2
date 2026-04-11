// Unique, relevant images for each section - using Unsplash URLs
export const UNIQUE_IMAGES = {
  // News images
  news: [
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f000?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f001?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f002?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f003?w=800&h=600&fit=crop",
  ],

  // Career images
  careers: [
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884979?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884980?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884981?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884982?w=800&h=600&fit=crop",
  ],

  // Research images
  research: [
    "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f70d504f1?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f70d504f2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516321318423-f06f70d504f3?w=800&h=600&fit=crop",
  ],

  // Startup ideas images
  startups: [
    "https://images.unsplash.com/photo-1552664730-d307ca884983?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884984?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884985?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884986?w=800&h=600&fit=crop",
  ],

  // Domain images
  domains: [
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f010?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f011?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f012?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f013?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f014?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1677442d019cecf8e5c1a4a1ff21f015?w=800&h=600&fit=crop",
  ],

  // Use case images
  usecases: [
    "https://images.unsplash.com/photo-1552664730-d307ca884987?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884988?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884989?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884990?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884991?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884992?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884993?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552664730-d307ca884994?w=800&h=600&fit=crop",
  ],

  // Tool category images
  tools: {
    writing: "https://images.unsplash.com/photo-1455849318169-8c8e4f6904f0?w=800&h=600&fit=crop",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    video: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=600&fit=crop",
    coding: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    productivity: "https://images.unsplash.com/photo-1552664730-d307ca884995?w=800&h=600&fit=crop",
    reasoning: "https://images.unsplash.com/photo-1516321318423-f06f70d504f4?w=800&h=600&fit=crop",
    marketing: "https://images.unsplash.com/photo-1552664730-d307ca884996?w=800&h=600&fit=crop",
    search: "https://images.unsplash.com/photo-1552664730-d307ca884997?w=800&h=600&fit=crop",
  },

  // Placeholder for loading
  placeholder: "https://images.unsplash.com/photo-1552664730-d307ca884998?w=800&h=600&fit=crop",
};

export function getImageForIndex(category: string, index: number): string {
  const categoryImages = UNIQUE_IMAGES[category as keyof typeof UNIQUE_IMAGES];
  
  if (Array.isArray(categoryImages)) {
    return categoryImages[index % categoryImages.length];
  }
  
  return UNIQUE_IMAGES.placeholder;
}
