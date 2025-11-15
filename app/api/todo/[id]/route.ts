import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { promises } from "dns";

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
    // ignore
  }
  return {} as Record<string, string>;
}

// ✅ Update Task (PUT)
export async function PUT(req: Request, { params }:{params:Promise<{id:string}>  }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description } = body;

    const updatedTask = await prisma.task.update({
      where: { id },
      data: { title, description },
    });
    return NextResponse.json(updatedTask, { headers: corsHeaders(req) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500, headers: corsHeaders(undefined) });
  }
}

// ✅ Delete Task (DELETE)
export async function DELETE(req: Request, { params }:{params:Promise<{id:string}>}) {
  try {
    const { id } = await params;

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted successfully" }, { headers: corsHeaders(req) });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500, headers: corsHeaders(undefined) });
  }
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}



