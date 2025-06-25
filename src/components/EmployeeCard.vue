<template>
    <div class="employee-card">
        <div class="card-header">
            <h3>{{ info.name }}</h3>
            <hr>
        </div>
        <div class="card-body">
            <p class="position"><strong>Position:</strong> {{ info.position }}</p>
            <div v-if="showDetails" class="details">
                <hr>
                <div class="detail-item">
                    <span class="label"><strong>Department:</strong></span>
                    <span class="value">{{ info.department }}</span>
                </div>
                <div class="detail-item">
                    <span class="label"><strong>Salary:</strong></span>
                    <span class="value">R {{ info.salary.toLocaleString() }}</span>
                </div>
                <div class="detail-item">
                    <span class="label"><strong>Employment History:</strong></span>
                    <span class="value">{{ info.employmentHistory }}</span>
                </div>
                <div class="detail-item">
                    <span class="label"><strong>Contact:</strong></span>
                    <span class="value contact">{{ info.contact }}</span>
                </div>
            </div>
        </div>
        <div class="card-action">
            <button class="more-btn" @click="toggleDetails">
                {{ showDetails ? 'View Less' : 'View More' }}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['info'],
    data() {
        return {
            showDetails: false,
            borderColors: ['#4361EE', '#4CC9F0', '#F72585', '#F8961E']
        }
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        },
        getBorderColor(index) {
            return this.borderColors[index % this.borderColors.length];
        }
    }
}
</script>
<style scoped>
.employee-card {
    background-color: #FFFFFF;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 280px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
}

.employee-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 6px;
    background-color: v-bind('getBorderColor(info.employeeId)');
}

strong {
    color: black;
}

.employee-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.card-header h3 {
    margin: 0;
    color: #2C3E50;
    font-size: 1.2rem;
}

.position {
    color: #4361EE;
    font-weight: 500;
    margin: 8px 0 12px;
}

.details {
    margin-top: 15px;
}

.detail-item {
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
}

.label {
    font-size: 0.8rem;
    color: #666;
    font-weight: 500;
}

.value {
    font-size: 0.9rem;
    color: #333;
    margin-top: 2px;
}

.contact {
    word-break: break-all;
}

hr {
    border: 0;
    height: 1px;
    background: #E0E0E0;
    margin: 10px 0;
}

.more-btn {
    background-color: #CC799D;
    color: white;
    border: none;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s ease;
    width: 100%;
    margin-top: 10px;
    font-weight: 500;
}

.more-btn:hover {
    background-color: #E01B72;
    /* Slightly darker pink */
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(242, 37, 133, 0.3);
}

.details {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>