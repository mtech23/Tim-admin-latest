import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faCheck, faTimes, faFilter } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";


import "./style.css";

export const BrandListing = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [addUser, setUser] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userForm, setUserFrom] = useState(false);
  const [idUser, setIdUser] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    status: '1'
  });

  const optionData = [
    {
      name: "Active",
      code: "1"
    },
    {
      name: "Inactive",
      code: "0"
    },
  ]

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);


  const fetchData = () =>  {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");

    fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/brand-listing',
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
      .then((data) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(data)
        setData(data.brands);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  useEffect(() => {
    document.title = 'Tim Admin | Brands Management';
   
    fetchData()

  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "name",
      title: "Brand Name",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
    },

  ];


  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData)
    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/brand-add-edit`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: JSON.stringify(formData)
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        setShowModal(true)
        setUser(false)
        setFormData({
          name: ''
        })
        fetchData()

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }

  const brandID = (unitID) => {
    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/view-brand/${unitID}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        setIdUser(unitID)
        setFormData({
          ...formData,
          name: data.brands.name,
          status: data.status
        });
        setEditUser(true)

      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }

  const handleEditSubmit = (event) => {
    event.preventDefault();
    console.log(formData)
    document.querySelector('.loaderBox').classList.remove("d-none");
    const LogoutData = localStorage.getItem('login');
    fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/brand-add-edit/${idUser}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
        body: JSON.stringify(formData)
      },
    )
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        document.querySelector('.loaderBox').classList.add("d-none");
        setFormData({
          name: ''
        })
        fetchData()
        setEditUser(false)


      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }



  console.log(formData)

  return (
    <>
      <DashboardLayout>
        <div className="container-fluid">
          <div className="row mb-3">
            <div className="col-12">
              <div className="dashCard">
                <div className="row mb-3 justify-content-between">
                  <div className="col-md-6 mb-2">
                    <h2 className="mainTitle">Brand Management</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      <CustomButton text="Add Brand" variant='primaryButton' onClick={() => {
                        setUser(true)
                      }} />
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
                        {currentItems.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="text-capitalize">
                              {item.name}
                            </td>
                            <td className={item.status == 1 ? 'greenColor' : 'redColor'}>{item.status == 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  <button onClick={() => {
                                    brandID(item.id)
                                    setUserFrom(true)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button>
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

          {/* add Brand  */}

          <CustomModal show={addUser} close={() => { setUser(false) }} >
            <CustomInput
              label="Add Brand"
              type="text"
              placeholder="Add Brand"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                console.log(formData);
              }}

            />
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
          </CustomModal>

          <CustomModal show={editUser} close={() => { setEditUser(false) }} >
            <CustomInput
              label="Edit Brand"
              type="text"
              placeholder="Edit Brand"
              required
              name="name"
              labelClass='mainLabel'
              inputClass='mainInput'
              value={formData.name}
              onChange={(event) => {
                setFormData({ ...formData, name: event.target.value });
                console.log(formData);
              }}

            />

            <SelectBox
              selectClass="mainInput"
              name="Status"
              label="Status"
              value={formData.status}
              required
              option={optionData}
              onChange={(event) => {
                setFormData({ ...formData, status: event.target.value });
                console.log(formData);
              }}
            />
            <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleEditSubmit} />
          </CustomModal>

          <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Brand added Successfully.' />


        </div>
      </DashboardLayout>
    </>
  );
};
