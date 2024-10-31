let budget = 0;
let balance = 0;
let assetsArray = []
let newIndex;
let editCommand = 0;
let command = 0;


const submitBudget = () => {
    const theBudget = document.getElementById('budget').value;
    if (theBudget != "") {
        budget = Number(theBudget)
        balance = Number(theBudget)
        arr1.style.display = 'none'
        addInputs.style.display ='block'
        document.getElementById("budget").value = ""
    }else{
        arr1.style.display = 'block'
        addInputs.style.display = 'none'
        
    }
    showBalance.innerHTML = `Total Balance: ${balance}`
    showBudget.innerHTML =  `Total Budget: ${budget}`
    console.log(theBudget);
}

const Add = () => {
        if (unitName.value == '' || unitNumber.value == '' || unitQuantity.value == ''){
            arr2.style.display = "block"
        }else{
            arr2.style.display = "none"
            let details = {
                name : unitName.value,
                number : unitNumber.value,
                quantity : unitQuantity.value
            }
            if (budget > 0 && balance > 0) {
                if ((details.number * details.quantity) <= balance) {
                    assetsArray.push(details)
                    console.log(assetsArray);
                    balance = balance - (details.number * details.quantity)
                    showBalance.innerHTML = `Total Balance: ${balance}`
                    displayContent()
                    command = details.number * details.quantity
                }else{
                    alert("Insufficient funds")
                }
            }else{
                alert("put a budget first")
            }
        }
    }

    const deleteItem = (i) => {
        let confirmation = confirm("Are you sure you want proceed with this action?")
        if(confirmation == true) {
            assetsArray.splice(i,1)
            displayContent()
            balance = balance + command
            showBalance.innerHTML = `Total Balance: ${balance}`
        }
    }

    const editItem = (j) => {
        newIndex = j
    }

    const editChange = () => {
        if (modName.value == '' || modNumber.value == '' || modQuantity.value == ''){
            arr3.style.display = 'block'
        }else{
            arr3.style.display = 'none'
            
            let object = {
                name : modName.value,
                number : modNumber.value,
                quantity : modQuantity.value
            }
            assetsArray.splice(newIndex, 1, object)
            displayContent()
            editCommand = object.number * object.quantity
            balance = 0
            balance = budget - editCommand
            showBalance.innerHTML = `Total Balance: ${balance}`
        }
    }



    const displayContent = () => {
        showAll.innerHTML = ''
        assetsArray.map((unit, index)=>{
            showAll.innerHTML += `
            <div class="card mt-lg-3 mt-2 ">
        <div class="col mx-2 ">
            <div class="card p-3 mx-auto my-2">
                <div class="card-title fs-2 fw-bold">${index+1}.${unit.name}</div>
                <div class="card-body fs-1 fw-bolder">
                    <span class="me-5">&#8358;${unit.number}</span>
                    <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="editItem(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteItem(${index})">Delete</button>

                </div>
                <div class='card-footer'>Quantity: ${unit.quantity}</div>
                <div class='card-footer'>Total: &#8358;${Number(unit.quantity) * Number(unit.number)}</div>
            </div>
        </div>
    </div>
            `
        })
    }