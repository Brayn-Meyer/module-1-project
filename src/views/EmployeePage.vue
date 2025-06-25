<template>
    <navbar-comp/>
    <div>
        <div class="employee-page">
    <navbar-comp/>
    <div class="page-content">
        <h1>Employment Page</h1>
        <div class="employee-grid">
        <EmployeeCard v-for="employer in $store.state.employee_info" :info="employer"/>
        </div>
        </div>
    </div>
    <footer-comp/>
    </div>
</template>
<script>
import EmployeeCard from '@/components/EmployeeCard.vue';
import NavbarComp from '@/components/NavbarComp.vue';
import FooterComp from '@/components/FooterComp.vue';
export default{
    components : {
        EmployeeCard,
        NavbarComp,
        FooterComp
    }
}
</script>
<style>
.employee-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.page-content {
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}
h1 {
    color: #2C3E50;
    margin-bottom: 2rem;
    text-align: center;
    font-weight: 600;
}
.employee-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    justify-items: center;
}
@media (max-width: 768px) {
    .page-content {
        padding: 1rem;
    }
    .employee-grid {
        grid-template-columns: 1fr;
    }
}
</style>