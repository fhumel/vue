<template>
    <div class="row">
        <my-product
          v-for="product in products"
          :product="product"
          :authenticatedUser="authenticatedUser"
          @delete-product="deleteProduct(product)"
        >

        </my-product>
    </div>

</template>

<script>
    import Product from './Product.vue'
    import Swal from 'sweetalert'

    export default {
        data () {
            return {
                products: []
            }
        },

        computed: {
          authenticatedUser() {
              return this.$auth.getAuthenticatedUser()
          }
        },

        components :{
            'my-product' : Product
        },

        created() {
            this.$http.get('api/products')
                .then(response => {
                    this.products = response.body
                })
        },

        methods: {
          deleteProduct (product) {
            Swal({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#DD6B55',
              confirmButtonText: 'Yes, delete it!',
              closeOnConfirm: 'false'
            },
            function () {

              this.$http.delete('api/products/' + product.id).then(response => {
                  let index = this.product.indexOf(product)
                  this.product.splice(index,1)
                  Swal("Deleted", "Your product has been deleted.", "success")
              })
            }.bind());
          }
        }
    }
</script>
