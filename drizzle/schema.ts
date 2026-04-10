import { 
  int, 
  mysqlEnum, 
  mysqlTable, 
  text, 
  timestamp, 
  varchar,
  decimal,
  boolean,
  json,
  index
} from "drizzle-orm/mysql-core";

/**
 * Core user table for authentication
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * AI Tools table - migrated from static const
 */
export const aiTools = mysqlTable("ai_tools", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  description: text("description").notNull(),
  pricing: varchar("pricing", { length: 255 }),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  reviews: int("reviews").default(0),
  url: varchar("url", { length: 2048 }).notNull(),
  isFeatured: boolean("isFeatured").default(false),
  features: json("features"), // Array of feature strings
  
  // Affiliate tracking
  isAffiliate: boolean("isAffiliate").default(false),
  affiliateUrl: varchar("affiliateUrl", { length: 2048 }),
  affiliateNetwork: varchar("affiliateNetwork", { length: 255 }), // e.g., "ChatGPT Partner", "Midjourney Affiliate"
  commissionRate: decimal("commissionRate", { precision: 5, scale: 2 }), // e.g., 15.00 for 15%
  affiliateClicks: int("affiliateClicks").default(0),
  affiliateConversions: int("affiliateConversions").default(0),
  
  // Metadata
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  categoryIdx: index("idx_category").on(table.category),
  affiliateIdx: index("idx_affiliate").on(table.isAffiliate),
}));

export type AiTool = typeof aiTools.$inferSelect;
export type InsertAiTool = typeof aiTools.$inferInsert;

/**
 * User Submissions - for community-contributed tools
 */
export const toolSubmissions = mysqlTable("tool_submissions", {
  id: int("id").autoincrement().primaryKey(),
  toolName: varchar("toolName", { length: 255 }).notNull(),
  toolUrl: varchar("toolUrl", { length: 2048 }).notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  description: text("description").notNull(),
  contactInfo: varchar("contactInfo", { length: 255 }).notNull(),
  
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending").notNull(),
  submittedBy: varchar("submittedBy", { length: 255 }), // Email or anonymous
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  statusIdx: index("idx_submission_status").on(table.status),
  createdIdx: index("idx_submission_created").on(table.createdAt),
}));

export type ToolSubmission = typeof toolSubmissions.$inferSelect;
export type InsertToolSubmission = typeof toolSubmissions.$inferInsert;

/**
 * Community Ratings & Reviews
 */
export const toolReviews = mysqlTable("tool_reviews", {
  id: int("id").autoincrement().primaryKey(),
  toolId: varchar("toolId", { length: 64 }).notNull(),
  userId: int("userId"),
  userEmail: varchar("userEmail", { length: 320 }), // For anonymous reviews
  rating: int("rating").notNull(), // 1-5 stars
  reviewText: text("reviewText"),
  helpfulCount: int("helpfulCount").default(0),
  unhelpfulCount: int("unhelpfulCount").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  toolIdx: index("idx_review_tool").on(table.toolId),
  userIdx: index("idx_review_user").on(table.userId),
  createdIdx: index("idx_review_created").on(table.createdAt),
}));

export type ToolReview = typeof toolReviews.$inferSelect;
export type InsertToolReview = typeof toolReviews.$inferInsert;

/**
 * Affiliate Click Tracking
 */
export const affiliateClicks = mysqlTable("affiliate_clicks", {
  id: int("id").autoincrement().primaryKey(),
  toolId: varchar("toolId", { length: 64 }).notNull(),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  userAgent: text("userAgent"),
  ipHash: varchar("ipHash", { length: 255 }), // Hashed for privacy
  referrer: varchar("referrer", { length: 2048 }),
  
  isConversion: boolean("isConversion").default(false),
  conversionValue: decimal("conversionValue", { precision: 10, scale: 2 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  toolIdx: index("idx_click_tool").on(table.toolId),
  createdIdx: index("idx_click_created").on(table.createdAt),
}));

export type AffiliateClick = typeof affiliateClicks.$inferSelect;
export type InsertAffiliateClick = typeof affiliateClicks.$inferInsert;

/**
 * AI News Feed
 */
export const aiNews = mysqlTable("ai_news", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 500 }).notNull(),
  description: text("description").notNull(),
  content: text("content"),
  imageUrl: varchar("imageUrl", { length: 2048 }),
  sourceUrl: varchar("sourceUrl", { length: 2048 }),
  source: varchar("source", { length: 255 }), // e.g., "OpenAI", "Anthropic", "Google"
  category: varchar("category", { length: 64 }), // e.g., "breakthrough", "update", "release"
  
  views: int("views").default(0),
  featured: boolean("featured").default(false),
  
  publishedAt: timestamp("publishedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  publishedIdx: index("idx_news_published").on(table.publishedAt),
  featuredIdx: index("idx_news_featured").on(table.featured),
}));

export type AiNews = typeof aiNews.$inferSelect;
export type InsertAiNews = typeof aiNews.$inferInsert;

/**
 * AI of the Day - daily spotlight
 */
export const aiOfTheDay = mysqlTable("ai_of_the_day", {
  id: int("id").autoincrement().primaryKey(),
  toolId: varchar("toolId", { length: 64 }).notNull(),
  spotlightDate: timestamp("spotlightDate").notNull(),
  highlightReason: text("highlightReason"),
  views: int("views").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  dateIdx: index("idx_aiofday_date").on(table.spotlightDate),
  toolIdx: index("idx_aiofday_tool").on(table.toolId),
}));

export type AiOfTheDay = typeof aiOfTheDay.$inferSelect;
export type InsertAiOfTheDay = typeof aiOfTheDay.$inferInsert;

/**
 * Tool Comparison Snapshots
 */
export const toolComparisons = mysqlTable("tool_comparisons", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  toolIds: json("toolIds"), // Array of tool IDs being compared
  comparisonData: json("comparisonData"), // Structured comparison data
  createdBy: int("createdBy"), // User ID
  views: int("views").default(0),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
}, (table) => ({
  createdIdx: index("idx_comparison_created").on(table.createdAt),
}));

export type ToolComparison = typeof toolComparisons.$inferSelect;
export type InsertToolComparison = typeof toolComparisons.$inferInsert;

/**
 * Search Analytics - track user searches
 */
export const searchAnalytics = mysqlTable("search_analytics", {
  id: int("id").autoincrement().primaryKey(),
  searchQuery: varchar("searchQuery", { length: 255 }).notNull(),
  resultsCount: int("resultsCount").default(0),
  category: varchar("category", { length: 64 }),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  queryIdx: index("idx_search_query").on(table.searchQuery),
  createdIdx: index("idx_search_created").on(table.createdAt),
}));

export type SearchAnalytic = typeof searchAnalytics.$inferSelect;
export type InsertSearchAnalytic = typeof searchAnalytics.$inferInsert;

/**
 * Tool View Analytics
 */
export const toolViews = mysqlTable("tool_views", {
  id: int("id").autoincrement().primaryKey(),
  toolId: varchar("toolId", { length: 64 }).notNull(),
  sessionId: varchar("sessionId", { length: 255 }).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => ({
  toolIdx: index("idx_view_tool").on(table.toolId),
  createdIdx: index("idx_view_created").on(table.createdAt),
}));

export type ToolView = typeof toolViews.$inferSelect;
export type InsertToolView = typeof toolViews.$inferInsert;
