// main.js
const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteHabit)
})



async function deleteHabit(){
    const name = this.parentNode.childNodes[1].innerText
    const habit = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteHabit', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': name,
              'habit': habit
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}




// deleteButton.addEventListener('click', (_) => {
//     fetch('/habits', {
//         method: 'delete',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Bad',
//         }),
//     })
//         .then((res) => {
//             if (res.ok) return res.json();
//         })
//         .then((response) => {
//             if (response === 'No habit to delete') {
//                 messageDiv.textContent = 'No habit to delete';
//             } else {
//                 window.location.reload(true);
//             }
//         })
//         .catch(console.error);
// });


// update.addEventListener('click', (_) => {
//     fetch('/habits', {
//         method: 'put',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             name: 'Good',
//             habit: '20 Sit ups',
//         }),
//     })
//         .then((res) => {
//             if (res.ok) return res.json();
//         })
//         .then((response) => {
//             window.location.reload(true);
//         });
// });