import fs from 'fs'
import dealModel from '../models/dealModel.js'

//add food item

const addDeal = async (req,res) =>{

   

    const deal = new dealModel({
        dealtitle: req.body.dealtitle,
        dealdescription:req.body.dealdescription,
        dealproduct:req.body.dealproduct,
        offpercentage:req.body.offpercentage,
        dealtime: req.body.dealtime,
    })

    try {
        await deal.save();
        res.json({success:true,message:'Deal Of the day Added'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error})
    }
}

// All deals list

const listDeal = async (req,res) =>{
    try {
        const deals = await dealModel.find({}).populate('dealproduct', 'name');
        res.json({success:true,data:deals})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}

// remove deal iDeal
const removeDeal = async (req,res)=>{
    try {
        const deal = await dealModel.findById(req.body.id);
        

        await dealModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:'Deal Removed'})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:'Error'})
    }
}

export {addDeal, listDeal, removeDeal}