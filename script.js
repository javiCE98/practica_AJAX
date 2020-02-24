var buscar = document.querySelector('#buscar');
var resultado = document.querySelector('#resultado');
var categoria = document.getElementById("categoria");
var valor = document.getElementById("valor");
var id;
var limit = document.getElementById("limit");
var limite;
const maxPags=50;
var pag=1;
const focusActive=document.getElementsByClassName("active").focusActive;
const enlacesPaginas=document.getElementsByTagName("a");
var razaID;
var categoriasJSON_server="https://my-json-server.typicode.com/javiCE98/practica_AJAX_galeria_imagenes/categorias";


for(let x=0;x<enlacesPaginas.length;x++){
    // Si se pulsa el boton de algún enlace 
    enlacesPaginas[x].addEventListener("click",function(){
        // Si el contenido de Valor de 
        //alert("ENLACE CLICKEADO");
        if(valor.innerHTML>=1 && valor.innerHTML<=maxPags){
            if(enlacesPaginas[x].id=="principio"){
                //alert("BOTON PRINCIPIO");
                valor.innerHTML="1";
                valor.className="active";
            }
            else if(enlacesPaginas[x].id=="final"){
                //alert("BOTON FINAL");
                valor.innerHTML="50";
                valor.className="active";

            }   
            else if(enlacesPaginas[x].id=="anterior"){
                if(valor.innerHTML>1){
                    //alert("BOTON ANTERIOR");
                    valor.innerHTML =(parseInt(valor.innerHTML)-1);
                    valor.className= "active";
                }


            }
            else if(enlacesPaginas[x].id=="siguiente"){
                //alert("BOTON SIGUIENTE");
                //alert("funciono");
                //alert("simbolo: "+enlacesPaginas[x].innerHTML);
                valor.innerHTML=(parseInt(valor.innerHTML)+1);
                valor.className="active";
            }
        }


      
        obtenerDatos();

    });
}


buscar.addEventListener('click', function(){

    /*for(let i=0;i<categoria.length;i++){
        if(categoria.id==i){
            alert("Categoria id: "+i);
            id=i;
            //var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&category_ids="+id+"&page="+valor.innerHTML+"&breed_ids="+razaID;
        }
    }*/

    if(categoria.value=='hats') id=1;
    else if(categoria.value=='sunglasses') id=4;
    else if(categoria.value=='clothes') id=15;
    else if(categoria.value=='boxes') id=5;
    else if(categoria.value=='sinks') id=14;
    else if(categoria.value=='space') id=2;
    else if(categoria.value=='ties') id=7;
    else if(categoria.value=='none') id=0;
    
    document.getElementById("pags").style.display="block";
    var paginaElegida=pag;
    obtenerDatos();
});

window.addEventListener("load",function(){
    let url = `https://api.thecatapi.com/v1/breeds`;
    
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    
    api.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            let datos = JSON.parse(this.responseText);
            console.log(datos);
            

            
            for(let item of datos) {
                var option = document.createElement("option");
                option.value=item.id;
                option.id=item.id;
                option.innerHTML= item.name;
                document.getElementById("raza").appendChild(option);
            }


        }
    }
});

window.addEventListener("load",function(){
    //let url = `https://api.thecatapi.com/v1/categories`;
    let url="https://my-json-server.typicode.com/javiCE98/practica_AJAX_galeria_imagenes/db";

    
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    
    api.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            let datos = JSON.parse(this.responseText);
            console.log(datos);
            

            
            for(let item of datos) {
                var option = document.createElement("option");
                option.innerHTML= item.name;
                option.id=item.id;
                //alert("name: "+item.name+" id: "+item.id);
                categoria.appendChild(option);
            }

            for(let i=1;i<=8;i++){

                var option=document.createElement("option");
                option.innerHTML=i;
                option.setAttribute("value",i);
                document.getElementById("limit").appendChild(option);

            }

        }
    }
});



