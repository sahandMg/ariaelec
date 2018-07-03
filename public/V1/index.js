var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var productSearch ;
var productCategory ;
var productData = [];
var productPrice = 0;

process.argv.forEach(function (val, index, array) {
  // console.log(index + ': ' + val);
  if(index == 2) { productSearch  = val }
  if(index == 3) { productCategory  = val }
});
// var args1 = process.argv.slice(2);
// var args2 = process.argv.slice(3);
// console.log("args1 : " +args1);
// console.log("args2 : " +args2);

request("https://eshop.eca.ir/%D8%AC%D8%B3%D8%AA%D8%AC%D9%88?controller=search&orderby=position&orderway=desc&search_query="+productSearch+"&submit_search=", function(error, response, body) {
  if(error) { console.log("Error: " + error); }
  // console.log("Status code: " + response.statusCode);
  var $ = cheerio.load(body);

  $('.ajax_block_product div.right-block').each(function( index ) {
    // console.log("li : " +index);
    var tempProductName = $(this).find('.product-name').text().trim();
    // console.log("productName : " +tempProductName);
    // case insensetive
    tempProductName = tempProductName.toLowerCase();
    if( (tempProductName.includes(productSearch.toLowerCase())) ) {
       tempProductPrice = $(this).find('.product-price').text().trim();
      if(tempProductPrice != "") {
        var numb = tempProductPrice.match(/\d/g);
        numb = numb.join("");
        // console.log("productPrice accebtable : " + numb);
         productData.push({name: tempProductName,price: parseInt(numb)});
      }
    }


    // var score = $(this).find('div.score.unvoted').text().trim();
    // var user = $(this).find('a.author').text().trim();
    // console.log("Title: " + title);
    // console.log("Score: " + score);
    // console.log("User: " + user);
    // fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n');
  });
  // console.log("productData : " +productData.length);
  if(productData.length == 1)
  {
    // console.log("1 :");
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
   // && ()
   // if( (productPrice == 0) || (productPrice > tempProductPrice) ) {
   //   productPrice = tempProductPrice ;
   // }
});


//*[@id="center_column"]/div/div/ul/li[4]/div/div[2]/h5/a
