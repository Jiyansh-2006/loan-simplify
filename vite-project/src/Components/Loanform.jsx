import React, { useState } from "react";
import { db } from "../lib/firebase";  // adjust path if needed
import { collection, doc, addDoc, serverTimestamp } from "firebase/firestore";
import "./Loanform.css";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const LoanForm = () => {
  const navigate = useNavigate();
  const [loanType, setLoanType] = useState("")
  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    employmentStatus: "",
    income: "",
    loanAmount: "",
    model: "",
    type: "",
    businessName: "",
    businessType: "",
    registrationNumber: "",
    turnOver: "",
    companyName: "",
    designation: "",
    experience: "",
    accountType: "",
    institute: "",
    course: "",
    level: "",
    courseDuration: "",
    currentYear: "",
    id: "",
    propertyType: "",
    propertyLocation: "",
    propertyValue: "",
    propertyRegistration: "",
    occupation: "",
    company: "",
    annualIncome: "",
    workfor: "",
    goldType: "",
    goldPurity: "",
    goldWeight: "",
    estimedValue: "",
    farmingType: "",
    cropType: "",
    ownner: "",
    area: "",
    landLocation: "",
    irrigationFacility: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reference to aadhaarUsers/{aadhaarNumber}/loanApplications
      const userRef = doc(db, "aadhaarUsers", formData.aadhaarNumber);
      const loanApplicationsRef = collection(userRef, "loanApplications");

      await addDoc(loanApplicationsRef, {
        ...formData,
        status: "pending",   // default status
        createdAt: serverTimestamp(),
      });

      alert("Loan application submitted successfully!");

      setFormData({
        aadhaarNumber: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        age: "",
        employmentStatus: "",
        income: "",
        loanAmount: "",
        model: "",
        type: "",
        businessName: "",
        businessType: "",
        registrationNumber: "",
        turnOver: "",
        companyName: "",
        designation: "",
        experience: "",
        accountType: "",
        institute: "",
        course: "",
        level: "",
        courseDuration: "",
        currentYear: "",
        id: "",
        propertyType: "",
        propertyLocation: "",
        propertyValue: "",
        propertyRegistration: "",
        occupation: "",
        company: "",
        annualIncome: "",
        workfor: "",
        goldType: "",
        goldPurity: "",
        goldWeight: "",
        estimedValue: "",
        farmingType: "",
        cropType: "",
        ownner: "",
        area: "",
        landLocation: "",
        irrigationFacility: ""
      });
      setLoanType("")

      // redirect to document upload page
      navigate("/UploadDocuments");

    } catch (error) {
      console.error("Error submitting loan application: ", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="loan-form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="loan-form-heading">Loan Application Form</h2>
          <select
            name="loanType"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value)}
            required
          >
            <option value="">-- Select Loan Type --</option>
            <option value="vehicle">Vehicle Loan</option>
            <option value="business">Business Loan</option>
            <option value="personal">Personal Loan</option>
            <option value="education">Education Loan</option>
            <option value="home">Home Loan</option>
            <option value="gold">Gold Loan</option>
            <option value="agri">Agricultural Loan</option>
          </select>
          <input
            type="text"
            name="aadhaarNumber"
            placeholder="Aadhaar Number"
            value={formData.aadhaarNumber}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="employmentStatus"
            placeholder="Employment Status"
            value={formData.employmentStatus}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="income"
            placeholder="Income"
            value={formData.income}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="loanAmount"
            placeholder="Loan Amount"
            value={formData.loanAmount}
            onChange={handleChange}
            required
          />
          {loanType == "vehicle" && (
            <div className="loan-type">
              <input
                type="text"
                name="model"
                placeholder="Vehicle Model"
                value={formData.model}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="type"
                placeholder="Vehicle Type (e.g. Two Wheeler)"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {loanType == "business" && (
            <>
              <div className="loan-type">
                <input
                  type="text"
                  name="businessName"
                  placeholder="Business Name"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="businessType"
                  placeholder="Business Type(e.g. Manufacturing, Retail)"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input
                  type="text"
                  name="registrationNumber"
                  placeholder="Business Registration Number"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="turnover"
                  placeholder="Annual Turnover (₹)"
                  value={formData.turnover}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          {loanType == "personal" && (
            <>
              <div className="loan-type">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="designation"
                  placeholder="Designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input
                  type="text"
                  name="experience"
                  placeholder="Years of Experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="accountType"
                  placeholder="Account Type(savings / current)"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {loanType == "education" && (
            <>
              <div className="loan-type">
                <input
                  type="text"
                  name="institute"
                  placeholder="Institution Name"
                  value={formData.institute}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="course"
                  placeholder="Course Name"
                  value={formData.course}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input
                  type="text"
                  name="level"
                  placeholder="Level of Study(e.g. Undergraduate)"
                  value={formData.level}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="courseDuration"
                  placeholder="Course Duration"
                  value={formData.courseDuration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input
                  type="text"
                  name="currentYear"
                  placeholder="Curerent Study of Year(e.g. 1st Year)"
                  value={formData.currentYear}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="id"
                  placeholder="Student ID / Roll No."
                  value={formData.id}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          {loanType == "home" && (
            <>
              <div className="loan-type">
                <input
                  type="text"
                  name="propertyType"
                  placeholder="Property Type"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="propertyLocation"
                  placeholder="Property Location"
                  value={formData.propertyLocation}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input
                  type="text"
                  name="propertyValue"
                  placeholder="Property Value (in ₹)"
                  value={formData.propertyValue}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="propertyRegistration"
                  placeholder="Property Registration Number"
                  value={formData.propertyRegistration}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input
                  type="text"
                  name="occupation"
                  placeholder="Occupation Type(e.g. Self-Employed, Salarified)"
                  value={formData.occupation}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input
                  type="text"
                  name="annualIncome"
                  placeholder="Annual Income(in ₹)"
                  value={formData.annualIncome}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="workfor"
                  placeholder="Work Experience"
                  value={formData.workfor}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {loanType == "gold" && (
            <>
              <div className="loan-type">
                <select
                  name="goldType"
                  value={formData.goldType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gold Type</option>
                  <option value="jewellery">Jewellery</option>
                  <option value="coins">Coins</option>
                  <option value="bars">Bars</option>
                  <option value="ornaments">Ornaments</option>
                </select>
                <select
                  name="goldPurity"
                  value={formData.goldPurity}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Gold Purity</option>
                  <option value="jewellery">18K</option>
                  <option value="coins">20K</option>
                  <option value="bars">22K</option>
                  <option value="ornaments">24K</option>
                </select>
              </div>
              <div className="loan-type">
                <input
                  type="number"
                  name="goldWeight"
                  placeholder="Gold Weight (grams)"
                  value={formData.goldWeight}
                  onChange={handleChange}
                  required
                />
                <input
                  type="number"
                  name="estimedValue"
                  placeholder="Estimated Value of Gold (₹)"
                  value={formData.estimedValue}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}

          {loanType == "agri" && (
            <>
              <div className="loan-type">
                <select 
                  name="farmingType" 
                  value={formData.farmingType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type of Farming</option>
                  <option value="cropFarming">Crop Farming</option>
                  <option value="horticulture">Horticulture</option>
                  <option value="dairy">Dairy</option>
                  <option value="poultry">Poultry</option>
                  <option value="fisherise">Fisheries</option>
                  <option value="planatation">Planatation</option>
                  <option value="others">Others</option>
                </select>
                <input 
                  type="text" 
                  name="cropType"
                  placeholder="Crop Type(e.g. Wheat, Rice)"
                  value={formData.cropType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <select 
                  name="ownner" 
                  value={formData.ownner}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Land Ownership Type</option>
                  <option value="owned">Owned</option>
                  <option value="leased">Leased</option>
                  <option value="jointOwnership">Joint Ownership</option>
                </select>
                <input 
                  type="number" 
                  name="area"
                  placeholder="Land Area(in acres)"
                  value={formData.area}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="loan-type">
                <input 
                  type="text" 
                  name="landLocation"
                  placeholder="Land Location"
                  value={formData.landLocation}
                  onChange={handleChange}
                  required
                />
                <select 
                  name="irrigationFacility" 
                  value={formData.irrigationFacility}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Irrigation Facility</option>
                  <option value="well">well</option>
                  <option value="tubeWell">Tube Well</option>
                  <option value="canal">Canal</option>
                  <option value="rainfed">Rainfed</option>
                  <option value="drip">Drip</option>
                  <option value="sprinkler">Sprinkler</option>
                </select>
              </div>
            </>
          )}

          {/* ✅ Use button instead of Link */}
          <button type="submit" className="submit">
            Submit Loan Application
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default LoanForm;
