<template>
    <div class="employee-card">
        <div class="card-header">
            <div class="initials">{{ initials }}</div>
            <div class="main-info">
                <h2>{{ employee.name }}</h2>
                <p class="subtitle"><strong>Position:</strong> {{ employee.position }} <br> <strong>Department:</strong>
                    {{ employee.department }}</p>
            </div>
        </div>
        <div class="actions">
            <button class="view" @click="$emit('view', employee)">View</button>
            <!-- <button class="edit">Edit</button> -->
            <button class="delete" @click="$emit('delete', employee)">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['employee'],
    computed: {
        initials() {
            return this.employee.name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
        }
    },
    methods: {
        openModal(employee) {
            this.selectedEmployee = employee;
        }
    }
}
</script>

<style scoped>
.employee-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #f5fbfe;
    border-radius: 10px;
    padding: 1.5rem;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s;
    border: 1px solid #075576;
    gap: 20px;
}

.employee-card:hover {
    transform: scale(1.01);
}

.card-header {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.initials {
    background-color: #075576;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    font-weight: bold;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.main-info h2 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    margin-bottom: 15px;
    justify-content: center;
    align-items: center;
}

.main-info p {
    margin: 0.25rem 0;
    font-size: 0.95rem;
    color: #444;
}

.subtitle {
    margin: 4px 0;
    color: #555;
    font-size: 0.95rem;
}

.actions {
    display: flex;
    gap: 0.5rem;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

button {
    padding: 0.5rem 1rem;
    border-radius: 2px;
    font-weight: bold;
    border: none;
    cursor: pointer;
}

button:hover {
    opacity: 0.85;
    transform: scale(1.02);
}

.view {
    background-color: #075576;
    color: white;
}

.edit {
    background-color: #a0bacc;
    color: white;
}

.delete {
    background-color: #ef233c;
    color: white;
}
</style>