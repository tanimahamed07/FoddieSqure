import { mongoConnect } from "@/lib/mongoConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const userCollection = db.collection("user");

    const body = await req.json();
    const { name, email, password, phone } = body;

    const isExisting = await userCollection.findOne({ email });
    if (isExisting) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      phone: phone || "Not Provided",
      role: "user", // Default Role
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);

    return NextResponse.json(
      { 
        message: "User registered successfully", 
        acknowledged: result.acknowledged,
        id: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// ইউজার লিস্ট দেখার জন্য GET মেথড (Admin এর জন্য প্রয়োজন হতে পারে)
export async function GET() {
  try {
    const { db } = await mongoConnect();
    const allUsers = await db.collection("user").find({}).project({ password: 0 }).toArray();
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}