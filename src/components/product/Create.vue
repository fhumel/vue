<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
        <div class="panel-body">
          <form @submit.prevent="create">
          <div class="form-group">
            <label for="">Name</label>
            <input name="name" type="file" class="form-control"
              @change="imageChanged">

          </div>

            <div class="form-group">
            <label for="">Name</label>
            <input name="name" type="text" class="form-control" autofocus
                   v-model="product.name"
                   v-validate="'required'">
            <div class="helo-block alert alert-danger"
                  v-show="errors.has('name')">
              {{errors.first('name')}}
            </div>
          </div>

          <div class="form-group">
            <label for="">Price</label>
            <input name="price" type="number" class="form-control" v-model="product.price" v-validate="'max_value:50||min_value:1'">
            <div class="helo-block alert alert-danger"
                  v-show="errors.has('price')">
              {{errors.first('price')}}
            </div>
          </div>

          <div class="form-group">
            <label for="">Description</label>
            <textarea type="text" name="" id="" cols="30" rows="10" class="form-control"  v-model="product.description"></textarea>
          </div>

          <input type="submit" class="btn btn-sucess pull-right" value="Create">

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
          return{
              product: {
                  name: '',
                  price: 0,
                  description: '',
                  image: '',
              }
          }
      },

      methods: {

          imageChanged () {
            var fileReader = new FileReader()

            fileReader.readAsDataURL(e.target.files[0])

            fileReader.onload = (e) => {
              this.product.image = e.target.result
            }
          },

          create () {
            this.$validator.updateDictionary({
              'al': {
                atributes: {
                  name:'nome'
                }
              }
            })

            this.$validator.setLocale('al')

            this.$validator.validateAll().then(() => {
              this.$http.post('api/products', this.product)
                  .then( response => {
                      this.$router.push('/feed')
                  })
            })

          }
      }
  }
</script>
