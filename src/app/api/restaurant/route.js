import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionStr)
    const data = await restaurantSchema.find();
    // console.log(data)
    return NextResponse.json({result:data})
}

export async function POST(request){
    await mongoose.connect(connectionStr)
    const payload = await request.json()
    const restaurant = new restaurantSchema(payload)
    const data = await restaurant.save()
    return NextResponse.json(data,{success:200})
}