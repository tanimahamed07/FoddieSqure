import { mongoConnect } from "@/lib/mongoConnect";
// import { TEvent } from "@/types/event";
import { NextResponse } from "next/server";

// GET all events
export async function GET() {
  try {
    const { db } = await mongoConnect();
    const items = await db.collection("menu").find().toArray();

    const formattedItems = items.map((item) => ({
      id: item._id.toString(),
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      category: item.category,
      tags: item.tags,
      image: item.image,
      rating: item.rating,
      reviewCount: item.reviewCount,
      isAvailable: item.isAvailable,
      isSpecial: item.isSpecial,
      preparationTime: item.preparationTime,
    }));

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST new event
// export async function POST(req: NextRequest) {
//   try {
//     const { db, client } = await mongoConnect();
//     const data: TEvent = await req.json();

//     // Basic validation
//     if (!data.title || !data.date || !data.location) {
//       client.close();
//       return NextResponse.json(
//         { error: "Title, date, and location required" },
//         { status: 400 }
//       );
//     }

//     const result = await db.collection("events").insertOne({
//       ...data,
//       createdAt: new Date(),
//     });

//     // client.close();
//     return NextResponse.json(
//       { message: "Event created", id: result.insertedId },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to create event" },
//       { status: 500 }
//     );
//   }
// }
