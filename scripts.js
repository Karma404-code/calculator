

const keys = document.querySelectorAll("li");
const display = document.querySelector(".display");

    
var normalize = [''];
var operator = /[+-/*%]/;
var compute = [];
var exp = [];

keys.forEach((element) => {   
    element.addEventListener("click", () => {
        readData(element);
    });
})

function operate(){
        normalize = [""];
        fixExp();
    while(normalize.length != 1){
        var op1 = normalize.pop();
        var op = normalize.pop(); 
        var op2 = normalize.pop();
        var result = solve(op2,op1,op);
        normalize.push(result);
    }
    exp = normalize;
    writeData();
}


function readData(key){
    console.log("Reading");
    if(key.className == "operate" ){
        operate();
    }
    else if(key.className == "clear"){
        exp = [];
        normalize = [''];
        writeData();
    }
    else if(key.className == "backspace" || key.className == "backspace down" ){
        exp.pop();
        writeData();
    }
    else{
        exp.push(key.className);
        writeData();
    }
}

function fixExp(){
    var len = exp.length;
    var i, j=0;
    if(operator.test(exp[0]) || operator.test(exp[len-1]) ){   
        console.log("operate");
       display.innerHTML = "Syntax Error";
    }
    for(i=0;i<len;i++){
        if(!operator.test(exp[i])){ 
            normalize[j] = normalize[j] + (exp[i]);
            console.log(normalize);
        }
        else if(operator.test(exp[i]) && !operator.test(exp[i+1])){
            j=j+1;
            normalize[j] = exp[i];
            j = j+1;
            normalize[j] = "";
        }  
        else{
            display.innerHTML = "Syntax Error";        
        }
    }
    
}

function solve(op2,op1,op){
    if(op == "+"){
        return parseFloat(op2)+parseFloat(op1);
    }
    else if(op == "-"){
        return parseFloat(op2)-parseFloat(op1)
    }
    else if(op == "*"){
        return parseFloat(op2)*parseFloat(op1)
    }
    else if(op == "/"){
    return parseFloat(op2)/parseFloat(op1)
    }
    else if(op == "%"){
        return parseFloat(op2)%parseFloat(op1)
    }
}

function writeData(){
    console.log(exp);
    console.log("writing");
    var show = exp.toString();
    display.innerHTML = show.replace(/,/g,"");
}

