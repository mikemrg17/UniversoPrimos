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
    fs.appendFileSync('primos.txt', "U={\n", (error)=>{
        if (error) console.log(`Error: ${error}`);
    });
    rl.question('Por favor inserta un límite ', (limite) =>{
        let numeroDecimal;
        let banderaProceso;
        let numeroPrimo;
        for(numeroDecimal = 0; numeroDecimal < limite; numeroDecimal++){
            if(esPrimo(numeroDecimal)){
                numeroPrimo = numeroDecimal.toString(2);
                fs.appendFileSync('primos.txt',"\tNúmero primo: " +numeroDecimal + "-> Binario: " + numeroPrimo +"\n", (error)=>{
                    if (error) console.log(`Error: ${error}`);
                });
            }
            /*
            banderaProceso = proceso(numeroBinario, potencia);
            if(banderaProceso == 1){
                break;
            }else{
                continue;
            }*/
        }
        fs.appendFile('primos.txt', "}", (error)=>{
            if (error) console.log(`Error: ${error}`);
        });
        menu2();
    });
}


function aleatoria(){
    fs.createWriteStream('primos.txt');
    fs.appendFileSync('primos.txt', "U={\n", (error)=>{
        if (error) console.log(`Error: ${error}`);
    });
    let limite = Math.round(Math.random() * (100-0) + 0);
    console.log(`Límite: ${limite}`);
    let numeroDecimal;
    let numeroPrimo;
    //let banderaProceso;
    for(numeroDecimal = 0; numeroDecimal < limite; numeroDecimal++){
        if(esPrimo(numeroDecimal)){
            numeroPrimo = numeroDecimal.toString(2);
            fs.appendFileSync('primos.txt',"\tNúmero primo: " +numeroDecimal + "-> Binario: " + numeroPrimo +"\n", (error)=>{
                if (error) console.log(`Error: ${error}`);
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
