/*** 
	Copyright 2019, Nathan Lecompte 
		ID: 45423725
***/

(function(){

	// Handle document load completion
    $(document).ready(function() {

		// Cart visible state
		let cartVisible = false

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

			// Update cart when product item form is submitted
			$('.product-item .button').click(function() {
				window.app.Cart.updateCart($(this).data('id'), $(this).prev().val(), 0)
			})
		})

		// Handle data changed event for cart
        $(window).on('cartChanged', function() {
            let cart = window.app.Cart.getCart()

			// Compile cart template for cart
            let template = Handlebars.compile($('#cart-template').html())
            let data = template({ 
				cart: cart, 
				cartTotal: window.app.Cart.getCartTotal(),
				cartCount: window.app.Cart.getCartSize()
			})
			// Load cart into view
			$('.cart').html(data)

			// Show cart accordingly after template compile
			if(cartVisible) {
				$('.cart').addClass('cart-expanded')
				$('body').addClass('hide-scroll')
				$('.cart .toggle').text('Hide cart')
			}

			// Handle cart banner click
			$('.cart-info').click(function() {
				$('.cart').toggleClass('cart-expanded')
				$('body').toggleClass('hide-scroll')
				$('.cart .toggle').text($('.cart').hasClass('cart-expanded') ? 'Hide cart' : 'Show cart')
				cartVisible=!cartVisible
			})

			// Update cart when quantity input of cart item changed
			$(document).on('keyup input change', '.cart .quantity', function() {
				window.app.Cart.updateCart($(this).data('id'), $(this).val(), 1)
			})
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