<template>
    <navbar-comp />
    <div class="dashboard-container">
        <div class="sections-wrapper">
            <div class="calculator-section">
                <h2>Payroll Calculator</h2>
                <div class="section-border">
                    <paycal-comp />
                </div>
            </div>
            <div class="management-section">
                <h2>Employee Management</h2>
                <div class="section-border">
                    <div class="management-option">
                        <h3>Search Employees</h3>
                        <input v-model="searchQuery" placeholder="Enter employee name..." class="input-field">
                        <button @click="searchEmployees" class="btn">Search</button>
                    </div>

                    <div class="management-option">
                        <h3>Update Employees</h3>
                        <select v-model="selectedEmployee" @change="loadEmployeeData" class="input-field">
                            <option value="">Select employee to update</option>
                            <option v-for="e in filteredEmployees" :key="e.id" :value="e.id">{{ e.name }}</option>
                        </select>
                        <div v-if="selectedEmployeeData" class="form">
                            <input v-model="selectedEmployeeData.name" placeholder="Name">
                            <input v-model="selectedEmployeeData.position" placeholder="Position">
                            <input v-model="selectedEmployeeData.hourlyRate" placeholder="Hourly Rate" type="number">
                            <button @click="updateEmployee" class="btn">Update</button>
                        </div>
                    </div>

                    <div class="management-option">
                        <h3>Update Payrolls</h3>
                        <select v-model="selectedPayrollEmployee" class="input-field">
                            <option value="">Select employee payroll</option>
                            <option v-for="e in filteredEmployees" :key="e.id" :value="e.id">{{ e.name }}</option>
                        </select>
                        <div v-if="selectedPayrollEmployee" class="form">
                            <input v-model="payrollData.hoursWorked" placeholder="Hours Worked" type="number">
                            <input v-model="payrollData.leaveDeductions" placeholder="Leave Deductions" type="number">
                            <button @click="updatePayroll" class="btn">Update Payroll</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="payroll-section">
            <h1>Employee Payrolls</h1>
            <div class="table-controls">
                <button @click="exportToCSV" class="btn export-btn">Export to CSV</button>
                <input v-model="payrollFilter" placeholder="Filter payrolls..." class="input-field">
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
                    <tr v-for="e in filteredPayrollData" :key="e.id">
                        <td>{{ e.name }}</td>
                        <td>{{ e.position }}</td>
                        <td>R{{ e.hourlyRate.toFixed(2) }}</td>
                        <td>{{ e.hoursWorked }}</td>
                        <td>R{{ e.leaveDeductions.toFixed(2) }}</td>
                        <td>R{{ calculateSalary(e).toFixed(2) }}</td>
                        <td><button @click="viewPayslip(e)" class="btn view-btn">View Payslip</button></td>
                    </tr>
                </tbody>
            </table>

            <div class="pagination" v-if="totalPages > 1">
                <button v-for="page in totalPages" :key="page" @click="currentPage = page"
                    :class="{ active: currentPage === page }">{{ page }}</button>
            </div>
        </div>
        <div v-if="showPayslip" class="modal">
            <div class="payslip">
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
                    <button @click="printPayslip" class="btn">Print Payslip</button>
                    <button @click="showPayslip = false" class="btn">Close</button>
                </div>
            </div>
        </div>
    </div>
    <footer-comp />
