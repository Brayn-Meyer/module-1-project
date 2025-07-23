<template>
    <navbar-comp/>
    <addleaverequest-comp/>
    <leaverequest-comp v-for="(employee, index) in $store.state.leave_request" :key="index" :info="employee"/>
    <footer-comp/>
</template>
<script>
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import LeaverequestComp from '@/components/LeaverequestComp.vue';
import AddleaverequestComp from '@/components/AddleaverequestComp.vue';
export default {
    components : {
        NavbarComp,
        LeaverequestComp,
        AddleaverequestComp,
        FooterComp
    }
}
</script>
<style>
    
</style>