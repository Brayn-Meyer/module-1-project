import { createStore } from 'vuex'

import employee_info from '@/store/employee_info.json'
import payroll_info from '@/store/payroll_data.json'
import attendance_info from '@/store/attendance.json'
export default createStore({
    state: {
        employee_info: [
            {
                employeeId: 1,
                name: "Sibongile Nkosi",
                position: "Software Engineer",
                department: "Development",
                salary: 70000,
                employmentHistory: "Joined in 2015, promoted to Senior in 2018",
                contact: "sibongile.nkosi@moderntech.com"
            },
            {
                employeeId: 2,
                name: "Lungile Moyo",
                position: "HR Manager",
                department: "HR",
                salary: 80000,
                employmentHistory: "Joined in 2013, promoted to Manager in 2017",
                contact: "lungile.moyo@moderntech.com"
            },
            {
                employeeId: 3,
                name: "Thabo Molefe",
                position: "Quality Analyst",
                department: "QA",
                salary: 55000,
                employmentHistory: "Joined in 2018",
                contact: "thabo.molefe@moderntech.com"
            },
            {
                employeeId: 4,
                name: "Keshav Naidoo",
                position: "Sales Representative",
                department: "Sales",
                salary: 60000,
                employmentHistory: "Joined in 2020",
                contact: "keshav.naidoo@moderntech.com"
            },
            {
                employeeId: 5,
                name: "Zanele Khumalo",
                position: "Marketing Specialist",
                department: "Marketing",
                salary: 58000,
                employmentHistory: "Joined in 2019",
                contact: "zanele.khumalo@moderntech.com"
            },
            {
                employeeId: 6,
                name: "Sipho Zulu",
                position: "UI/UX Designer",
                department: "Design",
                salary: 65000,
                employmentHistory: "Joined in 2016",
                contact: "sipho.zulu@moderntech.com"
            },
            {
                employeeId: 7,
                name: "Naledi Moeketsi",
                position: "DevOps Engineer",
                department: "IT",
                salary: 72000,
                employmentHistory: "Joined in 2017",
                contact: "naledi.moeketsi@moderntech.com"
            },
            {
                employeeId: 8,
                name: "Farai Gumbo",
                position: "Content Strategist",
                department: "Marketing",
                salary: 56000,
                employmentHistory: "Joined in 2021",
                contact: "farai.gumbo@moderntech.com"
            },
            {
                employeeId: 9,
                name: "Karabo Dlamini",
                position: "Accountant",
                department: "Finance",
                salary: 62000,
                employmentHistory: "Joined in 2018",
                contact: "karabo.dlamini@moderntech.com"
            },
            {
                employeeId: 10,
                name: "Fatima Patel",
                position: "Customer Support Lead",
                department: "Support",
                salary: 58000,
                employmentHistory: "Joined in 2016",
                contact: "fatima.patel@moderntech.com"
            }
        ],
        attendance: [
            {
                employeeId: 1,
                name: "Sibongile Nkosi",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-27",
                        status: "Present"
                    },
                    {
                        date: "2025-07-28",
                        status: "Present"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2025-07-22",
                        reason: "Sick Leave",
                        status: "Approved"
                    },
                    {
                        date: "2024-12-01",
                        reason: "Personal",
                        status: "Pending"
                    }
                ]
            },
            {
                employeeId: 2,
                name: "Lungile Moyo",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-28",
                        status: "Present"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2025-07-15",
                        reason: "Family Responsibility",
                        status: "Denied"
                    },
                    {
                        date: "2024-12-02",
                        reason: "Vacation",
                        status: "Approved"
                    }
                ]
            },
            {
                employeeId: 3,
                name: "Thabo Molefe",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Present"
                    },
                    {
                        date: "2025-07-28",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2025-07-10",
                        reason: "Medical Appointment",
                        status: "Approved"
                    },
                    {
                        date: "2024-12-05",
                        reason: "Personal",
                        status: "Pending"
                    }
                ]
            },
            {
                employeeId: 4,
                name: "Keshav Naidoo",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Present"
                    },
                    {
                        date: "2025-07-28",
                        status: "Present"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2025-07-20",
                        reason: "Bereavement",
                        status: "Approved"
                    }
                ]
            },
            {
                employeeId: 5,
                name: "Zanele Khumalo",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-28",
                        status: "Present"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2024-12-01",
                        reason: "Childcare",
                        status: "Pending"
                    }
                ]
            },
            {
                employeeId: 6,
                name: "Sipho Zulu",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-28",
                        status: "Present"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2025-07-18",
                        reason: "Sick Leave",
                        status: "Approved"
                    }
                ]
            },
            {
                employeeId: 7,
                name: "Naledi Moeketsi",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Present"
                    },
                    {
                        date: "2025-07-28",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2025-07-22",
                        reason: "Vacation",
                        status: "Pending"
                    }
                ]
            },
            {
                employeeId: 8,
                name: "Farai Gumbo",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-27",
                        status: "Present"
                    },
                    {
                        date: "2025-07-28",
                        status: "Present"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2024-12-02",
                        reason: "Medical Appointment",
                        status: "Approved"
                    }
                ]
            },
            {
                employeeId: 9,
                name: "Karabo Dlamini",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Present"
                    },
                    {
                        date: "2025-07-28",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2025-07-19",
                        reason: "Childcare",
                        status: "Denied"
                    }
                ]
            },
            {
                employeeId: 10,
                name: "Fatima Patel",
                attendance: [
                    {
                        date: "2025-07-25",
                        status: "Present"
                    },
                    {
                        date: "2025-07-26",
                        status: "Present"
                    },
                    {
                        date: "2025-07-27",
                        status: "Absent"
                    },
                    {
                        date: "2025-07-28",
                        status: "Present"
                    },
                    {
                        date: "2025-07-29",
                        status: "Present"
                    }
                ],
                leaveRequests: [
                    {
                        date: "2024-12-03",
                        reason: "Vacation",
                        status: "Pending"
                    }
                ]
            }
        ],
        payroll_data: [
            {
                employeeId: 1,
                hoursWorked: 160,
                leaveDeductions: 8,
                finalSalary: 69500
            },
            {
                employeeId: 2,
                hoursWorked: 150,
                leaveDeductions: 10,
                finalSalary: 79000
            },
            {
                employeeId: 3,
                hoursWorked: 170,
                leaveDeductions: 4,
                finalSalary: 54800
            },
            {
                employeeId: 4,
                hoursWorked: 165,
                leaveDeductions: 6,
                finalSalary: 59700
            },
            {
                employeeId: 5,
                hoursWorked: 158,
                leaveDeductions: 5,
                finalSalary: 57850
            },
            {
                employeeId: 6,
                hoursWorked: 168,
                leaveDeductions: 2,
                finalSalary: 64800
            },
            {
                employeeId: 7,
                hoursWorked: 175,
                leaveDeductions: 3,
                finalSalary: 71800
            },
            {
                employeeId: 8,
                hoursWorked: 160,
                leaveDeductions: 0,
                finalSalary: 56000
            },
            {
                employeeId: 9,
                hoursWorked: 155,
                leaveDeductions: 5,
                finalSalary: 61500
            },
            {
                employeeId: 10,
                hoursWorked: 162,
                leaveDeductions: 4,
                finalSalary: 57750
            }
        ],
    },
    getters: {
        attendanceWithCurrentDate: state => {
            return state.attendance.map(emp => ({
                ...emp,
                currentDate: emp.attendance && emp.attendance.length > 0
                    ? emp.attendance[emp.attendance.length - 1].date
                    : ''
            }));
        },
        combinedSalaries: state => {
            return state.employee_info.reduce((total, item) => total + item.salary, 0);
        },
        pendingLeaveRequests: state => {
            return state.attendance.reduce((count, emp) => {
                return count + emp.leaveRequests.filter(req => req.status === 'Pending').length;
            }, 0);
        },
        approvedLeaveRequests: state => {
            return state.attendance.reduce((count, emp) => {
                return count + emp.leaveRequests.filter(req => req.status === 'Approved').length;
            }, 0);
        },
        deniedLeaveRequests: state => {
            return state.attendance.reduce((count, emp) => {
                return count + emp.leaveRequests.filter(req => req.status === 'Denied').length;
            }, 0);
        }
    },
    mutations: {
        update_employee_info(payload) { //payload is any info 
        this.state.employee_info = payload
        },
        add_to_employee_info(state, payload) {
            state.employee_info.push(payload)
        },
        remove_employee(state, index) {
            state.employee_info.splice(index, 1);
        },

        update_attendance(payload) { //payload is any info 
            this.state.attendance = payload
        },
        add_to_attendance(state, payload) {
            state.attendance.push(payload)
        },

        update_payroll_data(payload) { //payload is any info 
            this.state.payroll_data = payload
        },
        add_to_payroll_data(payload) {
            this.state.payroll_data.push(payload)
        },

        updateLeaveStatus(state, payload) {
            const { empIndex, reqIndex, newStatus } = payload;
            state.attendance[empIndex].leaveRequests[reqIndex].status = newStatus;
        }
    },
    actions: {
        async fetch_employee_info() {
            let employees = await employee_info.json()
            this.store.commit('update_employee_info', employees)
        },
        async fetch_attendance() {
            let attendance = await attendance_info.json()
            this.store.commit('update_attendance', attendance)
        },
        async fetch_payroll_data() {
            let payroll = await payroll_info.json()
            this.store.commit('add_to_payroll_data', payroll)
        }
    },
    modules: {
    }
})
