import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb"; // এটি অবশ্যই লাগবে
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

// ইউজার লিস্ট পাওয়া (বিদ্যমান)
export async function GET() {
  try {
    const { db } = await mongoConnect();
    const allUsers = await db.collection("user").find({}).project({ password: 0 }).toArray();
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

// ২. রোল আপডেট করার জন্য PATCH মেথড (নতুন)
export async function PATCH(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const body = await req.json();
    const { id, role } = body;

    if (!id || !role) {
      return NextResponse.json({ error: "ID and Role are required" }, { status: 400 });
    }

    const result = await db.collection("user").updateOne(
      { _id: new ObjectId(id) },
      { $set: { role: role } }
    );

    return NextResponse.json({ message: "Role updated" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ৩. ইউজার ডিলিট করার জন্য DELETE মেথড (নতুন)
export async function DELETE(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // URL থেকে আইডি নিচ্ছে

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const result = await db.collection("user").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "User deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}