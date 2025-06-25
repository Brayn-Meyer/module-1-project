<template>
    <navbar-comp/>
    <div>
        <paycal-comp/>
        <h1>Employee Payrolls</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Hourly Rate</th>
                <th>Hours Worked</th>
                <th>Leave Deductions</th>
                <th>Final Salary</th>
            </tr>
            <PayrollCard :info="this.$store.state.payroll_data[0]" :personal_info="this.$store.state.employee_info[0]"/>
            <PayrollCard :info="this.$store.state.payroll_data[1]" :personal_info="this.$store.state.employee_info[1]"/>
            <PayrollCard :info="this.$store.state.payroll_data[2]" :personal_info="this.$store.state.employee_info[2]"/>
            <PayrollCard :info="this.$store.state.payroll_data[3]" :personal_info="this.$store.state.employee_info[3]"/>
            <PayrollCard :info="this.$store.state.payroll_data[4]" :personal_info="this.$store.state.employee_info[4]"/>
            <PayrollCard :info="this.$store.state.payroll_data[5]" :personal_info="this.$store.state.employee_info[5]"/>
            <PayrollCard :info="this.$store.state.payroll_data[6]" :personal_info="this.$store.state.employee_info[6]"/>
            <PayrollCard :info="this.$store.state.payroll_data[7]" :personal_info="this.$store.state.employee_info[7]"/>
            <PayrollCard :info="this.$store.state.payroll_data[8]" :personal_info="this.$store.state.employee_info[8]"/>
            <PayrollCard :info="this.$store.state.payroll_data[9]" :personal_info="this.$store.state.employee_info[9]"/>
        </table>
    </div>
    <footer-comp/>
</template>
<script>
import PayrollCard from '@/components/PayrollCard.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import PaycalComp from '@/components/PaycalComp.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
    components : {
        PayrollCard,
        NavbarComp,
        PaycalComp,
        FooterComp
    },
    data() {
        return {
            p_info : this.$store.state.employee_info
        }
    }
}
</script>
<style>
    
</style>