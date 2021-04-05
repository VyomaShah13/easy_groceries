//main.js
$(document).foundation();

// update cart on click
let myCart = {};
let myProducts = {};
let transaction_code = "";
let userId = "-1";

Object.size = function (obj) {
    let size = 0,
        key, value = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
        if (obj.hasOwnProperty(key)) value = value + obj[key];
    }
    return size;
};

function productContentView(item) {
    let id = item.id;
    let upc = item.upc;
    let brand = item.brand;
    let product_name = item.product_name;
    let product_description = item.product_description;
    let avg_price = item.avg_price;
    let category_name = item.category_name;
    let department_name = item.department_name;
    let department_search = item.department_search;
    let image_path = item.image_path;
    let content = `<div class="cell large-3 small-12 product-card">
                                    <div class="no-border text-center product-box">
                                        <div class="product-img"><img src="${image_path}" alt="${product_name}" /></div>
                                        <div class="product-cat">${brand}</div>
                                        <div class="product-name">${product_name}</div>
                                        <div class="product-desc modal-container">
                                            <p>${product_description}</p>
                                            <input class="modal-active" id="product-${id}" type="checkbox">
                                            <label class="modal-btn has-tip" for="product-${id}">Read more</label> 
                                            <label class="modal-backdrop" for="product-${id}"></label>
                                            <div class="modal-content">
                                                <label class="modal-close" for="product-${id}">&#x2715;</label>
                                                <div class="product-img"><img src="${image_path}" alt="${product_name}" /></div>
                                                <div class="product-cat">${brand}</div>
                                                <div class="product-name">${product_name}</div>
                                                <p class="product-desc">${product_description}</p>   
                                            </div>  
                                        </div>
                                        
                                        <div class="product-price">$${avg_price}</div>
                                        <div class="product-action grid-x grid-margin-x">
                                            <div class="cell small-5 large-5 align-middle">
                                                <div class="quantity">
                                                    <span class=" input-text qty product-quantity" id="quantity_${id}">1</span> 
                                                    <div class="quantity-control">
                                                        <span class="product-plus plus" data-id="${id}"> + </span> 
                                                        <span class="product-minus minus" data-id="${id}"> - </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cell small-7 large-7 align-middle"><input type="button" data-id="${id}" class="product-add-cart add-to-cart btn-primary" value="ADD TO CART"></div>
                                        </div>
                                    </div>
                                </div>`;
    return content;
}

function randomProductContentView(item) {
    let id = item.id;
    let upc = item.upc;
    let brand = item.brand;
    let product_name = item.product_name;
    let product_description = item.product_description;
    let avg_price = item.avg_price;
    let category_name = item.category_name;
    let department_name = item.department_name;
    let department_search = item.department_search;
    let image_path = item.image_path;
    let content = `<div class="cell large-3 small-12">
                                    <div class="no-border text-center product-box">
                                        <div class="product-img"><img src="${image_path}" alt="${product_name}" /></div>
                                        <div class="product-cat">${brand}</div>
                                        <div class="product-name">${product_name}</div>
                                        <div class="product-desc modal-container">
                                            <p>${product_description}</p>
                                            <input class="modal-active" id="product-${id}" type="checkbox">
                                            <label class="modal-btn has-tip" for="product-${id}">Read more</label> 
                                            <label class="modal-backdrop" for="product-${id}"></label>
                                            <div class="modal-content">
                                                <label class="modal-close" for="product-${id}">&#x2715;</label>
                                                <div class="product-img"><img src="${image_path}" alt="${product_name}" /></div>
                                                <div class="product-cat">${brand}</div>
                                                <div class="product-name">${product_name}</div>
                                                <p class="product-desc">${product_description}</p>   
                                            </div>  
                                        </div>
                                        
                                        <div class="product-price">$${avg_price}</div>
                                        <div class="product-action grid-x grid-margin-x">
                                            <div class="cell small-5 large-5 align-middle">
                                                <div class="quantity">
                                                    <span class=" input-text qty product-quantity" id="quantity_${id}">1</span> 
                                                    <div class="quantity-control">
                                                        <span class="product-plus plus" data-id="${id}"> + </span> 
                                                        <span class="product-minus minus" data-id="${id}"> - </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="cell small-7 large-7 align-middle"><input type="button" data-id="${id}" class="product-add-cart add-to-cart btn-primary" value="ADD TO CART"></div>
                                        </div>
                                    </div>
                                </div>`;
    return content;
}

