import { useState } from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import '../../index.css';
import './form.css';

const employeeSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email('Invalid Email').required(),
    age: yup.number().required().positive().integer(),
    city: yup.string().required(),
    salary: yup.number().required().positive().integer(),
    department: yup.string().required(),
    hireDate: yup.date().default(() => new Date()),
    phone: yup.string().required(),
    address: yup.string().required(),
    manager: yup.string().required(),
});

const initialValuesEmployee = {
    name: '',
    email: '',
    age: 20,
    city: '',
    salary: 0,
    department: '',
    hireDate: '',
    phone: '',
    address: '',
    manager: '',
}

const Form = () => {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [errorType, setErrorType] = useState('');

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(values.hireDate);
        const url = "http://localhost:8000/employees";
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(values)
        }).then((res) => {
            if(res.ok){
                showMessage('Employee created!', 'success');
            }else{
                res.text().then((text) => {
                    showMessage(text, 'danger');
                });
            }
            setSaving(false);
        }).then((success) => {
            if(success){
                showMessage('Employee created!', 'success');
            }
            setSaving(false);
        }).catch((error) => {
            showMessage(error, 'danger');
            setSaving(false);
        });
    }

    const showMessage = (msg, type) => {
        setError(msg);
        setErrorType(type);

        setTimeout(() => {
            setError('');
            setErrorType('');
        }, 3000);
    }

    return(
        <div className="container-form">
            <p className={`text-center ${errorType === 'danger' ? 'error-text' : 'success-text'} ${error === '' ? 'd-none' : ''}`}>{error}</p>
            <Formik onSubmit={handleFormSubmit} initialValues={initialValuesEmployee} validationSchema={employeeSchema}>
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    resetForm
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="name" className="label">Name</label>
                            <input type="text" name="name" id="name" className={`input ${Boolean(touched.name) && Boolean(errors.name) ? 'error-input' : ''}`} 
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.name} 
                            />
                        </div>
                        {
                            Boolean(touched.name) && Boolean(errors.name) ? <p className="error-text text-right">{touched.name && errors.name}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="email" className="label">Email</label>
                            <input type="email" name="email" id="email" className={`input ${Boolean(touched.email) && Boolean(errors.email) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.email} 
                            />
                        </div>
                        {
                            Boolean(touched.email) && Boolean(errors.email) ? <p className="error-text text-center">{touched.email && errors.email}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="age" className="label">Age</label>
                            <div className="age-wrapper">
                                <p className='age'>{values.age}</p>
                                <input type="range" name="age" id="age" min={20} max={60} className='input'
                                    onBlur={handleBlur} 
                                    onChange={handleChange} 
                                    value={values.age} 
                                />
                            </div>
                        </div>
                        {
                            Boolean(touched.age) && Boolean(errors.age) ? <p className="error-text text-center">{touched.age && errors.age}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="city" className="label">City</label>
                            <input type="text" name="city" id="city" className={`input ${Boolean(touched.city) && Boolean(errors.city) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.city} 
                            />
                        </div>
                        {
                            Boolean(touched.city) && Boolean(errors.city) ? <p className="error-text text-center">{touched.city && errors.city}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="salary" className="label">Salary</label>
                            <input type="number" name="salary" id="salary" className={`input ${Boolean(touched.salary) && Boolean(errors.salary) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.salary} 
                            />
                        </div>
                        {
                            Boolean(touched.salary) && Boolean(errors.salary) ? <p className="error-text text-center">{touched.salary && errors.salary}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="department" className="label">Department</label>
                            <input type="text" name="department" id="department" className={`input ${Boolean(touched.department) && Boolean(errors.department) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.department} 
                            />
                        </div>
                        {
                            Boolean(touched.department) && Boolean(errors.department) ? <p className="error-text text-center">{touched.department && errors.department}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="hireDate" className="label">Hire Date</label>
                            <input type="date" name="hireDate" id="hireDate" className={`input ${Boolean(touched.hireDate) && Boolean(errors.hireDate) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange}
                                value={values.hireDate} 
                            />
                        </div>
                        {
                            Boolean(touched.hireDate) && Boolean(errors.hireDate) ? <p className="error-text text-center">{touched.hireDate && errors.hireDate}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="phone" className="label">Phone</label>
                            <input type="text" name="phone" id="phone" className={`input ${Boolean(touched.phone) && Boolean(errors.phone) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.phone} 
                            />
                        </div>
                        {
                            Boolean(touched.phone) && Boolean(errors.phone) ? <p className="error-text text-center">{touched.phone && errors.phone}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="address" className="label">Address</label>
                            <textarea name="address" id="address" cols="30" rows="10" className={`input ${Boolean(touched.address) && Boolean(errors.address) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.address} 
                            ></textarea>
                        </div>
                        {
                            Boolean(touched.address) && Boolean(errors.address) ? <p className="error-text text-center">{touched.address && errors.address}</p> : <></>
                        }
                        <div className="input-wrapper">
                            <label htmlFor="manager" className="label">Manager</label>
                            <input type="text" name="manager" id="manager" className={`input ${Boolean(touched.manager) && Boolean(errors.manager) ? 'error-input' : ''}`}
                                onBlur={handleBlur} 
                                onChange={handleChange} 
                                value={values.manager} 
                            />
                        </div>
                        {
                            Boolean(touched.manager) && Boolean(errors.manager) ? <p className="error-text text-center">{touched.manager && errors.manager}</p> : <></>
                        }
                        <div className='btn-wrapper'>
                            <button className='btn btn-sec' type='reset' name='reset' id='reset' onClick={() => resetForm()}>Reset</button>
                            <button className='btn' type='submit' name='submit' id='submit' onClick={() => setSaving(true)} >{saving ? <FontAwesomeIcon icon={faSpinner} className='fa-spin' /> : <></>}Submit</button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default Form;