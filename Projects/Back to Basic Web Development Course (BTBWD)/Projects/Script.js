// Select DOM elements
const input = Document.getElementbyid("Todo-Input")
const addBtn = Document.getElementbyid("Add-Btn")
const list = Document.getElementbyid("todo-List")

// try to load saved todos from LocalStorage (If any)
const saved = localStorage.getItem("todos");
const todos = saved ? JSON.parse(saved) : [];

function SaveTodos(){
    // Function to save todos to LocalStorage
    localStorage.setItem("todos", JSON.stringify(todos));
}
// Create a Dom Mode for A todo Object And Append it to the List

function createTodoNote(todo, index) {
    const li = document.createElement("li");
    // checkbox to toggle Completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        // visual Feedback: Strike-Through When Completed
        span.style.textDecoration = todo.completed ? "line-through" : "none";
        SaveTodos();
    });
    // Text of the todo
    const textspan = document.createElement("span");
    textspan.textContent = todo.text;
    textspan.style.margin = "0 8px";
    if(todo.completed) {
        textspan.style.textDecoration = "line-through";

        // add Double click Listener to edit todo
        textspan.addEventListener("dblclick", () => {
            const newText = prompt("Edit todo:", todo.text);
            if (newText !== null) {
                todo.text = newText.trim();
                textspan.textContent = todo.text;
                SaveTodos();
            }
        });
        // Delete todo Button   
        const delbtn = document.createElement("button");
        delbtn.textContent = "Delete";
        delbtn.addEventListener("click", () => {
            todos.splice(index, 1);
            SaveTodos();
            render();
        });

        li.appendChild(checkbox);
        li.appendChild(textspan);
        li.appendChild(delbtn);
        return li

    }

}
// Render the whole todo list from todo array
function render(){
    list.innerHTML = "";
    // Recreate todo items
    todos.forEach((todo, index) => {
        const node = createTodoNote(todo, index);
        console.log(node);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return
    }
    // push a new todo
    todos.push({ text, completed: false });
    input.value = "";
    SaveTodos();
    render();
}
addbtn.addEventListener("click", addTodo);
render()