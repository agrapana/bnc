// let masteradmin = (req,res,next) => {
//     if(req.user.masteradmin === 0){
//         return res.json({ success: false, message: 'NOT AUTHORIZED'})
//     } else {    
//         next();
//     }
// }

// module.exports = { 
//     masteradmin
// }