//Al cargar la pagina 
$(document).ready(function(){
    $('#vcontenido').load("vprincipal.html");
    $('#encabezado').html('<h3>Educación Financiera</h3>');
    limpiarformulario("#frmAprendeAinvertir");
    limpiarformulario("#frmAhorro");
    limpiarformulario("#frmCompara");
    //$('#example').DataTable();
    //new DataTable('#example');
    //new DataTable('#tblDetalleAmortizacion');
    
});

const formatter = new Intl.NumberFormat('es-MX', {
    style: 'currency',        
    currency: 'MXN' ,        
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    trailingZeroDisplay: 'stripIfInteger'
  });

const formateadorPorcentaje = new Intl.NumberFormat('es-MX', {
    style: 'percent',           
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });


/*resetar un formulario*/
function limpiarformulario(formulario){
   /* Se encarga de leer todas las etiquetas input del formulario*/
   $(formulario).find('input').each(function() {
      switch(this.type) {
         /*case 'password':
         case 'text':
         case 'hidden':
              $(this).val('');
              break;
         case 'checkbox':
         case 'radio':
              this.checked = false;*/
         case 'number':$(this).val(0);
         case 'text':$(this).val('');
      }      
   });
   $('#resultado').html('');
}


function esnulo(v){
    if(isNaN(v)){
         return 0;
    }else{
        return v;
    }
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    
    switch (tabName) {
        case "interactivo1":
            $('#inputIngresosFijos').focus();
          break;
        case "interactivo2":
            $('#monto').focus();
          break;
        case "interactivo3":
            $('#importe').focus();
          break;
          case "interactivo4":
            // $('#importe').focus();
            // precargarImagenes();
            //$('#memorama').load("memorama.html");
          break;
    }
    
  }

//Inicio
$(document).on("click","#inicio", function() {
//$("#inicio").on("click",function() {    
    $('#vcontenido').load("vprincipal.html");
    $('#encabezado').html('<h3>Educación y cultura financiera para la derechohabiencia del ISSSTE</h3>');    
});
    

 // culturaFinanciera
 $(document).on("click","#objCultura", function() {
    $('#vcontenido').load("culturaFinanciera.html", function(){
        getTblInstrumentoContenido();
    });
    $('#encabezado').html('<h3>Cultura Financiera</h3>');        
});



