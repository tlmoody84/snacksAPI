const axiosInstance = require('../supabaseInstance');
const getAll = async (req, res) => {
  try {
    const response = await axiosInstance.get('/snacks'); 
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching snacks:', error);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};
module.exports = getAll;