<template>
    <table>
        <td>{{ info.name }}</td>
        <tr v-for="i in info.leaveRequests">
            <td>{{ i.date }}</td>
            <td>{{ i.reason }}</td>
            <td>{{ i.status }}</td>
            <button v-if="i.status === 'Pending'" @click="updateLeaveStatus(info, i, 'Approved')">
                Approve
            </button>
            <button v-if="i.status === 'Pending'" @click="updateLeaveStatus(info, i, 'Denied')">
                Decline
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
        updateLeaveStatus(empIndex, reqIndex, newStatus) { //updates the status of leave requests by targeting via index
            this.$store.commit("updateLeaveStatus", empIndex, reqIndex, newStatus)
        }
    }
}
</script>
<style scoped>
table {
    margin-bottom: 50px;
}
</style>