const list = document.querySelector('.list');
const createBtn = document.querySelector('.create-btn');

let todos = [];

createBtn.addEventListener('click', createNewTodo);

function createNewTodo() {
    // 새로운 아이템 객체 생성
    const item = {
        id: new Date().getTime(), // 유니크한 값 id로 주기 위함
        text: "",
        complete: false
    };

    // 배열의 처음에 새로운 아이템을 추가
    todos.unshift(item);

    // 요소 생성하기
    const {itemEl, inputEl} = createToDoElement(item);

    list.prepend(itemEl);

    saveToLocalStorage();
}

function createToDoElement(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    const inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', "");

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circle';

    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);

    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);



    // Events
    checkboxEl.addEventListener('change', () =>{
        item.complete = checkboxEl.checked;

        if(item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    })

    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
    })

    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', "");
        saveToLocalStorage();
    })

    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
    })

    removeBtnEl.addEventListener('click', () => {
        todos = todos.filter(t => t.id !== item.id)
        itemEl.remove();
        saveToLocalStorage();
    })



    return {itemEl, inputEl, editBtnEl, removeBtnEl};
}

// localStorage에서 data 가져와서 객체 생성하기
function displayTodos() {
    // localStorage에서 todos 데이터 가져오기
    loadFromLocalStorage();

    for(let i=0; i<todos.length; i++) {

        const item = todos[i];

        // List Item 요소 생성
        const { itemEl } = createToDoElement(item);
        
        // List Div 안에 추가
        list.append(itemEl);
    }
}

displayTodos();

// localStorage에 저장
function saveToLocalStorage() {
    const data = JSON.stringify(todos);  // string으로 변환
    localStorage.setItem('my_todos', data);
}

// localStorage에서 data 가져옴
function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');

    if(data) {
        todos = JSON.parse(data);   // 데이터를 타입에 맞게 변환
    }
}