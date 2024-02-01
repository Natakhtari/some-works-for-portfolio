const inp1 = document.getElementById('title');
const addBtn = document.getElementById('create');
const list = document.getElementById('list');
const notes = [
    { title: "Buy groceries", completed: false },
    { title: "Finish coding assignment", completed: false },
    { title: "Call mom", completed: false },
    { title: "Exercise for 30 minutes", completed: false },
    { title: "Read a chapter of a book", completed: true },
    { title: "Clean the house", completed: false }
];

addBtn.onclick = function () {
    if (inp1.value.length === 0) {
        return;
    }

    const newNote = {
        title: inp1.value,
        completed: false,
    };
    notes.push(newNote);
    render();
    inp1.value = '';
};

list.onclick = function (event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index);
        const type = event.target.dataset.type;

        if (type === 'toggle') {
            notes[index].completed = !notes[index].completed;
        } else if (type === 'remove') {
            notes.splice(index, 1);
        } else if (type === 'edit') {
            notes[index].editing = !notes[index].editing;
            render();
        } else if (type === 'save') {
            const editInput = document.getElementById(`editInput${index}`);
            notes[index].title = editInput.value;
            notes[index].editing = false;
            render();
        }

        render();
    }
};
function render() {
    list.innerHTML = '';
    if (notes.length === 0) {
        list.innerHTML = '<p>Nothing to do</p>'
    }
    for (let i = 0; i < notes.length; i++) {
        list.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i));
    }
}


function getNoteTemplate(note, index) {
    if (note.editing) {
        return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <input type="text" value="${note.title}" id="editInput${index}">
                <span>
                    <span class="btn btn-small btn-info" data-index="${index}" data-type="save">Save</span>
                </span>
            </li>
        `;
    } else {
        return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
                <span>
                    <span class="btn btn-small btn-${note.completed ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">&check;</span>
                    <span class="btn btn-small btn-danger" data-index="${index}" data-type="remove">&times;</span>
                    <span class="btn btn-small btn-info" data-index="${index}" data-type="edit">Edit</span>
                </span>
            </li>
        `;
    }
}

render();
