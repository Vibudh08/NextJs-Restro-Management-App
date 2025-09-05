import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodModels";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
  await mongoose.connect(connectionStr);
  const payload = await request.json();
  const food = new foodSchema(payload);
  const result = await food.save();
  return NextResponse.json(result, { status: 200 });
}
