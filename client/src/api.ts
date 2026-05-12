export type CreateRoomResponse = {
  roomId: string;
  inviteCode: string;
  createdAt: string;
  paths: { g: string; join: string };
};

export async function createRoom(): Promise<CreateRoomResponse> {
  const res = await fetch("/api/v1/rooms", { method: "POST" });
  if (!res.ok) {
    throw new Error(`create room failed: ${res.status}`);
  }
  return (await res.json()) as CreateRoomResponse;
}
