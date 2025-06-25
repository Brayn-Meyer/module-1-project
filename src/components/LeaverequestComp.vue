<template>
    <table>
        <tr v-if="info.leaveRequests !== undefined">
            <td v-for="employee in info.leaveRequests">
                <td v-if="info.leaveRequests.length > 0">
                    <td>{{ info.name }}</td>
                    {{ info.leaveRequests[0].date }}
                    {{ info.leaveRequests[0].reason }}
                    {{ info.leaveRequests[0].status }}
                    <br>
                    {{ info.leaveRequests[1].date }}
                    {{ info.leaveRequests[1].reason }}
                    {{ info.leaveRequests[1].status }}
                </td>
                <td v-else-if="info.leaveRequests.length == 0">
                    <td>{{ info.name }}</td>
                    {{ info.leaveRequests[0].date }}
                    {{ info.leaveRequests[0].reason }}
                    {{ info.leaveRequests[0].status }}
                </td>
            </td>
        </tr>
    </table>
</template>
<script>
export default {
    props: [
        "info"
    ]
}
</script>
<style scoped>
    table {
        margin-bottom: 50px;
    }
</style>