import { mongoConnect } from "@/lib/mongoConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const body = await req.json();
    const { name, email, password, phone } = body;

    const isExisting = await db.collection("user").findOne({ email });
    if (isExisting) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("user").insertOne({
      name,
      email,
      password: hashedPassword,
      phone: phone || "Not Provided",
      role: "user",
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Registered Successfully", id: result.insertedId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { db } = await mongoConnect();
    const allUsers = await db.collection("user").find({}).project({ password: 0 }).toArray();
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}