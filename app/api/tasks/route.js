import { NextResponse } from "next/server";

// Mock de banco de dados
let tasks = [
  { id: 1, title: "Aprender Next.js", description: "Estudar SSR e SSG", status: "pending", userId: 1 },
  { id: 2, title: "Implementar autenticação", description: "Usar Next-Auth", status: "completed", userId: 1 },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  
  if (status) {
    return NextResponse.json(tasks.filter(task => task.status === status));
  }
  
  return NextResponse.json(tasks);
}

export async function POST(request) {
  const body = await request.json();
  const newTask = {
    id: tasks.length + 1,
    ...body,
    userId: 1, // Na implementação real viria do token
  };
  
  tasks.push(newTask);
  return NextResponse.json(newTask, { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  const index = tasks.findIndex(t => t.id === body.id);
  
  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  
  tasks[index] = { ...tasks[index], ...body };
  return NextResponse.json(tasks[index]);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get("id"));
  
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  
  tasks = tasks.filter(t => t.id !== id);
  return NextResponse.json({ success: true });
}