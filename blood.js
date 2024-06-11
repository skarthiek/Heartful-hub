document.addEventListener('DOMContentLoaded', loadDonors);

document.getElementById('donate-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const bloodGroup = document.getElementById('blood-group').value;
    const contact = document.getElementById('contact').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;

    const donor = {
        name,
        bloodGroup,
        contact,
        address,
        city
    };

    addDonorToList(donor);
    saveDonor(donor);
    this.reset();
});

function loadDonors() {
    const donors = getDonors();
    donors.forEach(donor => addDonorToList(donor));
}

function addDonorToList(donor) {
    const donorList = document.getElementById('donor-list');
    const listItem = document.createElement('li');
    listItem.textContent = `${donor.name} - ${donor.bloodGroup} - ${donor.contact} - ${donor.address} - ${donor.city}`;
    donorList.appendChild(listItem);
}

function saveDonor(donor) {
    const donors = getDonors();
    donors.push(donor);
    localStorage.setItem('donors', JSON.stringify(donors));
}

function getDonors() {
    const donors = localStorage.getItem('donors');
    return donors ? JSON.parse(donors) : [];
}

document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toUpperCase();
    const donors = document.getElementById('donor-list').getElementsByTagName('li');
    
    Array.from(donors).forEach(function(donor) {
        const bloodGroup = donor.textContent.split(' - ')[1];
        if (bloodGroup.toUpperCase().indexOf(query) > -1) {
            donor.style.display = '';
        } else {
            donor.style.display = 'none';
        }
    });
});
