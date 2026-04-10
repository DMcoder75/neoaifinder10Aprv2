import { eq, desc, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  aiTools,
  toolSubmissions,
  toolReviews,
  affiliateClicks,
  aiNews,
  aiOfTheDay,
  searchAnalytics,
  toolViews,
  users,
  InsertAiTool,
  InsertToolSubmission,
  InsertToolReview,
  InsertAffiliateClick,
  InsertAiNews,
  InsertSearchAnalytic,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ============ AI TOOLS QUERIES ============

export async function getAllTools() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(aiTools).orderBy(desc(aiTools.rating));
}

export async function getToolById(id: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(aiTools).where(eq(aiTools.id, id)).limit(1);
  return result[0] || null;
}

export async function getToolsByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(aiTools)
    .where(eq(aiTools.category, category))
    .orderBy(desc(aiTools.rating));
}

export async function getAffiliateTools() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(aiTools)
    .where(eq(aiTools.isAffiliate, true))
    .orderBy(desc(aiTools.affiliateClicks));
}

export async function getTrendingTools(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(aiTools)
    .orderBy(desc(aiTools.affiliateClicks))
    .limit(limit);
}

export async function createTool(tool: InsertAiTool) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(aiTools).values(tool);
}

export async function updateToolAffiliateClic (toolId: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const tool = await getToolById(toolId);
  if (!tool) throw new Error("Tool not found");
  await db
    .update(aiTools)
    .set({ affiliateClicks: tool.affiliateClicks + 1 })
    .where(eq(aiTools.id, toolId));
}

// ============ TOOL SUBMISSIONS QUERIES ============

export async function createSubmission(submission: InsertToolSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(toolSubmissions).values(submission);
  return result;
}

export async function getPendingSubmissions() {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(toolSubmissions)
    .where(eq(toolSubmissions.status, "pending"))
    .orderBy(desc(toolSubmissions.createdAt));
}

export async function approveSubmission(submissionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(toolSubmissions)
    .set({ status: "approved" })
    .where(eq(toolSubmissions.id, submissionId));
}

export async function rejectSubmission(submissionId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .update(toolSubmissions)
    .set({ status: "rejected" })
    .where(eq(toolSubmissions.id, submissionId));
}

// ============ TOOL REVIEWS QUERIES ============

export async function createReview(review: InsertToolReview) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(toolReviews).values(review);
}

export async function getToolReviews(toolId: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(toolReviews)
    .where(eq(toolReviews.toolId, toolId))
    .orderBy(desc(toolReviews.createdAt));
}

export async function getAverageRating(toolId: string) {
  const db = await getDb();
  if (!db) return 0;
  const reviews = await getToolReviews(toolId);
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// ============ AFFILIATE CLICK TRACKING ============

export async function logAffiliateClick(click: InsertAffiliateClick) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(affiliateClicks).values(click);
  await updateToolAffiliateClic(click.toolId);
}

export async function getAffiliateClickStats(toolId: string, days: number = 30) {
  const db = await getDb();
  if (!db) return { totalClicks: 0, conversions: 0, conversionRate: 0 };
  
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  const clicks = await db
    .select()
    .from(affiliateClicks)
    .where(
      and(
        eq(affiliateClicks.toolId, toolId),
        gte(affiliateClicks.createdAt, since)
      )
    );
  
  const conversions = clicks.filter((c) => c.isConversion).length;
  const conversionRate = clicks.length > 0 ? (conversions / clicks.length) * 100 : 0;
  
  return {
    totalClicks: clicks.length,
    conversions,
    conversionRate: Math.round(conversionRate * 100) / 100,
  };
}

// ============ NEWS QUERIES ============

export async function createNews(news: InsertAiNews) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(aiNews).values(news);
}

export async function getLatestNews(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(aiNews)
    .orderBy(desc(aiNews.publishedAt))
    .limit(limit);
}

export async function getFeaturedNews(limit: number = 5) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(aiNews)
    .where(eq(aiNews.featured, true))
    .orderBy(desc(aiNews.publishedAt))
    .limit(limit);
}

// ============ SEARCH ANALYTICS ============

export async function logSearch(query: string, category?: string, resultsCount: number = 0) {
  const db = await getDb();
  if (!db) return;
  await db.insert(searchAnalytics).values({
    searchQuery: query,
    category,
    resultsCount,
  });
}

export async function getTrendingSearches(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  
  const searches = await db.select().from(searchAnalytics);
  const grouped = searches.reduce(
    (acc, s) => {
      const key = s.searchQuery;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  return Object.entries(grouped)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([query, count]) => ({ query, count }));
}

// ============ TOOL VIEWS ANALYTICS ============

export async function logToolView(toolId: string, sessionId: string) {
  const db = await getDb();
  if (!db) return;
  await db.insert(toolViews).values({ toolId, sessionId });
}

export async function getToolViewStats(toolId: string, days: number = 30) {
  const db = await getDb();
  if (!db) return 0;
  
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  const views = await db
    .select()
    .from(toolViews)
    .where(
      and(
        eq(toolViews.toolId, toolId),
        gte(toolViews.createdAt, since)
      )
    );
  
  return views.length;
}

// ============ ANALYTICS AGGREGATION ============

export async function getTopToolsByClicks(limit: number = 10) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(aiTools)
    .orderBy(desc(aiTools.affiliateClicks))
    .limit(limit);
}

export async function getPopularCategories() {
  const db = await getDb();
  if (!db) return [];
  
  const tools = await db.select().from(aiTools);
  const grouped = tools.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );
  
  return Object.entries(grouped)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({ category, count }));
}

export async function getSubmissionStats() {
  const db = await getDb();
  if (!db) return { pending: 0, approved: 0, rejected: 0 };
  
  const all = await db.select().from(toolSubmissions);
  return {
    pending: all.filter((s) => s.status === "pending").length,
    approved: all.filter((s) => s.status === "approved").length,
    rejected: all.filter((s) => s.status === "rejected").length,
  };
}
