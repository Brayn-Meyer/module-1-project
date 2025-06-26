<template>
    <navbar-comp />
    <div class="dashboard-container">
        <div class="sections-wrapper">
            <!-- Calculator Section -->
            <div class="calculator-section">
                <h2>Payroll Calculator</h2>
                <div class="calculator-border">
                    <paycal-comp />
                </div>
            </div>

            <!-- Employee Management Section -->
            <div class="management-section">
                <h2>Employee Management</h2>
                <div class="management-border">
                    <div class="management-option">
                        <h3>Search Employees</h3>
                        <input type="text" placeholder="Enter employee name..." class="search-input"
                            v-model="searchQuery" @input="searchEmployees">
                        <button class="action-btn" @click="searchEmployees">Search</button>
                    </div>
                    <div class="management-option">
                        <h3>Update Employees</h3>
                        <select class="employee-select" v-model="selectedEmployee" @change="loadEmployeeData">
                            <option value="">Select employee to update</option>
                            <option v-for="(employee, index) in filteredEmployees" :key="index" :value="employee.id">
                                {{ employee.name }}
                            </option>
                        </select>
                        <div v-if="selectedEmployeeData" class="employee-form">
                            <input v-model="selectedEmployeeData.name" placeholder="Name">
                            <input v-model="selectedEmployeeData.position" placeholder="Position">
                            <input v-model="selectedEmployeeData.hourlyRate" placeholder="Hourly Rate" type="number">
                            <button class="action-btn" @click="updateEmployee">Update</button>
                        </div>
                    </div>
                    <div class="management-option">
                        <h3>Update Payrolls</h3>
                        <select class="employee-select" v-model="selectedPayrollEmployee">
                            <option value="">Select employee payroll</option>
                            <option v-for="(employee, index) in filteredEmployees" :key="index" :value="employee.id">
                                {{ employee.name }}
                            </option>
                        </select>
                        <div v-if="selectedPayrollEmployee" class="payroll-form">
                            <input v-model="payrollData.hoursWorked" placeholder="Hours Worked" type="number">
                            <input v-model="payrollData.leaveDeductions" placeholder="Leave Deductions" type="number">
                            <button class="action-btn" @click="updatePayroll">Update Payroll</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payroll Table Section -->
        <div class="payroll-section">
            <h1>Employee Payrolls</h1>
            <div class="table-controls">
                <button class="action-btn export-btn" @click="exportToCSV">Export to CSV</button>
                <input type="text" placeholder="Filter payrolls..." class="search-input" v-model="payrollFilter"
                    @input="filterPayrolls">
            </div>
            <table class="payroll-table">
                <thead>
                    <tr>
                        <th @click="sortPayrolls('name')">Name</th>
                        <th @click="sortPayrolls('position')">Position</th>
                        <th @click="sortPayrolls('hourlyRate')">Hourly Rate</th>
                        <th @click="sortPayrolls('hoursWorked')">Hours Worked</th>
                        <th @click="sortPayrolls('leaveDeductions')">Leave Deductions</th>
                        <th @click="sortPayrolls('finalSalary')">Final Salary</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(employee, index) in filteredPayrollData" :key="index">
                        <td>{{ employee.name }}</td>
                        <td>{{ employee.position }}</td>
                        <td>R{{ employee.hourlyRate.toFixed(2) }}</td>
                        <td>{{ employee.hoursWorked }}</td>
                        <td>R{{ employee.leaveDeductions.toFixed(2) }}</td>
                        <td>R{{ calculateSalary(employee).toFixed(2) }}</td>
                        <td>
                            <button class="table-btn view-btn" @click="viewPayslip(employee)">View Payslip</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination" v-if="totalPages > 1">
                <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                    :class="{ active: currentPage === page }">
                    {{ page }}
                </button>
            </div>
        </div>
    </div>

    <!-- Payslip Modal -->
    <div v-if="showPayslip" class="payslip-modal">
        <div class="payslip-container">
            <div class="payslip-header">
                <h2>PAYSLIP</h2>
                <div class="company-info">
                    <h3>Modern Tech Solutions</h3>
                    <p>14 Brayn Street</p>
                    <p>Cape Town, South Africa</p>
                </div>
            </div>

            <div class="employee-info">
                <div>
                    <p><strong>Employee Name:</strong> {{ currentPayslip.name }}</p>
                    <p><strong>Position:</strong> {{ currentPayslip.position }}</p>
                </div>
                <div>
                    <p><strong>Pay Period:</strong> {{ getCurrentPayPeriod() }}</p>
                    <p><strong>Payment Date:</strong> {{ getCurrentDate() }}</p>
                </div>
            </div>

            <div class="payslip-details">
                <h3>Earnings</h3>
                <table class="payslip-table">
                    <tr>
                        <td>Hourly Rate</td>
                        <td>R{{ currentPayslip.hourlyRate.toFixed(2) }}</td>
                    </tr>
                    <tr>
                        <td>Hours Worked</td>
                        <td>{{ currentPayslip.hoursWorked }}</td>
                    </tr>
                    <tr>
                        <td>Gross Pay</td>
                        <td>R{{ (currentPayslip.hourlyRate * currentPayslip.hoursWorked).toFixed(2) }}</td>
                    </tr>
                </table>

                <h3>Deductions</h3>
                <table class="payslip-table">
                    <tr>
                        <td>Leave Deductions</td>
                        <td>R{{ currentPayslip.leaveDeductions.toFixed(2) }}</td>
                    </tr>
                </table>

                <div class="net-pay">
                    <h3>Net Pay</h3>
                    <p>R{{ calculateSalary(currentPayslip).toFixed(2) }}</p>
                </div>
            </div>

            <div class="payslip-footer">
                <p>Thank you for your hard work!</p>
                <p>This is an automated payslip. No signature required.</p>
            </div>

            <div class="payslip-actions">
                <button @click="printPayslip" class="action-btn">Print Payslip</button>
                <button @click="showPayslip = false" class="action-btn">Close</button>
            </div>
        </div>
    </div>

    <footer-comp />
