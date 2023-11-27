function loadCheck(){
    let counter
    if(localStorage.length===0)
    {
        localStorage.setItem("counter",0)
        localStorage.setItem("deletedItems",0)
    }
    resetTask()
    loadTasks()
    counter = parseInt(localStorage.getItem("counter"))
}

function addTask(){
    let noteDir = "left"
    let conatiner = document.getElementById("allTasks")
    const note = {
        text : document.getElementById("taskInput").value,
        time : document.getElementById("dateStamp").value,
        date : document.getElementById("timeStamp").value,
        align: noteDir
    }
    if (note.text !=="" && note.time !=="" && note.date !=="")
    {
        if (note.text.charCodeAt(0)>127){
            noteDir = "right"
            note.align=noteDir
        }
        alert(noteDir)
        let div = `<div class="note" id=${"note"+localStorage.getItem("counter")}><p style="text-align:${noteDir}"><span class="glyphicon glyphicon-remove" onclick="deleteNote(this)"}></span><br>${note.text}</p><br><span> ${note.time}<br>${note.date} </span><div>`
        conatiner.innerHTML += div
        const task = JSON.stringify(note)
        localStorage.setItem("note"+localStorage.getItem("counter"),task)
        counter=parseInt(localStorage.getItem("counter"))
        counter++
        localStorage.setItem("counter",counter)
        resetTask()
    }
    else
    {
        alert("please fill all fields!")
    }
}

function deleteNote(toDelete){
    let conatiner = document.getElementById("allTasks")
    let deletedItems = parseInt(localStorage.getItem("deletedItems"))
    deletedItems++
    let div = toDelete.parentNode.parentNode.getAttribute("id")
    localStorage.removeItem(div)
    localStorage.setItem("deletedItems",deletedItems)
    if(localStorage.getItem("deletedItems")===localStorage.getItem("counter"))
    {
        localStorage.setItem("counter",0)
        localStorage.setItem("deletedItems",0)
        conatiner.innerHTML = ''
    }   
    loadTasks()
}

function resetTask(){
    document.getElementById("taskInput").value= ""
    document.getElementById("dateStamp").value= ""
    document.getElementById("timeStamp").value = ""
}

function loadTasks() {
    if (localStorage.getItem("counter")>0)
    {
        let conatiner = document.getElementById("allTasks")
        conatiner.innerHTML = ''
        let task, div
        for(let i=0; i<localStorage.getItem("counter"); i++)
        {
            if(localStorage.getItem("note"+i)!==null)
            {
            task = localStorage.getItem("note"+i)
            let parseNote = JSON.parse(task)
            let noteDir=parseNote.align
            div = `<div class="note" id=${"note"+i}><p style="text-align:${noteDir}"><span class="glyphicon glyphicon-remove" onclick="deleteNote(this)"}></span><br>${parseNote.text}</p><br><span> ${parseNote.time}<br>${parseNote.date} </span></div>`
            conatiner.innerHTML += div
            }
        }
    }  
}

