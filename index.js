export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (request.method === "POST" && url.pathname === "/upload") {
      const { filename, content } = await request.json()

      // 🚫 Block banned words
      const lower = filename.toLowerCase()
      if (lower.includes("mivora") || lower.includes("official")) {
        return new Response("Filename contains banned words", { status: 400 })
      }

      // Optional: basic safety (no weird paths)
      if (filename.includes("/") || filename.includes("..")) {
        return new Response("Invalid filename", { status: 400 })
      }

      const githubRes = await fetch(
        `https://api.github.com/repos/StormyECT/lua/contents/${filename}`,
        {
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: `upload ${filename}`,
            content: content
          })
        }
      )

      return new Response(await githubRes.text(), {
        status: githubRes.status
      })
    }

    return new Response("Worker running")
  }
}
