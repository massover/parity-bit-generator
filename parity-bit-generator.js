function getParityData(){
    var data = {};
    data.input_num = $("#input-box").val();
    if (data.input_num.match("^0b")){
        data.bin_num = data.input_num.slice(2);
    } else {
        data.bin_num = parseInt(data.input_num).toString(2);
    }
    data.count_of_1s = data.bin_num.match(/1/g).length;
    data.even_parity = data.count_of_1s % 2;
    data.odd_parity = (data.count_of_1s + 1) % 2;
    return data;
}

function showParityData(data){
    var source = $("#parity-data-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    $("#result-section").html(html);
    $("#result-section").fadeIn('fast');
}

$("#input-box").bind('input',function(event) {
        $("#result-section").fadeOut('fast');
});

$("#input-box").keyup( function(event) {
    var input_num = $("#input-box").val();
    if (input_num.match("^0b")){
        bin_num = input_num.slice(2);
        if (!(/^[0|1]+$/.test(bin_num))){
            $("#input-box-form").addClass("has-error");   
            $("#generate-button").prop('disabled',true);
        } else {
            $("#input-box-form").removeClass("has-error"); 
            $("#generate-button").prop('disabled',false);
        }
    } else {
        bin_num = (+input_num).toString(2);
        if( input_num.length == 0 ){
            $("#input-box-form").addClass("has-error");
            $("#generate-button").prop('disabled',true);
        } else if (isNaN(bin_num)){
            $("#input-box-form").addClass("has-error");
            $("#generate-button").prop('disabled',true);
         
        } else {
            $("#input-box-form").removeClass("has-error"); 
            $("#generate-button").prop('disabled',false);
        }
    }
});

$("#input-box-form").submit( function(event) {
    event.preventDefault();
    var data = getParityData();
    showParityData(data);
});


