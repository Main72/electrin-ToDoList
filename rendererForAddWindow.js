
function changeText(label){
    //const list = document.querySelector('.list')
    const span = label.querySelector('span')
    const input = document.createElement("input")
    input.type = 'text'
    input.value = span.textContent;
    // const span = label.querySelector('span')
    // span.textContent = '';
    
    span.remove();
    const button = document.createElement('button');
    button.type = 'submit';
    button.classList.toggle('active');
    // input.addEventListener('input',(e)=>{
    //     if(!input.value){
    //         alert('Input something,pls!')
    //     }
    //     else{
            
    //     }
    // });
    button.addEventListener('click',()=>{
        if(!input.value){
            input.placeholder='Input something,pls!';
        }
        else{
            if(input.value > 20){
                input.placeholder='Input something,pls!';
            }
            const span = document.createElement('span')
            span.textContent = input.value;
            input.remove();
            button.remove();
            label.appendChild(span);
        }
       


        
    })
    
    label.appendChild(button);
    label.appendChild(input);
    
    
   
}


function addTask(){
    const list = document.querySelector(".list");
    const task_el = document.createElement("label");
    task_el.setAttribute('ondblclick','changeText(this)');
    const taskText = 'Text';
    const checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    const spanJs = document.createElement('span');
    spanJs.textContent = taskText;
    task_el.appendChild(checkbox);
    task_el.appendChild(document.createElement('i'));
    task_el.appendChild(spanJs);
    
   
   
    list.appendChild(task_el)
    
}
