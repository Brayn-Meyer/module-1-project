<template>
    <div class="pay-calculator">
        <div class="calculator-form">
            <div class="input-group">
                <label for="hourlyRate">Hourly Rate (R):</label>
                <input id="hourlyRate" type="number" v-model.number="hourlyRate" min="0" step="0.01" @input="calculatePay">     
                <label for="weeklyHours"> Weekly Hours:</label>
                <input id="weeklyHours" type="number" v-model.number="weeklyHours" min="0" max="168" step="0.5" @input="calculatePay">
            </div>
        </div>
        <div class="results">
            <div class="result-card">
                <h3>Pay</h3>
                <p> 
                    <b>Weekly</b> : R{{ formatCurrency(weeklyPay) }} |  
                    <b>Monthly</b> : R{{ formatCurrency(monthlyPay) }} | 
                    <b>Yearly</b> : R{{ formatCurrency(yearlyPay) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Input values
const hourlyRate = ref(0);
const weeklyHours = ref(0);

// Calculations
const weeklyPay = computed(() => {
    return hourlyRate.value * weeklyHours.value;
});

const monthlyPay = computed(() => {
    // Assuming 4.33 weeks per month (52 weeks / 12 months)
    return weeklyPay.value * 4.33;
});

const yearlyPay = computed(() => {
    return weeklyPay.value * 52;
});

const showResults = computed(() => {
    return hourlyRate.value > 0 && weeklyHours.value > 0;
});

// Formatting function
const formatCurrency = (value) => {
    return new Intl.NumberFormat({
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};

const calculatePay = () => {
    // This function is triggered by the @input events
};
</script>

<style>
.pay-calculator {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 15px;
    background: linear-gradient(135deg,#0b2545, #8da9c4);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    color: #2f4156;
    font-family: 'Arial', sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #ffffff;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.calculator-form {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1.5rem;
    border-radius: 10px;
    margin-bottom: 1.5rem;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

label {
    font-weight: bold;
    color: #2f4156;
}

input {
    padding: 0.5rem;
    border: 1px solid #c8d9e6;
    border-radius: 5px;
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

input:focus {
    outline: none;
    border-color: #567c8d;
    box-shadow: 0 0 0 2px rgba(86, 124, 141, 0.2);
}

.results {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 1.5rem;
    border-radius: 10px;
}

.result-card {
    text-align: center;
}

h3 {
    margin-bottom: 1rem;
    color: #2f4156;
}

p {
    margin: 0;
    line-height: 1.6;
}

b {
    color: #567c8d;
}

@media (max-width: 600px) {
    .pay-calculator {
        padding: 1rem;
    }
    
    p {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    b {
        display: block;
        margin-top: 0.5rem;
    }
}
</style>