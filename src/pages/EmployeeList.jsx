import Table from "../components/Table.jsx";
import "../utils/style/EmployeeList.css";
import { useEffect, useState } from "react";
import { getEmployees } from "../services/APIService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const selectorToken = useSelector((state) => state.user.token);
    const isLogged = useSelector((state) => state.user.isLogged);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) navigate("/sites/openclassrooms/hrnet");

        const getData = async () => {
            try {
                let actualData = await getEmployees(selectorToken);
                setEmployees(actualData.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        getData();
    }, [selectorToken, isLogged, navigate]);

    return (
        <section className="employee-list-section">
            <h2>Current employees</h2>

            <div className="employee-table">
                <Table data={employees} />
            </div>
        </section>
    )
}

export default EmployeeList;