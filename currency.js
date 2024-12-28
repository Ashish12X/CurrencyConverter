const baseUrl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.12.27/v1/currencies/";

const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const para=document.querySelector("#result");


for(let select of dropdown){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==='from' && currCode==='USD'){
            newOption.selected="selected";
        }else if(select.name==='to' && currCode==='INR'){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        flag(evt.target);
    })
}

const flag=(e)=>{
    const img=e.parentElement.querySelector("img");
    let countryCode=countryList[e.value];
    img.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
}

window.addEventListener("load",async(e)=>{
    e.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==""|| amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const url= `${baseUrl}${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    mainFnc(data,amtVal);
});

btn.addEventListener("click",async(e)=>{
    e.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==""|| amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const url= `${baseUrl}${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    mainFnc(data,amtVal);
});

function mainFnc(data,amtVal){
    let from=fromCurr.value.toLowerCase();
    let to=toCurr.value.toLowerCase();
    let val=data[from][to];
    para.innerText=`${amtVal} ${fromCurr.value} = ${(val*amtVal).toFixed(2)} ${toCurr.value}`;
}
