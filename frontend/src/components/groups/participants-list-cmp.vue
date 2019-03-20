<template>
    <section class="aside-preview">
        <img src="card.img" alt="">
    </section>
</template>

<script>
import asidePreview from './group-aside-cmp.vue'
export default {
    props:{
        card:object
    },
    components:{
        asidePreview
    },
    data(){
        return{
            // cards:['fdsf','fdsfd','sdfsd']
        }
    }
}
</script>

<style>
.aside-list{
    height: 100%;
    width: 100%;
}
</style>
