const axios = require('axios');

async function recache() {
  // Fetch the dynamic paths from your API
  const paths = await getDynamicPaths();

  // Make a request to each path
  for (const path of paths) {
    await axios.get(`https://barusu.vercel.app/sheet/${path}`);
  }
}

async function getDynamicPaths() {
  // Replace this with the actual logic to fetch the dynamic paths
  return ['searchbar'];
}

recache();
