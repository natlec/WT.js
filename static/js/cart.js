/*** 
	Copyright 2019, Nathan Lecompte 
		ID: 45423725
***/

(function(){

    let cartChangedEvent = new Event('cartChanged')

    function Cart() {
        this.url = '/cart'
        this.cart = []
    }

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
            self.cart = json.cart
            window.dispatchEvent(cartChangedEvent)
        })
    }

    Cart.prototype.getCart = function() {
        if (this.cart === []) {
            return []
        } else {
            return this.cart
        }
    }

    Cart.prototype.getCartSize = function() {
        if (this.cart === []) {
            return 0
        } else {
            return this.cart.length
        }
    }

    window.app = window.app || {}
    window.app.Cart = Cart

})()