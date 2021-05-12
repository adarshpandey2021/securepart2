const express=require('express');
const router=express.Router();
const{AddVechile,AssignDriver,AssignConductor,AssignFemaleAsstt,AddOtherFitting,
  GetConductorInfo,GetDriverInfo,GetFemaleAsstInfo,GetOtherFittingInfo,GetVechileInfo,
  VechileInventory,GetVechileInventory,GenerateRouteNumber,GetRouteNumber,CreateRouteStopage,GetStopRouteNumber,
  GetVechileNumber,RouteAddittion,CreateRoute,GetRoute,
AssignBusRoute,GetAssignBusRoute,LogBook,GetLogBook,
VechileMaintenance,GetVechileMaintenance,UpdateTransport,GetUpdateTransport,
GetStoppageNameByRouteno,DriverLogBooK,GetTripNo,AddEndKmDriverLog,getALLDriverLog,
ConductorLogBooK,GetConductorLog,GetStudentNamefromStopage,Getdatabytripno,AddDriverLog,
DeleteVechileMaintence}=require('../controller/transport');

//ADD vechile Inventory

//add vechilce
router.post("/addvechile",AddVechile);
router.get("/getaddvechile",GetVechileInfo);

//assign driver
router.post("/assigndriver",AssignDriver);
router.get("/getassigndriver",GetDriverInfo);


//assign conductor
router.post("/assignconductor",AssignConductor);
router.get("/getassignconductor",GetConductorInfo);

///assign female Assistant
router.post("/assignfemaleasst",AssignFemaleAsstt);
router.get("/getassignfemaleasst",GetFemaleAsstInfo);

//other fittinf
router.post("/otherfitting",AddOtherFitting);
router.get("/getotherfitting",GetOtherFittingInfo);



router.post("/vechileinventory",VechileInventory);

router.get("/getvechileinventory",GetVechileInventory);

router.get("/getvechilenumber",GetVechileNumber);


////Addition route
 router.patch("/saveroute/:id",RouteAddittion)


 //Route Link

 router.post("/generateroute",GenerateRouteNumber)
 router.get("/getgenerateroute",GetRouteNumber)
 router.post("/stopageroute",CreateRouteStopage)
 router.get("/getstopageroute",GetStopRouteNumber)
 router.get("/getallstopage",GetStoppageNameByRouteno)




// create route 
 router.post("/createroute",CreateRoute);
 router.get("/getroute",GetRoute);

  
///Assign Busroute

router.patch("/assignbusroute",AssignBusRoute);
router.get("/getassignbusroute",GetAssignBusRoute)

//log book
router.post("/logbook",LogBook);
router.get("/getlogbook",GetLogBook);

//Vechile maintenance

router.post("/vechilemaintenance",VechileMaintenance);
router.get("/getvechilemaintenance",GetVechileMaintenance);
router.delete("/deletevechilemaintence/:id",DeleteVechileMaintence)

///Updation in transport
router.patch("/updatetransport",UpdateTransport)
router.get("/getupdatetransport",GetUpdateTransport)

//DriverLogBooK,GetTripNo,AddEndKmDriverLog

router.post("/driverlog",DriverLogBooK);
router.get("/getdriverlog",GetTripNo);
router.patch("/updatedriverlog/:id",AddEndKmDriverLog)
router.get("/getalldriverlog",getALLDriverLog);
router.get("/gettripnamedata",Getdatabytripno)

//conductor
router.post("/conductorlog",ConductorLogBooK)
router.get("/getconductor",GetConductorLog)

router.get("/getstudentstopage",GetStudentNamefromStopage)

module.exports=router;  