// contenidoInteractivo
$(document).on("click","#objInteractivo,#ingresoYgastos, #comparativo, #ahorro", function() {
    var modulo = $(this).attr('id');
    //console.log("hice click en "+modulo);
    $('#vcontenido').load("contenidoInteractivo.html",function() {
        $("#tabsInteractivo").tabs({
            show: { effect: "blind", direction: "right", duration: 300 }
        });//tabsInteractivo
        
        //console.log("sigo aqui "+modulo);

        // Get the element with id="defaultOpen" and click on it        
        if(modulo == 'ingresoYgastos'){
            document.getElementById("tab1").click();
        }else  if(modulo == 'ahorro'){
                    document.getElementById("tab2").click();
                }else  if(modulo == 'comparativo'){
                    document.getElementById("tab3").click();
                        }else{
                                    document.getElementById("tab1").click();
                                }
       
        
        
        $("#calcularSalud").on("click", function() {
            //alert( "Handler for `submit` called." );
            var totalIngresos = 0.0;
            var totalGastos = 0.0;
            var ahorro = 0.0;
            var meQueda = 0.0;
            var html = '';  
            var html_msj = '';       

            var totalIngresos = esnulo(parseInt($('#inputIngresosFijos').val())) + esnulo(parseInt($('#inputOtrosIngresos').val()));            
            var totalGastos = esnulo(parseInt($('#inputAlimentacion').val())) + esnulo(parseInt($('#inputVivienda').val())) + esnulo(parseInt($('#inputVestidoCalzado').val()))
                            + esnulo(parseInt($('#inputLimpiezaHogar').val())) + esnulo(parseInt($('#inputSalud').val())) + esnulo(parseInt($('#inputTransporte').val())) 
                            + esnulo(parseInt($('#inputEducacion').val())) + esnulo(parseInt($('#inputCuidadoPersonal').val())) + esnulo(parseInt($('#inputOtrosGastos').val()));
            var ahorro = esnulo(parseInt($('#inputAhorro').val()));
            var meQueda = totalIngresos-ahorro-totalGastos;
            
            $("#inputTotalIngresos").val(formatter.format(totalIngresos));
            $("#inputTotalGastos").val(formatter.format(totalGastos));
            $("#inputMeQueda").val(formatter.format(meQueda));
            console.log("totalIngresos"+totalIngresos);
            if(totalIngresos > 0){
                if(meQueda >= (totalIngresos*10/100) ){
                    //verde
                    html_msj = '<div class="alert alert-success" role="alert"> Tu disponible para invertir y/o ahorrar es de '+formatter.format(meQueda)+', revisa la sección \'Ahorra para generar rendimientos\'.</div>';
                }else
                    if(meQueda >= 0 && meQueda < (totalIngresos*10/100) ){
                        //amarillo
                        html_msj = '<div class="alert alert-warning" role="alert"> Tu disponible es de '+formatter.format(meQueda)+', que es menor al porcentaje recomendado por expertos financieros y la tendencia general de ahorrar al menos un 10% de tus ingresos para alcanzar tus objetivos financieros.</div>';
                    }else{
                        //rojo
                        html_msj = '<div class="alert alert-danger" role="alert"> Gastas más de lo que ganas ('+formatter.format(meQueda)+'), te recomendamos revisar la sección \'Conoce tus ingresos y gastos para determinar tu presupuesto personal\'.</div>';
                        //$('#iconoRespuestaApredeInvertir').html('<br><i class="fa fa-thumbs-o-down fa-5x" style="color:red;" aria-hidden="true"></i><label for="lblerror"></label>');
                    }
            }else{
                html_msj ='<div class="alert alert-info" role="alert"> Debe indicar sus ingresos </div>';
            }
            html = '<fieldset><legend>Resultado</legend>' + 
                        html_msj +
                    '</fieldset>';
            $('#resultado').html(html);

          });  //frmAprendeAinvertir



          $("#calcularRendimiento, #ahorro").on("click", function() {
            var monto = 0.0;
            var periodicidad = 0;
            var tiempo = 0;
            $('#resultadoRendimiento').html('');

            monto = esnulo(parseFloat($('#monto').val()));
            periodicidad = esnulo(parseInt($('#periodicidad').val()));
            tiempo = esnulo(parseInt($('#tiempo').val()));
            
            if(monto == 0 || periodicidad == 0 || tiempo == 0){                
                $('#resultadoRendimiento').html('<div class="alert alert-info" role="alert"> Debe indicar el monto del ahorro, la periodicidad y el tiempo de inversión</div>');
            }else{
                $('#mmessage').html('Monto del ahorro: <strong>'+formatter.format(monto)+'</strong>   |   Periodicidad: <strong>'+plazo+'</strong>  |   Tiempo de inversión: <strong>'+tiempo+' Años');
                gananciaAnualTotal(monto,periodicidad,tiempo);  
            }
          });  //frmCompara


        $("#calcularComparativo").on("click", function() {
            //alert( "Handler for `submit` called." );
            var imp = 0.0;
            var plazo = 0;
            var FormaPago = '';
            
            $('#resultadoCompara').html('');

            imp = esnulo(parseFloat($('#importe').val()));
            plazo = esnulo(parseInt($('#plazo').val()));
            FormaPago = $('input[name="formaPago"]:checked').val();
            
            if(imp == 0 || plazo == 0){                
                $('#resultadoCompara').html('<div class="alert alert-info" role="alert"> Debe indicar el monto del crédito y el plazo </div>');
            }else{                
                $('#mmessage').html('Importe del crédito: <strong>'+formatter.format(imp)+'</strong>   |   Plazo '+FormaPago+': <strong>'+plazo+'</strong>');
                
                //$('#fPago').html('<th scope="col"> Descuento '+FormaPago+'</th>');
                //alert( imp);
                ISSSTECompara(imp,plazo,FormaPago);  
            }
            //event.preventDefault();
          });  //frmCompara
          
          $("#calcularComparativo").on("click", function() {
            
          });  //frmCompara

    });//vcontenido load
    $('#encabezado').html('<h3>Contenido interactivo</h3>');
});



