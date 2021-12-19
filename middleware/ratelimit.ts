import rateLimit from "express-rate-limit";

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

export const ratelimit = (mins: number, maxHits: number) => rateLimit({
    windowMs: mins * 60 * 1000, // 15 minutes
    max: maxHits
});
