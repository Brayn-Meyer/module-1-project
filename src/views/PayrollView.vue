<template>
    <navbar-comp/>
    <div>
        <paycal-comp/>
        <h1>Employee Payrolls</h1>
        <table>
            <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Hourly Rate</th>
                <th>Hours Worked</th>
                <th>Leave Deductions</th>
                <th>Final Salary</th>
            </tr>
            <PayrollCard :info="this.$store.state.payroll_data[0]" :personal_info="this.$store.state.employee_info[0]"/>
            <PayrollCard :info="this.$store.state.payroll_data[1]" :personal_info="this.$store.state.employee_info[1]"/>
            <PayrollCard :info="this.$store.state.payroll_data[2]" :personal_info="this.$store.state.employee_info[2]"/>
            <PayrollCard :info="this.$store.state.payroll_data[3]" :personal_info="this.$store.state.employee_info[3]"/>
            <PayrollCard :info="this.$store.state.payroll_data[4]" :personal_info="this.$store.state.employee_info[4]"/>
            <PayrollCard :info="this.$store.state.payroll_data[5]" :personal_info="this.$store.state.employee_info[5]"/>
            <PayrollCard :info="this.$store.state.payroll_data[6]" :personal_info="this.$store.state.employee_info[6]"/>
            <PayrollCard :info="this.$store.state.payroll_data[7]" :personal_info="this.$store.state.employee_info[7]"/>
            <PayrollCard :info="this.$store.state.payroll_data[8]" :personal_info="this.$store.state.employee_info[8]"/>
            <PayrollCard :info="this.$store.state.payroll_data[9]" :personal_info="this.$store.state.employee_info[9]"/>
        </table>
    </div>
    <footer-comp/>
</template>
<script>
import PayrollCard from '@/components/PayrollCard.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import PaycalComp from '@/components/PaycalComp.vue';
import FooterComp from '@/components/FooterComp.vue';
export default {
    components : {
        PayrollCard,
        NavbarComp,
        PaycalComp,
        FooterComp
    },
    data() {
        return {
            p_info : this.$store.state.employee_info
        }
    }
}
</script>
<style scoped>
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
.employee-form, .payroll-form {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.employee-form input, .payroll-form input {
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

.edit-btn {
    background-color: #3b82f6;
    color: white;
}

.edit-btn:hover {
    background-color: #2563eb;
}

.delete-btn {
    background-color: #ef4444;
    color: white;
}

.delete-btn:hover {
    background-color: #dc2626;
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

/* Status Indicators - similar to your image */
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
</style>

