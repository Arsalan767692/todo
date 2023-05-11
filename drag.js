const draggables = document.querySelectorAll(".task")
const droppables = document.querySelectorAll(".lane")


draggables.forEach((task) => {
    task.addEventListener('dragstart', (e) => {
        task.classList.add("isDragging")

    })

    task.addEventListener('dragend', (e) => {
        task.classList.remove("isDragging");
        store();

    })
});


droppables.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {

        let bottomtask = insertaboveTask(zone, e.clientY);
        let currentTask = document.querySelector(".isDragging");

        if (!bottomtask) {
            zone.appendChild(currentTask)
        } else {
            zone.insertBefore(currentTask, bottomtask)
        }


    })


})


insertaboveTask = (zone, mouseY) => {
    let ele = zone.querySelectorAll(".task:not(.isDragging)");
    let closestTask = null;
    let closestOffSet = Number.NEGATIVE_INFINITY;

    ele.forEach((task) => {
        let { top } = task.getBoundingClientRect();
        let offSet = mouseY - top
        if (offSet < 0 && offSet > closestOffSet) {
            closestOffSet = offSet;
            closestTask = task
        }
    })

    return closestTask

}

function store() {

    let arr = [];
    let test = document.querySelectorAll(".task");
    console.log('====================================');
    console.log(test);
    console.log('====================================');
    test.forEach((taskTest) => {
        let task = taskTest.querySelector(".task p").innerHTML;
        let state = taskTest.parentNode.id;
        let taskObj = {
            "task": task,
            state: state
        }
        arr.push(taskObj);
    })
    localStorage.setItem("todoStore", JSON.stringify(arr));

    console.log(arr, "YY");

}

