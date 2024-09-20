// require("dotenv").config();

// const axios = require('axios');
// const { createClient } = require("@supabase/supabase-js");

// const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// const axiosInstance = axios.create({
//     baseURL: process.env.SUPABASE_URL + "/rest/v1",
//     timeout: 1000,
//     headers: {
//         apikey: process.env.SUPABASE_KEY,
//         Authorization: `Bearer ${process.env.SUPABASE_KEY}`, // Corrected Authorization header
//     },
// });


// module.exports = supabase, axiosInstance;


require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://default.supabase.co'; // Provide a default URL if necessary
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || 'default-anon-key'; // Provide a default key if necessary

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn('Warning: Supabase URL and ANON key must be provided. Using default values.');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

module.exports = supabase;

