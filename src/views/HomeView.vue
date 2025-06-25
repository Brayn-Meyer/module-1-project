<template>
  <navbar-comp/>
  <div class="dashboard">
    <!-- Header Section -->
    <header>
      <h1>ModernTech HR Dashboard</h1>
      <div class="user-controls">
        <span>Welcome, {{ currentUser.name }}</span>
        <button @click="logout">Logout</button>
      </div>
    </header>

    <!-- Navigation Tabs -->
    <!-- <nav>
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="{ active: activeTab === tab.id }"
      >
        {{ tab.label }}
      </button>
    </nav> -->

    <!-- Main Content Area -->
    <main>
      <!-- Employee Management Tab -->
      <section v-if="activeTab === 'employees'">
        <h2>Employee Management</h2>
        <div class="controls">
          <button @click="showEmployeeForm = true">Add Employee</button>
          <input v-model="employeeSearch" placeholder="Search employees..." />
        </div>
        
        <!-- Employee list would go here -->
        <div v-if="filteredEmployees.length">
          <div v-for="employee in filteredEmployees" :key="employee.id" class="employee-card">
            <h3>{{ employee.name }}</h3>
            <p>{{ employee.position }} ({{ employee.department }})</p>
            <button @click="editEmployee(employee)">Edit</button>
          </div>
        </div>
        <p v-else>No employees found</p>
      </section>

      <!-- Payroll Tab -->
      <section v-if="activeTab === 'payroll'">
        <h2>Payroll Management</h2>
        <div class="payroll-summary">
          <p>Total Employees: {{ employees.length }}</p>
          <p>Payroll Period: {{ currentPayPeriod }}</p>
          <button @click="generatePayslips">Generate Payslips</button>
        </div>
        <!-- Payslip list would go here -->
      </section>

      <!-- Attendance Tab -->
      <section v-if="activeTab === 'attendance'">
        <h2>Attendance Tracking</h2>
        <div class="attendance-controls">
          <select v-model="selectedDepartment">
            <option value="all">All Departments</option>
            <option v-for="dept in departments" :value="dept">{{ dept }}</option>
          </select>
        </div>
        <!-- Attendance calendar would go here -->
      </section>

      <!-- Time Off Tab -->
      <section v-if="activeTab === 'timeoff'">
        <h2>Time Off Requests</h2>
        <div class="request-filters">
          <button @click="filterStatus = 'all'">All</button>
          <button @click="filterStatus = 'pending'">Pending</button>
          <button @click="filterStatus = 'approved'">Approved</button>
          <button @click="filterStatus = 'denied'">Denied</button>
        </div>
        <!-- Time off requests list would go here -->
      </section>
    </main>
  </div>
  <footer-comp/>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavbarComp from '@/components/NavbarComp.vue'
import FooterComp from '@/components/FooterComp.vue'

components : [
  NavbarComp,
  FooterComp
]

// Mock data
const currentUser = ref({
  id: 1,
  name: 'HR Admin',
  role: 'admin'
})

const tabs = ref([
  { id: 'employees', label: 'Employees' },
  { id: 'payroll', label: 'Payroll' },
  { id: 'attendance', label: 'Attendance' },
  { id: 'timeoff', label: 'Time Off' }
])

const activeTab = ref('employees')
const employeeSearch = ref('')
const showEmployeeForm = ref(false)
const selectedDepartment = ref('all')
const filterStatus = ref('all')

// Mock employee data
const employees = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', department: 'Development', position: 'Software Engineer' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', department: 'HR', position: 'HR Manager' }
])

// Computed properties
const filteredEmployees = computed(() => {
  if (!employeeSearch.value) return employees.value
  return employees.value.filter(emp => 
    emp.name.toLowerCase().includes(employeeSearch.value.toLowerCase()) ||
    emp.department.toLowerCase().includes(employeeSearch.value.toLowerCase())
  )
})

const departments = computed(() => {
  return [...new Set(employees.value.map(emp => emp.department))]
})

const currentPayPeriod = computed(() => {
  const today = new Date()
  return `${today.getMonth() + 1}/${today.getFullYear()}`
})

// Methods
function logout() {
  console.log('Logging out...')
}

function editEmployee(employee) {
  console.log('Editing employee:', employee)
}

function generatePayslips() {
  console.log('Generating payslips for current period')
}
</script>