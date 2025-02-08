const createNoteForm = document.getElementById("create-note-form");

notesTestBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Testing");
    /*
    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/notes/create");
        const data = await response.json();
        if (!data) throw new Error("No data received");
        console.log(data);
    } catch (error) {
        console.log(error.message);
    }
    */
});
