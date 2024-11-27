import mongoose, {Schema} from "mongoose";

const urlSchema = new Schema({
    originalUrl: 
    { 
        type: String, 
        unique: true,
        required: true 
    },
    shortId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    clicks: { 
        type: Number, 
        default: 0 
    },
    lastAccessed: { 
        type: Date, 
        default: null 
    },
  });
export const Url = mongoose.model("Url",urlSchema);