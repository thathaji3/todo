import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    return NextResponse.json(updatedTask);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500});
  }
}

// ✅ Delete Task (DELETE)
export async function DELETE(req: Request, { params }:{params:Promise<{id:string}>}) {
  try {
    const { id } = await params;

    await prisma.task.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500});
  }
}

export async function OPTIONS(req: Request) {
  return new NextResponse(null, { status: 204});
}