</template>

<script>
import PayrollCard from '@/components/PayrollCard.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import PaycalComp from '@/components/PaycalComp.vue';
import FooterComp from '@/components/FooterComp.vue';

export default {
    components: {
        PayrollCard,
        NavbarComp,
        PaycalComp,
        FooterComp
    },
    data() {
        return {
            searchQuery: '',
            selectedEmployee: '',
            selectedEmployeeData: null,
            selectedPayrollEmployee: '',
            payrollData: {
                hoursWorked: 0,
                leaveDeductions: 0
            },
            payrollFilter: '',
            currentPage: 1,
            itemsPerPage: 10,
            sortField: 'name',
            sortDirection: 'asc',
            showPayslip: false,
            currentPayslip: null,
            employees: [
                // Your original employee data remains unchanged
                {
                    id: 1,
                    name: 'Stronglie Nkosi',
                    position: 'Senior Developer',
                    hourlyRate: 45,
                    hoursWorked: 40,
                    leaveDeductions: 75,
                    department: 'Development',
                    status: 'present'
                },
                {
                    id: 2,
                    name: 'Thabo Moloena',
                    position: 'Accountant',
                    hourlyRate: 300,
                    hoursWorked: 35,
                    leaveDeductions: 0,
                    department: 'Finance',
                    status: 'present'
                },
                {
                    id: 3,
                    name: 'Nomsa Khumalo',
                    position: 'HR Manager',
                    hourlyRate: 350,
                    hoursWorked: 38,
                    leaveDeductions: 25,
                    department: 'Human Resources',
                    status: 'late'
                },
                {
                    id: 4,
                    name: 'John Doe',
                    position: 'Marketing Specialist',
                    hourlyRate: 280,
                    hoursWorked: 42,
                    leaveDeductions: 50,
                    department: 'Marketing',
                    status: 'absent'
                },
                {
                    id: 5,
                    name: 'Jane Smith',
                    position: 'Junior Developer',
                    hourlyRate: 250,
                    hoursWorked: 45,
                    leaveDeductions: 0,
                    department: 'Development',
                    status: 'present'
                },
                {
                    id: 6,
                    name: 'David Wilson',
                    position: 'Financial Analyst',
                    hourlyRate: 320,
                    hoursWorked: 37,
                    leaveDeductions: 15,
                    department: 'Finance',
                    status: 'present'
                },
                {
                    id: 7,
                    name: 'Sarah Johnson',
                    position: 'UX Designer',
                    hourlyRate: 380,
                    hoursWorked: 40,
                    leaveDeductions: 0,
                    department: 'Design',
                    status: 'late'
                },
                {
                    id: 8,
                    name: 'Michael Brown',
                    position: 'Sales Executive',
                    hourlyRate: 270,
                    hoursWorked: 50,
                    leaveDeductions: 30,
                    department: 'Sales',
                    status: 'present'
                },
                {
                    id: 9,
                    name: 'Amanda Davis',
                    position: 'Operations Manager',
                    hourlyRate: 420,
                    hoursWorked: 45,
                    leaveDeductions: 0,
                    department: 'Operations',
                    status: 'absent'
                },
                {
                    id: 10,
                    name: 'Robert Taylor',
                    position: 'System Administrator',
                    hourlyRate: 360,
                    hoursWorked: 40,
                    leaveDeductions: 20,
                    department: 'IT',
                    status: 'present'
                },

            ]
        }
    },
    computed: {
        // Your original computed properties remain unchanged
        filteredEmployees() {
            return this.employees.filter(employee =>
                employee.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        filteredPayrollData() {
            let filtered = [...this.employees];

            if (this.payrollFilter) {
                filtered = filtered.filter(employee =>
                    employee.name.toLowerCase().includes(this.payrollFilter.toLowerCase()) ||
                    employee.position.toLowerCase().includes(this.payrollFilter.toLowerCase())
                );
            }

            filtered.sort((a, b) => {
                let modifier = this.sortDirection === 'asc' ? 1 : -1;
                if (a[this.sortField] < b[this.sortField]) return -1 * modifier;
                if (a[this.sortField] > b[this.sortField]) return 1 * modifier;
                return 0;
            });

            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return filtered.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.employees.length / this.itemsPerPage);
        }
    },
    methods: {
        // Your original methods remain unchanged except for removing edit/delete functions
        searchEmployees() {
            console.log('Searching for:', this.searchQuery);
        },
        loadEmployeeData() {
            if (!this.selectedEmployee) {
                this.selectedEmployeeData = null;
                return;
            }
            const employee = this.employees.find(e => e.id === this.selectedEmployee);
            this.selectedEmployeeData = { ...employee };
        },
        updateEmployee() {
            const index = this.employees.findIndex(e => e.id === this.selectedEmployee);
            if (index !== -1) {
                this.employees[index] = { ...this.selectedEmployeeData };
                alert('Employee updated successfully!');
            }
        },
        updatePayroll() {
            const index = this.employees.findIndex(e => e.id === this.selectedPayrollEmployee);
            if (index !== -1) {
                this.employees[index].hoursWorked = parseFloat(this.payrollData.hoursWorked);
                this.employees[index].leaveDeductions = parseFloat(this.payrollData.leaveDeductions);
                alert('Payroll updated successfully!');
            }
        },
        calculateSalary(employee) {
            return (employee.hourlyRate * employee.hoursWorked) - employee.leaveDeductions;
        },
        sortPayrolls(field) {
            if (this.sortField === field) {
                this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortField = field;
                this.sortDirection = 'asc';
            }
        },
        exportToCSV() {
            const headers = ['Name', 'Position', 'Hourly Rate', 'Hours Worked', 'Leave Deductions', 'Final Salary'];
            const data = this.employees.map(employee => [
                employee.name,
                employee.position,
                employee.hourlyRate,
                employee.hoursWorked,
                employee.leaveDeductions,
                this.calculateSalary(employee)
            ]);

            let csv = headers.join(',') + '\n';
            data.forEach(row => {
                csv += row.join(',') + '\n';
            });

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('hidden', '');
            link.setAttribute('href', url);
            link.setAttribute('download', 'payroll_data.csv');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
        filterPayrolls() {
            this.currentPage = 1;
        },

        // New methods for payslip functionality
        viewPayslip(employee) {
            this.currentPayslip = { ...employee };
            this.showPayslip = true;
        },
        printPayslip() {
            window.print();
        },
        getCurrentPayPeriod() {
            const today = new Date();
            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return `${firstDay.toLocaleDateString()} - ${lastDay.toLocaleDateString()}`;
        },
        getCurrentDate() {
            return new Date().toLocaleDateString();
        }
    }
}
</script>

<style scoped>
/* Your original styles remain completely unchanged */
.dashboard-container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    background-color: #f8fafc;
}

.sections-wrapper {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
}

.calculator-section,
.management-section {
    flex: 1;
}

.calculator-border,
.management-border {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    height: 85%
}

h1 {
    color: #1e293b;
    font-size: 24px;
    margin-bottom: 20px;
    font-weight: 600;
}

h2 {
    color: #1e293b;
    font-size: 20px;
    margin-top: 0;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f5f9;
    font-weight: 600;
}

.management-option {
    margin-bottom: 20px;
    padding: 15px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.management-option:last-child {
    margin-bottom: 0;
}

.management-option h3 {
    margin-top: 0;
    color: #334155;
    font-size: 16px;
    margin-bottom: 12px;
    font-weight: 500;
}

.search-input,
.employee-select {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 14px;
    background-color: white;
    transition: border-color 0.2s;
}

.search-input:focus,
.employee-select:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1);
}

