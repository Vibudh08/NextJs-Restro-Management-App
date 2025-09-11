import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModels";
import { restaurantSchema } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  let id = await response.params.id;
  await mongoose.connect(connectionStr);
  let data = await restaurantSchema.findOne({ _id: id });
  let foodItems = await foodSchema.find({ resto_id: id });
  return NextResponse.json({ data, foodItems, result: 200 });
}
