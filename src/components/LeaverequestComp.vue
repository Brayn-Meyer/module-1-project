<template>
  <div class="compact-leave-card">
    <div class="card-header" @click="isExpanded = !isExpanded">
      <div class="employee-info">
        <div class="avatar">{{ getInitials(info.name) }}</div>
        <div>
          <h3>{{ info.name }}</h3>
          <p>{{ info.leaveRequests.length }} leave request(s)</p>
        </div>
      </div>
      <div class="status-summary">
        <span class="badge pending">{{ pendingCount }} Pending</span>
        <span class="badge approved">{{ approvedCount }} Approved</span>
        <span class="badge denied">{{ deniedCount }} Denied</span>
        <i class="toggle-icon" :class="{'fas fa-chevron-down': !isExpanded, 'fas fa-chevron-up': isExpanded}"></i>
      </div>
    </div>
    <div class="card-body" v-if="isExpanded">
      <div class="request-item" v-for="(request, index) in info.leaveRequests" :key="index">
        <div class="request-date">
          <span class="day">{{ getDay(request.date) }}</span>
          <span class="month">{{ getMonth(request.date) }}</span>
        </div>
        <div class="request-details">
          <p class="reason">{{ request.reason }}</p>
          <div class="request-footer">
            <span class="status" :class="request.status.toLowerCase()">{{ request.status }}</span>
            <div class="actions" v-if="request.status === 'Pending'">
              <button @click.stop="updateLeaveStatus(request, 'Approved')" class="btn-approve">
                <i class="fas fa-check"></i>
              </button>
              <button @click.stop="updateLeaveStatus(request, 'Denied')" class="btn-deny">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CompactLeaveCard',
  props: ["info"],
  data() {
    return {
      isExpanded: false
    }
  },
  computed: {
    pendingCount() {
      return this.info.leaveRequests.filter(r => r.status === 'Pending').length
    },
    approvedCount() {
      return this.info.leaveRequests.filter(r => r.status === 'Approved').length
    },
    deniedCount() {
      return this.info.leaveRequests.filter(r => r.status === 'Denied').length
    }
  },
  methods: {
    updateLeaveStatus(leaveRequest, newStatus) {
      const empIndex = this.$store.state.attendance.findIndex(
        emp => emp.employeeId === this.info.employeeId
      );
      const reqIndex = this.info.leaveRequests.findIndex(
        req => req === leaveRequest
      );
      this.$store.commit("updateLeaveStatus", { empIndex, reqIndex, newStatus });
    },
    getDay(dateString) {
      if (!dateString) return '';
      return new Date(dateString).getDate();
    },
    getMonth(dateString) {
      if (!dateString) return '';
      return new Date(dateString).toLocaleString('default', { month: 'short' });
    },
    getInitials(name) {
      if (!name) return '';
      return name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
  }
}
</script>
<style scoped>
/* Compact Card Container */
.compact-leave-card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}
/* Header Section */
.card-header {
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}
.card-header:hover {
  background-color: #f1f5f9;
}
.employee-info {
  display: flex;
  align-items: center;
  gap: 12px;
}
.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 13px;
}
.employee-info h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}
.employee-info p {
  margin: 2px 0 0;
  font-size: 12px;
  color: #64748b;
}
.status-summary {
  display: flex;
  align-items: center;
  gap: 8px;
}
.badge {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 12px;
  font-weight: 600;
}
.badge.pending {
  background-color: #ffedd5;
  color: #9a3412;
}
.badge.approved {
  background-color: #dcfce7;
  color: #166534;
}
.badge.denied {
  background-color: #fee2e2;
  color: #991b1b;
}
.toggle-icon {
  font-size: 12px;
  color: #64748b;
  margin-left: 8px;
}
/* Expanded Content */
.card-body {
  padding: 8px 16px;
}
.request-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}
.request-item:last-child {
  border-bottom: none;
}
.request-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 40px;
}
.request-date .day {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
}
.request-date .month {
  font-size: 10px;
  text-transform: uppercase;
  color: #64748b;
  letter-spacing: 0.5px;
}
.request-details {
  flex-grow: 1;
}
.request-details .reason {
  margin: 0;
  font-size: 13px;
  color: #334155;
  line-height: 1.4;
}
.request-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}
.status {
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 10px;
  font-weight: 600;
}
.status.pending {
  background-color: #ffedd5;
  color: #9a3412;
}
.status.approved {
  background-color: #dcfce7;
  color: #166534;
}
.status.denied {
  background-color: #fee2e2;
  color: #991b1b;
}
.actions {
  display: flex;
  gap: 6px;
}
.actions button {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.actions button i {
  font-size: 10px;
}
.btn-approve {
  background-color: #10b981;
  color: white;
}
.btn-approve:hover {
  background-color: #059669;
}
.btn-deny {
  background-color: #ef4444;
  color: white;
}
.btn-deny:hover {
  background-color: #dc2626;
}
/* Font Awesome Icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>