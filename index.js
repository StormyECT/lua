export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 🔥 upload endpoint
    if (request.method === "POST" && url.pathname === "/upload") {
      const { filename, content } = await request.json()

      // 🚫 block names
      const lower = filename.toLowerCase()
      if (lower.includes("mivora") || lower.includes("official")) {
        return new Response("Blocked filename", { status: 400 })
      }

      if (filename.includes("/") || filename.includes("..")) {
        return new Response("Invalid filename", { status: 400 })
      }

      // 📤 upload to YOUR repo /public
      const res = await fetch(
        `https://api.github.com/repos/StormyECT/lua/contents/public/${filename}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: `upload ${filename}`,
            content: content
          })
        }
      )

      return new Response(await res.text(), { status: res.status })
    }

    return new Response("OK")
  }
}
