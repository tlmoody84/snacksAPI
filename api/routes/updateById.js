const axiosInstance = require('../supabaseInstance');
module.exports = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category, inStock } = req.body;
    
    if (!name || !description || price == null || category == null || inStock == null) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {
        
        const getResponse = await axiosInstance.get(`/snacks?id=eq.${id}`);
        if (getResponse.data.length === 0) {
            return res.status(404).json({ error: 'Snack not found' });
        }
  
        const updateResponse = await axiosInstance.patch(`/snacks?id=eq.${id}`, { name, description, price, category, inStock });
        
        res.status(200).json(updateResponse.data);
    } catch (error) {
        console.error('Error updating snack:', error.message);
        res.status(error.response?.status || 500).json({
            error: error.response?.data?.message || 'An error occurred while updating the snack.'
        });
    }
};