<template>
    <div class="pay-calculator">
        <h2>Pay Calculator</h2>
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
                <h3 >Pay</h3>
                <p> 
                    <b >Weekly</b> : R{{ formatCurrency(weeklyPay) }} |  
                    <b >Monthly</b> : R{{ formatCurrency(monthlyPay) }} | 
                    <b >Yearly</b> : R{{ formatCurrency(yearlyPay) }}
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
    return new Intl.NumberFormat( {
        // style: 'currency',
        // currency: 'ZAR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
};
</script>
<style>
</style>