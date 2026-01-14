import { mongoConnect } from "@/lib/mongoConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const body = await req.json();

    const result = await db.collection("bookings").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Booking Successfully", id: result.insertedId }, 
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}