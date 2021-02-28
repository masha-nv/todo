$.getJSON("/api/todos").then((todos) => getTodos(todos));

function getTodos(todos) {
  todos.forEach((todo) => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  const newTodo = $(`
    <li class="list-item ">
        <div>
            <input value=${todo._id} type="checkbox" class="todoName" id=${todo.name}>
            <label class="list-item-label" for=${todo.name}>${todo.name} </label>
        </div>
        <span class="time">7:00 AM</span>
        <span data-id=${todo._id} class="delete">x</span>
    </li>
    <hr>
    `);
  if (todo.completed) {
    newTodo.find(".list-item-label").addClass("done");
  }
  $(".list").append(newTodo);
}

$("#todoInput").keypress(function (e) {
  const userInput = $("#todoInput").val();
  if (e.which == 13) {
    $.post("/api/todos", { name: userInput })
      .then((newTodo) => {
        addTodo(newTodo);
        $("#todoInput").val("");
      })
      .catch((e) => console.log(e));
  }
});

$(".list").on("change", ".todoName", function () {
  const thisTodo = $(this).next();
  const id = this.value;
  $.getJSON("/api/todos/" + id).then((todo) => {
    $.ajax({
      url: "/api/todos/" + id,
      type: "PUT",
      data: { completed: !todo.completed },
      success: function (todo) {
        console.log(todo, thisTodo);
        todo.completed
          ? thisTodo.addClass("done")
          : thisTodo.removeClass("done");
      },
      error: (e) => console.log(e),
    });
  });
});

$(".list").on("click", ".delete", function (e) {
  //   e.stopPropagation();
  const id = $(".delete").data("id");
  $.ajax({
    url: "/api/todos/" + id,
    type: "DELETE",
    data: { id: id },
    success: () => {
      $(this).parent().remove();
      $(this).parent().next().remove();
    },
    error: (e) => console.log(e),
  });
});
