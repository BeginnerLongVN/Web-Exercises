const password = 'BAGIAINHI';
let exercises = {};
let kindCounter = 0;

window.onload = function() {
    const savedExercises = localStorage.getItem('exercises');
    const savedKindCounter = localStorage.getItem('kindCounter');
    
    if (savedExercises) {
        exercises = JSON.parse(savedExercises);
        kindCounter = parseInt(savedKindCounter) || 0;
        updateExerciseList(); 
    }
};


function saveToLocalStorage() {
    localStorage.setItem('exercises', JSON.stringify(exercises));
    localStorage.setItem('kindCounter', kindCounter.toString());
}


function pressEnter(idOfInput, functionAct) {
    const inputBlank = document.querySelector(`.${idOfInput}`);
    inputBlank.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            functionAct(inputBlank.value);
            inputBlank.value = ''; 
        }
    });
}


function openTheAdmin(adminPasswordInput) {
    const admin = document.querySelector('.admin');
    if (adminPasswordInput === password) {
        admin.style.display = 'block';  
        updateExerciseList(true); 
    } else {
        alert('Incorrect Password');
    }
}


function addNewKind() {
    const newKindInput = document.querySelector('.new-kind-exercise').value;
    if (newKindInput) {
        exercises[kindCounter] = {
            name: newKindInput,
            exercises: []
        };
        kindCounter++;
        updateExerciseList(true); 
        saveToLocalStorage(); 
    } else {
        alert('Please enter a valid kind of exercise.');
    }
}


function addNewExercise() {
    const kindId = document.querySelector('.kind-exercise').value;
    const name = document.querySelector('.name-exercise').value;
    const link = document.querySelector('.link-exercise').value;

    if (exercises[kindId]) {
        const newExercise = {
            id: exercises[kindId].exercises.length + 1,
            name: name,
            link: link
        };
        exercises[kindId].exercises.push(newExercise);
        updateExerciseList(true); 
        saveToLocalStorage(); 
    } else {
        alert('This kind of exercise does not exist. Please add it first.');
    }
}


function deleteExercise(kindId, exerciseId) {
    exercises[kindId].exercises = exercises[kindId].exercises.filter(ex => ex.id !== exerciseId);
    updateExerciseList(true);
    saveToLocalStorage(); 
}

// Delete a kind of exercise
function deleteKind(kindId) {
    delete exercises[kindId];
    updateExerciseList(true);
    saveToLocalStorage(); 
}


function updateExerciseList(showDeleteButtons = false) {
    const exerciseList = document.getElementById('exercise-list');
    exerciseList.innerHTML = '';

    for (const kindId in exercises) {
        const kind = exercises[kindId];
        
        
        const kindItem = document.createElement('li');
        kindItem.innerHTML = `<strong>${kindId}. ${kind.name}</strong>`;

        if (showDeleteButtons) {
            
            const deleteKindButton = document.createElement('button');
            deleteKindButton.innerText = 'Delete Kind';
            deleteKindButton.onclick = () => deleteKind(kindId);
            kindItem.appendChild(deleteKindButton);
        }

        
        const subList = document.createElement('ul');
        kind.exercises.forEach(ex => {
            const exItem = document.createElement('li');
            exItem.innerHTML = `<a href="${ex.link}" target="_blank">${ex.name}</a>`;

            if (showDeleteButtons) {
                
                const deleteExButton = document.createElement('button');
                deleteExButton.innerText = 'Delete Exercise';
                deleteExButton.onclick = () => deleteExercise(kindId, ex.id);
                exItem.appendChild(deleteExButton);
            }

            subList.appendChild(exItem);
        });

        kindItem.appendChild(subList);
        exerciseList.appendChild(kindItem);
    }
}


document.querySelector('.Add-kind').addEventListener('click', addNewKind);
document.querySelector('.Enter-exercise').addEventListener('click', addNewExercise);

pressEnter('admin-password', openTheAdmin);