function getSplash() {
    $(".search-input").val("");
    $(".search_results").html("");
    $(".hideAll").hide();
    // call products XHR
    let getProductsRandom = $.ajax({
        url: "services/get_products_random.php",
        type: "POST",
        dataType: "json"
    });

    getProductsRandom.done(
        function (data) {
            if (data.error.id != 0) {
                alert(data.error.message);
            } else {
                let content = "";
                $.each(data.products, function (i, item) {
                    content += randomProductContentView(item);
                });
                // output to a div
                $(".favourite-products").html(content);

            }
        }
    );

    getProductsRandom.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getProductsRandom)" +
            textStatus);
    });

    // Populate splash div
    $(".splash").show();
    $('.hero').slick('setPosition').slick();
}

function getDepartmentMenu() {

    let getDepartments = $.ajax({
        url: "services/get_departments.php",
        type: "POST",
        dataType: "json"
    });


    getDepartments.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getDepartments)" +
            textStatus);
    });

    getDepartments.done(
        function (data) {


            if (data.error.id != 0) {
                alert(data.error.message);
            } else {

                let content = "";

                $.each(data.departments, function (i, item) {
                    let department_id = item.id;
                    let department_name = item.name;

                    content += `<div class="department-item" data-id="${department_id}">${department_name}</div>`;
                    //console.log(name_last);

                });

                $(".department-inner").html(content);

            }
        }
    );
}

function getProducts(department_id) {
    $(".search-input").val("");
    $(".search_results").html("");
    $(".hideAll").hide();
    // call products by department XHR
    // Populate products div
    let getProducts = $.ajax({
        url: "services/get_products_by_department.php",
        type: "POST",
        data: {
            department_id: department_id
        },
        dataType: "json"
    });


    getProducts.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getProducts)" +
            textStatus);
    });

    getProducts.done(
        function (data) {


            if (data.error.id != 0) {
                alert(data.error.message);
            } else {
                $(".dept_name").html(data.department_search);
                let content = "";

                $.each(data.products, function (i, item) {
                    content += productContentView(item);
                    //console.log(name_last);
                });
                content += `<p class="loadMoreContainer"><span class="button btn-primary bg-green" id="loadMore">Load More</span></p>`;

                $(".show-products").html(content);
                let numItems = $('.product-card').length;
                if(numItems > 8){
                    $('.loadMoreContainer').show();
                } else {
                    $('.loadMoreContainer').hide();
                }
                $(".product-card").slice(0, 8).show();
            }
        }
    );
    $(".products").show();
}

function getSearch(search){
    $(".hideAll").hide();
    let getProducts = $.ajax({
        url: "services/get_products_by_search.php",
        type: "POST",
        data: {
            search: search
        },
        dataType: "json"
    });


    getProducts.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getProducts)" +
            textStatus);
    });

    getProducts.done(
        function (data) {


            if (data.error.id != 0) {
                alert(data.error.message);
            } else {
                $(".dept_name").html(data.department_search);
                let content = "";

                $.each(data.products, function (i, item) {
                    content += productContentView(item);
                    //console.log(name_last);
                });
                content += `<p class="loadMoreContainer"><span class="button btn-primary bg-green" id="loadMore">Load More</span></p>`;

                $(".show-products").html(content);
                let numItems = $('.product-card').length;
                if(numItems > 6){
                    $('.loadMoreContainer').show();
                } else {
                    $('.loadMoreContainer').hide();
                }
                $(".product-card").slice(0, 8).show();
            }
        }
    );
    $(".products").show();
}

