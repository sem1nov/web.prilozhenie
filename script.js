const peopleData = loadFromLocalStorage() || [];
let editingIndex = null;

function displayData(data) {
    const tableBody = document.querySelector('#journalTable tbody');
    tableBody.innerHTML = '';

    data.forEach((person, index) => {
        const row = tableBody.insertRow();
        for (const key in person) {
            const cell = row.insertCell();
            cell.textContent = person[key];
        }

        // Добавляем кнопки редактирования и удаления для каждой строки
        const actionsCell = row.insertCell();
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.classList.add('btn', 'btn-warning', 'mr-2');
        editButton.onclick = () => editPerson(index);
        actionsCell.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.onclick = () => deletePerson(index);
        actionsCell.appendChild(deleteButton);
    });
}

function search() {
    const searchInput = document.querySelector('#searchInput');
    const searchTerm = searchInput.value.toLowerCase();

    const results = peopleData.filter(person => {
        const fieldsToSearch = [
            'regNumber',
            'diplomaInfo',
            'diplomaDate',
            'fullName',
            'specialty',
            'qualification',
            'protocolInfo',
        ];

        return fieldsToSearch.some(field => {
            const value = person[field].toLowerCase();
            return value.includes(searchTerm);
        });
    });

    displayData(results);
}

function addStudent() {
    if (editingIndex !== null) {
        saveEditedPerson();
    } else {
        const regNumber = document.getElementById('regNumber').value;
        const diplomaInfo = document.getElementById('diplomaInfo').value;
        const diplomaDate = document.getElementById('diplomaDate').value;
        const fullName = document.getElementById('fullName').value;
        const specialty = document.getElementById('specialty').value;
        const qualification = document.getElementById('qualification').value;
        const protocolInfo = document.getElementById('protocolInfo').value;
        const comment = document.getElementById('comment').value;

        const newStudent = {
            regNumber,
            diplomaInfo,
            diplomaDate,
            fullName,
            specialty,
            qualification,
            protocolInfo,
            comment
        };

        peopleData.push(newStudent);
    }

    saveToLocalStorage(peopleData);
    displayData(peopleData);

    document.getElementById('addForm').reset();
    $('#addModal').modal('hide');
    editingIndex = null;
}

function editPerson(index) {
    const person = peopleData[index];
    document.getElementById('regNumber').value = person.regNumber;
    document.getElementById('diplomaInfo').value = person.diplomaInfo;
    document.getElementById('diplomaDate').value = person.diplomaDate;
    document.getElementById('fullName').value = person.fullName;
    document.getElementById('specialty').value = person.specialty;
    document.getElementById('qualification').value = person.qualification;
    document.getElementById('protocolInfo').value = person.protocolInfo;
    document.getElementById('comment').value = person.comment;

    $('#addModal').modal('show');
    editingIndex = index;
}

function saveEditedPerson() {
    const regNumber = document.getElementById('regNumber').value;
    const diplomaInfo = document.getElementById('diplomaInfo').value;
    const diplomaDate = document.getElementById('diplomaDate').value;
    const fullName = document.getElementById('fullName').value;
    const specialty = document.getElementById('specialty').value;
    const qualification = document.getElementById('qualification').value;
    const protocolInfo = document.getElementById('protocolInfo').value;
    const comment = document.getElementById('comment').value;

    const editedPerson = {
        regNumber,
        diplomaInfo,
        diplomaDate,
        fullName,
        specialty,
        qualification,
        protocolInfo,
        comment
    };

    peopleData[editingIndex] = editedPerson;

    saveToLocalStorage(peopleData);
    displayData(peopleData);
    editingIndex = null;
}

function deletePerson(index) {
    peopleData.splice(index, 1);
    saveToLocalStorage(peopleData);
    displayData(peopleData);
}

function saveToLocalStorage(data) {
    localStorage.setItem('peopleData', JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('peopleData');
    return data ? JSON.parse(data) : null;
}

displayData(peopleData);

