var template;

$(function() {
  var source = $("#parity-data-template").html();
  template = Handlebars.compile(source);
});

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
    data.odd_parity = 1 - data.even_parity;
    return data;
}

function showParityData(data){
    var html = template(data);
    $("#result-section").fadeOut(100, function() {
        $("#result-section").html(html).fadeIn('fast');
    });
}

function maxValueTest(input_num){
    if(parseInt(input_num) > 9007199254740992){
        throw 'Input number too large -- JavaScript suuuuccckksss!';
    } 
} 

function inputValueTest(input_num){
    if (input_num.match("^0b")){
        bin_num = input_num.slice(2);
        if(! /^[0|1]+$/.test(bin_num)){
            throw 'Invalid binary input value';
        }
    } else if (input_num.match("^0x")){
        bin_num = input_num.toString(2);
        if ( isNaN(bin_num) ){
            throw 'Invalid hex input value';
        }
    } else {
        bin_num = input_num.toString(2);
        if ( isNaN(bin_num) ){
            throw 'Invalid decimal input value';
        }
    }
}

$(function() {

    $("#input-box").keyup( function(event) {
        var input_num = $("#input-box").val();
        try{
            maxValueTest(input_num);
            inputValueTest(input_num);
            error = false;
        } catch (e) {
            error = e;
        } 
        $("#help-section").html(error).fadeIn('slow'); 
        $("#input-box-form").toggleClass("has-error",Boolean(error));
        $("#generate-button").prop('disabled',Boolean(error));
    });

    $("#input-box-form").submit( function(event) {
        event.preventDefault();
        var data = getParityData();
        showParityData(data);
    });

});
