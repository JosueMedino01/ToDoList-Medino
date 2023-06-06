function add(){
    //Cria referência com o Input#Task e aceesa seu conteúdo
    let inTask =document.getElementById('inTask')
    let task = inTask.value.trim()

    //Chama a função para validar a tarefa 
    if(validaçãoTexto(inTask, task)) {
        return
    }

    //Armazena as tarefas em localStorage
    if(!localStorage.getItem('tasks')){
        localStorage.setItem('tasks', task)
        
        //Chama a função para exibir o item adicionado na tabela
        inserirLinha(task)
    } else{
        //Recebe as tasks já existentes
        let tasksAll = localStorage.getItem('tasks') + ';' + task
        

        //Atualiza as tasks 
        localStorage.setItem('tasks', tasksAll)
        
        //Chama a função para exibir o item adicionado na tabela
        inserirLinha(task)
    }

    //Cria referência com a tabela
    let tbTasks = document.getElementById('tbTasks')

    let inputTable = tbTasks.getElementsByTagName('input')

    //Chama a função para Limpar o input e colocar em Foco
    limpar(inTask)


}

let btAdd = document.getElementById('btAdd')
btAdd.addEventListener('click', add)

function validaçãoTexto(inputTask,taskValue){
    if(taskValue == ''){
        alert('Nenhuma Tarefa Foi Digitada!')
        inputTask.focus()
        return true
    }
}
function limpar(inputTask){
    inputTask.value = ''
    inputTask.focus()
}

function inserirLinha (tasksString){
    //Cria referência com a tabela
    let tbTasks = document.getElementById('tbTasks')

    //Cria uma linha nova 
    let linhaNova = tbTasks.insertRow(-1)
    
    //Cria as três colunas 
    col0 = linhaNova.insertCell(0)
    col1 = linhaNova.insertCell(1)  
    col2 = linhaNova.insertCell(2)  

    //Adiciona uma Class as COlunas 
    col0.className = 'conteudo-tarefas-tabela-coluna1'
    col1.className = 'conteudo-tarefas-tabela-coluna2'
    col2.className = 'conteudo-tarefas-tabela-coluna3'
   
    //Cria um array que pecorre todos os valores 
    col0.innerHTML = "<input type='checkbox' class='ckMarcado' onchange='sublinhar(this.parentNode.parentNode)'>"
    col1.textContent = tasksString
    col2.innerHTML = "<button class='excluir'> <img src='img/lixo2.png'> </button>"

    // Adiciona o evento de clique ao botão de exclusão
    col2.querySelector(".excluir").addEventListener("click", remover)
}



function remover(){
    let linha = this.parentNode.parentNode
    let posicao = linha.rowIndex
   
    linha.parentNode.removeChild(linha)

//A PARTIR DA POSIÇÃO PRECISO EXCLUIR DO LOCALSORAGE
let listaTasks = localStorage.getItem('tasks').split(';')
listaTasks.splice(posicao,1)

//Transforma em Strings 
let tasksAll = listaTasks.join(';')
//Atualiza as tasks 
localStorage.setItem('tasks', tasksAll)
    
}


    


function mostrar(){
    if(!localStorage.getItem('tasks')){
        return
    }
    //Recupera os Dados Salvos
    let listaTasks = localStorage.getItem('tasks').split(';')

    for(let i = 0; i < listaTasks.length; i++){
        inserirLinha(listaTasks[i].toString())
    }

}

mostrar()



function sublinhar(linha){
   
    //Cria referência com a tabela
    let tabela = document.getElementById('tbTasks')

    let checkboxes = tabela.querySelectorAll('td input[type="checkbox"]');
    
    let posicao = linha.rowIndex
    let celula = tabela.rows[posicao].cells[1]
    
    if(checkboxes[posicao].checked){
        celula.classList.add('sublinhado')
        armazenarCelula(posicao)
    } else {      
        celula.classList.remove('sublinhado')
    }
    
    

}

function armazenarCelula(posicaoLinha){
    if(!localStorage.getItem('checkbox')){
        localStorage.setItem('checkbox', posicaoLinha)
       
    } else{
        let listaPosiçõesMarcadas= localStorage.getItem('checkbox') + ';' + posicaoLinha

        localStorage.setItem('checkbox', listaPosiçõesMarcadas)
        
    }

    
}

//Armazeieni > Mostrar () = pegar armazenado e exibir 
//Remover () . Pegar armazenado e remover o numero referente e  linha . 

