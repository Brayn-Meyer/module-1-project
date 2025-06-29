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
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(47, 65, 86, 0.1);
  overflow: hidden;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  border: 1px solid #c8d9e6;
}

.form-header {
  background: linear-gradient(135deg, #0b2545, #8da9c4);
  color: #f5efeb;
  padding: 1.5rem 2rem;
  border-bottom: 3px solid white;
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
  color: #c8d9e6;
}

.leave-form {
  padding: 2rem;
  background: #f5efeb;
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
  color: #374b62;
  font-size: 0.95rem;
}

.form-input, .form-textarea {
  width: 90%;
  padding: 0.75rem 1rem;
  border: 1px solid #c8d9e6;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  background-color: #ffffff;
  color: #2f4156;
}

.form-input::placeholder {
  color: #567c8d;
  opacity: 0.6;
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: #567c8d;
  box-shadow: 0 0 0 3px rgba(86, 124, 141, 0.1);
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
  background-color: #0b2545;
  color: #f5efeb;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid #2f4156;
}

.submit-button:hover {
  background: #500b28;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(47, 65, 86, 0.2);
}

.submit-button:active {
  transform: translateY(0);
}

h2{
  color: #ffffff
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