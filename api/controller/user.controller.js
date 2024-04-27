import '../model/connection.js';
import userSchemaModel from '../model/user.model.js';
import url from 'url';
import jwt from 'jsonwebtoken';
import rs from 'randomstring';

//create
export var save=async(req,res,next)=>{
    var userDetails=req.body;
    console.log("User Details",userDetails);
    var userList=await userSchemaModel.find();
    var l=userList.length;
    var _id=l==0?1:userList[l-1]._id+1;
    userDetails={...userDetails,"_id":_id,"status":0,"role":"user","info":Date()};
    var user=await userSchemaModel.create(userDetails);
    if(user)
    return res.status(201).json({"response":"success"});
    else
    return res.status(500).json({error:"server Error"});
}

export var fetch=async(req,res,next)=>{
    var urlObj=url.parse(req.url,true).query;
    var userList=await userSchemaModel.find(urlObj);
    var l=userList.length;
    if(l!=0)
    return res.status(201).json(userList);
    else
    return res.status(500).json({error:'server error'});
}
//delete
export var deleteUser=async(req,res,next)=>{
    var id=req.params.id;
    var user=await userSchemaModel.find({_id:id});
    if(user.length!=0){
        let result=await userSchemaModel.deleteMany({_id:id});
        if(result)
        return res.status(201).json({"response":"record deleted"});
        else 
        return res.status(500).json({error:"server error"});
    }else{
        return res.status(404).json({error:"record not found"});
    }
}
//login
export var loginUser=async (req,res,next)=>{
    var userDetails=req.body;
    userDetails={...userDetails,"status":1};
    var userList = await userSchemaModel.find(userDetails);
    var l=userList.length;
    if(l!=0)
    {
      let payload={"subject":userList[0].email};
      let key=rs.generate();
      let token=jwt.sign(payload,key);
      return res.status(201).json({"token":token,"userDetails":userList[0]});
    }
    else
      return res.status(500).json({"token": "error"});
  }
  //update
  export var updateUser=async(req,response,next)=>{
    let userDetails = await userSchemaModel.findOne(req.body.condition);
    if(userDetails){
       let user=await userSchemaModel.updateOne(req.body.condition,req.body.set);   
       if(user)
        return response.status(201).json({"msg":"success"});
       else
        return response.status(500).json({error: "Server Error"});
    }
    else
     return response.status(404).json({error: "Requested resource not available"});
  }
