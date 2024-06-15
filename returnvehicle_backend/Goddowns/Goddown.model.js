const mongoose=require('mongoose')


const goddownSchema = mongoose.Schema({
    goddownname: { type: String, required: true },
    place: { type: String, required: true },
    contact: { type: Number, required: true },
    licenseno:{type: Number, required: true},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "login" },
    is_check: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now()}
  });
  const goddowndetails = mongoose.model("goddown", goddownSchema);

  module.exports={goddowndetails: goddowndetails}