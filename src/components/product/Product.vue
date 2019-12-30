<template>
    <div class="col-md-4">
        <div class="thumbnail">
            <img :src="'http://localhost:8000/' + product.image">

            <div class="caption">

              {{ product.user_id}}
                <h3>{{ product.name}} </h3>
                <p>{{product.price}}</p>

                <hr>

                <p>
                    <a hrf="#" class="btn btn-default">
                        Wish List
                    </a>

                    <a hrf="#" class="btn btn-success">
                        Buy
                    </a>
                </p>
              <hr>

              <p v-if="product.user_id == authenticatedUser.id">
                <a href="#" class="btn btn-danger" @click="$emit('delete-product')" role="button">
                  Delete
                </a>

                <router-link class="btn btn-success"
                :to="'/products/' + product.id + '/edit'">
                Edit
                </router-link>
              </p>
            </div>

        </div>

    </div>
</template>

<script>

    export default {
      props: ['product', 'authenticatedUser'],
    }

</script>
