import express from "express";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

// In-memory storage (will be replaced with MongoDB later)
let searches = [];

// Create search record
router.post("/", async (req, res) => {
  try {
    const search = {
      id: `search-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      query: req.body.query,
      filters: req.body.filters || {},
      timestamp: new Date().toISOString(),
    };

    searches.push(search);

    res.status(201).json({
      success: true,
      message: "Search recorded successfully",
      data: search,
    });
  } catch (error) {
    console.error("Create search error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to record search",
      error: error.message,
    });
  }
});

// Get all searches (admin only)
router.get("/", authenticateToken, isAdmin, async (req, res) => {
  try {
    const sortedSearches = [...searches].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    res.json({
      success: true,
      data: sortedSearches,
      count: sortedSearches.length,
    });
  } catch (error) {
    console.error("Get searches error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch searches",
      error: error.message,
    });
  }
});

// Get search analytics (admin only)
router.get("/analytics", authenticateToken, isAdmin, async (req, res) => {
  try {
    const analytics = {
      totalSearches: searches.length,
      recentSearches: searches.slice(-10).reverse(),
      topQueries: getTopQueries(searches),
      searchesByDate: getSearchesByDate(searches),
    };

    res.json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    console.error("Get search analytics error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch search analytics",
      error: error.message,
    });
  }
});

// Helper function to get top queries
function getTopQueries(searches) {
  const queryCounts = {};
  searches.forEach((search) => {
    const query = search.query?.toLowerCase() || "";
    queryCounts[query] = (queryCounts[query] || 0) + 1;
  });

  return Object.entries(queryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([query, count]) => ({ query, count }));
}

// Helper function to get searches by date
function getSearchesByDate(searches) {
  const dateGroups = {};
  searches.forEach((search) => {
    const date = new Date(search.timestamp).toISOString().split("T")[0];
    dateGroups[date] = (dateGroups[date] || 0) + 1;
  });

  return Object.entries(dateGroups)
    .sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime())
    .slice(0, 30)
    .map(([date, count]) => ({ date, count }));
}

export default router;
