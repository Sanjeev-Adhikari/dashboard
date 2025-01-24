// export async function getBanner() {
//   try {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
//     console.log(backendUrl);
//     if (!backendUrl) {
//       throw new Error(
//         "NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables."
//       );
//     }

//     const response = await fetch(`${backendUrl}/api/admin/banners`, {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       throw new Error(`Failed to fetch data:${response.statusText}`);
//     }

//     const data = await response.json();

//     return data.data;
//   } catch (error) {
//     if (error instanceof TypeError) {
//       console.error("Network Error:", error.message);
//     } else {
//       console.error("some error occured:", error);
//     }
//   }
// }

// export async function addBanner(bannerName: string, image: File) {
//   try {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
//     if (!backendUrl) {
//       throw new Error("Backend URL is not defined in environment variables.");
//     }

//     const formData = new FormData();
//     formData.append("bannerName", bannerName);
//     formData.append("image", image);

//     const response = await fetch(`${backendUrl}/api/admin/add-banner`, {
//       method: "POST",
//       body: formData,
//     });

//     console.log(response);
//     if (!response.ok) {
//       throw new Error(`Failed to add banner: ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("Banner added successfully:", data);
//   } catch (error) {
//     console.error("Error adding banner:", error);
//   }
// }

// export async function deleteBanner(id: string) {
//   try {
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
//     if (!backendUrl) {
//       throw new Error("Backend URL is not defined in environment variables.");
//     }

//     const response = await fetch(`${backendUrl}/api/admin/banner/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Failed to delete banner: ${response.statusText}`);
//     }

//     const data = await response.json();
//     console.log("Banner deleted successfully:", data);
//     return data.data; 
//   } catch (error) {
//     console.error("Error deleting banner:", error);
//   }
// }


