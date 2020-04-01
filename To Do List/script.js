// IEFE
(() => {
    // State Variables
    let toDoListArray = [];

    // UI Variables
    const form = document.querySelector('.form');
    const input = form.querySelector('.form-input');
    const ul = document.querySelector('.todolist');

    // Event Listeners
    form.addEventListener('submit', e => {
        // Prevent default behaviour - Page Reload
        e.preventDefault();
        // Give item a unique ID
        let itemId = String(Date.now());
        // Get/assign input value
        let toDoItem = input.value;
        // Pass ID and item into functions
        addItemToDOM(itemId, toDoItem);
        addItemToArray(itemId, toDoItem);

        // Clear the input box (this is default behaviour but we got rid of that)
        input.value = '';
    });

    ul.addEventListener('click', e => {
        let id = e.target.getAttribute('data-id')

        if (!id) return // User clicked in something else

        // Pass ID throught functions
        removeItemFromDOM(id);
        removeItemFromArray(id);
});

// Functions
function addItemToDOM(itemId, toDoItem) {
    // Create an li element
    const li = document.createElement('li')
    li.setAttribute('data-id', itemId);

    // Add todo item to li
    li.innerText = toDoItem

    // Add li to the DOM
    ul.appendChild(li);
}

function addItemToArray(itemId, toDoItem) {
    // Add item to array as an object with an ID. So we can find and delete it later
    toDoListArray.push({itemId, toDoItem});
    console.log(toDoListArray)
}

function removeItemFromDOM(id) {
    // Get the list item by data ID
    var li = document.querySelector('[data-id="' + id + '"]') ;

    // Remove List Item
    ul.removeChild(li);
}

function removeItemFromArray(id) {
    // Create a new toDoListArray with all li's that dont match the ID
    toDoListArray = toDoListArray.filter(item => item.itemId !== id);
    console.log(toDoListArray)
}

})();