// boletinNumeralia
$(document).on("click","#objBoletin", function() {
    $('#vcontenido').load("boletinesNumeralia.html", function(){
        visualizarBoletines();
    });
    $('#encabezado').html('<h3>Boletines y numeralia</h3>');
});

 

 function updateIngresos(valor) {
      var totalIngresos = 0.0;
      var ingresosFijos = esnulo(parseFloat($('#inputIngresosFijos').val()));
      var otrosIngresos = esnulo(parseFloat($('#inputOtrosIngresos').val()));
      totalIngresos = ingresosFijos + otrosIngresos;
      $('#inputTotalIngresos').val(totalIngresos);
    }


 function updateGastos(valor) {
      var totalGastos = 0.0;
      
      var alimento = esnulo(parseFloat($('#inputAlimentacion').val()));
      var vivienda = esnulo(parseFloat($('#inputVivienda').val()));
      var vestidoCalzado = esnulo(parseFloat($('#inputVestidoCalzado').val()));

      var limpiezaHogar = esnulo(parseFloat($('#inputLimpiezaHogar').val()));      
      var salud = esnulo(parseFloat($('#inputSalud').val()));
      var educacion = esnulo(parseFloat($('#inputUEducacion').val()));

      var transporte = esnulo(parseFloat($('#inputTransporte').val()));
      var cuidadoPersonal = esnulo(parseFloat($('#inputCuidadoPersonal').val()));
      var otrosGastos = esnulo(parseFloat($('#inputOtrosGastos').val()));

      totalGastos = alimento + vivienda + vestidoCalzado + limpiezaHogar + salud + educacion + transporte + cuidadoPersonal + otrosGastos;
      $('#inputTotalGastos').val(totalGastos);
    }




