const puppeteer = require('puppeteer');

async function robo(){
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    let arroba = ''; //coloque o arroba que deseja aqui
    let url = `https://instagram.com/${arroba}`;
    await page.goto(url);
    
    //clica em seguidores
    await page.evaluate(() => {
        document.querySelectorAll('.-nal3')[1].click();
    });

    await page.waitFor(3000);

    //escolha a opcao 'logar com o facebook'
    await page.evaluate(() => {        
        document.querySelector(".KPnG0").click();
    });

    await page.waitFor(3000);

    //loga com o facebook
    await page.evaluate(() => {
        document.getElementById("email").value = ""; // email de uma conta bot para verificar os users (deve ser associada ao facebook)
        document.getElementById("pass").value = ""; // senha

        document.getElementById("loginbutton").click();
    });

    await page.waitFor(6000);

    //Clica em seguidores
    await page.evaluate(() => {
        document.querySelectorAll('.-nal3')[1].click();
    });

    await page.waitFor(3000);

    //faz o scroll de todos seguiidores
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.querySelector(".isgrP").scrollHeight;
                document.querySelector(".isgrP").scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        });
    });


    await page.waitFor(7000);

    //armazena seguidores no array 'seguidores'
    let seguidores = await page.evaluate(() => { 
        
        let nome = document.querySelectorAll('.FPmhX');
        let nomes = [];

        for (let i = 0; i < nome.length; i++) {
            nomes[i] = nome[i].title;
        }
        
        return nomes;
    });

    console.log("Seguidores:");
    console.log(seguidores);

    //fecha o modal
    await page.evaluate(() => {
        document.querySelectorAll(".wpO6b")[1].click();
    });

    await page.waitFor(2000);

    //clica no seguindo
    await page.evaluate(() => {
        document.querySelectorAll('.-nal3')[2].click();
    });
    
    //faz o scroll de todos seguindo
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.querySelector(".isgrP").scrollHeight;
                document.querySelector(".isgrP").scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 500);
        });
    });

    await page.waitFor(7000);

    //armazena seguindo no array 'seguindo'
    let seguindo = await page.evaluate(() => {     
        let nome = document.querySelectorAll('.FPmhX');
        let nomes = [];

        for (let i = 0; i < nome.length; i++) {
            nomes[i] = nome[i].title;
        }
        
        return nomes;      
    });

    console.log("Seguindo:");
    console.log(seguindo);

    for (let i = 0; i < seguindo.length; i++) {
        for (let j = 0; j < seguidores.length; j++) {
            if(seguindo[i] == seguidores[j]){
                seguindo[i] = null;
            }
        }

    }

    let cont = 0;

    console.log("Pessoas que não te seguem de volta:");
    console.log("");
    for(let i = 0; i < seguindo.length; i++){
        if(seguindo[i] != null){
            cont++;
            console.log(seguindo[i]);
        }
    }

    console.log(cont+" Pessoas não te seguem de volta");
 
    await page.screenshot({path: 'example3.png'});

    await browser.close(); 
}

robo();

