<template>

</template>
<script>
    export default {
        data () {
            return {
            }
        },

        created() {
            this.destroyToken()

        },

        methods: {
            destroyToken() {
                this.$auth.destroyToken()
                this.$router.push("/Login")
            }
        }
    }

</script>
