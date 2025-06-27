<template>
    <table>
        <td>{{ info.name }}</td>
        <tr v-for="i in info.leaveRequests">
            <td>{{ i.date }}</td>
            <td>{{ i.reason }}</td>
            <td>{{ i.status }}</td>
            <button v-if="i.status === 'Pending'" @click="updateLeaveStatus(i, 'Approved')">
                Approve
            </button>
            <button v-if="i.status === 'Pending'" @click="updateLeaveStatus(i, 'Denied')">
                Deny
            </button>
        </tr>
    </table>
</template>
<script>
export default {
    props: [
        "info"
    ],
    methods: {
        updateLeaveStatus(leaveRequest, newStatus) {
            // Find the employee index in the attendance array
            const empIndex = this.$store.state.attendance.findIndex(emp => emp.employeeId === this.info.employeeId);
            // Find the leave request index in the employee's leaveRequests array
            const reqIndex = this.info.leaveRequests.findIndex(req => req === leaveRequest);
            // Commit the mutation
            this.$store.commit("updateLeaveStatus", { empIndex, reqIndex, newStatus });
        }
    }
}
</script>
<style scoped>
table {
    margin-bottom: 50px;
}
</style>