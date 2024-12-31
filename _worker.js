export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      const response = await fetch(request);
      return response;
    } catch (e) {
      return new Response(`${e.message}\n${e.stack}`, { status: 500 });
    }
  },
}; 