.action-btn {
    background-color: #4361ee;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background-color 0.2s;
    width: 100%;
}

.action-btn:hover {
    background-color: #3a56d4;
}

.payroll-section {
    margin-top: 20px;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
}

.payroll-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    font-size: 14px;
}

.payroll-table th,
.payroll-table td {
    border: 1px solid #e2e8f0;
    padding: 12px 15px;
    text-align: left;
}

.payroll-table th {
    background-color: #f8fafc;
    color: #475569;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.payroll-table th:hover {
    background-color: #f1f5f9;
}

.payroll-table tr:nth-child(even) {
    background-color: #f8fafc;
}

.payroll-table tr:hover {
    background-color: #f1f5f9;
}

/* Form Styles */
.employee-form,
.payroll-form {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.employee-form input,
.payroll-form input {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 14px;
}

/* Table Controls */
.table-controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
}

.export-btn {
    background-color: #10b981;
    width: auto;
    padding: 8px 16px;
}

.export-btn:hover {
    background-color: #0d9f6e;
}

/* Button Styles */
.table-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    margin-right: 5px;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.2s;
}

.view-btn {
    background-color: #4361ee;
    color: white;
}

.view-btn:hover {
    background-color: #3a56d4;
}

/* Pagination */
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
}

.pagination button {
    padding: 6px 12px;
    border: 1px solid #e2e8f0;
    background-color: white;
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
}

