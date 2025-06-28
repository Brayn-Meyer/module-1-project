<template>
  <div class="leave-form-container">
    <div class="form-header">
      <h2><i class="fas fa-calendar-plus"></i> New Leave Request</h2>
      <p class="form-subtitle">Submit your leave application</p>
    </div>
    
    <form @submit.prevent="submitLeaveRequest" class="leave-form">
      <div class="form-group">
        <label for="employeeName">Employee Name</label>
        <input 
          id="employeeName"
          v-model="newRequest.name" 
          type="text" 
          placeholder="Enter full name"
          required
          class="form-input"
        >
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="leaveDate">Leave Date</label>
          <input 
            id="leaveDate"
            v-model="newRequest.leaveRequests[0].date" 
            type="date" 
            required
            class="form-input"
          >
        </div>
      </div>
      <div class="form-group">
        <label for="leaveReason">Reason for Leave</label>
        <textarea 
          id="leaveReason"
          v-model="newRequest.leaveRequests[0].reason" 
          placeholder="Briefly explain the reason for leave"
          required
          class="form-textarea"
          rows="4"
        ></textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="submit-button">
          <i class="fas fa-paper-plane"></i> Submit Request
        </button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: 'LeaveRequestForm',
  data() {
    return {
      newRequest: {
        name: "",
        leaveRequests: [
          {
            date: "",
            reason: "",
            status: "Pending"
          }
        ]
      }
    }
  },
  methods: {
    submitLeaveRequest() {
      if (!this.validateForm()) {
        return;
      }
      this.$store.commit("add_to_attendance", {...this.newRequest});
      this.resetForm();
      this.showSuccessNotification();
    },
    validateForm() {
      if (!this.newRequest.name.trim()) {
        this.showError("Please enter employee name");
        return false;
      }
      if (!this.newRequest.leaveRequests[0].date) {
        this.showError("Please select a leave date");
        return false;
      }
      if (!this.newRequest.leaveRequests[0].reason.trim()) {
        this.showError("Please provide a reason for leave");
        return false;
      }
      return true;
    },
    showError(message) {
      alert(message); // Replace with a proper notification system in production
    },
    showSuccessNotification() {
      alert("Leave request submitted successfully!"); // Replace with a proper notification system
    },
    resetForm() {
      this.newRequest = {
        name: "",
        leaveRequests: [
          {
            date: "",
            reason: "",
            status: "Pending"
          }
        ]
      };
    }
  }
}
</script>
<style scoped>
.leave-form-container {
  max-width: 580px;
  margin: 2rem auto;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
}
.form-header {
  background: linear-gradient(135deg, #3f37c9 0%, #4361ee 100%);
  color: white;
  padding: 1.5rem 2rem;
}
.form-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.form-header .form-subtitle {
  margin: 0.25rem 0 0;
  opacity: 0.9;
  font-size: 0.9rem;
}
.leave-form {
  padding: 2rem;
}
.form-group {
  margin-bottom: 1.5rem;
}
.form-row {
  display: flex;
  gap: 1.5rem;
}
.form-row .form-group {
  flex: 1;
}
label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2d3748;
  font-size: 0.95rem;
}
.form-input, .form-textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #f8fafc;
}
.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #4361ee;
  box-shadow: 0 0 0 3px rgba(67, 97, 238, 0.1);
  background-color: white;
}
.form-textarea {
  min-height: 120px;
  resize: vertical;
}
.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
}
.submit-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.submit-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.2);
}
.submit-button:active {
  transform: translateY(0);
}
/* Font Awesome Icons */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
/* Responsive Design */
@media (max-width: 640px) {
  .leave-form-container {
    margin: 1rem;
    border-radius: 8px;
  }
  
  .form-header {
    padding: 1.25rem;
  }
  
  .leave-form {
    padding: 1.5rem;
  }
  
  .form-row {
    flex-direction: column;
    gap: 1.5rem;
  }
}
</style>