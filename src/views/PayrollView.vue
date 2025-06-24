<template>
    <navbar-comp/>
    <div>
        <h1>Employee Payrolls</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Hourly Rate</th>
                <th>Hours Worked</th>
                <th>Pay Deducted</th>
                <th>Final Salary</th>
            </tr>
            <PayrollCard v-for="payroll in $store.state.payroll_data" :info="payroll"/>
        </table>
    </div>
</template>
<script>
import PayrollCard from '@/components/PayrollCard.vue';
import NavbarComp from '@/components/NavbarComp.vue';
export default {
    components : {
        PayrollCard,
        NavbarComp
    }
}
</script>
<style>
    
</style>