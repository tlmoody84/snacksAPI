// Import the Supabase client instance
const { supabase } = require("../supabaseInstance");

const getById = async (request, response, next) => {
  try {
    const { id } = request.params;

    // Fetch data from Supabase
    const { data, error, status } = await supabase
      .from('snacks')  // Table name
      .select('*')    // Select all columns
      .eq('id', id);  // Filter by ID

    // Error Handling
    if (error) {
      return response.status(status).json({ message: error.message });
    }

    if (data.length === 0) {
      return response.status(404).json({ message: "Snack does not exist!" });
    }

    // Send the retrieved snack object
    response.json(data[0]);
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
