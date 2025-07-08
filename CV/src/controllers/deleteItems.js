// deleteItems.js
export default async function deleteProject(userId, pageName, indexToDelete, setUserCV) {
  try {
    const response = await fetch("http://localhost:3000/deleteItems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        pageName,
        indexToDelete
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(data.message);
      setUserCV(data.updatedCV); // Update CV
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Error in deletion:", error);
    alert("Not deleted, catch error");
  }
}
