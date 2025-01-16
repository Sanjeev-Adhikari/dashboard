export async function getCategory(){
    try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log(backendUrl)
    if (!backendUrl) {
      throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined in the environment variables.");
    }

    const response = await fetch(`${backendUrl}/api/category`, {
        method: "GET",
        headers:{
            "Content-type": "application/json"
        }
    });
    console.log(response)

    if(!response.ok){
        throw new Error(`Failed to fetch data:${response.statusText}` )
    }

    const data = await response.json();
   
    return data.data;
  

    } catch (error) {
        if(error instanceof TypeError){
            console.error("Network Error:", error.message)
        }else{
            console.error("some error occured:", error)
        }
    }
}