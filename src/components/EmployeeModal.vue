<template>
    <div class="modal-overlay" @click.self="$emit('close')">
        <div class="modal">
            <h2>{{ employee.name }}'s Details</h2>
            <p><strong>Position:</strong> {{ employee.position }}</p>
            <p><strong>Department:</strong> {{ employee.department }}</p>
            <p><strong>Salary:</strong> R {{ employee.salary.toLocaleString() }}</p>
            <p><strong>Employment History:</strong> {{ employee.employmentHistory }}</p>
            <p><strong>Contact:</strong> {{ employee.contact }}</p>
            <button class="close-btn" @click="$emit('close')">Close</button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['employee']
}
</script>
<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    max-width: 400px;
    width: 90%;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.close-btn {
    margin-top: 1rem;
    background-color: #F72585;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
</style>