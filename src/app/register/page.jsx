"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";


const validate = (values) => {
  const errors = {};

  if (!values.email) errors.email = "Email is required";
  if (!values.participantName) errors.participantName = "Participant's Name is required";
  if (!values.ageCriteria) errors.ageCriteria = "Age Criteria is required";
  if (!values.participantAge) errors.participantAge = "Participant's Age is required";
  if (!values.guardianNumber) errors.guardianNumber = "Parent's/Guardian's Number is required";
  if (!values.address) errors.address = "Address is required";
  if (!values.talent) errors.talent = "Participant's Talent is required";

  if (!values.termsAccepted.videoSharing) {
    errors.termsAccepted = errors.termsAccepted || {};
    errors.termsAccepted.videoSharing = "You must accept the video sharing terms";
  }

  if (!values.termsAccepted.offensiveContent) {
    errors.termsAccepted = errors.termsAccepted || {};
    errors.termsAccepted.offensiveContent = "You must accept the terms regarding offensive content";
  }

  if (!values.termsAccepted.incidents) {
    errors.termsAccepted = errors.termsAccepted || {};
    errors.termsAccepted.incidents = "You must accept the terms regarding incidents";
  }

  return errors;
};

const RegisterForm = () => {
  const [values, setValues] = useState({
    email: "",
    participantName: "",
    ageCriteria: "",
    participantAge: "",
    guardianNumber: "",
    address: "",
    talent: "",
    termsAccepted: {
      videoSharing: false,
      offensiveContent: false,
      incidents: false,
    },
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  console.log(errors);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setValues((prevValues) => ({
        ...prevValues,
        termsAccepted: {
          ...prevValues.termsAccepted,
          [name]: checked,
        },
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`
          );
          const data = await response.json();
          if (data.status === "OK") {
            const address = data.results[0].formatted_address;
            setValues((prevValues) => ({
              ...prevValues,
              address: address,
            }));
          } else {
            alert("Failed to retrieve address.");
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to retrieve location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(values);

    if (Object.keys(validationErrors).length === 0) {
      try {
        console.log("hi");
        const response = await fetch("http://localhost:8080/api/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          setValues({
            email: "",
            participantName: "",
            ageCriteria: "",
            participantAge: "",
            guardianNumber: "",
            address: "",
            talent: "",
            termsAccepted: {
              videoSharing: false,
              offensiveContent: false,
              incidents: false,
            },
          });
          setErrors({});
          setServerError("");
        } else {
          const errorData = await response.json();
          setServerError(errorData.error);
        }
      } catch (error) {
        setServerError("Something went wrong. Please try again later.");
      }
    } else {
      setErrors(validationErrors);
    }
  };
  return (
    <div className="bg-[#E5C3FF] p-6 space-y-4">
      <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="example@example.com"
              className={`w-full p-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant's Name:
            </label>
            <input
              type="text"
              name="participantName"
              value={values.participantName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full p-2 border rounded ${
                errors.participantName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.participantName && (
              <p className="text-red-500 text-sm">{errors.participantName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Age Criteria:</label>
            <select
              name="ageCriteria"
              value={values.ageCriteria}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.ageCriteria ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Age Criteria</option>
              <option value="6-8">6-8 years</option>
              <option value="9-12">9-12 years</option>
            </select>
            {errors.ageCriteria && (
              <p className="text-red-500 text-sm">{errors.ageCriteria}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant's Age:
            </label>
            <input
              type="number"
              name="participantAge"
              value={values.participantAge}
              onChange={handleChange}
              placeholder="Age of participant"
              className={`w-full p-2 border rounded ${
                errors.participantAge ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.participantAge && (
              <p className="text-red-500 text-sm">{errors.participantAge}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Parent's/Guardian's Number:
            </label>
            <input
              type="text"
              name="guardianNumber"
              value={values.guardianNumber}
              onChange={handleChange}
              placeholder="123-456-7890"
              className={`w-full p-2 border rounded ${
                errors.guardianNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.guardianNumber && (
              <p className="text-red-500 text-sm">{errors.guardianNumber}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium mb-2">Address:</label>
            <textarea
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="123 Main St, Apt 4B, City, State, ZIP"
              className={`w-full p-2 border rounded ${
                errors.address ? "border-red-500" : "border-gray-300"
              }`}
            />
            <FaMapMarkerAlt
              data-tip="Point Current Location"
              className="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={handleLocationClick}
            />
         
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Participant's Talent:
            </label>
            <select
              name="talent"
              value={values.talent}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.talent ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Talent</option>
              <option value="acting">Acting</option>
              <option value="dancing">Dancing</option>
              <option value="mimicry">Mimicry</option>
              <option value="singing">Singing</option>
            </select>
            {errors.talent && <p className="text-red-500 text-sm">{errors.talent}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Terms and Conditions:</label>
            <label className="inline-flex items-center block mb-2">
              <input
                type="checkbox"
                name="videoSharing"
                checked={values.termsAccepted.videoSharing}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting the video, I confirm that I, as a parent/legal guardian, have voluntarily chosen to do so and have no objection to sharing the video.
              </span>
            </label>
            {errors.termsAccepted?.videoSharing && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.videoSharing}</p>
            )}

            <label className="inline-flex items-center block mb-2">
              <input
                type="checkbox"
                name="offensiveContent"
                checked={values.termsAccepted.offensiveContent}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting, I confirm as a parent/guardian that no offensive language or content is being used. Disqualification is at the company's discretion if found. Registration fees plus GST are non-refundable upon disqualification.
              </span>
            </label>
            {errors.termsAccepted?.offensiveContent && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.offensiveContent}</p>
            )}

            <label className="inline-flex items-center block mb-4">
              <input
                type="checkbox"
                name="incidents"
                checked={values.termsAccepted.incidents}
                onChange={handleChange}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                By submitting, I acknowledge that the company is not responsible for any incidents that may occur during the shooting and video-making process.
              </span>
            </label>
            {errors.termsAccepted?.incidents && (
              <p className="text-red-500 text-sm">{errors.termsAccepted.incidents}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-purple-700 text-white font-semibold rounded hover:bg-[#003470] transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
