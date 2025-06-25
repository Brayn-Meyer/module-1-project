<template>
    <div>
        <table>
            <tr>
                <td>Name</td>
                <td>{{ info.attendance[0].date }}</td>
                <td>{{ info.attendance[1].date }}</td>
                <td>{{ info.attendance[2].date }}</td>
                <td>{{ info.attendance[3].date }}</td>
                <td>{{ info.attendance[4].date }}</td>
            </tr>
            <tr>
                <td>{{ info.name }}</td>
                <td>{{ info.attendance[0].status }}</td>
                <td>{{ info.attendance[1].status }}</td>
                <td>{{ info.attendance[2].status }}</td>
                <td>{{ info.attendance[3].status }}</td>
                <td>{{ info.attendance[4].status }}</td>
            </tr>
        </table>
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
    div {
        margin-bottom: 25px;
    }
</style>