.pagination button:hover {
    background-color: #f1f5f9;
}

.pagination button.active {
    background-color: #4361ee;
    color: white;
    border-color: #4361ee;
}

/* Status Indicators */
.status-indicator {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
}

.status-present {
    background-color: #d1fae5;
    color: #065f46;
}

.status-late {
    background-color: #fef3c7;
    color: #92400e;
}

.status-absent {
    background-color: #fee2e2;
    color: #991b1b;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .sections-wrapper {
        flex-direction: column;
    }

    .table-controls {
        flex-direction: column;
        gap: 10px;
    }

    .export-btn {
        width: 100%;
    }

    .payroll-table th,
    .payroll-table td {
        padding: 8px;
        font-size: 13px;
    }

    .table-btn {
        display: block;
        width: 100%;
        margin-bottom: 5px;
    }

    .calculator-border,
    .management-border {
        padding: 15px;
    }
}

/* New styles for payslip modal only */
.payslip-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.payslip-container {
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    max-width: 800px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.payslip-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.payslip-header h2 {
    color: #4361ee;
    margin: 0;
    font-size: 24px;
}

.company-info {
    text-align: right;
}

.company-info h3 {
    margin: 0 0 5px 0;
    color: #333;
}

.employee-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8fafc;
    border-radius: 6px;
}

.payslip-details {
    margin: 20px 0;
}

.payslip-table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
}

.payslip-table td {
    padding: 10px;
    border: 1px solid #e2e8f0;

}

.payslip-table tr:nth-child(even) {
    background-color: #f8fafc;
}

.net-pay {
    text-align: right;
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
    padding-top: 10px;
    border-top: 2px solid #4361ee;
}

.payslip-footer {
    text-align: center;
    margin-top: 30px;
    padding-top: 15px;
    border-top: 1px solid #eee;
    font-style: italic;
    color: #64748b;
}

.payslip-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}

@media print {
    body * {
        visibility: hidden;
    }

    .payslip-container,
    .payslip-container * {
        visibility: visible;
    }

    .payslip-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    .payslip-actions {
        display: none;
    }
}

@media (max-width: 768px) {
    .payslip-container {
        padding: 15px;
    }

    .employee-info {
        flex-direction: column;
        gap: 10px;
    }

    .payslip-actions {
        flex-direction: column;
        gap: 10px;
    }

    .payslip-actions button {
        width: 100%;
    }
}
</style>