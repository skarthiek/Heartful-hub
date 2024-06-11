document.addEventListener('DOMContentLoaded', loadItems);
document.getElementById('volunteer-form').addEventListener('submit', addItem);

function loadItems() {
    const itemsList = document.getElementById('items-list');
    const items = JSON.parse(localStorage.getItem('items')) || [];
    
    items.forEach((item, index) => {
        const li = createListItem(item, index);
        itemsList.appendChild(li);
    });
}

function addItem(event) {
    event.preventDefault();

    const item = document.getElementById('item').value;
    const quantity = parseInt(document.getElementById('quantity').value, 10);
    const address = document.getElementById('address').value;

    const items = JSON.parse(localStorage.getItem('items')) || [];
    const newItem = { name: item, quantity: quantity, address: address };
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    
    const itemsList = document.getElementById('items-list');
    const li = createListItem(newItem, items.length - 1);
    
    itemsList.appendChild(li);

    document.getElementById('volunteer-form').reset();
}

function createListItem(item, index) {
    const li = document.createElement('li');
    li.innerHTML = `<span>Item:</span> ${item.name}, <span>Quantity:</span> ${item.quantity}, <span>Address:</span> ${item.address}`;
    
    const donateForm = document.createElement('div');
    donateForm.className = 'donate-form';
    donateForm.innerHTML = `
        <input type="number" min="1" max="${item.quantity}" placeholder="Donate">
        <button onclick="donateItem(${index})">Donate</button>
    `;
    li.appendChild(donateForm);
    
    return li;
}

function donateItem(index) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const donationAmount = parseInt(event.target.previousElementSibling.value, 10);
    
    if (!isNaN(donationAmount) && donationAmount > 0 && donationAmount <= items[index].quantity) {
        items[index].quantity -= donationAmount;
        
        if (items[index].quantity === 0) {
            items.splice(index, 1);
        }
        
        localStorage.setItem('items', JSON.stringify(items));
        updateItemsList();
    }
}

function updateItemsList() {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    const items = JSON.parse(localStorage.getItem('items')) || [];
    
    items.forEach((item, index) => {
        const li = createListItem(item, index);
        itemsList.appendChild(li);
    });
}
