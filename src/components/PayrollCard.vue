<template>
        <!-- <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Hourly Rate</th>
            <th>Hours Worked</th>
            <th>Pay Deducted</th>
            <th>Final Salary</th>
        </tr> -->
        <tr>
            <td>eesufhiauid</td>
            <td>asdasdais</td>
            <td>{{ info.finalSalary / info.hoursWorked }} </td>
            <td>{{ info.hoursWorked }}</td>
            <td>{{ info.leaveDeductions }}</td>
            <td> {{ info.finalSalary }} </td>
        </tr>
</template>
<script>
export default {
    props : [
        'info',
        'personal_info'
    ]
}
</script>
<style>
    
</style>