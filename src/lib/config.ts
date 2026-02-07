export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY || "",
  },
  aws: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY || "",
    region: import.meta.env.VITE_AWS_REGION || "us-east-1",
    bucketName: import.meta.env.VITE_AWS_BUCKET_NAME || "showwork-portfolios",
  },
  vercel: {
    token: import.meta.env.VITE_VERCEL_TOKEN || "",
    baseUrl: "https://api.vercel.com",
  },
  app: {
    url: import.meta.env.VITE_APP_URL || "http://localhost:3000",
  },
};
