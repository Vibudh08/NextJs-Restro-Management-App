import { connectionStr } from "@/app/lib/db";
import { restaurantSchema } from "@/app/lib/restaurantModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request) {
  await mongoose.connect(connectionStr);
  let queryParams = request.nextUrl.searchParams;
  let filter = {};

  if (queryParams.get("location")) {
    let city = queryParams.get("location");
    filter.city = { $regex: new RegExp(city, "i") };
  }

  if (queryParams.get("restaurant")) {
    let name = queryParams.get("restaurant");
    filter.name = { $regex: new RegExp(name, "i") };
  }

  let result = await restaurantSchema.find(filter);
  console.log(result);
  return NextResponse.json(result, { status: 200 });
}