function visualizarBoletines(){
    $.ajax({
        url : "txt/boletines.txt",
       dataType: "text",
       success : function (data) {
                // Separar por salto de línea
                const lines = data.split("\n");
    
                // Recorrer todas las líneas
                var html_artPrincipal='';
                var html_art2y3 ='';
                var html_hist = '';
                var i = 1;
                lines.forEach(line => {
                    // Separar datos:
                    // .split() es para separar
                    // .map() es para recorrer el nuevo arreglo
                    // .trim() elimina espacios al inicio y final
                    const datos = line.split("\|", 6).map(a => a.trim());
                    
                    if(datos[0]!=''){
                        var resumen = datos[4];
                        if (i==1){                        
                       /* html_artPrincipal = '<h2 class="display-4 fst-italic">'+datos[1]+'</h2>'+
                                '<p class="lead my-3">'+datos[4]+'</p>'+
                                '<p class="lead mb-0"><a href="#" onclick="openPDFView(\''+datos[5]+'\',\''+datos[1]+'\');return false;" class="text-body-emphasis fw-bold">Continuar leyendo...</a> </p>'+
                                '<em class="blog-post-meta" style="align-content: end; font-size: 14px;">'+datos[2]+' por '+datos[3]+'</em>';*/
                          html_artPrincipal = '<h4>'+datos[1]+'</h4>'+
                                              '<blockquote class="blockquote">'+
                                                '<p class="mb-0" style="font-size: 18px;">'+resumen.substring(0,400)+'...</p>'+
                                                '<p class="lead mb-0" style="font-size: 18px; text-align: right" ><a href="#" onclick="openPDFView(\''+datos[5]+'\',\''+datos[1]+'\');return false;" >Continuar leyendo...</a> </p>'+
                                                '<footer class="blockquote-footer">'+'<cite>'+datos[3]+'</cite></footer>'+
                                              '</blockquote>';  
                        }else if(i<4){                        
                        /*html_art2y3 += '<h4 class="display-5 link-body-emphasis mb-1"><a href="#" onclick="openPDFView(\''+datos[5]+'\',\''+datos[1]+'\');return false;">'+datos[1]+'</a></h4>'+
                                '<em class="blog-post-meta" style="font-size: 12px;">'+datos[2]+' por '+datos[3]+'</em>  '+
                                '<p>'+datos[4]+'</p><hr>';  */    
                             html_art2y3 += '<h5><a href="#" onclick="openPDFView(\''+datos[5]+'\',\''+datos[1]+'\');return false;">'+datos[1]+'</a></h5>'+
                                          '<blockquote class="blockquote">'+
                                            '<p class="mb-0" style="font-size: 12px;">'+resumen.substring(0,300)+'...</p>'+
                                            //'<em class="blog-post-meta" style="font-size: 10px;">'+datos[3]+'</em>  '+
                                            '<footer class="blockquote-footer" style="font-size: 10px;">'+'<cite>'+datos[3]+'</cite></footer>'+
                                          '</blockquote>';  
                        }else if(i<4){                      
                        }else {
                            //guardar en "historicos"
                            html_hist += '<li>'+
                                    '<h5 class="display-5 link-body-emphasis mb-1"><a href="#" onclick="openPDFView(\''+datos[5]+'\',\''+datos[1]+'\');return false;">'+datos[1]+'</a></h5>'+
                                    '<em class="blog-post-meta">'+datos[3]+'</em>'+                                
                                '</li>';
                        }
                       i++;
                    }
                });
                $('#boletinPrincipal').html(html_artPrincipal);
                $('#boletinesSecundarios').html(html_art2y3);
                $('#boletinesHist').html(html_hist);
       }
     });

/*
    //idBoletin|Titulo|Fecha creción|Autor|Resumen|PDF articulo
    let data = `1 |titulo 1|   26/02/2024       |Francisco|Resumen del articulo 1            |nombre del PDF 1 
    2 |titulo 2|   27/02/2024       |Javier|Resumen del articulo 2             |nombre del PDF 2`;
    
    // Separar por salto de línea
    const lines = data.split("\n");
    
    // Recorrer todas las líneas
    var html='';
    lines.forEach(line => {
        // Separar datos:
        // .split() es para separar
        // .map() es para recorrer el nuevo arreglo
        // .trim() elimina espacios al inicio y final
        const datos = line.split("\|", 5).map(a => a.trim());
    
        html +='<h3>Boletin '+datos[0]+' del '+datos[1]+'</h3>'+
                    '<hr class="red">'+
                    '<p>'+datos[3]+'</p>'+
                    '<h6> Descargar articulo '+datos[4]+'</h6>'
                
    
        console.log(datos);
    });
  
    return html;
    */
}//visualizarBoletines



function openPDFView(nombreArchivo, tituloBoletin){
    //window.open("/pdfs/"+nombreArchivo,"_blank");
    //alert(nombreArchivo);
    var html = '';
    html = '<center><em style="font-size: 18px;">'+tituloBoletin+'</em></center>'+
               '<embed src="./pdfs/'+nombreArchivo+'" type="application/pdf" width="100%" height="600px"></embed>';
    $('#boletinPrincipalView').html(html);
}



