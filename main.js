let input =document.querySelector(".input");
let add =document.querySelector(".add");
let Divtasks =document.querySelector(".tasks");
let clearAllitems =document.querySelector(".clear");

let arrayOfTasks = [];

// Check if Theres Tasks In Local Storage
if (localStorage.getItem("Tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("Tasks"));
}

// Trigger Get Data From Local Storage Function
getDataFromLocalStorage();

add.onclick = function(){
 
     if(input.value !== ""){
         addtasksintoarray(input.value) //ad task into arry
         input.value="";  // Empty input field
     }

}

// delete task from  and local storage


    Divtasks.addEventListener("click",(e)=>{
        if(e.target.classList.contains("del")){
           //remove task from local storge
           deletTaskWith(e.target.parentElement.getAttribute("data-taskID"))

           // remove task from page
            e.target.parentElement.remove()

        }

        if(e.target.classList.contains("task")){
            e.target.classList.toggle("done")
            toggleStatusWith(e.target.getAttribute("data-taskID"))
        }

    })
 
  


function addtasksintoarray(tasktext){
    let tasks ={
        id:Date.now(),
        task:tasktext,
        completed:false
    }

    arrayOfTasks.push(tasks);

    // Add Tasks To Page
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To Local Storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

console.log( arrayOfTasks)
function  addElementsToPageFrom(arrayOfTasks){
      // Empty Tasks Div
    Divtasks.innerHTML = "";
    for(let i =0 ; i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].task !=""){
            let taskelement = document.createElement("div");
            taskelement.className ="task";
             // Check If Task is Done
            if (arrayOfTasks[i].completed) {
                taskelement.className = "task done";
            }
            taskelement.textContent=arrayOfTasks[i].task
            taskelement.setAttribute("data-taskID",arrayOfTasks[i].id);
            let span = document.createElement("span");
            span.textContent="Delete"
            span.className="del";
            taskelement.appendChild(span);
            Divtasks.appendChild(taskelement)
        }
    }

}

function   addDataToLocalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("Tasks",JSON.stringify(arrayOfTasks))
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("Tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function  deletTaskWith(taskId){

       
    //     for(let i = 0 ; i<arrayOfTasks.length;i++){
           
    //             console.log(`${arrayOfTasks[i].id} === ${taskId}`)
        
    // }
    arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
    addDataToLocalStorageFrom(arrayOfTasks);

}


function toggleStatusWith(taskId){
  
    for(let i =0;i<arrayOfTasks.length;i++){
        if(arrayOfTasks[i].id == taskId){
            if(arrayOfTasks[i].completed === false){
                arrayOfTasks[i].completed = true
            }else{
                arrayOfTasks[i].completed = false
            }
        }
    }
    addDataToLocalStorageFrom(arrayOfTasks);
}

clearAllitems.addEventListener("click",function(){
    Divtasks.innerHTML ="";
    window.localStorage.clear();
    arrayOfTasks = [];
})

