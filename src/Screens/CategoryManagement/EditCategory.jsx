import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import { faClose, faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import CustomButton from "../../Components/CustomButton";
export const EditCategory = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState({});
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        image: '', // Initialize image as an empty string
    });

    const base_url = 'https://custom2.mystagingserver.site/food-stadium/public/'

    const fetchCategoryData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/category_view/${id}`,
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
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setFormData(data.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }
    useEffect(() => {
        fetchCategoryData()
    }, [])

    const bookType = [
        {
            id: 1,
            name: 'Book'
        },
        {
            id: 2,
            name: 'Novel'
        }
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };







    // const filehandleChange = (event) => {
    //     const file = event.target.files[0];
    //     // console.log(file.name)
    //     if (file) {
    //         const fileName = file;
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             image: fileName,
    //         }));
    //     }
    //     console.log(formData)
    // };


    const filehandleChange = (event) => {
        const file = event.target.files[0];

        // if (file) {
        const reader = new FileReader();

        reader.onload = (e) => {
            const imageDataUrl = e.target.result;

            setFormData((prevData) => {
                return {
                    ...prevData,
                    image: file,
                }
            });
        };

        // Read the selected image file as a data URL
        reader.readAsDataURL(file);
        // }
    };




    const LogoutData = localStorage.getItem('login');


    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/category_add_update/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data);
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };


    const handleRemove = (imageid) => {
        const indeximage = formData?.product_images.findIndex((item) => item.id === imageid)
        if (indeximage !== -1) {
            setFormData((prevFormData) => {
                const productimage = [...prevFormData.product_images.slice(0, indeximage), ...prevFormData.product_images.slice(indeximage + 1)];
                return {
                    ...prevFormData,
                    product_images: productimage
                }

            })
        }
    }

    console.log("formData", formData)
    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Category
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Category Name'
                                                    required
                                                    id='name'
                                                    type='text'
                                                    placeholder='Enter Book Title'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <SelectBox
                                                    selectClass="mainInput"
                                                    name="book_type_id"
                                                    label="Select Type"
                                                    required
                                                    value={formData.book_type_id}
                                                    option={bookType}
                                                    onChange={
                                                        handleChange

                                                    }
                                                />

                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Upload Product Image'
                                                    required
                                                    id='file'
                                                    type='file'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="image"
                                                    // value={formData.image}
                                                    onChange={filehandleChange}
                                                />

                                                {/* <div className="galleryBox row">
                                                    <div className="galleryItem col-md-3 mb-3 position-relative" key={formData.id}>
                                                        <img src={base_url + formData.image} alt={`Product Image ${formData.id}`} />


                                                        <div className="removeImage" onClick={() => handleRemove(formData.id)}>
                                                            <button type="button">
                                                                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div> */}
                                                <div className="galleryBox row">
                                                    <div className="galleryItem col-md-3 mb-3 position-relative" key={formData.id}>
                                                        {formData.image && (
                                                            <img src={base_url + formData.image} alt={`Product Image ${formData.id}`} />
                                                        )}

                                                        <div className="removeImage" onClick={() => handleRemove(formData.id)}>
                                                            <button type="button">
                                                                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Category Update Successfully.' />

            </DashboardLayout>
        </>
    );
};

