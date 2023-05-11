let todoObj = [
    {
        task:"hit gym"
    },
    {
        task: "buy groceries"
    },
    {
        task:"go through regular lectures"
    },
    {
        task: "take jack for a walk"
    }
]
localStorage.setItem("todoList",todoObj)

todoObj.map((task)=>{
    let taskElement = dynamicElement(task.task);

    document.querySelector('#doing').appendChild(taskElement)
    document.querySelector('#done').appendChild(taskElement)
    document.querySelector('#todo').appendChild(taskElement)
})

function  dynamicElement (task){
    let ele = document.createElement('div')
    ele.setAttribute('draggable',"true");
    ele.setAttribute('class','task')
    ele.innerHTML = `<p>${task}</p>
            <div class="btn-container">
              <button class="edit">
                <img src="/edit.png" alt="" />
              </button>
              <button class="delete">
                <img src="/bin.png" alt="" />
              </button>
               <button class="done" style="display: none">done</button>
            </div>`
        
    
    return ele

}




const btn = document.querySelector(".form button");
btn.addEventListener("click",()=>{
   const value = document.querySelector(".form input").value;
   if (!value) return
   console.log('====================================');
   console.log(value);
   console.log('====================================');
   const todo = document.createElement('p');
   todo.setAttribute('draggable',"true")
   todo.classList.add("task")
    todo.addEventListener('dragstart', (e) => {
        todo.classList.add("isDragging")

    })

    todo.addEventListener('dragend', (e) => {
        todo.classList.remove("isDragging")

    })

    todo.innerHTML = value;
    
    document.querySelector("#todo").appendChild(todo)


})


const edit =document.querySelectorAll('.edit');
const done = document.querySelectorAll('.done');
const deleteTask = document.querySelectorAll('.delete');
edit.forEach((editBtn)=>{
    editBtn.addEventListener("click",()=>{
        editBtn.style.display="none";
        
        editBtn
        console.log('====================================');
        console.log("PPP",editBtn.parentNode);
        console.log('====================================');
        let activeParent = editBtn.parentNode.parentNode
        let inputbox = document.createElement("input");
        let prevText = activeParent.querySelector("p").innerHTML
        inputbox.setAttribute('value',prevText)  
        inputbox.setAttribute("class", "editTodo")
        activeParent.appendChild(inputbox);
        activeParent.querySelector("p").style.display="none";
        activeParent.querySelector(".done").style.display = "block";


    })
})

done.forEach(doneBtn => {
    doneBtn.addEventListener("click",(e)=>{
        let activeParent = e.target.parentNode.parentNode; 
        let updatedTodo = activeParent.querySelector(".editTodo").value;
        if (!updatedTodo) return
        console.log('====================================');
        console.log(updatedTodo);
        console.log('====================================');
        let updateEle = activeParent.querySelector("p")
       updateEle.innerHTML=updatedTodo;
       updateEle.style.display='block'

        doneBtn.style.display = 'none';
        activeParent.querySelector(".editTodo").style.display = 'none';

        activeParent.querySelector(".edit").style.display = 'block';
        activeParent.querySelector(".editTodo").remove()


    })

    
});

deleteTask.forEach((deleteBtn)=>{
    deleteBtn.addEventListener('click',()=>{
        let activeParent = deleteBtn.parentNode;
        activeParent.remove()
    })

})