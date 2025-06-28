<template>
  <div class="dashboard-container">
    <navbar-comp class="navbar" />

    <main class="dashboard-content">
      <h2 class="dashboard-title">Company Dashboard</h2>

      <div class="stats-grid">
        <!-- Employee Count Card -->
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>Total Employees</h3>
          <p class="stat-value">{{ $store.state.employee_info.length }}</p>
        </div>
        <!-- Combined Salary Card -->
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3>Combined Salary</h3>
          <p class="stat-value">R{{ $store.getters.combinedSalaries.toLocaleString() }}</p>
        </div>
        <!-- Average Salary Card -->
        <div class="stat-card">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"></line>
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          </div>
          <h3>Average Salary</h3>
          <p class="stat-value">R{{ ($store.getters.combinedSalaries /
            $store.state.employee_info.length).toLocaleString(undefined, { maximumFractionDigits: 2 }) }}</p>
        </div>
        <!-- Leave Requests Card -->
        <div class="stat-card leave-requests">
          <div class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>Leave Requests</h3>
          <div class="leave-stats">
            <div class="leave-stat pending">
              <span>Pending:</span>
              <span>{{ $store.getters.pendingLeaveRequests }}</span>
            </div>
            <div class="leave-stat approved">
              <span>Approved:</span>
              <span>{{ $store.getters.approvedLeaveRequests }}</span>
            </div>
            <div class="leave-stat denied">
              <span>Denied:</span>
              <span>{{ $store.getters.deniedLeaveRequests }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
    <main class="dashboard-content">
      <!-- ...existing stats grid... -->

      <div class="charts-grid" style="display: flex; gap: 2rem; flex-wrap: wrap; margin-top: 2rem;">
        <div style="flex: 1; min-width: 350px;">
          <LineChart :chartData="attendanceChartData" :chartOptions="attendanceChartOptions" />
        </div>
        <br><br>
        <div style="flex: 1; min-width: 350px;">
          <PieChart :chartData="performancePieData" :chartOptions="performancePieOptions" />
        </div>
      </div>
    </main>
    <footer-comp class="footer" />
  </div>
</template>
<script>
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import LineChart from '@/components/LineChart.vue';
import PieChart from '@/components/PieChart.vue';

export default {
  name: 'CompanyDashboard',
  components: {
    NavbarComp,
    FooterComp,
    LineChart,
    PieChart
  },
  computed: {
    // Attendance Line Chart Data
    attendanceChartData() {
      // Flatten all attendance records and group by date
      const attendance = this.$store.state.attendance;
      const dateMap = {};
      attendance.forEach(emp => {
        emp.attendance.forEach(rec => {
          if (!dateMap[rec.date]) dateMap[rec.date] = { Present: 0, Absent: 0 };
          dateMap[rec.date][rec.status]++;
        });
      });
      const dates = Object.keys(dateMap).sort();
      return {
        labels: dates,
        datasets: [
          {
            label: 'Present',
            data: dates.map(date => dateMap[date].Present),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.2)',
            tension: 0.3,
            fill: true,
          },
          {
            label: 'Absent',
            data: dates.map(date => dateMap[date].Absent),
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239,68,68,0.2)',
            tension: 0.3,
            fill: true,
          }
        ]
      };
    },
    attendanceChartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Attendance Trends' }
        }
      };
    },

    performancePieData() {
      // Use actual review data if available, otherwise simulate
      // Replace this with your actual reviews array if you have one
      const reviews = this.$store.state.employee_info.map(emp => ({
        name: emp.name,
        rating: emp.rating || Math.floor(Math.random() * 5) + 1
      }));

      const ratingCounts = [0, 0, 0, 0, 0];
      const ratingNames = [[], [], [], [], []];
      reviews.forEach(r => {
        if (r.rating >= 1 && r.rating <= 5) {
          ratingCounts[r.rating - 1]++;
          ratingNames[r.rating - 1].push(r.name);
        }
      });

      return {
        labels: ['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars'],
        datasets: [{
          data: ratingCounts,
          backgroundColor: ['#ef4444', '#f59e42', '#fbbf24', '#10b981', '#3b82f6'],
        }],
        ratingNames
      };
    },
    performancePieOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { position: 'bottom' },
          title: { display: true, text: 'Performance Star Ratings' },
          tooltip: {
            callbacks: {
              label: (context) => {
                const idx = context.dataIndex;
                const names = context.chart.data.ratingNames?.[idx] || [];
                if (names.length === 0) return `${context.label}: 0`;
                const displayNames = names.slice(0, 5).join(', ');
                const more = names.length > 5 ? `, and ${names.length - 5} more` : '';
                return `${context.label}: ${names.length}\n${displayNames}${more}`;
              }
            }
          }
        }
      };
    }
  }
}
</script>
<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f8fafc;
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.dashboard-content {
  flex: 1;
  padding: 2rem;
}

.dashboard-title {
  text-align: center;
  color: #1e293b;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  font-weight: 600;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #e0f2fe;
  color: #0369a1;
  margin-bottom: 1rem;
}

.stat-icon svg {
  width: 24px;
  height: 24px;
}

.stat-card h3 {
  color: #64748b;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.stat-value {
  color: #1e293b;
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
}

/* Leave Requests Specific Styles */
.leave-requests {
  grid-column: span 1;
}

.leave-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.leave-stat {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.leave-stat:last-child {
  border-bottom: none;
}

.leave-stat span:first-child {
  color: #64748b;
}

.leave-stat span:last-child {
  font-weight: 600;
}

.pending span:last-child {
  color: #f59e0b;
}

.approved span:last-child {
  color: #10b981;
}

.denied span:last-child {
  color: #ef4444;
}

.footer {
  margin-top: auto;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-content {
    padding: 1.5rem;
  }
}
</style>