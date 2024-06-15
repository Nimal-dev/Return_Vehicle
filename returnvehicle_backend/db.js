const mongoose=require('mongoose')

function connects(){
    mongoose.connect('mongodb://localhost:27017/returnvehicle')
    .then(()=>console.log('connected...'))
    .catch((error)=>{console.log(error)})
}
module.exports=connects