const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
    // JSON은 어레이든 무슨코드든 텍스트형식으로 변경해줌
    // localStorage.setItem으로 인풋에서 가져온걸 텍스트로 변경해 저장 
}

// 삭제버튼 펑션
function deleteTodo(event){
    const li = event.target.parentElement; // event.target.parentElement 는 어떤것이 클릭 됐는지 알 수 있음.
    li.remove(); // 이것만 입력하면 삭제버튼을 누르면 li가 remove된다.
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo){
    const li = document.createElement("li"); // 입력하면 li를 생성 (to do 리스트 만들기)
    li.id = newTodo.id; // html에 li를 추가해서 id출력
    const span = document.createElement("span"); // span을 생성 (삭제버튼 만들기)
    span.innerText = newTodo.text; // span의 텍스트는 handleToDoSubmit 에서 온 newTodo 텍스트가 됨
    const button = document.createElement("button"); // button 생성
    button.innerText = "✖"; //버튼에 표시 될 텍스트를 입력 
    button.addEventListener("click", deleteTodo); //버튼을 누르면 삭제할 수 있게 EventListener 생성
    li.appendChild(span); //li는 span이라는 자식을 만듦
    li.appendChild(button); //버튼도 마찬가지로 li에 추가
    toDoList.appendChild(li); //todo-list에 li를 추가해서 화면에 출력
}

function handleToDoSubmit(event){
    event.preventDefault();//새로고침 막기
    const newTodo = toDoInput.value; //인풋에 입력한 값을 newTodo로 선언
    toDoInput.value = "";//인풋에 텍스트를 입력하면 인풋창은 비움
    const newToDosObj = {
        text: newTodo,
        id: Date.now(),
    }; // newToDosObj에 id와 텍스트를 같이 표시 되게 선언
    toDos.push(newToDosObj);//toDos 어레이에 입력한 것 푸쉬 (넣기)
    paintToDo(newToDosObj);//입력한 텍스트를 화면에 표시
    saveToDos(); // function 실행 saveToDos()
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

function sayHello(item) {
    console.log("my thing to do", item);
} // submit eventListener가 event(agument)를 그냥 제공해 주는 것 처럼 
// item 또한 제공해줌  처리되고 있는 item이 어떤것인지 알 수 있음

if (savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos); 
    //savedToDos는 스트링형식인데 array로 변환하기위해 JSON.parse를 사용
    toDos = parsedToDos;
    // 새로운 할일을 적으면 덮어씌워지는 걸 방지하기 위해 toDos array를 가지고 와서 toDos array르
    parsedToDos.forEach(paintToDo);
    // fodEach는 각각의 todos(item)에 대해 실행해줌.
}
// 45번째 function을 작성하지 않고 더 짧게 작성하는 방법
// parsedToDos.forEach((item) => console.log("my things to do", item));