function buildCart() {
    let size = Object.size(myCart);
    $(".cart-items").html(size);

    let content = `<thead>
                        <tr>
                            <th width="100"></th>
                            <th width="150">
                                Product Image
                            </th>
                            <th width="450">
                                Product Name
                            </th>
                            <th class="text-center">
                                Quantity
                            </th>
                            <th class="text-right">
                                Unit Price
                            </th>
                            <th class="text-right">
                                Total Price 
                            </th>
                        </tr>
                    </thead>`;
    let subTotal = 0.00;
    let subTotalTaxable = 0.00;
    let item_number = 1;
    $.each(myProducts, function (i, item) {
        let id = item.id;
        let upc = item.upc;
        let product_name = item.product_name;
        let product_description = item.product_description;
        let avg_price = item.avg_price;
        let category_name = item.category_name;
        let quantity = item.quantity;
        let image_path = item.image_path;
        let extPrice = parseInt(quantity) * parseFloat(avg_price);
        let finalPrice = extPrice.toFixed(2);

        let taxable = item.taxable;
        content += `<tr>
                        <td class="cart-product-remove" data-title="Remove">
                            <span class="delete-item" data-id="${id}">X</span>
                        </td>
                        <td class="product-cart-img" data-title="Product Image">
                            <div class="small-img"><img src="${image_path}" alt="${product_name}" /></div>
                        </td>
                        <td class="cart-product-name" data-title="Product Name">
                            <div>${product_name}</div>
                        </td>
                        <td class="cart-product-quantity text-center" data-title="Quantity">
                            <div class="quantity">
                                <span class=" input-text qty cart-quantity" id="cart_quantity_${id}">${quantity}</span> 
                                <div class="quantity-control">
                                    <span class="cart-plus plus" data-id="${id}"> + </span> 
                                    <span class="cart-minus minus" data-id="${id}"> - </span>
                                </div>
                            </div>
                        </td>
                        <td class="cart-product-price text-right" data-title="Unit Price">
                            $${avg_price}
                        </td>
                        <td class="cart-total-price text-right" data-title="Total Price">
                            $${finalPrice}
                        </td>
                    </tr>`;
        if (taxable == "1") {
            subTotalTaxable = subTotalTaxable + extPrice;
        }
        subTotal = subTotal + extPrice;
    });

    let subTotal_float = subTotal.toFixed(2);
    let hst = subTotal * 0.13;
    let hst_float = hst.toFixed(2);
    let cartTotal = subTotal + hst;
    let cartTotal_float = cartTotal.toFixed(2);
    content1 = `<tbody>
                <tr class="cart-subtotal">
                    <td class="text-left">Subtotal</td>
                    <td class="text-right">$${subTotal_float}</td>
                </tr>
                <tr class="tex">
                    <td class="text-left">HST</td>
                    <td class="text-right">$${hst_float}</td>
                </tr>
                <tr class="order-total">
                    <td class="text-left">Total</td>
                    <td class="text-right">$${cartTotal_float}</td>
                </tr>
                </tbody>`;
    $(".checkout-cart").html(content1);
    $(".cart-container").html(content);
}

function getCart() {
    $(".search-input").val("");
    $(".search_results").html("");

    if (Object.size(myCart) > 0) {
        $(".hideAll").hide();
        // call cart XHR

        let json = JSON.stringify(myCart);
        let getCart = $.ajax({
            url: "services/get_products_by_cart.php",
            type: "POST",
            data: {
                json: json
            },
            dataType: "json"
        });
        getCart.fail(function (jqXHR, textStatus) {
            alert("Something went Wrong! (getCart)" +
                textStatus);
        });

        getCart.done(
            function (data) {


                if (data.error.id != 0) {
                    alert(data.error.message);
                } else {
                    myProducts = data.products;
                    buildCart();
                    // Populate cart div
                    $(".cart").show();

                }
            }
        );
    }
}


function loginAccount(email, password) {
    let getLoginAccount = $.ajax({
        url: "services/login_account.php",
        type: "POST",
        data: {
            email: email,
            password: password
        },
        dataType: "json"
    });

    getLoginAccount.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getDepartments)" +
            textStatus);
    });

    getLoginAccount.done(
        function (data) {
            if (data.error.id != 0) {
                alert(data.error.message);
            } else {
                $("#billing-name-first").val(data.billing_name_first);
                $("#billing-name-last").val(data.billing_name_last);
                $("#billing-address").val(data.billing_address);
                $("#billing-city").val(data.billing_city);
                $("#billing-province").val(data.billing_province);
                $("#billing-postal-code").val(data.billing_postal_code);
                $("#billing-phone").val(data.billing_phone);

                $("#shipping-name-first").val(data.shipping_name_first);
                $("#shipping-name-last").val(data.shipping_name_last);
                $("#shipping-address").val(data.shipping_address);
                $("#shipping-city").val(data.shipping_city);
                $("#shipping-province").val(data.shipping_province);
                $("#shipping-postal-code").val(data.shipping_postal_code);

                if (data.same_as == 1) {
                    $('#ship-box').prop("checked", true);
                    disabled_shipping()
                }
                $("#login-modal").foundation('close');
            }
        }
    );
}

