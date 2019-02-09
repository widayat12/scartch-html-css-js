"use strict"
var init = {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};

const myData = new Request("./data.json", init);
let mainObj = {};


fetch(myData)
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        mainObj = data;
    })
    .catch((err) => {
        console.log("error", err);
    });


function getPosts() {


    setTimeout(() => {
      let output = '';
      mainObj.forEach((data, index) => {

        function kFormatter(num) {
            return num > 999 ? (num/1000).toFixed(1) + 'k' : num
        }

        var price = data.price;
        var discount = data.discount;
        var afterDiscont = price - (price*discount/100);
        if (discount === 0) {
            price = `<div class="store2">
                    <span>${data.currency}${afterDiscont}</span>
                    </div>`
        } else {
            price = `<div class="store1"> 
                    <del>${data.currency}${price}</del>
                    <span>${data.currency}${afterDiscont}</span>
                    </div>`
        }

          output += `<div>
                        <div class="wrap">
                        <div class="card">
                            <div class="card-image">
                            <img src="./src/assets/images/${data.image}"alt="blank" style="width:100%; height: 300px;">
                            </div>
                        
                        <div class="container">
                            <h5>${data.title}</h5>
                                ${price}
                            <div class="item">
                                <ul>
                                    <li><a href="#" class"view"><img src="./src/assets/images/eye.svg"alt="blank">${kFormatter(data.views)}Views</a></li>
                                    <li><a href="#" class"like"><img src="./src/assets/images/love.svg"alt="blank">${data.likes}Likes</a></li>
                                    <li><a href="#" class"sold"><img src="./src/assets/images/check.svg"alt="blank" style="width: 20px">${data.sold}Sold</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                        </div>
                    </div>`
      });  
      document.body.innerHTML = output;
    }, 1000)
}

getPosts();