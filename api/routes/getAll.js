// routes/getAll.js
const supabase = require('../supabaseInstance');

const getAll = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('snacks')
      .select('*');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