</template>
<script>
import NavbarComp from '@/components/NavbarComp.vue'
import PaycalComp from '@/components/PaycalComp.vue'
import FooterComp from '@/components/FooterComp.vue'
import payrollDataJson from '@/store/payroll_data.json'
import attendanceJson from '@/store/attendance.json'
export default {
    components: { NavbarComp, PaycalComp, FooterComp },
    data() {
        return {
            searchQuery: '',
            selectedEmployee: '',
            selectedEmployeeData: null,
            selectedPayrollEmployee: '',
            payrollData: { hoursWorked: 0, leaveDeductions: 0 },
            payrollFilter: '',
            currentPage: 1,
            itemsPerPage: 10,
            sortField: 'name',
            sortDirection: 'asc',
            showPayslip: false,
            currentPayslip: null,
            employees: [], // Will load from localStorage or fallback to payrollDataJson + attendanceJson
        }
    },
    created() {
        // Fetch employees from localStorage if available, otherwise use payrollDataJson + attendanceJson for names
        const stored = localStorage.getItem('employees');
        if (stored) {
            try {
                this.employees = JSON.parse(stored);
            } catch (e) {
                this.employees = [];
            }
        }
        if (
            !this.employees.length &&
            payrollDataJson &&
            payrollDataJson.payrollData &&
            attendanceJson &&
            attendanceJson.attendanceAndLeave
        ) {
            // Map payroll data and merge names from attendance data
            this.employees = payrollDataJson.payrollData.map((item) => {
                const attendance = attendanceJson.attendanceAndLeave.find(
                    (a) => a.employeeId === item.employeeId
                );
                return {
                    id: item.employeeId,
                    name: attendance ? attendance.name : `Employee ${item.employeeId}`,
                    position: 'Staff',
                    hourlyRate:
                        item.finalSalary && item.hoursWorked
                            ? item.finalSalary / item.hoursWorked
                            : 0,
                    hoursWorked: item.hoursWorked,
                    leaveDeductions: item.leaveDeductions,
                };
            });
        }
    },
    watch: {
        employees: {
            handler(newVal) {
                // Save employees to localStorage on change
                localStorage.setItem('employees', JSON.stringify(newVal));
            },
            deep: true,
        },
    },
    computed: {
        filteredEmployees() {
            return this.employees.filter(e =>
                e.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        filteredPayrollData() {
            let filtered = [...this.employees];
            if (this.payrollFilter) {
                filtered = filtered.filter(e =>
                    e.name.toLowerCase().includes(this.payrollFilter.toLowerCase()) ||
                    e.position.toLowerCase().includes(this.payrollFilter.toLowerCase())
                );
            }
            filtered.sort((a, b) => {
                let modifier = this.sortDirection === 'asc' ? 1 : -1;
                if (a[this.sortField] < b[this.sortField]) return -1 * modifier;
                if (a[this.sortField] > b[this.sortField]) return 1 * modifier;
                return 0;
            });
            const start = (this.currentPage - 1) * this.itemsPerPage;
            return filtered.slice(start, start + this.itemsPerPage);
        },
        totalPages() {
            return Math.ceil(this.employees.length / this.itemsPerPage);
        }
    },
    methods: {
        searchEmployees() {
            // Optionally implement search logic
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
        calculateSalary(e) {
            return (e.hourlyRate * e.hoursWorked) - e.leaveDeductions;
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
            const data = this.employees.map(e => [
                e.name, e.position, e.hourlyRate, e.hoursWorked,
                e.leaveDeductions, this.calculateSalary(e)
            ]);
            const csv = [headers, ...data].map(row => row.join(',')).join('\n');
            const blob = new Blob([csv], { type: 'text/csv' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'payroll_data.csv';
            link.click();
        },
        viewPayslip(e) {
            this.currentPayslip = { ...e };
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
.dashboard-container {
    font-family: 'Segoe UI', sans-serif;
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

.section-border {
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    height: 85%;
}

h1,
h2,
h3 {
    color: #1e293b;
    margin-top: 0;
}

h1 {
    font-size: 24px;
    margin-bottom: 20px;
}

h2 {
    font-size: 20px;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #f1f5f9;
}

h3 {
    font-size: 16px;
    margin-bottom: 12px;
}

.management-option {
    margin-bottom: 20px;
    padding: 15px;
    background: white;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.input-field {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 14px;
    background: white;
}

.input-field:focus {
    outline: none;
    border-color: #4361ee;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.1);
}

.btn {
    background-color: #4361ee;
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
    width: 100%;
}

.btn:hover {
    background-color: #3a56d4;
}

.export-btn {
    background-color: #10b981;
}

.export-btn:hover {
    background-color: #0d9f6e;
}

.view-btn {
    background-color: #4361ee;
}

.view-btn:hover {
    background-color: #3a56d4;
}

.payroll-section {
    margin-top: 20px;
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
}

.table-controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
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
    cursor: pointer;
}

.payroll-table tr:nth-child(even) {
    background-color: #f8fafc;
}

.payroll-table tr:hover {
    background-color: #f1f5f9;
}

.form {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
}

.pagination button {
    padding: 6px 12px;
    border: 1px solid #e2e8f0;
    background: white;
    cursor: pointer;
    border-radius: 6px;
}

.pagination button.active {
    background-color: #4361ee;
    color: white;
    border-color: #4361ee;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.payslip {
    background: white;
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

.employee-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 15px;
    background: #f8fafc;
    border-radius: 6px;
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

.net-pay {
    text-align: right;
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0;
    padding-top: 10px;
    border-top: 2px solid #4361ee;
}

.payslip-actions {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
}

@media (max-width: 768px) {
    .sections-wrapper {
        flex-direction: column;
    }

    .table-controls {
        flex-direction: column;
        gap: 10px;
    }

    .employee-info {
        flex-direction: column;
        gap: 10px;
    }

    .payslip-actions {
        flex-direction: column;
    }

    .payslip-actions button,
    .btn {
        width: 100%;
    }
}

@media print {
    body * {
        visibility: hidden;
    }

    .payslip,
    .payslip * {
        visibility: visible;
    }

    .payslip {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }

    .payslip-actions {
        display: none;
    }
}
</style>