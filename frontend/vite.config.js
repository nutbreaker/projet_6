import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import fs from "node:fs";
import path from "node:path";

// allows to serve the mock data
const serveMockData = (filename, res) => {
  try {
    const filePath = path.resolve(process.cwd(), "mocks", filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    res.setHeader("Content-Type", "application/json");
    res.end(fileContent);
  } catch (err) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

export default defineConfig({
  plugins: [reactRouter(), tailwindcss()],

  server: {
    proxy: {
      // configure the API server proxy to serve the mock data
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,

        bypass: (req, res) => {
          const pathname = req.url.split('?')[0];
          const validRoutes = ["/api/login", "/api/user-info", "/api/user-activity"];

          if (!validRoutes.includes(pathname)) {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Not Found!" }));

            return;
          }

          // login
          if (pathname === "/api/login" && req.method === "POST") {
            let body = "";

            req.on("data", (chunk) => {
              body += chunk.toString();
            });

            req.on("end", () => {
              try {
                const data = JSON.parse(body);

                if (data.email === "user@email.com" && data.password === "asdf") {
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({
                    token: "mock-token",
                    userId: 1
                  }));
                } else {
                  res.statusCode = 401;
                  res.setHeader("Content-Type", "application/json");
                  res.end(JSON.stringify({ error: "Invalid username or password" }));
                }

              } catch (err) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "application/json");
                res.end(JSON.stringify({ error: "Bad Request" }));
              }
            });

            return;
          }
          if (pathname === "/api/login" && req.method === "GET") {
            res.statusCode = 405;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Method Not Allowed!" }));

            return;
          }

          const { authorization } = req.headers;

          // check authorization
          if (!authorization || !authorization.startsWith("Bearer ")) {
            res.statusCode = 401;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
              error: "Unauthorized: Missing or invalid token"
            }));

            return;
          }

          if (pathname === "/api/user-info") {
            return serveMockData("user-info.json", res);
          }

          if (pathname === "/api/user-activity") {
            return serveMockData("user-activity.json", res);
          }

        },
      },
    },
  },
});
