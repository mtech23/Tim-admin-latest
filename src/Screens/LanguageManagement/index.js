import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faEye, faCheck, faTimes, faFilter, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";


import "./style.css";
import { error } from "../../Assets/images";

export const LanguageManagement = () => {
    const base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
    const LogoutData = localStorage.getItem('login');
    const [data, setData] = useState([]);
    const [showlanguagemodal, setShowlanguagemodal] = useState(false)
    const [formData, setFormData] = useState("")

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);



    const [LanguageList, setLanguageList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [inputValue, setInputValue] = useState('');
    const [novel, setNovel] = useState();


    const navigate = useNavigate();

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const handleAddlanguagemodal = () => {
        setShowlanguagemodal(true)
    }


    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const ActiveMale = () => {
        setShowModal3(false)
        setShowModal4(true)
    }

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const filterData = data.filter(item =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
    );



    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);




    const handleAddlanguage = (event) => {
        const { name, value } = event.target;
        setFormData(value);
 
    };
 


    const GetLanguageList = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/language-listing',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((res) => {
            
                document.querySelector('.loaderBox').classList.add("d-none");
                setLanguageList(res.data)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
   
    }

    useEffect(() => {
        document.title = 'Tim Admin | Language Management';
        GetLanguageList()

    }, []);








    const maleHeaders = [
        {
            key: "id",
            title: "S.No",
        },
      
        {
            key: "username",
            title: "Name",
        },
        {
            key: "created_at",
            title: "Created On",
        },
     
        {
            key: "action",
            title: "Action",
        },
    ];


    // const handleSubmit = async(event) =>{
    //     event.preventDefault();
    //     const formDataMethod = new FormData();
    //     formDataMethod.append("name", formData);
    //     document.querySelector(".loaderbox").classList.remove("d-none");
    //     await fetch('https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/language-add-update', {
    //         method: "POST",
    //         headers: {
    //             'Accept' : "application/json"
    //             "Authorization" : `Bearer ${LogoutData}`
    //         },
    //         body : formDataMethod
    //     })

    //     .then((data) => {
    //         return data.json();
    //     })
    //     .then((data) => {
    //         document.querySelector(".loaderBox").classList.add('d-none');
    //         if (data.status == true){
    //             setShowlanguagemodal(false)
    //         }
            
    //     })
    //     .catch ((error) => {
    //         document.querySelector('.loaderBox').classList.add('d-none');
    //         console.log(error)

    //     })
    // };

    const handleSubmit = async(event) => {
        event.preventDefault();
        const formDataMethod = new FormData();
         formDataMethod.append("name", formData);

 
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
      await  fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/language-add-update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod  
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                
                if (data.status == true) {
                    setShowlanguagemodal(false)
                }

            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })





    };








    return (
        <>
            <DashboardLayout>
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="dashCard">
                                <div className="row mb-3 justify-content-between">
                                    <div className="col-md-6 mb-2">
                                        <h2 className="mainTitle">Language Management</h2>
                                    </div>
                                    <div className="col-md-6 mb-2">
                                        <div className="addUser">
                                            <CustomButton text="Add New Language" variant='primaryButton' onClick={handleAddlanguagemodal} />
                                            <CustomInput type="text" placeholder="Search Here..." value={inputValue} inputClass="mainInput" onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                 
                                    <div className="col-12">
                                        <CustomTable
                                            headers={maleHeaders}

                                        >
                                            <tbody>
                                                {LanguageList?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                          <td className="text-capitalize">
                                                            {item?.name}
                                                        </td>
                                                        <td>{item?.created_at}</td>

                                                        <td>
                                                            <Dropdown className="tableDropdown">
                                                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                                                    <FontAwesomeIcon icon={faEllipsisV} />
                                                                </Dropdown.Toggle>
                                                                <Dropdown.Menu align="end" className="tableDropdownMenu">

                                                                    {/* <Link to={`/category-management/category-details/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View</Link> */}
                                                                    <Link to={`/category-management/edit-category/${item?.id}`} className="tableAction"><FontAwesomeIcon icon={faEdit} className="tableActionIcon" />Edit</Link>
                                                                    <button type="button" className="bg-transparent border-0 ps-lg-3 pt-1"  ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button>
                                                                </Dropdown.Menu>
                                                            </Dropdown>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </CustomTable>
                                        <CustomPagination
                                            itemsPerPage={itemsPerPage}
                                            totalItems={data.length}
                                            currentPage={currentPage}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* 
                    <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
                    <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

                    <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={ActiveMale} heading='Are you sure you want to mark this user as Active?' />
                    <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
 */}


                    <CustomModal show={showlanguagemodal} close={() => { setShowlanguagemodal(false) }} heading="Add Language" >
                        <CustomInput
                            label='Add Language'
                            required
                            id='file'
                            type='text'
                            labelClass='mainLabel'
                            inputClass='mainInput'
                            name="name"
                            // value={formData.image}
                            onChange={handleAddlanguage}
                        />

                        <CustomButton variant='primaryButton' text='Add ' type='button' onClick={handleSubmit} />
                    </CustomModal>



                </div>
            </DashboardLayout>
        </>
    );
};
