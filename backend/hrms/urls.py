from django.urls import path
from . import views

urlpatterns = [

    path('employees', views.employees),
    path('employees/delete/<int:pk>', views.delete_employee),

    path('attendance', views.mark_attendance),
    path('attendance/all', views.all_attendance),
    path('attendance/<int:employee_id>', views.employee_attendance),

]