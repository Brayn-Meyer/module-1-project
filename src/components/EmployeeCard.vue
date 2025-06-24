<template>
    <div ref="card" class="employee-card">
        <div class="card-header">
        <!-- <div class="initials">{{ initials }}</div> -->
        <div class="employee-info">
        <p><strong>Name :</strong> <h3>{{ info.name }} </h3></p>
        </div>
    </div>
        <div class="card-body">
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
    ],
}
</script>
<style>
    
</style>