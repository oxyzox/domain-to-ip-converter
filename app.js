// script.js

function convertDomain() {
    const domainInput = document.getElementById("domain").value.trim();
    const loadingSpinner = document.getElementById("loading-spinner");
    const resultContainer = document.getElementById("result-container");
    const ipAddress = document.getElementById("ip-address");

    if (!domainInput) {
        alert("Please enter a domain.");
        return;
    }

    let domain;
    try {
        const url = new URL(domainInput);
        domain = url.hostname;
    } catch (error) {
        domain = domainInput;
    }

    // Remove protocols like http/https and www.
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');

    if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
        alert("Invalid domain format. Try again.");
        return;
    }

    // Display loading spinner
    loadingSpinner.style.display = "block";
    resultContainer.style.display = "none";

    fetch(`https://dns.google/resolve?name=${domain}`)
        .then(response => response.json())
        .then(data => {
            loadingSpinner.style.display = "none";
            resultContainer.style.display = "block";

            if (data.Answer && data.Answer.length > 0) {
                ipAddress.textContent = data.Answer[0].data;
            } else {
                ipAddress.textContent = "No IP found for this domain.";
            }
        })
        .catch(error => {
            loadingSpinner.style.display = "none";
            resultContainer.style.display = "block";
            ipAddress.textContent = "Error fetching IP. Please try again.";
            console.error(error);
        });
}
