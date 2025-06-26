<template>
    <navbar-comp/>
    <div class="employee-container">
        <h1>Employee List</h1>
        <div class="top-bar">
            <!-- <input type="text" v-model="searchQuery" placeholder="Search employees..." class="search-input"/> -->
            <button class="add-btn" @click="add_employee_button()">+ Add Employee</button>
        </div>
        <div >
            <AddemployeeComp ref="add_employee"/>
        </div>
        <div class="card-grid" ref="cards">
            <EmployeeCard v-for="emp in this.$store.state.employee_info" :key="emp.employeeId" :employee="emp" @view="openModal" />
        </div>
        <!-- <EmployeeModal v-if="selectedEmployee" :employee="selectedEmployee" @close="selectedEmployee = null" /> -->
    </div>
    <footer-comp/>
</template>
<script>
import { employeeInformation } from '@/store/employee_info.json';
import EmployeeCard from '@/components/EmployeeCard.vue';
// import EmployeeModal from '@/components/EmployeeModal.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import AddemployeeComp from '@/components/AddemployeeComp.vue'
export default {
    components: {
        EmployeeCard,
        NavbarComp,
        FooterComp,
        AddemployeeComp,
        // EmployeeModal
    },
    data() {
        return {
            add_employee_cliked: false,
            employees: employeeInformation,
            selectedEmployee: null,
            searchQuery: ''
        }
    },
    computed: {
        filteredEmployees() {
            return this.employees.filter(emp => emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        add_employee_button(){
            this.$refs.add_employee.toggle_add_employee_comp()
        }
    }
}
</script>
<style scoped>
.employee-container {
    max-width: 1500px;
    margin-bottom: 20px;
    padding: 3rem;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 4rem;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    gap: 40rem;
    flex-wrap: wrap;
}

.search-input {
    flex: 1;
    min-width: 200px;
    padding: 0.7rem 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

.add-btn {
    background-color: #4361EE;
    color: white;
    padding: 0.7rem 1.2rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s ease;
}

.add-btn:hover {
    background-color: #364FC7;
}
</style>