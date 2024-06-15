const models=require('./truck.model')
const loginModel = models.login;
const truckownerModel = models.truckownerdetails;
const truckdetails = models.truckdetails;
const driverdetails = models.driver;
const scheduledDetails=models.scheduledDetails
const model=require('../Goddowns/Goddown.model')
const goddownModel=model.goddowndetails;



exports.addTruckowner = async (req, res) => {
    try {
        // Create a new login entry first to get the user ID
        const loginParams = {
            email: req.body.email,
            password: req.body.password,
            userstatus: req.body.userstatus,
        };
        const Login = await loginModel.create(loginParams);

        // Create a new shelter entry with the obtained login ID
        const truckownerParams = {
            name: req.body.name,
           
            place: req.body.place,
            contact: req.body.contact,
            userid: Login._id  // Use the ID from the created login
        };
        await truckownerModel.create(truckownerParams);

        // Send success response
        res.json('success');
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.login = async (req, res) => {
    try {
        const param = {
            email: req.body.email,
            password: req.body.password
        };

        const user = await loginModel.findOne({ email: param.email });

        if (user && user.password === param.password) {
            const truckowner= await truckownerModel.findOne({ userid: user._id });
            const goddown = await goddownModel.findOne({ userid: user._id });

            let userdata = {
                ...user.toObject()
            };

            if (truckowner) {
                userdata = {
                    ...userdata,
                    ...truckowner.toObject()
                };
            }

            if (goddown) {
                userdata = {
                    ...userdata,
                    ...goddown.toObject()
                };
            }
            req.session.user = userdata;
            res.json(userdata);
        } else {
            res.status(401).json({ error: "Invalid email or password" });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.addTruck=async(req,res)=>{
    let params={
        truckname:req.body.truckname,
        licenseno:req.body.licenseno,
        vehicleno:req.body.vehicleno,
        truckid: req.body.truckid 
    }
    await truckdetails.create(params)
    res.json('success')
}


exports.addDriver=async(req,res)=>{
    let params={
        drivername:req.body.drivername,
        driverlicense:req.body.driverlicense,
       
    }
    await driverdetails.create(params)
    res.json('success')
}

exports.viewDrivers=async(req,res)=>{
    const viewDrivers=await driverdetails.find()
    res.json(viewDrivers)
}


exports.EditDriver=async(req,res)=>{
    try{
        const EditDriver=await driverdetails.findByIdAndUpdate(req.body.id,{
            drivername:req.body.drivername,
            driverlicense:req.body.driverlicense,
            
           
        });
        res.json(EditDriver);
    }catch(error){
        console.error("error updating error");
        res.status(500).json({error:"error updating user"})
    }
}

exports.getDrivers=async(req,res)=>{
    const getDrivers=await driverdetails.findById(req.body.id);
    console.log(getDrivers);
    res.json(getDrivers);
    
}

exports.deleteDriver=async(req,res)=>{
    try{
        const deleteDriver=await driverdetails.findByIdAndDelete(req.body.id);
        res.json(deleteDriver);
    }catch(error){
            console.error("error deleting:",error)
            res.status(500).json({error:"error deleting truck"})
    }
}

exports.viewTruck=async(req,res)=>{
    const viewtruck=await truckdetails.find()
    res.json(viewtruck)
}

exports.getTruck=async(req,res)=>{
    const getTruck=await truckdetails.findById(req.body.id);
    console.log(getTruck);
    res.json(getTruck);
    
}
exports.updateTruck=async(req,res)=>{
    try{
        const updateTruck=await truckdetails.findByIdAndUpdate(req.body.id,{
            truckname:req.body.truckname,
            licenseno:req.body.licenseno,
            vehicleno:req.body.vehicleno,
           
        });
        res.json(updateTruck);
    }catch(error){
        console.error("error updating error");
        res.status(500).json({error:"error updating user"})
    }
}
exports.deleteTruck=async(req,res)=>{
    try{
        const deleteTruck=await truckdetails.findByIdAndDelete(req.body.id);
        res.json(deleteTruck);
    }catch(error){
            console.error("error deleting:",error)
            res.status(500).json({error:"error deleting truck"})
    }
}
exports.addSchedule = async (req, res) => {
    try {
        let params = {
            truckname:req.body.truckname,
            locationfrom: req.body.locationfrom,
            locationto: req.body.locationto,
            startingtym: req.body.startingtym,
            endtym: req.body.endtym,
            truckownerid: req.body.truckownerid 
        };

        const newSchedule = await scheduledDetails.create(params);
        res.status(201).json({ message: 'success', schedule: newSchedule });
    } catch (error) {
        console.error('Error adding schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewScheduledTrucks = async (req, res) => {
    try {
        const scheduledTrucks = await scheduledDetails.find()
            .populate('truckname')
            .populate('truckownerid');

        res.status(200).json(scheduledTrucks);
    } catch (error) {
        console.error('Error fetching scheduled trucks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getSchedule = async (req, res) => {
    try {
        const scheduledTruck = await scheduledDetails.findById(req.body.id)
            .populate('truckname');

        if (!scheduledTruck) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        res.json(scheduledTruck);
    } catch (err) {
        console.error('Error fetching schedule:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateSchedule = async (req, res) => {
    try {
        const { id, truckname, locationfrom, locationto, startingtym, endtym } = req.body;
        
        const updatedSchedule = await scheduledDetails.findByIdAndUpdate(
            id,
            {
                truckname,
                locationfrom,
                locationto,
                startingtym,
                endtym,
            },
            { new: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ error: 'Schedule not found' });
        }

        res.json(updatedSchedule);
    } catch (err) {
        console.error('Error updating schedule:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteSchedule=async(req,res)=>{
    try{
        const deleteschedule=await scheduledDetails.findByIdAndDelete(req.body.id);
        res.json(deleteschedule);
    }catch(error){
            console.error("error deleting:",error)
            res.status(500).json({error:"error deleting truck"})
    }
}


exports.approve = async (req, res) => {
    try {
        const updatedTruck = await scheduledDetails.findByIdAndUpdate(req.body.id, { is_check: 1 }, { new: true });
        res.status(200).json({ message: "Truck approved", truck: updatedTruck });
    } catch (error) {
        console.error("Error approving truck:", error);
        res.status(500).json({ message: "Error approving truck" });
    }
};

exports.reject = async (req, res) => {
    try {
        const updatedTruck = await scheduledDetails.findByIdAndUpdate(req.body.id, { is_check: 0 }, { new: true });
        res.status(200).json({ message: "Truck rejected", truck: updatedTruck });
    } catch (error) {
        console.error("Error rejecting truck:", error);
        res.status(500).json({ message: "Error rejecting truck" });
    }
};
