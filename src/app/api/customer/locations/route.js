import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { restaurantSchema } from "@/app/lib/restaurantModels";

export async function GET() {
  await mongoose.connect(connectionStr);
  let data = await restaurantSchema.find();
  let resp = data.map(
    (item) => item.city.charAt(0).toUpperCase() + item.city.slice(1)
  );
  let result = [...new Set(resp)];
  console.log(result);
  return NextResponse.json(result, { success: true });
}
