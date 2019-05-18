/*** 
	Copyright 2019, Nathan Lecompte 
		ID: 45423725
***/

(function(){

	// Handle document load completion
    $(document).ready(function() {

		// Create Products model instance & load data
		window.app.Products = new window.app.Products()
        window.app.Products.getData()

		// Create Cart model instance & load data
        window.app.Cart = new window.app.Cart()
		window.app.Cart.getData()
		
		// Handle data changed event for products
		$(window).on('productsChanged', function() {
            let products = window.app.Products.getProducts()

			// Compile product template for products
            let template = Handlebars.compile($('#product-template').html())
			let data = template({ products: products })
			// Load products into view
            $('.products').html(data)

			// Handle product item click
			$('.product-item .header').click(function() {
				$(this).parents('.product-item').toggleClass('product-expanded')
			})

			// Prevent navigation to action page on form submit
			$('form').submit(function(e) {
				$.post($(this).attr('action'), $(this).serialize(), function(response) {
					window.app.Cart.getData()
				},'json')
				return false
			})
		})

		// Handle data changed event for cart
        $(window).on('cartChanged', function() {
            let cart = window.app.Cart.getCart()

			// Compile cart template for cart
            let template = Handlebars.compile($('#cart-template').html())
            let data = template({ 
				cart: cart, 
				cartTotal: 100,
				cartCount: window.app.Cart.getCartSize()
			})
			// Load cart into view
			$('.cart').html(data)

			// Handle cart banner click
			$('.cart-info').click(function() {
				$('.cart').toggleClass('cart-expanded')
				$('body').toggleClass('hide-scroll')
				$('.cart .toggle').text($('.cart .toggle').text() == 'Show cart' ? 'Hide cart' : 'Show cart')
			})
		})

		// Update cart when quantity input of cart item changed
		$(document).on('keyup input change', '.cart .quantity', function() {
			window.app.Cart.updateCart('productid=' + $(this).data('id') + '&quantity=' + $(this).val() + '&update=1')
		})

		// Enable if-statement logic for Handlebars templates
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