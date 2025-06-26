<template>
    <div>
        <form @submit.prevent="add_leave_request">
            <input v-model="this.newRequest.name" placeholder="name" type="text">
            <input v-model="this.newRequest.leaveRequests[0].date" placeholder="date" type="text">
            <input v-model="this.newRequest.leaveRequests[0].reason" placeholder="reason" type="text">
            <button type="submit">Submit</button>
        </form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            newRequest : {
                name: "",
                leaveRequests: [
                    {
                        date: "",
                        reason: "",
                        status: "Pending"
                    }
                ]
            }
        }
    },
    methods : {
        add_leave_request(){
            this.$store.commit("add_to_attendance", this.newRequest );
            this.newEmployee = {  newRequest : {
                name: "",
                leaveRequests: [
                    {
                        date: "",
                        reason: "",
                        status: "Pending"
                    }
                ]
            }};
        }
    }
}
</script>
<style>
    
</style>