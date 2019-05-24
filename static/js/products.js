/*** 
	Copyright 2019, Nathan Lecompte 
        ID: 45423725
        Model: Products
***/

(function() {

    // Create event for data change
    let productsChangedEvent = new Event('productsChanged')

    // Products model
    function Products() {
        this.url = '/products'
        this.products = []
    }

    // Function to fetch data from API & store locally
    Products.prototype.getData = function() {
        let self = this

        fetch(self.url, {
            method: 'GET',
            cache: 'default'
        })
        .then(response => {
            return response.json()
        })
        .then(json => {
            // Store data of products locally
            self.products = json.products
            
            // Trigger data change event
            window.dispatchEvent(productsChangedEvent)
        })
    }

    // Returns an array of all products
    Products.prototype.getProducts = function() {
        return (this.products) ? this.products : []
    }

    // Returns a product as object according to id
    Products.prototype.getProduct = function(id) {
        return (this.products) ? this.products[id] : []
    }

    // Function to sort products accordingly
    Products.prototype.sortProducts = function(order) {
        let self = this

        if (self.products && order) {
            
            // Sort products accordingly
            if(order === 'pricehigh') {

                // Sort by price high to low
                self.products.sort((a, b) => { return -(a.unit_cost - b.unit_cost) })

            } else if(order === 'pricelow') {

                // Sort by price low to high
                self.products.sort((a, b) => { return a.unit_cost - b.unit_cost })
                
            } else if(order === 'nameA') {

                // Sort by by name (A-Z)
                self.products.sort((a, b) => { return a.name.localeCompare(b.name) })

            } else if(order === 'nameZ') {

                // Sort by by name (Z-A)
                self.products.sort((a, b) => { return -(a.name.localeCompare(b.name)) })

            }

            // Trigger data change event
            window.dispatchEvent(productsChangedEvent)
            
            // Return true to indicate successful product sort
            return true
        }

        // Assume no success for product sort
        return false
    }

    // Export to global window object
    window.app = window.app || {}
    window.app.Products = Products

})()