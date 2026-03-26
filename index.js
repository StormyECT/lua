export default {
  async fetch(request, env) {
    // Let Cloudflare handle static assets automatically
    return env.ASSETS.fetch(request)
  }
}
