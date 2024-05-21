const checkbox = document.getElementById('myCheck');
    const button = document.getElementById('myButton');

    checkbox.addEventListener('change', () => {
        button.disabled = !checkbox.checked;
    });
    

    button.addEventListener('click', () => {
        window.location.href = "/HTML/Quiz.html";
    });