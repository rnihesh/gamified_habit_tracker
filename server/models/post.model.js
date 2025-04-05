const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user",
      required: true 
    },
    content: { 
      type: String,
      trim: true,
      maxlength: 2000 
    },
    media: [{ 
      type: String // Array of image/video URLs
    }],
    likes: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user" 
    }],
    comments: [{
      user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user",
        required: true 
      },
      text: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 500 
      },
      createdAt: { 
        type: Date, 
        default: Date.now 
      }
    }],
    tags: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "user" 
    }],
    isAchievement: { 
      type: Boolean, 
      default: false 
    }
  },
  { 
    strict: "throw",
    timestamps: true 
  }
);

// Indexes for better query performance
postSchema.index({ user: 1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ likes: 1 });
postSchema.index({ tags: 1 });

const Post = mongoose.model("post", postSchema);

module.exports = Post;