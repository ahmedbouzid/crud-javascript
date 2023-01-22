let title=document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
 let ads =document.getElementById('ads');
 let discount=document.getElementById('discount');
 let total =document.getElementById('total');
 let count=document.getElementById('count');
 let category=document.getElementById('category');
 let submit=document.getElementById('submit');


let mood ='create';
let temp;
 // get total
 function getTotal()
{
if (price != '') 
        {
          let reslt= ( +price.value + +taxes.value + +ads.value) - +discount.value;    
          total.innerHTML=reslt;
        }
}
//create product

//local storage on cas ou de existance 
let data ;
if (localStorage.product != null){
  data = JSON.parse(localStorage.product )
}else {
  data = [];
}
submit.onclick=function(){
  let newPro = {
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value,
  }
  //creation d'un produit ou bien plusieurs
  if (mood==='create'){
    if (newPro.count >  1){
      for (let i=0;i<newPro.count;i++){
      data.push(newPro);}
  
    } else{ data.push(newPro); }
  } else {
    data[ temp  ]=newPro ;
    mood='create';
    submit.innerHTML='Create';
    count.style.display='block';
  }
  
  //save data : local storage
  localStorage.setItem('product',   JSON.stringify(data)     );


  clearData()
  showData()
}

//clear input after creation
function clearData(){
  title.value='';
  price.value='';
  taxes.value='';
  ads.value='';
  discount.value='';
  total.innerHTML='';
  count.value='';
  category.value='';

}
//read

function showData()
{
  getTotal();
    let table ='';
    for (let i=0;i<data.length;i++){
      table+=`
    <tr>
    <td>${i}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button id="update" onclick="updateData(${i})" >Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})" >Delete</button></td>
    </tr>
    `;

    }
    document.getElementById('tbody').innerHTML=table;
    //creation d'un nouveau boutton delete all
    let btnDeleteAll=document.getElementById('deleteAll')
    //verification si le tableau.length>0
    if (data.length>0){ 
      btnDeleteAll.innerHTML=`
      <button onclick="deleteAll()"> Delete All(${data.length}) </button>
      `
     //si le tableau est vide 
    }else{
      btnDeleteAll.innerHTML=''
    }
}

showData()

//delete
function deleteData(i){
  //supression 
  data.splice(i,1);
  //stockage
  localStorage.product = JSON.stringify(data);
  //affiche le contenu aprés la supression
  showData()
 

}
function deleteAll(){
  localStorage.clear;
  data.splice(0);
  showData();
}
//count creat many product

//update
function updateData(i){
title.value=data[i].title;
price.value=data[i].price;
taxes.value=data[i].taxes;
ads.value=data[i].ads;
discount.value=data[i].discount;
getTotal();

count.style.display='none'
category.value=data[i].category;
submit.innerHTML='UPDATE'
mood='update';
temp=i;

}
// search

let searchMood = "title";

function getSearchMood(id){

    let search = document.getElementById("search")
    if(id == "searchTitle"){
        searchMood = "title";
        search.placeholder = "Search by title"
    }else{
        searchMood = "category"
        
    }
    search.placeholder = "Search by "+  searchMood
    search.focus();
    search.value = "";
    showData
}

function searchData(value){

    let table = '';
   if(searchMood == "title"){
    for(let i = 0; i < data.length; i++){
        if(data[i].title.includes(value)){
            table += `
            <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateData(${i})" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">Delete</button></td>
        </tr>
            `;
    }else{
        
    }
    document.getElementById('tbody').innerHTML = table;
   }
}
}




//clean data