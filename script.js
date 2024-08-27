const apiUrl = 'http://localhost:3000/items'; // Base URL for the API

// Fetch and display items from the API
async function fetchItems() {
    try {
        const response = await fetch(apiUrl); // Send a GET request to fetch items
        const items = await response.json(); // Parse the JSON response
        displayItems(items); // Call function to update the DOM with fetched items
    } catch (error) {
        console.error('Error fetching items:', error); // Log any errors encountered
    }
}

// Update the DOM with the list of items
function displayItems(items) {
    const itemList = document.getElementById('items'); // Get the unordered list element
    itemList.innerHTML = ''; // Clear existing content

    items.forEach(item => { // Iterate over each item
        const listItem = document.createElement('li'); // Create a new list item element
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center'; // Apply Bootstrap classes for styling
        listItem.innerHTML = `
            ${item.name} <!-- Display item name -->
            <button class="btn btn-danger btn-sm" onclick="deleteItem(${item.id})">Delete</button> <!-- Button to delete item, calls deleteItem function on click -->
        `;
        itemList.appendChild(listItem); // Add the list item to the unordered list
    });
}

// Add a new item to the API
async function addItem(name) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // Specify the method as POST to add a new item
            headers: {
                'Content-Type': 'application/json' // Set the content type to JSON
            },
            body: JSON.stringify({ name }) // Send the item name as JSON
        });
        const newItem = await response.json(); // Parse the JSON response
        fetchItems(); // Refresh the list of items
    } catch (error) {
        console.error('Error adding item:', error); // Log any errors encountered
    }
}

// Delete an item from the API
async function deleteItem(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE' // Specify the method as DELETE to remove the item
        });
        fetchItems(); // Refresh the list of items
    } catch (error) {
        console.error('Error deleting item:', error); // Log any errors encountered
    }
}

// Handle form submission
document.getElementById('item-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const itemName = document.getElementById('item-name').value; // Get the value of the input field
    if (itemName) {
        addItem(itemName); // Call function to add the item if the input is not empty
        document.getElementById('item-name').value = ''; // Clear the input field
    }
});

// Initial fetch to display items on page load
fetchItems(); // Call function to fetch and display items when the page loads
