import connectMongoDB from "../../../../libs/mongodb";
import Location from "../../../../models/location";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { location } = await request.json();
  await connectMongoDB();
  await Location.create({ location });
  return NextResponse.json({ message: "Location Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const locations = await Location.find();
  return NextResponse.json({ locations });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Location.findByIdAndDelete(id);
  return NextResponse.json({ message: "Location deleted" }, { status: 200 });
}
