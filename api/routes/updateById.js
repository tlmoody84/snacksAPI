// Import our Supabase instance
const { supabase } = require("../../supabaseInstance");

const updateById = async (request, response, next) => {
  try {
    // Destructure request.body object
    const { name, description, price, category, inStock } = request.body;

    // Error handling if request doesn't send all fields necessary
    if (!name || !description || !price || !category || !inStock) {
      return response
        .status(400)
        .json({ message: "Missing required fields!!" });
    }

    // Create an object for the updated fields
    const updatedSnacks = {
      name,
      description,
      price,
      category,
      inStock,
    };

    // Perform the update operation
    const { data, error } = await supabase
      .from('snacks')
      .update(updatedSnacks)
      .eq('id', request.params.id);

    if (error) {
      throw error;
    }

    // Send success response
    response.status(200).json({ message: "Snack updated successfully!" });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
