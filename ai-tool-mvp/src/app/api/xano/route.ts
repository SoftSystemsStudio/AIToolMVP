import { auth } from "@clerk/nextjs/server";
import { fetchUserContent, deleteUserContent } from "@/lib/xano";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const data = await fetchUserContent(userId);
  return Response.json(data);
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { id } = await request.json();
  const deleted = await deleteUserContent(userId, id);
  return Response.json(deleted);
}
