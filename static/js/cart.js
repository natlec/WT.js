/*** 
	Copyright 2019, Nathan Lecompte 
        ID: 45423725
        Model: Cart
***/

(function() {

    // Create event for data change
    let cartChangedEvent = new Event('cartChanged')

    // Only update cart on last input change (prevent API spam)
	let updateTimer = false

    // Cart model
    function Cart() {
        this.url = '/cart'
        this.cart = []
    }

    // Function to fetch data from API & store locally
    Cart.prototype.getData = function() {
        let self = this
        fetch(self.url, {
            method: 'GET',
            cache: 'default'
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            // Store data as Cart property
            self.cart = json.cart
            // Trigger data change event
            window.dispatchEvent(cartChangedEvent)
        })
    }

    // Function to update cart data & store locally
    Cart.prototype.updateCart = function(params) {
        let self = this
        if (params != '') {
            if(updateTimer != false) clearTimeout(updateTimer)
			updateTimer = setTimeout(() => {
				fetch('/cart', {
					method: 'POST',
					body: params
				})
				.then(response => {
					return response.json()
				})
				.then(json => {
					// Update cart data in Cart property
					self.cart = json.cart
					// Trigger data change event
					window.dispatchEvent(cartChangedEvent)
					updateTimer = false
				})
			}, 200)
        }
    }

    // Returns array of products in cart
    Cart.prototype.getCart = function() {
        if(this.cart === []) {
            return []
        } else {
            return this.cart
        }
    }

    // Returns number of products in cart
    Cart.prototype.getCartSize = function() {
        if(this.cart === []) {
            return 0
        } else {
            return this.cart.length
        }
    }

    // Export to global window object
    window.app = window.app || {}
    window.app.Cart = Cart

})()