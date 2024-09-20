// SupabaseClient.js

class SupabaseClient {
    constructor(url, key, options) {
      if (!url) throw new Error('supabaseUrl is required.');
      if (!key) throw new Error('supabaseKey is required.');
      this.url = url;
      this.key = key;
      this.options = options || {};
    }
  
    // Other methods...
  }
  
  module.exports = SupabaseClient;
  