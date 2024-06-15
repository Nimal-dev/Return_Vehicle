const models=require('./Goddown.model')
goddownModel=models.goddowndetails;
const model=require('../truckowners/truck.model')
const loginModel = model.login;


exports.addGoddown = async (req, res) => {
    try {
        // Create a new login entry first to get the user ID
        const loginParams = {
            email: req.body.email,
            password: req.body.password,
            userstatus: req.body.userstatus,
        };
        const Login = await loginModel.create(loginParams);

        // Create a new shelter entry with the obtained login ID
        const goddownParams = {
            goddownname: req.body.goddownname,
            licenseno:req.body.licenseno,
            place: req.body.place,
            contact: req.body.contact,
            userid: Login._id  // Use the ID from the created login
        };
        await goddownModel.create(goddownParams);

        // Send success response
        res.json('success');
    } catch (error) {
        // Handle error
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};