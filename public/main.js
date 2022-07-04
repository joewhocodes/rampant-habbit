// main.js
const update = document.querySelector('#update-button');

update.addEventListener('click', (_) => {
    fetch('/habits', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Good',
            quote: '20 Sit ups',
        }),
    });
});
