const readline = require('readline');
const fs = require('fs');
const { exit } = require('process');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

(function(){
    menu1();
})();

function menu1(){
    console.log("\nBienvenido al programa de los números primos en binario");
    console.log("\t1. Ingresar limite");
    console.log("\t2. Generar limite aleatorio");
    console.log("\t3. Salir del programa");
    rl.question('Opción:' , (opcion) =>{
        if(opcion == 1){
            manual();
        }else if(opcion == 2){
            aleatoria();
        }else{
            exit();
        }
        //rl.close();
    });
}

function menu2(){
    console.log("\n¿Quieres volver a hacer un cálculo?");
    console.log("\t1. Si");
    console.log("\t2. No");
    rl.question('Opción:' , (opcion) =>{
        if(opcion == 1){
            menu1();
        }else{
            exit();
        }
    });
}

function manual(){
    fs.createWriteStream('primos.txt');
    fs.createWriteStream('datosGraficos.txt');
    fs.appendFileSync('primos.txt', "U={\n", (error)=>{
        if (error) console.log(`Error: ${error}`);
    });
    rl.question('Por favor inserta un límite ', (limite) =>{
        let numeroDecimal;
        let numeroPrimo;
        let contadorUnos;
        for(numeroDecimal = 0; numeroDecimal < limite; numeroDecimal++){
            if(esPrimo(numeroDecimal)){
                numeroPrimo = numeroDecimal.toString(2);
                contadorUnos = contarUnos(numeroPrimo);
                fs.appendFileSync('primos.txt',"\tNúmero primo: " +numeroDecimal + "-> Binario: " + numeroPrimo +" -> No. de Unos: " + contadorUnos +"\n", (error)=>{
                    if (error) console.log(`Error: ${error}`);
                });
                let logaritmo2 = Math.log2(contadorUnos);
                let logaritmo10 = Math.log10(contadorUnos);
                fs.appendFileSync('datosGraficos.txt',"Numero primo: " + numeroDecimal + " ->Numeros de unos:" + contadorUnos + "->Log. 2 : " + logaritmo2 + " -> Log. 10:" + logaritmo10 + "\n", (error)=>{
                if(error) console.log(`Error: ${error}`);
            });
            }
        }
        fs.appendFile('primos.txt', "}", (error)=>{
            if (error) console.log(`Error: ${error}`);
        });
        menu2();
    });
}


function aleatoria(){
    fs.createWriteStream('primos.txt');
    fs.createWriteStream('datosGraficos.txt');
    fs.appendFileSync('primos.txt', "U={\n", (error)=>{
        if (error) console.log(`Error: ${error}`);
    });
    let limite = Math.round(Math.random() * (1000000-0) + 0);
    console.log(`Límite: ${limite}`);
    let numeroDecimal;
    let numeroPrimo;
    let contadorUnos;
    for(numeroDecimal = 0; numeroDecimal < limite; numeroDecimal++){
        if(esPrimo(numeroDecimal)){
            numeroPrimo = numeroDecimal.toString(2);
            contadorUnos = contarUnos(numeroPrimo);
            fs.appendFileSync('primos.txt',"\tNúmero primo: " +numeroDecimal + "-> Binario: " + numeroPrimo +" -> No. de Unos: " + contadorUnos +"\n", (error)=>{
                if (error) console.log(`Error: ${error}`);
            });
            let logaritmo2 = Math.log2(contadorUnos);
            let logaritmo10 = Math.log10(contadorUnos);
            fs.appendFileSync('datosGraficos.txt',"Numero primo: " + numeroDecimal +  "->Numeros de unos:" + contadorUnos + "->Log. 2 : " + logaritmo2 + " -> Log. 10:" + logaritmo10 + "\n", (error)=>{
                if(error) console.log(`Error: ${error}`);
            });
        }
    }
    fs.appendFile('primos.txt', "}", (error)=>{
        if (error) console.log(`Error: ${error}`);
    });
    menu2();
}

function esPrimo(numeroDecimal){
    if (numeroDecimal == 0 || numeroDecimal == 1 || numeroDecimal == 4) return false;
	for (let x = 2; x < numeroDecimal / 2; x++) {
		if (numeroDecimal % x == 0) return false;
	}
	// Si no se pudo dividir por ninguno de los de arriba, sí es primo
	return true;
}


function contarUnos(numeroPrimo){
    let contador = 0;
    for(let i = 0; i < numeroPrimo.length; i++){
        if(numeroPrimo[i] == "1"){
            contador++;
        }
    }
    return contador;
}


