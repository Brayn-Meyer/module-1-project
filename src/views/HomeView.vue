<template>
  <navbar-comp/>
  <div>
    <div>
      <h3>Total employees</h3>
      <p>{{ this.$store.state.employee_info.length }}</p>
    </div>
    <div>
      <h3>Combined Salary</h3>
      <p>R{{ this.$store.getters.combinedSalaries }}</p>
    </div>
    <div>
      <h3>Average Salary</h3>
      <p>R{{ ($store.getters.combinedSalaries / $store.state.employee_info.length).toFixed(2) }}</p>
    </div>
    <div>
      <h3>Leave Requests</h3>
      <p>Pending : {{ $store.getters.pendingLeaveRequests }}</p>
      <p>Approved : {{ $store.getters.approvedLeaveRequests }}</p>
      <p>Denied : {{ $store.getters.deniedLeaveRequests }}</p>
    </div>
  </div>
  <footer-comp/>
</template>

<script>
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
  components : {
    NavbarComp,
    FooterComp
  }
}
</script>