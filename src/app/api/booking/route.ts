import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth"; // সিকিউরিটির জন্য প্রয়োজন হবে
// import { authOptions } from "@/lib/auth"; // আপনার auth setup অনুযায়ী

// ১. বুকিং তৈরি (POST) - ইউজার টেবিল বুক করবে
export async function POST(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const body = await req.json();

    const result = await db.collection("bookings").insertOne({
      ...body,
      status: "pending", // ডিফল্ট স্ট্যাটাস সবসময় pending থাকবে
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Booking Successfully", id: result.insertedId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ২. বুকিং লিস্ট দেখা (GET) - ইউজার বা এডমিন ডাটা দেখবে
export async function GET(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    // যদি ইমেইল থাকে তবে শুধু সেই ইউজারের বুকিং ফিল্টার হবে (My Bookings)
    // ইমেইল না থাকলে সব বুকিং আসবে (Admin Dashboard)
    const query = email ? { email: email } : {};
    
    const bookings = await db.collection("bookings")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ৩. বুকিং ডিলিট (DELETE) - ইউজার বা এডমিন ডিলিট করবে
export async function DELETE(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "ID is required" }, { status: 400 });

    const result = await db.collection("bookings").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted Successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ৪. বুকিং স্ট্যাটাস আপডেট (PATCH) - শুধু এডমিন স্ট্যাটাস পরিবর্তন করবে
export async function PATCH(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "ID and Status are required" }, { status: 400 });
    }

    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: status } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Status updated successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}