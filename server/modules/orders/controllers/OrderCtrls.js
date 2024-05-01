const orderModel = require("../../../models/order.model");


const getOrderStats=async(req,res)=>{

    const orders=await orderModel.aggregate([
        {
            $group:{
                _id:null,
                minimumSales:{
                    $min:"$totalPrice"
                },
                totalSales:{
                    $sum:"$totalPrice"
                },
                maximumSales:{
                    $max:"$totalPrice"
                },
                avgSale:{
                    $avg:"$totalPrice"
                }
            }
        }
    ]);

    // GET todays sales
    const date=new Date();
    const today=new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    
    const SalesToday=await orderModel.aggregate([
        {
            $match:{
                createdAt:{
                    $gte:today
                }
            }
        },
        {
            $group:{
                _id:null,
                totalSalesToday:{
                    $sum:"$totalPrice"
                }
            }
        }
    ])


    res.status(200).json({
        status:"Success",
        message:"Order Stats Fetched Successfully",
        orders:orders,
        SalesToday:SalesToday
    });
}

module.exports={getOrderStats};