function createAccount(email, password, name_first, name_last, address, city, province, postal_code, billing_phone, same_as, shipping_name_last,
    shipping_name_first, shipping_address, shipping_city, shipping_province, shipping_postal_code ) {
    let getCreateAccount = $.ajax({
        url: "services/create_account.php",
        type: "POST",
        data: {
            email: email,
            password: password,
            name_first: name_first,
            name_last: name_last,
            address : address,
            city: city,
            province : province,
            postal_code : postal_code,
            phone: billing_phone
        },
        dataType: "json"
    });


    getCreateAccount.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getDepartments)" +
            textStatus);
    });

    getCreateAccount.done(
        function (data) {
            if (data.error.id != 0) {
                alert(data.error.message);
            } else {
                $("#billing-name-first").val(data.billing_name_first);
                $("#billing-name-last").val(data.billing_name_last);
                $("#billing-address").val(data.billing_address);
                $("#billing-city").val(data.billing_city);
                $("#billing-province").val(data.billing_province);
                $("#billing-postal-code").val(data.billing_postal_code);
                $("#billing-phone").val(data.billing_phone);
                $("#create-account-modal").foundation('close');
            }
        }
    );
}

function getCheckout() {
    $(".hideAll").hide();
    // call cart XHR
    // Populate cart div
    $(".checkout").show();
}

function getPayment() {
    $(".search-input").val("");
    $(".search_results").html("");
    $(".hideAll").hide();
    
    // Populate cart div
    $(".payment").show();
}

function buildConfirmCart() {
    let size = Object.size(myCart);
    $(".cart-items").html(size);

    let content = `<thead>
                        <tr>
                            <th width="150">
                                Product Image
                            </th>
                            <th width="450">
                                Product Name
                            </th>
                            <th class="text-center">
                                Quantity
                            </th>
                            <th class="text-right">
                                Unit Price
                            </th>
                            <th class="text-right">
                                Total Price 
                            </th>
                        </tr>
                    </thead>`;
    let subTotal = 0.00;
    let subTotalTaxable = 0.00;
    let item_number = 1;
    $.each(myProducts, function (i, item) {
        let id = item.id;
        let upc = item.upc;
        let product_name = item.product_name;
        let product_description = item.product_description;
        let avg_price = item.avg_price;
        let category_name = item.category_name;
        let quantity = item.quantity;
        let image_path = item.image_path;
        let extPrice = parseInt(quantity) * parseFloat(avg_price);
        let finalPrice = extPrice.toFixed(2);

        let taxable = item.taxable;
        content += `<tr>
                        <td class="product-cart-img" data-title="Product Image">
                            <div class="small-img"><img src="${image_path}" alt="${product_name}" /></div>
                        </td>
                        <td class="cart-product-name" data-title="Product Name">
                            <div>${product_name}</div>
                        </td>
                        <td class="cart-product-quantity text-center" data-title="Quantity">
                            <span class=" input-text qty cart-quantity" id="cart_quantity_${id}">${quantity}</span> 
                        </td>
                        <td class="cart-product-price text-right" data-title="Unit Price">
                            $${avg_price}
                        </td>
                        <td class="cart-total-price text-right" data-title="Total Price">
                            $${finalPrice}
                        </td>
                    </tr>`;
        if (taxable == "1") {
            subTotalTaxable = subTotalTaxable + extPrice;
        }
        subTotal = subTotal + extPrice;
    });

    let subTotal_float = subTotal.toFixed(2);
    let hst = subTotal * 0.13;
    let hst_float = hst.toFixed(2);
    let cartTotal = subTotal + hst;
    let cartTotal_float = cartTotal.toFixed(2);
    content1 = `<tbody>
                <tr class="cart-subtotal">
                    <td class="text-left">Subtotal</td>
                    <td class="text-right">$${subTotal_float}</td>
                </tr>
                <tr class="tex">
                    <td class="text-left">HST</td>
                    <td class="text-right">$${hst_float}</td>
                </tr>
                <tr class="order-total">
                    <td class="text-left">Total</td>
                    <td class="text-right">$${cartTotal_float}</td>
                </tr>
                </tbody>`;
    $(".confirm-cart").html(content1);
    $(".confirm-container").html(content);
}

