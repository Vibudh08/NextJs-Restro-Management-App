import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { foodSchema } from "@/app/lib/foodModels";

export async function DELETE(response){
    const id = await response.params.id
    await mongoose.connect(connectionStr)
    let result = await foodSchema.deleteOne({_id:id})
    return NextResponse.json(result, {result:200})
}