function obtenerDatos(){
    if(id!=0){
        //CATEGORIA CONCRETA ESCOGIDA
       //alert("Categoría seleccionada: "+categoria.value);
        razaID=document.getElementById("raza").value;
        if(limit.value!="none"){
                    if(razaID!="none"){
                        //alert("Categoria escogida,limite escogido y raza escogida");
                    for(let i=1;i<=8;i++){
                        if(limit.value==i){
                            limite=i;
                            alert("Limite: "+limite);
                            var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&category_ids="+id+"&page="+valor.innerHTML+"&breed_ids="+razaID;
                        }
                    }
                }

                else if(razaID=="none"){
                    //alert("Categoria escogida,limite escogido y todas las razas");
                    for(let i=1;i<=8;i++){
                        if(limit.value==i){
                            limite=i;
                            alert("Limite: "+limite);
                            var url = "https://api.thecatapi.com/v1/images/search?limit=+"+limite+"&category_ids="+id+"&page="+valor.innerHTML;
                        }
                    }
                }

        }

        else if(limit.value=="none"){
                    if(razaID!="none"){
                            //alert("Categoria escogida,limite random y raza escogida");
                            var random=Math.random() * (8 - 1) + 1;
                            
                            limite=Math.round(random);
                            //alert("Categoria: "+categoria.value);
                            //alert("Limite: "+limite);
                            //alert("Raza escogida: "+razaID);
                            //alert("Pagina: "+valor.innerHTML);
                            var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&category_ids="+id+"&page="+valor.innerHTML+"&breed_ids="+razaID;
                        
                        }

                        else if(razaID=="none"){
                            //alert("Categoria escogida,limite random y todas las razass");
                            var random=Math.random() * (8 - 1) + 1;
                            Math.round(random);
                            limite=random;
                            var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&category_ids="+id+"&page="+valor.innerHTML;
                        }

                    }
            }
            else if(id==0){

                //TODAS LAS CATEGORIAS ESCOGIDAS
                //alert("TODAS LAS CATEGORÍAS ESCOGIDAS");
                razaID=document.getElementById("raza").value;

                if(limit.value!="none"){
                            if(razaID!="none"){
                                //alert("Todas las categorias,limite escogido y raza escogida");
                            for(let i=1;i<=8;i++){
                                if(limit.value==i){
                                    limite=i;
                                    var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&page="+valor.innerHTML+"&breed_ids="+razaID;
                                }
                            }
                        }

                        else if(razaID=="none"){
                            //alert("Todas las categorías,limite escogido y todas las razas");
                            for(let i=1;i<=8;i++){
                                if(limit.value==i){
                                    limite=i;
                                    var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&page="+valor.innerHTML;
                                }
                            }
                        }

        }

        else if(limit.value=="none"){
            if(razaID!="none"){
                    //alert("Todas las categorias,limite random y raza escogida");
                    var random=Math.random() * (8 - 1) + 1;
                    Math.round(random);
                    limite=random;
                    var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&page="+valor.innerHTML+"&breed_ids="+razaID;
                
                }

                else if(razaID=="none"){
                    //alert("Todas las categorias,limite random y todas las razass");
                    var random=Math.random() * (8 - 1) + 1;
                    Math.round(random);
                    limite=random;
                    var url = "https://api.thecatapi.com/v1/images/search?limit="+limite+"&page="+valor.innerHTML;
                }

            }
        }
    return new Promise(function(resolve,reject){
    const api = new XMLHttpRequest();
    api.open('GET', url, true);
    api.send();
    
    api.onreadystatechange = function(){
        if (this.status == 200 && this.readyState == 4){
            

            let datos = JSON.parse(this.responseText);
            console.log(datos);
            
            resultado.innerHTML="";

            for(let item of datos) {                
                
                resultado.innerHTML += `<img width='300px' height='200px' src='${item.url}'>`;

            }
            resolve(resultado.innerHTML);
        }
        else{
            reject("ERROR: "+api.status);
        }
    }
});

var miPromesa=obtenerDatos();

miPromesa
.then(function correcto(){
    console.log("Imágenes cargadas de forma correcta");
})

.catch(function incorrecto(){
    console.log("Las imágenes no se han podido cargar");
})

}

