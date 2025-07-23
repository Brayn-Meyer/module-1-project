import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
    state: {
        employee_info: [],
        payroll_data: [],
        attendance: [
            // {
            //     employeeId: 1,
            //     name: "Sibongile Nkosi",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2025-07-22",
            //             reason: "Sick Leave",
            //             status: "Approved"
            //         },
            //         {
            //             date: "2024-12-01",
            //             reason: "Personal",
            //             status: "Pending"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 2,
            //     name: "Lungile Moyo",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2025-07-15",
            //             reason: "Family Responsibility",
            //             status: "Denied"
            //         },
            //         {
            //             date: "2024-12-02",
            //             reason: "Vacation",
            //             status: "Approved"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 3,
            //     name: "Thabo Molefe",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2025-07-10",
            //             reason: "Medical Appointment",
            //             status: "Approved"
            //         },
            //         {
            //             date: "2024-12-05",
            //             reason: "Personal",
            //             status: "Pending"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 4,
            //     name: "Keshav Naidoo",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2025-07-20",
            //             reason: "Bereavement",
            //             status: "Approved"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 5,
            //     name: "Zanele Khumalo",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2024-12-01",
            //             reason: "Childcare",
            //             status: "Pending"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 6,
            //     name: "Sipho Zulu",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2025-07-18",
            //             reason: "Sick Leave",
            //             status: "Approved"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 7,
            //     name: "Naledi Moeketsi",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2025-07-22",
            //             reason: "Vacation",
            //             status: "Pending"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 8,
            //     name: "Farai Gumbo",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2024-12-02",
            //             reason: "Medical Appointment",
            //             status: "Approved"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 9,
            //     name: "Karabo Dlamini",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2025-07-19",
            //             reason: "Childcare",
            //             status: "Denied"
            //         }
            //     ]
            // },
            // {
            //     employeeId: 10,
            //     name: "Fatima Patel",
            //     attendance: [
            //         {
            //             date: "2025-07-25",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-26",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-27",
            //             status: "Absent"
            //         },
            //         {
            //             date: "2025-07-28",
            //             status: "Present"
            //         },
            //         {
            //             date: "2025-07-29",
            //             status: "Present"
            //         }
            //     ],
            //     leaveRequests: [
            //         {
            //             date: "2024-12-03",
            //             reason: "Vacation",
            //             status: "Pending"
            //         }
            //     ]
            // }
        ],
        leave_request: [],
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
                return count + state.leave_request.filter(req => req.status === 'Pending').length;
            }, 0);
        },
        approvedLeaveRequests: state => {
            return state.attendance.reduce((count, emp) => {
                return count + state.leave_request.filter(req => req.status === 'Approved').length;
            }, 0);
        },
        deniedLeaveRequests: state => {
            return state.attendance.reduce((count, emp) => {
                return count + state.leave_request.filter(req => req.status === 'Denied').length;
            }, 0);
        }
    },
    mutations: {
        get_employee_info(state, payload) {
            state.employee_info = payload;
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

        get_payroll_data(state, payload) {
            state.payroll_data = payload;
        },
        add_to_payroll_data(payload) {
            this.state.payroll_data.push(payload)
        },

        updateLeaveStatus(state, payload) {
            const { empIndex, reqIndex, newStatus } = payload;
            state.attendance[empIndex].leaveRequests[reqIndex].status = newStatus;
        },

        get_attendance(state, payload){
            state.attendance = payload;
        },

        get_leave_request(state, payload){
            state.leave_request = payload;
        }
    },
    actions: {
        async fetch_employee_info({commit}) {
            let data = await axios.get('http://localhost:3315/employees')
            commit('get_employee_info', data.data.employees)
            console.log(data.data.employees)
        },
        async fetch_payroll_info({commit}) {
            let data = await axios.get('http://localhost:3315/payrolls')
            commit('get_payroll_data', data.data.payrolls)
            console.log(data.data.payrolls)
        },
        async fetch_attendance_info({commit}) {
            let data = await axios.get('http://localhost:3315/attendance')
            commit('get_attendance', data.data.attendance)
            console.log(data.data.attendance)
        },
        async fetch_leave_request_info({commit}) {
            let data = await axios.get('http://localhost:3315/leaverequest')
            commit('get_leave_request', data.data.leave_request)
            console.log(data.data.leave_request)
        },

        async remove_employee({commit}, employeeID) {
            let data = await axios.delete(`http://localhost:3315/employees/${employeeID}`)
            console.log(data.data.employees)
            commit('update_employee_info', data.data.employees)
        }
    },
    modules: {
    }
})