function ISSSTECompara(capital,plazo,formaPago){
    $.ajax({
        url : "./txt/bancos.txt",
       dataType: "text",
       success : function (data) {
                // Separar por salto de línea
                const lines = data.split("\n");
    
                // Recorrer todas las líneas
                var html_tabla=''; 
                var html_th_tbl = '';
                var tasa_mesQna=0;
                var total_pagar=0;
                var descuento_mesQna=0;

                html_th_tbl = '<tr>'+
                                  '<th>Institución</th>'+
                                  '<th>Tasa de interés anual</th>'+
                                  '<th>Pago '+formaPago+'</th>'+
                                  '<th>Total a pagar</th>'+
                                  '<th>Tabla de amortización</th>'+
                              '</tr>'

                /*console.log('capital',capital);
                console.log('plazo',plazo);
                console.log('forma de pago',formaPago);*/

                lines.forEach(line => {
                    // Separar datos:
                    // .split() es para separar
                    // .map() es para recorrer el nuevo arreglo
                    // .trim() elimina espacios al inicio y final
                    const datos = line.split("\|", 2).map(a => a.trim());

                    if(datos[0]!=''){
                            if(formaPago == 'Mensual')
                               tasa_mesQna = (esnulo(parseFloat(datos[1]))/12)/100;
                            else
                               tasa_mesQna = (esnulo(parseFloat(datos[1]))/24)/100;

                            descuento_mesQna = (capital*tasa_mesQna)/(1-(Math.pow(1+tasa_mesQna,-plazo)));
                            total_pagar = descuento_mesQna * plazo;                    
                            /*console.log('Banco',datos[0]);
                            console.log('tasa anual',datos[1]);
                            console.log('tasa mesQna',tasa_mesQna);
                            console.log('desc mesQna', descuento_mesQna);
                            console.log('total a pagar', total_pagar);

                            console.log('C3*C5', capital*tasa_mesQna);
                            console.log('(1+tasa_mesQna)', 1+tasa_mesQna);
                            console.log('(1+tasa_mesQna)^-36', Math.pow(1+tasa_mesQna,-36));
                            console.log('(capital*tasa_mesQna)/(1-(1+tasa_mesQna)^-36)', total_pagar);
                            */
                            html_tabla +='<tr>'+
                                        '<th scope="row">'+datos[0]+'</th>'+
                                        '<td>'+datos[1]+' %</td>'+
                                        '<td>'+formatter.format(descuento_mesQna)+'</td>'+
                                        '<td>'+formatter.format(total_pagar)+'</td>'+                                
                                        '<td ><a href="#" title="Tabla de amortización" data-toggle="modal" data-target="#tblAmort" onclick="tablaAmortizacion('+capital+','+tasa_mesQna+','+descuento_mesQna+');"> ver tabla</a></td>';
                                    '</tr>';
                    }
                });
                $('#theadTblCompara').html(html_th_tbl);
                $('#bancos').html(html_tabla);
                $('#fPagoAmortizacion').html('Pago '+formaPago);

       }
     });
}

function tablaAmortizacion(capital,tasa_mesQna,descuento_mesQna){
    var pagoCapital = 0.0;
    var interesPeriodo = 0.0;
    var ivaPeriodo = 0.0;    
    var saldoInsoluto = 0.0;
    var html='';
    var interes = 0.0;
    
    saldoInsoluto = capital;    
    var i=0;
    while (saldoInsoluto > 0 ){       
        if(i==0){
            html +='<tr>'+
                        '<td>&nbsp;</td>'+
                        '<td>&nbsp;</td>'+
                        '<td>&nbsp;</td>'+
                        '<td>&nbsp;</td>'+
                        '<td>'+formatter.format(saldoInsoluto)+'</td>'+                        
                    '</tr>'; 
        }else{
            interesPeriodo = saldoInsoluto*tasa_mesQna;
            pagoCapital = descuento_mesQna-interesPeriodo;
            ivaPeriodo = interesPeriodo*.016;

            html +='<tr>'+
                        '<th scope="row">'+i+'</th>'+
                        '<td>'+formatter.format(pagoCapital)+'</td>'+
                        '<td>'+formatter.format(interesPeriodo)+'</td>'+
                        '<td>'+formatter.format(descuento_mesQna)+'</td>'+
                        '<td>'+formatter.format(saldoInsoluto)+'</td>'+                        
                    '</tr>'; 
            saldoInsoluto = saldoInsoluto - pagoCapital;
        }        
        i=i+1;
    }
    $('#tblAmortizacion').html(html);
    //return true;
}