function displayConfirm(){
    // cart
    let json = JSON.stringify(myCart);
        let getCart = $.ajax({
            url: "services/get_products_by_cart.php",
            type: "POST",
            data: {
                json: json
            },
            dataType: "json"
        });
        getCart.fail(function (jqXHR, textStatus) {
            alert("Something went Wrong! (getCart)" +
                textStatus);
        });

        getCart.done(
            function (data) {
                if (data.error.id != 0) {
                    alert(data.error.message);
                } else {
                    myProducts = data.products;
                    buildConfirmCart();
                    // Populate cart div
                    $(".confirm").show();

                }
            }
        );
        $(".confirmation").show();
}

function getConfirmation() {
    $(".search-input").val("");
    $(".search_results").html("");
    $(".hideAll").hide();
    // call confirm payment XHR
    // call payment XHR
    let getTransaction = $.ajax({
        url: "services/make_payment.php",
        type: "POST",
        dataType: "json"
    });


    getTransaction.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getTransaction)" +
            textStatus);
    });

    getTransaction.done(
        function (data) {
            if (data.error.id != 0) {
                alert(data.error.message);
            } else {
                transaction_code = data.transaction_code;
                displayConfirm();
                console.log(transaction_code);
            }
        }
    );
}

function getComplete() {
    $(".search-input").val("");
    $(".search_results").html("");
    $(".hideAll").hide();
    let name_last = $("#billing-name-last").val();
    let name_first = $("#billing-name-first").val();
    // call complete XHR
    let getInvoice = $.ajax({
        url: "services/make_invoice.php",
        type: "POST",
        data:{
            myCart: myCart, 
            transaction_code: transaction_code,
            ea_user_id: userId,
            billing_name_first: name_first,
            billing_name_last: name_last
        },
        dataType: "json"
    });


    getInvoice.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getComplete)" +
            textStatus);
    });

    getInvoice.done(
        function (data) {
            if (data.error.id != 0) {
                alert(data.error.message);
            } else {
                $(".order-number").html(data.invoice_id);
                displayComplete(transaction_code);
            }
        }
    );
    // Populate cart div
    $(".complete").show();
}

function displayComplete(order_number) {
    let name_last = $("#billing-name-last").val();
    let name_first = $("#billing-name-first").val();
    $(".hideAll").hide();
    // call cart XHR
    $(".complete-container").html(`<h2 class="main-title">Order Placed</h2>
    <h1>Thank you, <span class="full-name">${name_first + " " + name_last}</span> for your order. You will recieve it within 2 days. </h1>
    <h2>Your order number is #<span class="order-number">${order_number}</span></h2>`);
    // Populate cart div
    $(".complete").show();
}

function disabled_shipping() {
    if ($('#ship-box').is(':checked')) {
        $('.shipping-detail input[id^="shipping-"], .shipping-detail select').attr('disabled', '');
    } else {
        $('.shipping-detail input[id^="shipping-"], .shipping-detail select').removeAttr('disabled', '');
    }
}

