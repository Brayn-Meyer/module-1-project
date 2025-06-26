<template>
    <navbar-comp/>
  <div class="performance-review-container">
    <h1>Employee Performance Reviews</h1>
    
    <div class="controls">
      <div class="search-filter">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search employees..."
          class="search-input"
        >
        <select v-model="selectedDepartment" class="department-select">
          <option value="">All Departments</option>
          <option v-for="dept in departments" :value="dept" :key="dept">{{ dept }}</option>
        </select>
      </div>
      
      <button @click="openReviewModal(null)" class="add-review-btn">
        + Add New Review
      </button>
    </div>
    
    <div class="reviews-table">
      <table>
        <thead>
          <tr>
            <th @click="sortReviews('employeeName')">Employee</th>
            <th @click="sortReviews('department')">Department</th>
            <th @click="sortReviews('reviewDate')">Review Date</th>
            <th @click="sortReviews('rating')">Rating</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="review in filteredReviews" :key="review.id">
            <td>{{ review.employeeName }}</td>
            <td>{{ review.department }}</td>
            <td>{{ formatDate(review.reviewDate) }}</td>
            <td>
              <div class="rating-display">
                <span v-for="n in 5" :key="n" 
                  :class="['star', { 'filled': n <= review.rating }]">
                  ★
                </span>
              </div>
            </td>
            <td>
              <span :class="['status-badge', review.status]">
                {{ review.status }}
              </span>
            </td>
            <td>
              <button @click="openReviewModal(review)" class="action-btn edit-btn">
                Edit
              </button>
              <button @click="confirmDelete(review.id)" class="action-btn delete-btn">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Review Modal -->
    <div v-if="showReviewModal" class="modal-overlay">
      <div class="review-modal">
        <div class="modal-header">
          <h2>{{ editingReview ? 'Edit Performance Review' : 'Add New Performance Review' }}</h2>
          <button @click="closeModal" class="close-btn">&times;</button>
        </div>
        
        <div class="modal-body">
          <form @submit.prevent="submitReview">
            <div class="form-group">
              <label>Employee</label>
              <select v-model="form.employeeId" required class="form-input">
                <option value="">Select Employee</option>
                <option 
                  v-for="employee in employees" 
                  :value="employee.id" 
                  :key="employee.id"
                >
                  {{ employee.name }} ({{ employee.department }})
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label>Review Date</label>
              <input 
                type="date" 
                v-model="form.reviewDate" 
                required 
                class="form-input"
              >
            </div>
            
            <div class="form-group">
              <label>Rating (1-5)</label>
              <div class="rating-input">
                <span 
                  v-for="n in 5" 
                  :key="n" 
                  @click="form.rating = n"
                  :class="['star', { 'filled': n <= form.rating }]"
                >
                  ★
                </span>
              </div>
            </div>
            
            <div class="form-group">
              <label>Strengths</label>
              <textarea 
                v-model="form.strengths" 
                placeholder="Employee strengths..."
                class="form-textarea"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label>Areas for Improvement</label>
              <textarea 
                v-model="form.areasForImprovement" 
                placeholder="Areas needing improvement..."
                class="form-textarea"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label>Goals</label>
              <textarea 
                v-model="form.goals" 
                placeholder="Future goals..."
                class="form-textarea"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label>Status</label>
              <select v-model="form.status" class="form-input">
                <option value="Draft">Draft</option>
                <option value="Completed">Completed</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            
            <div class="form-actions">
              <button type="button" @click="closeModal" class="cancel-btn">
                Cancel
              </button>
              <button type="submit" class="submit-btn">
                {{ editingReview ? 'Update' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="confirmation-modal">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this performance review?</p>
        <div class="modal-actions">
          <button @click="showDeleteModal = false" class="cancel-btn">
            Cancel
          </button>
          <button @click="deleteReview" class="delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import NavbarComp from '@/components/NavbarComp.vue';
export default {
    components : {
        NavbarComp
    },
  setup() {
    // Sample data - in a real app, this would come from an API
    const employees = ref([
      { id: 1, name: 'John Doe', department: 'Development' },
      { id: 2, name: 'Jane Smith', department: 'Marketing' },
      { id: 3, name: 'Mike Johnson', department: 'Sales' },
      { id: 4, name: 'Sarah Williams', department: 'HR' },
      { id: 5, name: 'David Brown', department: 'Development' }
    ]);

    const reviews = ref([
      {
        id: 1,
        employeeId: 1,
        employeeName: 'John Doe',
        department: 'Development',
        reviewDate: '2023-06-15',
        rating: 4,
        strengths: 'Excellent problem-solving skills and team collaboration.',
        areasForImprovement: 'Could improve time estimation for tasks.',
        goals: 'Complete advanced React training.',
        status: 'Completed'
      },
      {
        id: 2,
        employeeId: 2,
        employeeName: 'Jane Smith',
        department: 'Marketing',
        reviewDate: '2023-05-20',
        rating: 5,
        strengths: 'Creative campaign ideas and strong analytics skills.',
        areasForImprovement: 'Needs to delegate more effectively.',
        goals: 'Lead the Q3 marketing campaign.',
        status: 'Completed'
      }
    ]);

    const searchQuery = ref('');
    const selectedDepartment = ref('');
    const sortField = ref('reviewDate');
    const sortDirection = ref('desc');
    const showReviewModal = ref(false);
    const showDeleteModal = ref(false);
    const editingReview = ref(null);
    const reviewToDelete = ref(null);

    const form = ref({
      employeeId: '',
      reviewDate: new Date().toISOString().split('T')[0],
      rating: 3,
      strengths: '',
      areasForImprovement: '',
      goals: '',
      status: 'Draft'
    });

    // Computed properties
    const departments = computed(() => {
      const depts = new Set();
      employees.value.forEach(emp => depts.add(emp.department));
      return Array.from(depts);
    });

    const filteredReviews = computed(() => {
      let filtered = [...reviews.value];
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(review => 
          review.employeeName.toLowerCase().includes(query)
        );
      }
      
      // Filter by department
      if (selectedDepartment.value) {
        filtered = filtered.filter(review => 
          review.department === selectedDepartment.value
        );
      }
      
      // Sorting
      filtered.sort((a, b) => {
        let modifier = sortDirection.value === 'asc' ? 1 : -1;
        if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
        if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
        return 0;
      });
      
      return filtered;
    });

    // Methods
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const sortReviews = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortField.value = field;
        sortDirection.value = 'asc';
      }
    };

    const openReviewModal = (review) => {
      editingReview.value = review;
      if (review) {
        // Editing existing review
        form.value = {
          employeeId: review.employeeId,
          reviewDate: review.reviewDate,
          rating: review.rating,
          strengths: review.strengths,
          areasForImprovement: review.areasForImprovement,
          goals: review.goals,
          status: review.status
        };
      } else {
        // Adding new review
        form.value = {
          employeeId: '',
          reviewDate: new Date().toISOString().split('T')[0],
          rating: 3,
          strengths: '',
          areasForImprovement: '',
          goals: '',
          status: 'Draft'
        };
      }
      showReviewModal.value = true;
    };

    const closeModal = () => {
      showReviewModal.value = false;
      editingReview.value = null;
    };

    const submitReview = () => {
      const employee = employees.value.find(emp => emp.id === parseInt(form.value.employeeId));
      
      if (editingReview.value) {
        // Update existing review
        const index = reviews.value.findIndex(r => r.id === editingReview.value.id);
        reviews.value[index] = {
          ...reviews.value[index],
          ...form.value,
          employeeName: employee.name,
          department: employee.department
        };
      } else {
        // Add new review
        const newReview = {
          id: Math.max(...reviews.value.map(r => r.id)) + 1,
          ...form.value,
          employeeName: employee.name,
          department: employee.department
        };
        reviews.value.push(newReview);
      }
      
      closeModal();
    };

    const confirmDelete = (id) => {
      reviewToDelete.value = id;
      showDeleteModal.value = true;
    };

    const deleteReview = () => {
      reviews.value = reviews.value.filter(review => review.id !== reviewToDelete.value);
      showDeleteModal.value = false;
      reviewToDelete.value = null;
    };

    return {
      employees,
      reviews,
      searchQuery,
      selectedDepartment,
      departments,
      filteredReviews,
      showReviewModal,
      showDeleteModal,
      editingReview,
      form,
      formatDate,
      sortReviews,
      openReviewModal,
      closeModal,
      submitReview,
      confirmDelete,
      deleteReview
    };
  }
};
</script>

