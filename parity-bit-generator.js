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

$(function() {

    $("#input-box").keyup( function(event) {
        var input_num = $("#input-box").val();
        if (input_num.match("^0b")){
            bin_num = input_num.slice(2);
            error = ! /^[0|1]+$/.test(bin_num);
        } else {
            bin_num = (input_num).toString(2);
            error = isNaN(bin_num);
        }
        $("#input-box-form").toggleClass("has-error",error);
        $("#generate-button").prop('disabled',error);
    });

    $("#input-box-form").submit( function(event) {
        event.preventDefault();
        var data = getParityData();
        showParityData(data);
    });

});
