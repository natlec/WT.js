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
        this.cartTotal = 0
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
            // Store data of cart locally
            self.cart = json.cart

            // Store total of cart locally 
            for(let i=0; i<self.cart.length; i++) {
                self.cartTotal += self.cart[i].cost
            }

            // Trigger data change event
            window.dispatchEvent(cartChangedEvent)
        })
    }

    // Function to update cart data & store locally
    Cart.prototype.updateCart = function(id, quantity, update) {
        let self = this

        if (id | quantity | update) {
            if(updateTimer != false) clearTimeout(updateTimer)

			updateTimer = setTimeout(() => {
				fetch('/cart', {
					method: 'POST',
					body: 'productid=' + id + '&quantity=' + quantity + '&update=' + update
				})
				.then(response => {
					return response.json()
				})
				.then(json => {
					// Update cart data
                    self.cart = json.cart
                    
                    // Update cart total
                    self.cartTotal = 0
                    if(self.cart[id]) {
                        self.cartTotal += (self.cart[id].cost * quantity)
                    } else {
                        // Only recalculate total if item removed
                        for(let i=0; i<self.cart.length; i++) {
                            self.cartTotal += self.cart[i].cost
                        }
                    }

					// Trigger data change event
					window.dispatchEvent(cartChangedEvent)
                    updateTimer = false
                    
                    // Return true to indicate successful cart update
                    return true
				})
			}, 100)
        }

        // Assume no success for cart update
        return false
    }

    // Returns array of products in cart
    Cart.prototype.getCart = function() {
        return (this.cart) ? this.cart : []
    }

    // Returns total of all products in cart
    Cart.prototype.getCartTotal = function() {
        return (this.cart) ? +this.cartTotal.toFixed(2) : 0
    }

    // Returns number of products in cart
    Cart.prototype.getCartSize = function() {
        return (this.cart) ? this.cart.length : 0
    }

    // Export to global window object
    window.app = window.app || {}
    window.app.Cart = Cart

})()