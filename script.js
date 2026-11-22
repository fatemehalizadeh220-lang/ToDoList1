const input = document.querySelector(".task-input");
const addBtn = document.querySelector(".add");
const ul = document.querySelector(".task-list");
const totalCount = document.querySelector(".total-count");
const completeCount = document.querySelector(".complete-count");

const toDoList = JSON.parse(
  localStorage.getItem("todos") || "[]"
);

// افزودن کار با کلیک
addBtn.addEventListener("click", () => {
  createToList();
});

// افزودن کار با Enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    createToList();
  }
});

function createToList(text = input.value.trim(), completed = false) {
  if (!text) return;

  const li = document.createElement("li");
  li.classList.add("list");

  li.innerHTML = `
    <input type="checkbox" class="check">
    <span class="textarea"></span>
    <i class="delete">❌</i>
  `;

  const checkbox = li.querySelector(".check");
  const textElement = li.querySelector(".textarea");

  textElement.textContent = text;

  checkbox.checked = completed;

  if (completed) {
    textElement.style.textDecoration = "line-through";
  }

  ul.appendChild(li);

  input.value = "";

  updateCounts();
  updateTodos();
}

// حذف کار
ul.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.closest(".list").remove();

    updateCounts();
    updateTodos();
  }
});

// تغییر وضعیت چک‌باکس
ul.addEventListener("change", (e) => {
  if (e.target.classList.contains("check")) {
    const li = e.target.closest(".list");
    const textElement = li.querySelector(".textarea");

    textElement.style.textDecoration = e.target.checked
      ? "line-through"
      : "none";

    updateCounts();
    updateTodos();
  }
});

// شمارش کارها
function updateCounts() {
  totalCount.textContent = ul.querySelectorAll(".list").length;

  completeCount.textContent =
    ul.querySelectorAll(".check:checked").length;
}

// ذخیرهٔ کارها در Local Storage
function updateTodos() {
  const todos = [];

  document.querySelectorAll(".list").forEach((li) => {
    todos.push({
      text: li.querySelector(".textarea").textContent,
      completed: li.querySelector(".check").checked
    });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// نمایش کارهای ذخیره‌شده بعد از رفرش
toDoList.forEach((todo) => {
  createToList(todo.text, todo.completed);
});

// اصلاح شمارش اولیه
updateCounts();
