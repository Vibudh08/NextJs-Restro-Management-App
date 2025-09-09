import { connectionStr } from "@/app/lib/db";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { foodSchema } from "@/app/lib/foodModels";

export async function DELETE(req, { params }) {
  const id = await params.id;
  await mongoose.connect(connectionStr);
  let result = await foodSchema.deleteOne({ _id: id });
  return NextResponse.json(result, { result: 200 });
}

export async function GET(req, { params }) {
  const id = await params.id;
  await mongoose.connect(connectionStr);
  const response = await foodSchema.findOne({ _id: id });
  return NextResponse.json(response, { result: 200 });
}

export async function POST(req, { params }) {
  const payload = await req.json();
  const id = await params.id;
  await mongoose.connect(connectionStr);

  const response = await foodSchema.findByIdAndUpdate(id, payload);
  return NextResponse.json(response, { result: 200 });
}
