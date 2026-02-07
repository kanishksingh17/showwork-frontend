import mongoose from "mongoose";

const PublishedPostSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  projectId: { type: String, required: false },
  scheduledPostId: { type: String, required: false }, // Reference to original scheduled post
  platforms: [{ type: String, enum: ["linkedin", "twitter", "reddit", "facebook", "instagram"] }],
  payload: {
    text: String,
    mediaUrls: [String],
    perPlatform: mongoose.Schema.Types.Mixed,
  },
  platformResults: [{
    platform: String,
    postId: String,
    url: String,
    status: String,
    publishedAt: Date,
    error: String
  }],
  publishedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ["posted", "partial"], default: "posted" }, // Only successful or partial publishes
}, { 
  timestamps: true,
  collection: "published_posts" // Match Prisma collection name
});

export default mongoose.models.PublishedPost || mongoose.model("PublishedPost", PublishedPostSchema);


