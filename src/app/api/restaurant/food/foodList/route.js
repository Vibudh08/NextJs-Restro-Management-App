import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  await mongoose.connect(connectionStr);
  const payload = await request.json();
  const food = await foodSchema.find({ resto_id: payload.resto_id });
  return NextResponse.json(food, { status: 200 });
}
    