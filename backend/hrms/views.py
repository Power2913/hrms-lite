from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer


# -----------------------------
# Employees APIs
# -----------------------------

@api_view(['GET', 'POST'])
def employees(request):

    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        data = request.data.copy()

        # Generate Employee ID automatically
        last_employee = Employee.objects.order_by('-id').first()

        if last_employee:
            last_id = int(last_employee.employee_id.replace("EMP", ""))
            new_id = last_id + 1
        else:
            new_id = 1

        data["employee_id"] = f"EMP{new_id:03d}"

        serializer = EmployeeSerializer(data=data)

        if serializer.is_valid():
            serializer.save()

            return Response({
                "message": "Employee created successfully",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_employee(request, pk):

    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response(
            {"error": "Employee not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    employee.delete()

    return Response({
        "message": "Employee deleted successfully"
    })


# -----------------------------
# Attendance APIs
# -----------------------------

@api_view(['POST'])
def mark_attendance(request):

    serializer = AttendanceSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Attendance marked",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def employee_attendance(request, employee_id):

    records = Attendance.objects.filter(employee_id=employee_id)

    serializer = AttendanceSerializer(records, many=True)

    return Response(serializer.data)

@api_view(['GET'])
def all_attendance(request):

    records = Attendance.objects.all().order_by('-date')

    serializer = AttendanceSerializer(records, many=True)

    return Response(serializer.data)