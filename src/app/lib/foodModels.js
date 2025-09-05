const { default: mongoose } = require("mongoose");

const foodModels = new mongoose.Schema({
  name: String,
  price: Number,
  desc: String,
  image: String,
  resto_id: mongoose.Schema.Types.ObjectId
});

export const foodSchema = mongoose.models.foods || mongoose.model("foods",foodModels);