$(window).on("load", function () {

    $('.hero').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: !0,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        draggable: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 768,
                settings: {
                    draggable: true,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    draggable: true,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    draggable: true,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.modal-active').click(function(){
        $('body').css('overflow', 'hidden');
    });

    // same shipping address value
    $('#ship-box').change(function () {
        disabled_shipping()
    });
    $(document).on("click", "body .cart-btn", function () {
        location.href = '#/cart/';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });

    //load more
    $(document).on("click", "body #loadMore", function (e) {
        e.preventDefault();
        $(".product-card:hidden").slice(0, 8).slideDown();
        if ($(".product-card:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
    });

    // Search products
    $(".search-btn").click(function(){
        let search = $(".search-input").val();
        getSearch(search);
    });

    // Create account
    $("#create-account-submit-modal").click(
        function () {
            //alert("dingo1");


            let email = $("#create-account-email").val();
            let password = $("#create-account-password").val();
            let name_first = $("#create-account-fname").val();
            let name_last = $("#create-account-lname").val();
            
            //alert(data.error.message);

            createAccount(email, password, name_first, name_last);
        }
    );

    // Login account
    $("#login-submit-modal").click(
        function () {
            let email = $("#login-email").val();
            let password = $("#login-password").val();
            //alert(data.error.message);
            loginAccount(email, password);
        }
    );

    // Buttons
    $(document).on("click", "body #checkout", function () {
        location.href = '#/checkout/';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });

    $(document).on("click", "body #continue-payment-btn", function () {
        location.href = '#/payment/';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });

    $(document).on("click", "body #continue-confirm-btn", function () {
        location.href = '#/confirmation/';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });

    $(document).on("click", "body #complete-btn", function () {
        location.href = '#/complete/';
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });

    // Add to cart, Quantity update functionality

    $(document).on("click", "body #continue-shopping", function () {
        location.href = `#/products/1`;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });

    $(document).on("click", "body .product-add-cart", function () {
        let product_id = $(this).attr("data-id");
        let quantity = $("#quantity_" + product_id).html();
        let quant = parseInt(quantity);

        if (myCart[product_id] != undefined) {
            let currentValue = myCart[product_id];
            myCart[product_id] = quant + parseInt(currentValue);
        } else {
            myCart[product_id] = quant;
        }


        let size = Object.size(myCart);
        //alert("size" + size);
        $(".cart-items").html(size);


    });

    $(document).on("click", "body .delete-item", function () {
        let product_id = $(this).attr("data-id");
        let deleteItem;
        $.each(myProducts, function (i, item) {
            if (item.id == product_id) {
                deleteItem = i;
            }
        });
        if (deleteItem != undefined) {
            myProducts.splice(deleteItem, 1);
        }

        delete myCart[product_id];
        buildCart();
    });

    $(document).on("click", "body .cart-plus", function () {
        let product_id = $(this).attr("data-id");
        let quantity = parseInt(myCart[product_id] + 1);
        $.each(myProducts, function (i, item) {
            if (item.id == product_id) {
                myProducts[i]["quantity"] = quantity;
            }
        });
        myCart[product_id] = quantity;
        buildCart();
    });

    $(document).on("click", "body .cart-minus", function () {
        let product_id = $(this).attr("data-id");
        let quantity = parseInt(myCart[product_id] - 1);
        if (quantity < 1) {
            quantity = 1;
        }
        $.each(myProducts, function (i, item) {
            if (item.id == product_id) {
                myProducts[i]["quantity"] = quantity;
            }
        });
        myCart[product_id] = quantity;
        buildCart();
    });

    $(document).on("click", "body .product-plus", function () {
        let product_id = $(this).attr("data-id");
        let quantity = $("#quantity_" + product_id).html();
        let quant = parseInt(quantity);
        ++quant;
        $("#quantity_" + product_id).html(quant);
    });

    $(document).on("click", "body .product-minus", function () {
        let product_id = $(this).attr("data-id");
        let quantity = $("#quantity_" + product_id).html();
        let quant = parseInt(quantity);
        if (quant > 1) {
            --quant;
        } else {
            quant = 1;
        }
        $("#quantity_" + product_id).html(quant);
    });


    getDepartmentMenu();

    $(document).on("click", "body .department-item", function () {
        let department_id = $(this).attr("data-id");
        location.href = `#/products/${department_id}`;
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    });
    // SAMMY ROUTING
    // Controller in MVC

    let app = $.sammy(function () {

        this.get('#/splash/', function () {
            getSplash();
        });

        this.get('#/products/:id', function () {
            let department_id = this.params['id'];
            getProducts(department_id);
        });

        this.get('#/cart/', function () {
            getCart();
        });

        this.get('#/checkout/', function () {
            getCheckout();
        });

        this.get('#/payment/', function () {
            getPayment();
        });

        this.get('#/confirmation/', function () {
            getConfirmation();
        });

        this.get('#/complete/', function () {
            getComplete();
        });
    });

    // default when page first loads
    $(function () {
        app.run('#/splash/');
    });
});
