let body = document.querySelector(".task-board-body");
let btnagg = document.getElementById("addTask");
let closemodal = document.querySelector(".close");
let inputname = document.getElementById("nombre");
let btnsave = document.querySelector(".btnSave");
let btnpending = document.getElementById("pending");
let btncompleted = document.getElementById("completed")
let btnall = document.getElementById("all");
let completed = [];
let pending = [];


import * as modal from "../js/modal_functions.js"

EjecutarPeticionServidor('Tareas', 'GET', null, (data) => {
    data.forEach(elemento => {
        VisualizarTareas(elemento, body)
    });
})

function VisualizarTareas(tarea, contenedor) {
    let card = document.createElement('section');
    card.setAttribute("data-id", tarea.Id)
    card.setAttribute("data-status", tarea.Estado)
    card.classList.add("task-card");

    let divStatus = document.createElement('div');
    divStatus.classList.add('card-status');


    if (tarea.Estado == true) {
        let iconoStatus = document.createElement('i')
        iconoStatus.classList.add('far');
        iconoStatus.classList.add('fa-check-circle');
        divStatus.append(iconoStatus)
    } else {
        divStatus.classList.add('pending');
        let iconoStatus = document.createElement('i')
        iconoStatus.classList.add('fas');
        iconoStatus.classList.add('fa-clock');
        divStatus.append(iconoStatus)
    }


    let contenido = document.createElement('section');
    contenido.classList.add('task-content')

    let span = document.createElement('span');
    span.innerHTML = tarea.Nombre;

    let btnEliminar = document.createElement('button');
    let iconoBasura = document.createElement('i');
    iconoBasura.classList.add('fas');
    iconoBasura.classList.add('fa-trash');
    btnEliminar.append(iconoBasura)
    btnEliminar.addEventListener('click', () => {
        EjecutarPeticionServidor('Tareas/' + tarea.Id, 'DELETE', { Id: tarea.Id }, () => {
            let deleted_card = document.querySelector(`section[data-id="${tarea.Id}"]`);
            body.removeChild(deleted_card);
        })
    })


    contenido.append(span);
    contenido.append(btnEliminar);

    card.append(divStatus);
    card.append(contenido);

    if (card.dataset.status === "true") {
        completed.push(card);
    } else {
        pending.push(card);
    }

    card.addEventListener('click', () => {
        EjecutarPeticionServidor('Tareas/' + tarea.Id, 'PUT', { Id: tarea.Id, Nombre: tarea.Nombre, Estado: (card.dataset.status === "true") ? 0 : 1 }, (data) => {

            let editcard = document.querySelector(`section[data-id="${tarea.Id}"] div`);
            editcard.innerHTML = ""
            if (card.dataset.status === "true") {
                editcard.classList.add('pending')
                let iconoStatus = document.createElement('i')
                iconoStatus.classList.add('fas');
                iconoStatus.classList.add('fa-clock');
                editcard.append(iconoStatus)
            } else {
                editcard.classList.remove('pending');
                let iconoStatus = document.createElement('i')
                iconoStatus.classList.add('far');
                iconoStatus.classList.add('fa-check-circle');
                editcard.append(iconoStatus)
            }
            card.setAttribute("data-status", (card.dataset.status === "true") ? "false" : "true");
            console.log(editcard)
        })
    })

    contenedor.appendChild(card);

}

btnsave.addEventListener('click', () => {
    EjecutarPeticionServidor('Tareas', 'POST', { Nombre: inputname.value, Estado: 0 }, (data) => {
        VisualizarTareas(data, body)
    })
})

btnagg.addEventListener('click', () => {
    modal.OpenModal();
})

closemodal.addEventListener('click', () => {
    modal.CloseModal();
})

btnpending.addEventListener('click', () => {
    completed.forEach(elem => {
        elem.style.display = "none";
    })

    pending.forEach(elem => {
        elem.style.display = "block";
    })
})

btncompleted.addEventListener('click', () => {
    pending.forEach(elem => {
        elem.style.display = "none";
    })

    completed.forEach(elem => {
        elem.style.display = "block";
    })
})

btnall.addEventListener('click', () => {
    let allcards = document.querySelectorAll(".task-card")
    allcards.forEach(elem => {
        elem.style.display = "block";
    })

})


