// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// // ✅ Get all tasks
// export async function GET(req: Request) {
//   try {
//     const tasks = await prisma.task.findMany({
//       orderBy: { createdAt: "desc" },
//     });
//     return NextResponse.json(tasks);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500});
//   }
// }

// // ✅ Add new task
// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const { title, description } = body;

//     if (!title) {
//       return NextResponse.json({ error: "Title is required" }, { status: 400 });
//     }

//     const newTask = await prisma.task.create({
//       data: { title, description },
//     });

//     return NextResponse.json(newTask);
//   } catch (error) {
//     return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
//   }
// }

// // Handle CORS preflight
// export async function OPTIONS(req: Request) {
//   return new NextResponse(null, { status: 204});
// }

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 🔥 Reusable CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",   // or your domain
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// ✅ Get all tasks
export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(tasks, {
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ Add new task
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    const newTask = await prisma.task.create({
      data: { title, description },
    });

    return NextResponse.json(newTask, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ Fix for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: corsHeaders });
}





