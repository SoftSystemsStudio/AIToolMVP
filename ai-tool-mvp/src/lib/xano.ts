const XANO_BASE_URL =
  process.env.XANO_BASE_URL ||
  "https://x8ki-letl-twmt.n7.xano.io/api:rO-tTKGD";

export async function fetchUserContent(userId: string) {
  const res = await fetch(`${XANO_BASE_URL}/generated_content?user_id=${userId}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch Xano data");
  return res.json();
}

export async function createUserContent(userId: string, prompt: string, result: string) {
  const res = await fetch(`${XANO_BASE_URL}/generated_content`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId, prompt, result }),
  });
  if (!res.ok) throw new Error("Failed to save generated content");
  return res.json();
}

export async function deleteUserContent(userId: string, id: number) {
  const res = await fetch(`${XANO_BASE_URL}/generated_content/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete content");
  return res.json();
}
