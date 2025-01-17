export async function getCategory() {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(backendUrl);
    if (!backendUrl) {
      throw new Error(
        "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
      );
    }

    const response = await fetch(`${backendUrl}/api/category`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data:${response.statusText}`);
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Network Error:", error.message);
    } else {
      console.error("some error occured:", error);
    }
  }
}

export async function addCategory(categoryName: string, image: File) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("Backend URL is not defined in environment variables.");
    }

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("image", image);

    const response = await fetch(`${backendUrl}/api/admin/add-category`, {
      method: "POST",
      body: formData,
    });

    console.log(response);
    if (!response.ok) {
      throw new Error(`Failed to add category: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("category added successfully:", data);
  } catch (error) {
    console.error("Error adding category:", error);
  }
}
