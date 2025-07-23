<template>
  <div class="compact-leave-card">
    <div class="card-header" @click="isExpanded = !isExpanded">
      <div class="employee-info">
        <div class="avatar">{{ getInitials(info.name) }}</div>
        <div>
          <h3>{{ info.name }}</h3>
          <p>{{ info.length }} leave request(s)</p>
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
      return this.info.filter(r => r.status === 'Pending').length
    },
    approvedCount() {
      return this.info.filter(r => r.status === 'Approved').length
    },
    deniedCount() {
      return this.info.filter(r => r.status === 'Denied').length
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

.compact-leave-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(47, 65, 86, 0.1);
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e0e8ee;
}

/* Header Section */
.card-header {
  padding: 14px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: linear-gradient(to right, #f5efeb, #ffffff);
  border-bottom: 1px solid #d6e4f0;
  transition: all 0.2s ease;
}

.card-header:hover {
  background: linear-gradient(to right, #ede6e2, #f5efeb);
}

.employee-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #567c8d, #2f4156);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
}

.employee-info h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: #2f4156;
}

.employee-info p {
  margin: 3px 0 0;
  font-size: 12px;
  color: #7a8fa1;
}

.status-summary {
  display: flex;
  align-items: center;
  gap: 8px;
}

.badge {
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.badge.pending {
  background: linear-gradient(135deg, #fff3bf, #ffe69e);
  color: #b35900;
}

.badge.approved {
  background: linear-gradient(135deg, #d3f9d8, #b2f2bb);
  color: #1a5e2b;
}

.badge.denied {
  background: linear-gradient(135deg, #ffd3d3, #ffb8b8);
  color: #991b1b;
}

.toggle-icon {
  font-size: 13px;
  color: #567c8d;
  margin-left: 8px;
  transition: transform 0.2s;
}

/* Expanded Content */
.card-body {
  padding: 8px 16px;
  background-color: #ffffff;
}

.request-item {
  display: flex;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f5f9;
  transition: background-color 0.2s;
}

.request-item:hover {
  background-color: #f8fafc;
}

.request-item:last-child {
  border-bottom: none;
}

.request-date {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 42px;
  padding: 4px;
  background-color: #f5f9fc;
  border-radius: 6px;
}

.request-date .day {
  font-size: 16px;
  font-weight: 600;
  color: #2f4156;
}

.request-date .month {
  font-size: 10px;
  text-transform: uppercase;
  color: #7a8fa1;
  letter-spacing: 0.5px;
  margin-top: 2px;
}

.request-details {
  flex-grow: 1;
}

.request-details .reason {
  margin: 0;
  font-size: 13px;
  color: #3a4d61;
  line-height: 1.5;
}

.request-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.status {
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 10px;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.status.pending {
  background: linear-gradient(135deg, #fff3bf, #ffe69e);
  color: #b35900;
}

.status.approved {
  background: linear-gradient(135deg, #d3f9d8, #b2f2bb);
  color: #1a5e2b;
}

.status.denied {
  background: linear-gradient(135deg, #ffd3d3, #ffb8b8);
  color: #991b1b;
}

.actions {
  display: flex;
  gap: 8px;
}

.actions button {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.actions button i {
  font-size: 11px;
}

.btn-approve {
  background: linear-gradient(135deg, #10b981, #0d9e6e);
  color: white;
}

.btn-approve:hover {
  background: linear-gradient(135deg, #0d9e6e, #10b981);
  transform: translateY(-1px);
}

.btn-deny {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.btn-deny:hover {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  transform: translateY(-1px);
}

/* Animation for expanding */
.card-body {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Font Awesome Icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
