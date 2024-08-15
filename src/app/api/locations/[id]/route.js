import connectMongoDB from "../../../../../libs/mongodb";
import Location from "../../../../../models/location";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newLocation: location } = await request.json();
  await connectMongoDB();
  await Location.findByIdAndUpdate(id, { location });
  return NextResponse.json({ message: "Location updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const location = await Location.findOne({ _id: id });
  return NextResponse.json({ location }, { status: 200 });
}
