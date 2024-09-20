import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Services = () => {
  // State for services
  const [services, setServices] = useState([]);

  // State for the form inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // State for editing mode
  const [editingId, setEditingId] = useState(null);


  const formRef = useRef(null);

  // Handle form submission to add or update service
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!name || !description || !price) {
      alert("All fields are required!");
      return;
    }

    if (editingId) {
      // If editing, update the service
      const updatedServices = services.map((service) =>
        service.id === editingId
          ? { ...service, name, description, price }
          : service
      );
      setServices(updatedServices);
      setEditingId(null); // Exit edit mode
    } else {
      // Add a new service
      setServices([
        ...services,
        { id: uuidv4(), name, description, price: parseFloat(price) },
      ]);
    }

    // Clear form fields
    setName("");
    setDescription("");
    setPrice("");
  };

  // Handle editing a service
  const handleEdit = (id) => {
    showForm()
    const serviceToEdit = services.find((service) => service.id === id);
    setName(serviceToEdit.name);
    setDescription(serviceToEdit.description);
    setPrice(serviceToEdit.price);
    setEditingId(id); // Set the editing id
  };

  // Handle deleting a service
  const handleDelete = (id) => {
    setServices(services.filter((service) => service.id !== id));
  };
 
  const showForm = () => {
    formRef.current.classList.remove("hidden");
  };
  const hideForm = ()=>{
    formRef.current.classList.add('hidden')
  }
  return (
    <>
      <div className="container mx-auto p-8">
        <div className="head flex justify-between mb-2 ">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Healthcare Services Management
          </h1>
          <button onClick={showForm} className="text-white bg-blue-500 hover:bg-blue-700 rounded-lg border p-2">
            Add a Service
          </button>
        </div>

        {/* Display list of services */}
        <ul className="list-none ">
          {services.length > 0 ? (
            services.map((service) => (
              <li
                key={service.id}
                className="mb-4 bg-gray-100 p-2 border-none rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{service.name}</h3>
                    <p>{service.description}</p>
                    <p>Price: ${service.price.toFixed(2)}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleEdit(service.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No services available. Please add a service.</p>
          )}
        </ul>
      </div>

      {/* Form to add/update service */}

      <form
        onSubmit={handleSubmit}
        id="forminp"
        ref={formRef}
        className="hidden bg-gray-300 p-4 w-[80%] absolute top-[70%] left-1/2 translate-x-[-50%] translate-y-[-60%]"
      >
        <button onClick={hideForm} className=" ml-auto mr-0 bg-red-600 text-white p-2 px-4">X</button>
        <div className="fields bg-gray-100">
          <div className="mb-4 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Service Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight"
            />
          </div>
        </div>

        <button onClick={hideForm}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {editingId ? "Update Service" : "Add Service"}
        </button>
      </form>
    </>
  );
};

export default Services;
