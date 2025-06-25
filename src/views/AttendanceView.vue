<template>
    <navbar-comp/>
    <div>
        <!-- <EmployeeCard v-for="employer in $store.state.employee_info" :info="employer"/> -->
        <!-- <attendance-card v-for="employee in $store.state.attendance" :info="employee"/> -->
    </div>
    <footer-comp/>
</template>
<script>
import FooterComp from '@/components/FooterComp.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import AttendanceCard from '@/components/AttendanceCard.vue';
export default {
    components : {
        NavbarComp,
        AttendanceCard,
        FooterComp
    }
}
</script>
<style>
    
</style>