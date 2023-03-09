import Table from "../components/Table";
import "../utils/style/EmployeeList.css";
import { useSelector } from "react-redux";

function EmployeeList() {
    const employees = useSelector((state) => state.employee.employees);

    let columns = [];
    for (const key in employees[0]) {
        if (Object.hasOwnProperty.call(employees[0], key)) {
            let headerKey = key.replace(/([A-Z])/g, ' $1').trim();
            columns.push({ accessorKey: key, header: headerKey.charAt(0).toUpperCase() + headerKey.slice(1) })
        }
    };

    return (
        <section className="employee-list-section">
            <h2>Current employees</h2>

            <div className="employee-table">
                <Table data={employees} columns={columns} />
            </div>
        </section>
    )
}

export default EmployeeList;