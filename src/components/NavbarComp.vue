<template>
    <nav>
        <div class="logo">
            <img src="@/assets/logo.png" alt="">
            <h3>Modern Tech Solutions</h3>
        </div>
        <div class="nav">
            <router-link to="/home">Dashboard</router-link> |
            <!-- <router-link to="/about">About</router-link> |  -->
            <router-link to="/employee">Employees</router-link> | 
            <router-link to="/payroll">Payrolls</router-link> |
            <router-link to="/attendance">Attendances</router-link> | 
            <router-link to="/leaverequest">Leave Requests</router-link>
        </div>
    </nav>
</template>
<script>
export default {
}
</script>
<style scoped>
    img {
        height: 100px;
        width: 100px;
        margin-top: 0%;
        margin-bottom: 0%;
        padding-top: 0%;
        padding-bottom: 0%;
    }
    /* .logo {
        display: flex;
    } */
</style>