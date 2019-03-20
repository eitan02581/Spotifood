<template>
    <section class="aside-list">
        <aside-participants v-for="card in cards" :card="card" :key="card"/>
    </section>
</template>

<script>
import asideParticipants from './participants-list-cmp'
export default {
    props:['cards'],
    components:{
        asideParticipants
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
