
let inputName = document.getElementById("name");
let addButton = document.getElementById("addBtn");
let tableBody = document.getElementById("tableBody");
let errorMessage = document.getElementById("errorMessage");
tableBody.innerHTML = "";

let submittedData = JSON.parse(localStorage.getItem("tasks")) || [];
let edit_index = null;

displayData(); 

addButton.addEventListener("click", (event) => {
    event.preventDefault();

    errorMessage.textContent = "";

    let formData = {
        enteredName: inputName.value.trim(),
    };

    if (formData.enteredName === "") {
        errorMessage.textContent = "Invalid:Task is required";
        inputName.classList.add("error-border");
        return;
    } else {
        inputName.classList.remove("error-border"); 
    }

    if (edit_index == null) {
        submittedData.push(formData);
    } else {
        submittedData.splice(edit_index, 1, formData);
        edit_index = null;
    }
    
    inputName.value = "";
    addButton.innerText = "Add Task";
    
    localStorage.setItem("tasks", JSON.stringify(submittedData)); 
    displayData();
});

function displayData() {
    let html = "";
    submittedData.forEach(function (ele, index) {
        html += `<tr>
                    <td>${index + 1}</td>
                    <td>${ele.enteredName}</td>
                    <td class="action-buttons">
                        <button class="btn btn-primary" onClick="editInfo(${index})">
                            <i class="fa fa-edit"></i> 
                        </button>
                        <button class="btn btn-danger" onClick="deleteInfo(${index})">
                            <i class="fa fa-trash"></i> 
                        </button>
                    </td>
                </tr>`;
    });
    tableBody.innerHTML = html;
}

function deleteInfo(index) {
    submittedData.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(submittedData)); 
    displayData();
}

function editInfo(index) {
    edit_index = index;
    inputName.value = submittedData[index].enteredName;
    addButton.innerText = "Edit Task";
}
