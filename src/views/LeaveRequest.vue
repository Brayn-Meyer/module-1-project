<template>
    <navbar-comp/>
    <!-- <leaverequest-comp v-for="employee in $store.state.attendance" :info="employee"/> -->
    {{ $store.state.leave_requests }}
    <footer-comp/>
</template>
<script>
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import LeaverequestComp from '@/components/LeaverequestComp.vue';
export default {
    components : {
        NavbarComp,
        LeaverequestComp,
        FooterComp
    }
}
</script>
<style>
    
</style>