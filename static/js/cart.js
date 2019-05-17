/*** 
	Copyright 2019, Nathan Lecompte 
        ID: 45423725
        Model: Cart
***/

(function(){

    // Create event for data change
    let cartChangedEvent = new Event('cartChanged')

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

    // Returns array of products in cart
    Cart.prototype.getCart = function() {
        if (this.cart === []) {
            return []
        } else {
            return this.cart
        }
    }

    // Returns number of products in cart
    Cart.prototype.getCartSize = function() {
        if (this.cart === []) {
            return 0
        } else {
            return this.cart.length
        }
    }

    // Export to global window object
    window.app = window.app || {}
    window.app.Cart = Cart

})()