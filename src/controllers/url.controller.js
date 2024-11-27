import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import { asyncHandler } from "../../asyncHandler.js";

const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
};

const shorten = asyncHandler(async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    if (!isValidUrl(url)) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    try {
        // Check if the URL already exists in the database
        const existingUrl = await Url.findOne({ originalUrl: url });

        if (existingUrl) {
            // If the URL exists, return the existing short URL
            return res.json({ shortUrl: `http://localhost:3000/${existingUrl.shortId}` });
        }

        // If the URL does not exist, create a new entry
        const shortId = nanoid(8); 
        const newUrl = new Url({ originalUrl: url, shortId });

        await newUrl.save();

        // Return the newly generated short URL
        res.json({ shortUrl: `http://localhost:3000/${shortId}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to shorten URL" });
    }
});


const redirect = asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    try {
        const urlEntry = await Url.findOne({ shortId });

        if (!urlEntry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        urlEntry.clicks += 1;
        urlEntry.lastAccessed = new Date();
        await urlEntry.save();

        res.redirect(urlEntry.originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to redirect to the original URL" });
    }
});

const stats = asyncHandler(async (req, res) => {
    const { shortId } = req.params;

    try {
        const urlEntry = await Url.findOne({ shortId });

        if (!urlEntry) {
            return res.status(404).json({ error: "Short URL not found" });
        }

        res.json({
            originalUrl: urlEntry.originalUrl,
            totalClicks: urlEntry.clicks,
            lastAccessed: urlEntry.lastAccessed,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to retrieve statistics" });
    }
});

export {shorten,redirect, stats}