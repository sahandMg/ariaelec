var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var productSearch ;
var productCategory ;
var productData = [];
var productPrice = 0;

process.argv.forEach(function (val, index, array) {
  if(index == 2) { productSearch  = val }
  if(index == 3) { productCategory  = val }
});

request("https://eshop.eca.ir/%D8%AC%D8%B3%D8%AA%D8%AC%D9%88?controller=search&orderby=position&orderway=desc&search_query="+productSearch+"&submit_search=", function(error, response, body) {
  if(error) { console.log("Error: " + error); }
  var $ = cheerio.load(body);
  $('.ajax_block_product div.right-block').each(function( index ) {
    var tempProductName = $(this).find('.product-name').text().trim();
    tempProductName = tempProductName.toLowerCase();
    if( (tempProductName.includes(productSearch.toLowerCase())) ) {
       tempProductPrice = $(this).find('.product-price').text().trim();
      if(tempProductPrice != "") {
        var numb = tempProductPrice.match(/\d/g);
        numb = numb.join("");
         productData.push({name: tempProductName,price: parseInt(numb)});
      }
    }
  });
  if(productData.length == 1)
  {
    if(productData[0].name.includes(productCategory)) {
      productPrice = productData[0].price;
      console.log(productPrice);
    }
  } else if(productData.length > 1) {
    var min = productData[0].price;
    for(var i=1; i<productData.length; i++ ) {
        if(productData[i].price < min) {
          min = productData[i].price;
         }
    }
    productPrice = min;
    console.log(productPrice);
  } else {
    productPrice = 0;
    console.log("not found");
  }
});