<style scoped>
.performance-review-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.search-filter {
  display: flex;
  gap: 15px;
}

.search-input, .department-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.add-review-btn {
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.add-review-btn:hover {
  background-color: #3a56d4;
}

.reviews-table {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f8f9fa;
  color: #495057;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}

th:hover {
  background-color: #e9ecef;
}

tr:hover {
  background-color: #f8f9fa;
}

.rating-display, .rating-input {
  display: flex;
  gap: 2px;
}

.star {
  color: #ddd;
  font-size: 18px;
  cursor: pointer;
}

.star.filled {
  color: #ffc107;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.Draft {
  background-color: #fff3bf;
  color: #e67700;
}

.status-badge.Completed {
  background-color: #d3f9d8;
  color: #2b8a3e;
}

.status-badge.Archived {
  background-color: #e9ecef;
  color: #495057;
}

.action-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  margin-right: 5px;
  transition: all 0.2s;
}

.edit-btn {
  background-color: #15aabf;
  color: white;
}

.edit-btn:hover {
  background-color: #1098ad;
}

.delete-btn {
  background-color: #fa5252;
  color: white;
}

.delete-btn:hover {
  background-color: #e03131;
}

/* Modal Styles */
.modal-overlay {
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

.review-modal, .confirmation-modal {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 90%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-header h2 {
  margin: 0;
  color: #2c3e50;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #6c757d;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #495057;
}

.form-input, .form-textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions, .modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;
}

.cancel-btn {
  background-color: #e9ecef;
  color: #495057;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn {
  background-color: #4361ee;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #3a56d4;
}

.confirmation-modal {
  padding: 20px;
  text-align: center;
}

.confirmation-modal h3 {
  margin-top: 0;
  color: #2c3e50;
}

/* Responsive Design */
@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .search-filter {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }
  
  .search-input, .department-select {
    width: 100%;
  }
  
  .add-review-btn {
    width: 100%;
  }
  
  th, td {
    padding: 8px;
    font-size: 14px;
  }
  
  .action-btn {
    display: block;
    width: 100%;
    margin-bottom: 5px;
  }
  
  .review-modal {
    width: 95%;
  }
}
</style>