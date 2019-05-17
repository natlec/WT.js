/*** 
	Copyright 2019, Nathan Lecompte 
		ID: 45423725
***/

(function(){

    $(document).ready(function() {

		window.app.Products = new window.app.Products()
        window.app.Products.getData()

        window.app.Cart = new window.app.Cart()
		window.app.Cart.getData()
		
		$(window).on('productsChanged', function() {
            let products = window.app.Products.getProducts()

            let template = Handlebars.compile($("#product-template").html())
			let data = template({ products: products })
            $(".products").html(data)

			$(".product-item .header").click(function() {
				$(this).parents('.product-item').toggleClass('product-expanded')
			})

			$("form").submit(function(e) {
				window.app.Cart.getData()
				e.preventDefault()
			})
        })

        $(window).on('cartChanged', function() {
            let cart = window.app.Cart.getCart()

            let template = Handlebars.compile($("#cart-template").html())
            let data = template({ 
				cart: cart, 
				cartTotal: 100,
				cartCount: window.app.Cart.getCartSize()
			})
			$(".cart").html(data)

			$(".cart-info").click(function() {
				$('.cart').toggleClass('cart-expanded')
				$('body').toggleClass('hide-scroll')
				$('.cart .toggle').text($('.cart .toggle').text() == 'Show cart' ? 'Hide cart' : 'Show cart')
			})

			$("form").submit(function(e) {
				window.app.Cart.getData()
				e.preventDefault()
			})
		})

		Handlebars.registerHelper('-if', function(v1, operator, v2, options) {
			switch (operator) {
				case '==':
					return (v1 == v2) ? options.fn(this) : options.inverse(this)
				case '===':
					return (v1 === v2) ? options.fn(this) : options.inverse(this)
				case '!=':
					return (v1 != v2) ? options.fn(this) : options.inverse(this)
				case '!==':
					return (v1 !== v2) ? options.fn(this) : options.inverse(this)
				case '<':
					return (v1 < v2) ? options.fn(this) : options.inverse(this)
				case '<=':
					return (v1 <= v2) ? options.fn(this) : options.inverse(this)
				case '>':
					return (v1 > v2) ? options.fn(this) : options.inverse(this)
				case '>=':
					return (v1 >= v2) ? options.fn(this) : options.inverse(this)
				case '&&':
					return (v1 && v2) ? options.fn(this) : options.inverse(this)
				case '||':
					return (v1 || v2) ? options.fn(this) : options.inverse(this)
				default:
					return options.inverse(this)
			}
		})
    })

})()