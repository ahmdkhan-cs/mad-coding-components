import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react';
import '../../index.css';
import './table.css';

const Table = () => {
    const limit = 10;
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(1);
    const [employees, setEmployees] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        changePage(page);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getMonth = (month) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[month];
    }

    const getDate = (d) => {
        const date = new Date(d);
        return `${getMonth(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
    }

    const getEmployees = async (lim, off) => {
        const url = `http://localhost:8000/employees?limit=${lim}&offset=${off}`;
        const res = await fetch(url);
        await res.json().then((data) => {
            setEmployees(data.employees);
            let tempPages = 0;
            for(let i = 1; i <= data.count; i+=10){
                tempPages++;
            }
            setTotalPages(tempPages);
        });
    }

    const changePage = (p) => {
        setEmployees([]);
        setPage(p);
        const tempOffset = (p - 1) * 10;
        setOffset(tempOffset);
        getEmployees(limit, tempOffset);
    }

    return (
        <div className="container-table">
            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Salary</th>
                            <th>Department</th>
                            <th>Hire Date</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Manager</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.length === 0 ? (
                                <tr>
                                    <td colSpan={11}>
                                        <div className='center'>
                                            <FontAwesomeIcon icon={faSpinner} className='fa-spin' />
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                employees.map((employee, index) => (
                                    <tr key={index}>
                                        <td>{offset + index + 1}</td>
                                        <td>{employee.name}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.age}</td>
                                        <td>{employee.city}</td>
                                        <td>{employee.salary}</td>
                                        <td>{employee.department}</td>
                                        <td>{getDate(employee.hireDate)}</td>
                                        <td>{employee.phone}</td>
                                        <td>{employee.address}</td>
                                        <td>{employee.manager}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                {
                    [...Array(totalPages).fill(0)].map((_, key) => (
                        <div key={key} className={`page ${(key + 1) === page ? 'page-active' : ''}`} onClick={() => changePage(key+1)}>{key + 1}</div>
                    ))
                }
            </div>
        </div>
    );
}

export default Table;