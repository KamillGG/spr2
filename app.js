async function getData(){
    const data = await fetch(`${baseURL}/products`,{
        headers:{
            Authorization:auth
        }
    })
    const json = await data.json()
    console.log(json)
    document.querySelector('#allCont').innerHTML  = ""
    generateDivs(json)
}
function generateDivs(json){
    for(let i in json){
        const div = document.createElement('div')
        const name = document.createElement('h1')
        const price = document.createElement('h2')
        const quantity = document.createElement('h3')
        const input = document.createElement('input')
        const button = document.createElement('button')
        div.classList.add('divs')
        input.type = "number"
        name.innerHTML = json[i].name
        price.innerHTML = json[i].price
        quantity.innerHTML = json[i].stock_quantity
        button.innerHTML = "Confirm"
        button.addEventListener('click',()=>{
            addingQuant(json[i],input.value)
        })
        div.appendChild(name)
        div.appendChild(price)
        div.appendChild(quantity)
        div.appendChild(input)
        div.appendChild(button)
        document.querySelector('#allCont').appendChild(div)
    }   
}
getData()
async function submitFunc(){
    const name = document.getElementById('nazwa').value
    const cena = document.getElementById('cena').value
    const ilosc = document.getElementById('stock_q').value
    if(name!="" && cena !="" && ilosc!=""){

    
    const div = document.createElement('div')
    div.style.order = "-1"
    const nazwa = document.createElement('h1')
    const price = document.createElement('h2')
    const quantity = document.createElement('h3')
    const message = document.createElement('h2')
    message.innerHTML = "Refresh to update stock"
    div.classList.add('divs')
    nazwa.innerHTML = name
    price.innerHTML = cena
    quantity.innerHTML = ilosc
    div.appendChild(nazwa)
    div.appendChild(price)
    div.appendChild(quantity)
    div.appendChild(message)
    document.querySelector('#allCont').appendChild(div)
    const url = new URL(`${baseURL}/products`)
    var params ={
        "name":name,
        "regular_price":cena,
        "manage_stock":true,
        "stock_quantity":ilosc
    }
    for(let i in params){
        url.searchParams.append(i,params[i])
    }
    console.log(url)
    const data = await fetch(url,{
        method:"POST",
        headers:{
            Authorization:auth
        }
    })
}
else{
    window.alert('Wypelnij pola')
}
}
async function addingQuant(json,value){
    const url = `${baseURL}/products/${json.id}?stock_quantity=${parseInt(value)+parseInt(json.stock_quantity)}`
    const data =  await fetch(url,{
        method:"POST",
        headers:{
            Authorization:auth
        }
    })
    getData()
}