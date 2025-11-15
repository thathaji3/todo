import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const allowedOrigins = [
  "http://localhost:3000",
  "https://delightful-custard-83a956.netlify.app",
  "https://todo453f.netlify.app",
];

function corsHeaders(req: Request | undefined) {
  try {
    const origin = req?.headers.get("origin") || "";
    if (origin && allowedOrigins.includes(origin)) {
      return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      } as Record<string, string>;
    }
  } catch (e) {
    // fall through and return empty headers
  }
  return {} as Record<string, string>;
}
// ✅ Get all tasks
export async function GET(req: Request) {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(tasks, { headers: corsHeaders(req) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500, headers: corsHeaders(undefined) });
  }
}

// ✅ Add new task
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: { title, description },
    });

    return NextResponse.json(newTask, { headers: corsHeaders(req) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500, headers: corsHeaders(undefined) });
  }
}

// Handle CORS preflight
export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}





