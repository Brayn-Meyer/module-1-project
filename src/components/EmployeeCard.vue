<template>
    <div ref="card" class="employee-card">
        <div class="card-header">
    </div>
    <div class="card-body">
            <p class="label">Name:</p>
            <p><strong><h3>{{ info.name }}</h3></strong></p>
        <p class="label">Position:</p>
        <p class="value"><strong>{{ info.position }}</strong></p>
        <p class="label">Department:</p>
        <p class="value"><strong> {{ info.department }}</strong></p>
        <p class="label">Salary:</p>
        <p class="value"><strong> {{ info.salary }}</strong></p>
        <p class="label">Employment History:</p>
        <p class="value"><strong> {{ info.employmentHistory }}</strong></p>
        <p class="label">Contact:</p>
        <p class="value"><strong> {{ info.contact }}</strong></p>
        </div>
        <div class="card-action">
            <button class="more-btn">View More</button>
        </div>
    </div>
</template>
<script>
export default {
    props : [
        'info'
    ]
}
</script>
<style scoped>
    .employee-card {
    background-color: #F7EFEF;
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
input[type=text]{
    width: 130px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}
input[type=text]:focus{
    width:100%
}
</style>