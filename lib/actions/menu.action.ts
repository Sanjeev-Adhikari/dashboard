import { getToken } from "@/utils/getToken";

export async function getMenu() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(backendUrl);
    if (!backendUrl) {
      throw new Error(
        "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
      );
    }


    const response = await fetch(`${backendUrl}/api/food`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Error fetching menu data:", error.message);
      throw error;
    } else {
      console.error("some other error:", error);
    }
  }
}
