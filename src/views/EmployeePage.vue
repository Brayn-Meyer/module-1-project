<template>
    <navbar-comp/>
    <div>
        <h1>Employment Page</h1>
        <div>
            <h2>Add an Employee</h2>
        </div>
        <EmployeeCard v-for="employer in $store.state.employee_info" :info="employer"/>
    </div>
</template>
<script>
import EmployeeCard from '@/components/EmployeeCard.vue';
import NavbarComp from '@/components/NavbarComp.vue';
export default{
    components : {
        EmployeeCard,
        NavbarComp
    }
}
</script>
<style>
.employee-card {
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    padding: 20px;
    width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.initials {
    background-color: #2E86DE;
    color: white;
    font-weight: bold;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}
.employee-info {
    font-size: 12px;
    color: gray;
}
.card-body .label {
    font-size: 13px;
    color: #888;
    margin-bottom: 2px;
}
.card-body .value {
    font-size: 14px;
    margin-bottom: 10px;
}
.card-action {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}
.more-btn {
    background-color: #E8F4FF;
    border: none;
    padding: 8px 12px;
    font-size: 13px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.2s ease;
}
.more-btn:hover {
    background-color: #D0EAFF;
}
</style>