function gananciaAnualTotal(monto,periodicidad,tiempo){
    $.ajax({
        url : "./txt/instrumentos.txt",
       dataType: "text",
       success : function (data) {
                const lines = data.split("\n");
                var html_th_tbl=''; 
                var html_tabla='';
                var tasaInteres=0;
                var rendimiento=0;
                var rendimientoTotal=0;
                var montoTotal=0;
                var interesBruto=0;
                var isr=0;
                var interesNeto=0;

                html_th_tbl = '<tr>'+
                                  '<th>Instrumento</th>'+
                                  '<th>Tasa de interés</th>'+
                                  '<th>Rendimiento</th>'+
                                  '<th>Monto total</th>'+
                            '</tr>'

                lines.forEach(line => {
                    const datos = line.split("\|",2).map(a => a.trim());
                    if(datos[0]!=''){
                        montoTotal=monto;
                        tasaInteres = (esnulo(parseFloat(datos[1]))/100);
                        rendimientoTotal=0;

                        for(var j=0; j<tiempo; j++){
                            for(var i=0; i<(360/periodicidad); i++){
                                if("CETES".localeCompare(datos[0])==0){
                                    interesBruto=(montoTotal*tasaInteres*periodicidad/360);
                                    isr=(montoTotal*0.005*periodicidad)/360;
                                    interesNeto=interesBruto-isr;
                                    montoTotal=montoTotal+interesNeto;
                                    rendimientoTotal=rendimientoTotal+interesNeto;
                                }else{
                                    rendimiento = (montoTotal*tasaInteres*periodicidad/360);
                                    montoTotal = montoTotal+rendimiento;
                                    rendimientoTotal=rendimientoTotal+rendimiento;
                                }
                            }    
                        }           

                        html_tabla +='<tr>'+
                                        '<th scope="row">'+datos[0]+'</th>'+
                                        '<td>'+formateadorPorcentaje.format(datos[1]/100)+'</td>'+
                                        '<td>'+formatter.format(rendimientoTotal)+'</td>'+   
                                        '<td>'+formatter.format(montoTotal)+'</td>'+                             
                                    '</tr>';
                    }
                });
                
                $('#theadTblRendimiento').html(html_th_tbl);
                $('#instrumentos').html(html_tabla);

       }
     });
}


$(function(){
  $('.solo-numeros').keypress(function(e) {
    if(isNaN(this.value + String.fromCharCode(e.charCode))) 
     return false;
  })
  .on("cut copy paste",function(e){
    e.preventDefault();
  });
});


function validaNumericos(event) {
    if(event.charCode >= 48 && event.charCode <= 57){
      return true;
     }
     return false;        
}


function getTblInstrumentoContenido(){
    //alert("entre");
    $.ajax({
        url : "./txt/instrumentos.txt",
       dataType: "text",
       success : function (data) {
                // Separar por salto de línea
                const lines = data.split("\n");
    
                // Recorrer todas las líneas
                var html_tabla=''; 
                var html_th_tbl = '';
                var i=1;
                //console.log("Entre encabezado");
                html_th_tbl = '<tr>'+
                                  '<th>Institución</th>'+
                                  '<th>Tasa de interés</th>'+                                
                              '</tr>';

                lines.forEach(line => {
                    // Separar datos:
                    // .split() es para separar
                    // .map() es para recorrer el nuevo arreglo
                    // .trim() elimina espacios al inicio y final
                    const datos = line.split("\|", 2).map(a => a.trim());
                    //console.log("Entre cuerpo "+datos[0]+' |'+datos[1]); 
                    if(i>5){
                        return;
                    }else{
                        if(datos[0]!=''){
                            html_tabla +='<tr>'+
                                            '<td>'+datos[0]+'</td>'+
                                            '<td>'+datos[1]+' %</td>'+
                                        '</tr>';        
                        }
                    }
                    i++;        
                });
                $('#theadTblRendimientoCont').html(html_th_tbl);                
                $('#instrumentosCont').html(html_tabla);
       }
     });
}