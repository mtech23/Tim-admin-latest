import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPencil, faRemove, faTimes, faFilter, faEye } from "@fortawesome/free-solid-svg-icons";

import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import CustomTable from "../../Components/CustomTable";
import CustomModal from "../../Components/CustomModal";

import CustomPagination from "../../Components/CustomPagination"
import CustomInput from "../../Components/CustomInput";
import CustomButton from "../../Components/CustomButton";
import { SelectBox } from "../../Components/CustomSelect";
import Select from 'react-select'
import { useApi, usePost, usePostUpdate } from "../../Api";




import "./style.css";

export const UnitTarget = () => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [units, setUnits] = useState({});
  const [addUser, setUser] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [idUser, setIdUser] = useState();
  const { apiData: unitListing, loading: unitLoading } = useApi('admin/unit-listing');
  const { apiData: TargetListing, loading: TargetLoding } = useApi('admin/unit-Target-List');
  const { apiData: TargetResponseData, loading: TragetResponseLoading, error: TargetResponseError, updateDataForm: targetUpdateData, editParam: TargetEditData } = usePostUpdate('admin/unit-targets-edit/');

  const [editFormData, SetEditFormData] = useState({
    unit_id: '',
    target: '',
    year: '2023',
    status: '1',
    month: ''

  });

  const handleEditTarget = (event) => {
    event.preventDefault();
    console.log(editFormData)

    TargetEditData(idUser);
    targetUpdateData(editFormData);
  }



  const unitValue = [];

  useEffect(() => {
    setUnits(unitListing?.units)
  }, [unitListing])


  for (const key in units) {
    const option = {
      code: units[key].id,
      name: units[key].name
    }

    unitValue.push(option)

  }



  const [formData, setFormData] = useState({
    unit_id: '',
    target: '',
    year: '2023',
    status: '1',
    month: ''
  });


  const monthList = [
    {
      code: 1,
      name: 'January'
    },
    {
      code: 2,
      name: 'Feburay'
    }, {
      code: 3,
      name: 'March'
    },
    {
      code: 4,
      name: 'April'
    },
    {
      code: 5,
      name: 'May'
    },
    {
      code: 6,
      name: 'June'
    },
    {
      code: 7,
      name: 'July'
    },
    {
      code: 8,
      name: 'August'
    },
    {
      code: 9,
      name: 'September'
    },
    {
      code: 10,
      name: 'Octuber'
    },
    {
      code: 11,
      name: 'November'
    },
    {
      code: 12,
      name: 'December'
    }
  ]



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };




  // const handleChange = (e) => {
  //   setInputValue(e.target.value);
  // }

  const filterData = data.filter(item =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterData.slice(indexOfFirstItem, indexOfLastItem);


  const fetchData = () => {
    const LogoutData = localStorage.getItem('login');
    document.querySelector('.loaderBox').classList.remove("d-none");
    fetch('https://custom.mystagingserver.site/mtrecords/public/api/admin/unit-Target-List',
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


        console.log(data.data)
        setData(data.data);
      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error)
      })
  }

  useEffect(() => {
    document.title = 'Tim Admin | Unit Target';

    fetchData()
  }, []);

  const maleHeaders = [
    {
      key: "id",
      title: "S.No",
    },
    {
      key: "username",
      title: "Unit Name",
    },
    {
      key: "target",
      title: "Target",
    },
    // {
    //   key: "targetscore",
    //   title: "Target Score",
    // },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "action",
      title: "Action",
    },

  ];




  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData)
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   console.log(formData)
  //   rolesLitingResponse(formData);
  // }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData)

    const LogoutData = localStorage.getItem('login');
    fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/set-unit-target`,
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
        fetchData()
        setUser(false)



      })
      .catch((error) => {
        document.querySelector('.loaderBox').classList.add("d-none");
        console.log(error);
      })
  }

  const deleteTarget = async (id) => {
    try {
      const LogoutData = localStorage.getItem('login');
      const response = await fetch(`https://custom.mystagingserver.site/mtrecords/public/api/admin/unit-targets-delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
        },
      });

      const data = await response.json();
      console.log(data);

      // Assuming fetchData is an asynchronous function
      await fetchData();

      // Assuming setUser is a function to update user state
      setUser(false);
    } catch (error) {
      document.querySelector('.loaderBox').classList.add("d-none");
      console.error(error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
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
                    <h2 className="mainTitle">Target Listing</h2>
                  </div>
                  <div className="col-md-6 mb-2">
                    <div className="addUser">
                      <CustomButton text="Add Unit Target" variant='primaryButton' onClick={() => {
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
                            <td className="text-uppercase">
                              {item.name}
                            </td>
                            {/* <td>{item?.current_month_target?.target ? `$ ${item?.current_month_target?.target}` : '$0'}</td> */}
                            <td>{item?.current_month_target?.target ? `$ ${item?.current_month_target?.target}` : '$0'}</td>
                            {/* <td>{`$ ${item?.target_score}`}</td> */}
                            {/* <td>{item?.current_month_target?.month}</td> */}
                            <td className={item.status == 1 ? 'greenColor' : 'redColor'}>{item.status == 1 ? 'Active' : 'Inactive'}</td>
                            <td>
                              <Dropdown className="tableDropdown">
                                <Dropdown.Toggle variant="transparent" className="notButton classicToggle">
                                  <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" className="tableDropdownMenu">
                                  {/* <button onClick={() => {
                                    editTarget(item?.id)
                                  }} className="tableAction"><FontAwesomeIcon icon={faPencil} className="tableActionIcon" />Edit</button> */}

                                  <Link className="tableAction" to={`target-detail/${item?.id}`}><FontAwesomeIcon icon={faEye} className="tableActionIcon" />View Details</Link>
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



        </div>

        <CustomModal show={addUser} close={() => { setUser(false) }} heading="Set Target" >

          <SelectBox
            selectClass="mainInput"
            name="unit_id"
            label="Select Unit"
            labelClass='mainLabel'
            required
            value={formData.unit_id}
            option={unitValue}
            onChange={handleChange}

          />
          <CustomInput
            label="Set Target"
            type="number"
            placeholder="Set Target"
            required
            name="target"
            labelClass='mainLabel'
            inputClass='mainInput'
            value={formData.target}
            onChange={(event) => {
              setFormData({ ...formData, target: event.target.value });
              console.log(formData);
            }}


          />
          <SelectBox
            selectClass="mainInput"
            name="month"
            labelClass='mainLabel'
            label="Select Month"
            required
            value={formData.month}
            option={monthList}
            onChange={handleChange}

          />

          {/* <div class="inputWrapper">
              <label class="mainLabel">Add brands<span>*</span></label>
              <Select
                value={formData.brands}
                isMulti
                required
                options={SelectOptions}
                onChange={handleChangeSelect}
              />
            </div> */}

          <CustomButton variant='primaryButton' text='Add' type='button' onClick={handleSubmit} />
        </CustomModal>

        {/* Edit Target  */}

      </DashboardLayout>
    </>
  );
};
