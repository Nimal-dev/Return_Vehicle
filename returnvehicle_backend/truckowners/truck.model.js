const mongoose=require('mongoose')

const loginSchema = mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true},
    userstatus: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() }
  });
  const login = mongoose.model("login", loginSchema);
  
  const truckownerSchema = mongoose.Schema({
    name: { type: String, required: true },
    place: { type: String, required: true },
    contact: { type: Number, required: true },
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "login" },
    
    createdAt: { type: Date, default: Date.now()}
  });
  const truckownerdetails = mongoose.model("truckowner", truckownerSchema);

const truckaddSchema=mongoose.Schema({
    truckname:{
        type:String,
        required:true
    },
    licenseno:{
        type:String,
        required:true
    },
    vehicleno:{
        type:String,
        required:true
    },
    truckid:{ type: mongoose.Schema.Types.ObjectId, ref: "truckowner" },
    is_check: { type: Number, default: 0 },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
const truckdetails=mongoose.model('truckdetails',truckaddSchema,)

const scheduledDetailsSchema = mongoose.Schema({
    truckname:{ type: mongoose.Schema.Types.ObjectId, ref: "truckdetails", required: true },
    locationfrom: { type: String, required: true },
    locationto: { type: String, required: true },
    startingtym: { type: String, required: true },
    endtym: { type: String, required: true },
    truckownerid: { type: mongoose.Schema.Types.ObjectId, ref: "truckowner", required: true },
    createdAt: { type: Date, default: Date.now }
});
const scheduledDetails = mongoose.model('scheduledDetails', scheduledDetailsSchema);


const driverSchema = mongoose.Schema({
 
    drivername: { type: String, required: true },
    driverlicense: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const driver = mongoose.model('driverDetails', driverSchema);

module.exports={truckownerdetails: truckownerdetails , login: login,truckdetails:truckdetails,scheduledDetails:scheduledDetails, driver};