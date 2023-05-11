

let todoStore;
if (localStorage.getItem("todoStore")){
    console.log('====================================');
    console.log("jjj", typeof JSON.parse(localStorage.getItem("todoStore")))
    console.log('====================================');
     todoStore = JSON.parse(localStorage.getItem("todoStore"));
}else{
     todoStore = [
        {
            task: "hit gym",
            state: "todo"
        },
        {
            task: "buy groceries",
            state: "todo"
        },
        {
            task: "go through regular lectures",
            state: "doing"
        },
        {
            task: "take jack for a walk",
            state: "done"
        }
    ]

}


todoStore.map((task)=>{
    let taskElement = dynamicElement(task.task);
    if (task.state == 'todo'){
        document.querySelector('#todo').appendChild(taskElement)

    } else if (task.state == 'doing'){
        document.querySelector('#doing').appendChild(taskElement)
    }else{
        document.querySelector('#done').appendChild(taskElement)

    }

  
    
    
})

function  dynamicElement (task){
    let ele = document.createElement('div')
    ele.setAttribute('draggable',"true");
    ele.setAttribute('class','task')
    ele.innerHTML = `<p>${task}</p>
            <div class="btn-container">
              <button  class="edit">
                <img onclick='editTask(event)' src="/edit.png" alt="" />
              </button>
              <button onclick='deleteTask(event)' class="delete">
                <img src="/bin.png" alt="" />
              </button>
               <button  onclick='confirmTask(event)' class="done" style="display: none">Update</button>
            </div>`
        
    
    return ele

}


function addTask() {
    const value = document.querySelector(".form input").value;
    if (!value) return
    console.log('====================================');
    console.log(value);
    console.log('====================================');
    const todo = document.createElement('div');
    todo.innerHTML = `<p>${value}</p>
            <div class="btn-container">
              <button onclick='editTask(event)' class="edit">
                <img src="/edit.png" alt="" />
              </button>
              <button  class="delete">
                <img onclick='deleteTask(event)' src="/bin.png" alt="" />
              </button>
               <button onclick='confirmTask(event)' class="done" style="display: none">Update</button>
            </div>`

    todo.setAttribute('draggable', "true")
    todo.classList.add("task")
    todo.addEventListener('dragstart', (e) => {
        todo.classList.add("isDragging")

    })

    todo.addEventListener('dragend', (e) => {
        todo.classList.remove("isDragging")

    })



    document.querySelector("#todo").appendChild(todo);
    document.querySelector(".form input").value=''

    store()


}

const btn = document.querySelector(".form button");
const inputTodo =  document.querySelector(".form input");
inputTodo.addEventListener('keyup',(e)=>{
    e.preventDefault();
    if (e.key == 'Enter'){
        addTask(e)
    }

})
btn.addEventListener("click",(e)=> addTask(e))


function editTask(e) {
    e.target.style.display = "none";

    
    
    let activeParent = e.target.parentNode.parentNode.parentNode;
    console.log('====================================');
    console.log("PPP",activeParent);
    console.log('====================================');
    let inputbox = document.createElement("input");
    let prevText = activeParent.querySelector("p").innerHTML
    inputbox.setAttribute('value', prevText)
    inputbox.setAttribute("class", "editTodo")
    activeParent.prepend(inputbox);
    activeParent.querySelector("p").style.display = "none";
    activeParent.querySelector(".done").style.display = "block";
    activeParent.querySelector(".delete img").style.display = "none";
  


}


function confirmTask(e) {
    let activeParent = e.target.parentNode.parentNode;
    let updatedTodo = activeParent.querySelector(".editTodo").value;
    if (!updatedTodo) return
    console.log('====================================');
    console.log(activeParent.querySelector(".edit"));
    console.log('====================================');
    let updateEle = activeParent.querySelector("p")
    updateEle.innerHTML = updatedTodo;
    updateEle.style.display = 'block'

    e.target.style.display = 'none';
    activeParent.querySelector(".editTodo").style.display = 'none';

    activeParent.querySelector(".edit img").style.display = 'block';
    activeParent.querySelector(".delete img").style.display = 'block';
    activeParent.querySelector(".editTodo").remove()
    store()


}
function deleteTask(e) {
    let activeParent = e.target.parentNode.parentNode.parentNode;
    activeParent.remove()
    store()
}
