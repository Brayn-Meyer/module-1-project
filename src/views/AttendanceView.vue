<template>
    <navbar-comp />

    <div class="attendance-container">
        <div class="controls">
            <h2>Employee Attendance</h2>
            <div>
                <input type="text" v-model="searchQuery" class="search-box" placeholder="Search employees...">

            </div>
        </div>

        <div class="master-date-control">
            <span class="master-date-label">Set Date for All:</span>
            <input type="date" v-model="masterDate" class="date-input" @change="updateAllDates">
        </div>

        <table>
            <thead>
                <tr>
                    <th></th>
                    <th>Employee</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>✅ Status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(employee, index) in filteredEmployees" :key="employee.employeeId">
                    <td>{{ index + 1 }}</td>
                    <td class="employee-cell">
                        <div class="avatar" :style="{ backgroundColor: getAvatarColor(employee.name) }">
                            {{ getInitials(employee.name) }}
                        </div>
                        {{ employee.name }}
                    </td>
                    <td>{{ employee.department || 'General' }}</td>
                    <td>
                        <input type="date" v-model="employee.currentDate" class="date-input employee-date"
                            @change="updateMasterDateIfUniform">
                    </td>
                    <td>
                        <span :class="getStatusClass(employee)">
                            {{ getCurrentStatus(employee) }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="legend">
            <div class="legend-item">
                <div class="legend-color" style="background-color: #27ae60;"></div>
                <span>Present</span>
            </div>
            <div class="legend-item">
                <div class="legend-color" style="background-color:#e52b2b;"></div>
                <span>Absent</span>
            </div>
        </div>
    </div>
    <div>
        <!-- <EmployeeCard v-for="employer in $store.state.employee_info" :info="employer"/> -->
        <attendance-card :info="employee" />

    </div>

    <footer-comp />
</template>
<script>
import FooterComp from '@/components/FooterComp.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import AttendanceCard from '@/components/AttendanceCard.vue';
export default {
    components: {
        NavbarComp,
        AttendanceCard,
        FooterComp
    },

    name: 'Attendance',
    data() {
        return {
            attendanceAndLeave: [
                {
                    "employeeId": 1,
                    "name": "Sibongile Nkosi",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present",
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2025-07-22",
                            "reason": "Sick Leave",
                            "status": "Approved"
                        },
                        {
                            "date": "2024-12-01",
                            "reason": "Personal",
                            "status": "Pending"
                        }
                    ]
                },
                {
                    "employeeId": 2,
                    "name": "Lungile Moyo",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2025-07-15",
                            "reason": "Family Responsibility",
                            "status": "Denied"
                        },
                        {
                            "date": "2024-12-02",
                            "reason": "Vacation",
                            "status": "Approved"
                        }
                    ]
                },
                {
                    "employeeId": 3,
                    "name": "Thabo Molefe",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2025-07-10",
                            "reason": "Medical Appointment",
                            "status": "Approved"
                        },
                        {
                            "date": "2024-12-05",
                            "reason": "Personal",
                            "status": "Pending"
                        }
                    ]
                },
                {
                    "employeeId": 4,
                    "name": "Keshav Naidoo",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2025-07-20",
                            "reason": "Bereavement",
                            "status": "Approved"
                        }
                    ]
                },
                {
                    "employeeId": 5,
                    "name": "Zanele Khumalo",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2024-12-01",
                            "reason": "Childcare",
                            "status": "Pending"
                        }
                    ]
                },
                {
                    "employeeId": 6,
                    "name": "Sipho Zulu",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2025-07-18",
                            "reason": "Sick Leave",
                            "status": "Approved"
                        }
                    ]
                },
                {
                    "employeeId": 7,
                    "name": "Naledi Moeketsi",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2025-07-22",
                            "reason": "Vacation",
                            "status": "Pending"
                        }
                    ]
                },
                {
                    "employeeId": 8,
                    "name": "Farai Gumbo",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2024-12-02",
                            "reason": "Medical Appointment",
                            "status": "Approved"
                        }
                    ]
                },
                {
                    "employeeId": 9,
                    "name": "Karabo Dlamini",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2025-07-19",
                            "reason": "Childcare",
                            "status": "Denied"
                        }
                    ]
                },
                {
                    "employeeId": 10,
                    "name": "Fatima Patel",
                    "attendance": [
                        {
                            "date": "2025-07-25",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-26",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-27",
                            "status": "Absent"
                        },
                        {
                            "date": "2025-07-28",
                            "status": "Present"
                        },
                        {
                            "date": "2025-07-29",
                            "status": "Present"
                        }
                    ],
                    "leaveRequests": [
                        {
                            "date": "2024-12-03",
                            "reason": "Vacation",
                            "status": "Pending"
                        }
                    ]
                }
            ].map(emp => ({
                ...emp,
                currentDate: emp.attendance && emp.attendance.length > 0
                    ? emp.attendance[emp.attendance.length - 1].date
                    : ''
            })),
            searchQuery: '',
            selectedDate: '',
            masterDate: '',
            availableDates: []

        };
    },
    methods: {
        getAvatarColor(name) {
            // Simple color hash
            return '#3498db';
        },
        getInitials(name) {
            return name.split(' ').map(n => n[0]).join('');
        },
        getStatusClass(employee) {
            const status = this.getCurrentStatus(employee);
            if (status === 'Present') return 'present';
            if (status === 'Absent') return 'absent';
            return 'unknown';
        },
        getCurrentStatus(employee) {
            if (employee.attendance && employee.attendance.length > 0) {
                const record = employee.attendance.find(a => a.date === employee.currentDate);
                return record ? record.status : 'Unknown';
            }
            return 'Unknown';
        },
        updateMasterDateIfUniform() { },
        updateAllDates() {
            this.attendanceAndLeave.forEach(emp => {
                emp.currentDate = this.masterDate;
            });
        },
        formatDate(date) { return date; }
    },
    computed: {
        filteredEmployees() {
            return this.attendanceAndLeave.filter(emp =>
                emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    }
}
</script>
<style>
.attendance-container {
    max-width: 1000px;
    margin: 0 auto;
    background-color: rgb(238, 234, 226);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

h2 {
    color: #2c3e50;
    margin-top: 0;
    display: flex;
    align-items: center;
    gap: 10px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th {
    background-color: #133c58;
    color: white;
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
}

td {
    padding: 12px 15px;
    border-bottom: 1px solid #e0e0e0;
    vertical-align: middle;
}

tr:hover {
    background-color: #f8f9fa;
}

.avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    margin-right: 10px;
}

.employee-cell {
    display: flex;
    align-items: center;
}

.present {
    color: #27ae60;
    font-weight: 600;
    background-color: #e8f5e9;
    padding: 5px 10px;
    border-radius: 4px;
}

.absent {
    color: #e52b2b;
    font-weight: 600;
    background-color: #ffebee;
    padding: 5px 10px;
    border-radius: 4px;
}

.unknown {
    color: #999;
    font-weight: 600;
    background-color: #f4f4f4;
    padding: 5px 10px;
    border-radius: 4px;
}


.date-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
}

.controls {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    align-items: center;
}

.search-box {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
}

.date-filter {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-left: 10px;
}

.legend {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    font-size: 14px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.legend-color {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}

.master-date-control {
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.master-date-label {
    font-weight: 600;
    color: #2c3e50;
}
</style>