import { UserData } from "@/interface/userTypes";

export async function getUsers(): Promise<UserData[]> {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error(
        "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
      );
    }

    const response = await fetch(`${backendUrl}/api/admin/all-users`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data as UserData[];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
