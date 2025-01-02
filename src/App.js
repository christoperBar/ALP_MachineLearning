'use client'

import React, { useState } from 'react';
import axios from 'axios';

// Define the initial state as an array of objects
const initialState = {
  age: '',
  height: '',
  weight: '',
  fcvc: '',
  ncp: '',
  ch2o: '',
  faf: '',
  tue: '',
  gender_female: '',
  gender_male: '',
  family_history_with_overweight_no: '',
  family_history_with_overweight_yes: '',
  favc_no: '',
  favc_yes: '',
  caec_always: '',
  caec_frequently: '',
  caec_sometimes: '',
  caec_no: '',
  smoke_no: '',
  smoke_yes: '',
  scc_no: '',
  scc_yes: '',
  calc_always: '',
  calc_frequently: '',
  calc_sometimes: '',
  calc_no: '',
  mtrans_automobile: '',
  mtrans_bike: '',
  mtrans_motorbike: '',
  mtrans_public_transportation: '',
  mtrans_walking: ''
};

export default function ObesityPredictor() {
  const [formData, setFormData] = useState(initialState);
  const [result, setResult] = useState(null);
  const handleChange2 = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'radio') {
      const groupName = name.split('_')[0];
      const newFormData = { ...formData };

      Object.keys(newFormData).forEach((key) => {
        if (key.startsWith(groupName + '_')) {
          newFormData[key] = '';
        }
      });

      newFormData[name] = '1';
      setFormData(newFormData);
    } else if (type === 'number') {
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderedFeatures = Object.keys(initialState).map(key => {
        const value = formData[key];
        return value === '' ? 0 : parseFloat(value);
      });
      console.log(orderedFeatures, "ajay");
      
      const response = await axios.post('http://127.0.0.1:5000/predict', { features: orderedFeatures });
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(formData, "Form Data");

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-2xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold text-center mb-6">Obesity Predictor</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Numeric Inputs */}
              <div className="space-y-4">
                <InputField label="Age" name="age" value={formData.age} onChange={handleChange} />
                <InputField label="Height (m)" name="height" value={formData.height} onChange={handleChange} />
                <InputField label="Weight (kg)" name="weight" value={formData.weight} onChange={handleChange} />
              </div>

              {/* FCVC */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Do you usually eat vegetables in your meals?</label>
                <div className="space-y-1">
                  <Radio2Option
                    name="fcvc"
                    label="Never"
                    checked={formData.fcvc === '1'}
                    value="1"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="fcvc"
                    label="Sometimes"
                    checked={formData.fcvc === '2'}
                    value="2"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="fcvc"
                    label="Always"
                    checked={formData.fcvc === '3'}
                    value="3"
                    onChange={handleChange2}
                  />

                </div>
              </div>
              {/* NCP */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">How many main meals do you have daily?</label>
                <div className="space-y-1">
                  <Radio2Option
                    name="ncp"
                    label="One"
                    checked={formData.ncp === '1'}
                    value="1"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="ncp"
                    label="Two"
                    checked={formData.ncp === '2'}
                    value="2"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="ncp"
                    label="Three"
                    checked={formData.ncp === '3'}
                    value="3"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="ncp"
                    label="More than three"
                    checked={formData.ncp === '4'}
                    value="4"
                    onChange={handleChange2}
                  />

                </div>
              </div>

              {/* CH2O */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">How many main meals do you have daily?</label>
                <div className="space-y-1">
                  <Radio2Option
                    name="ch2o"
                    label="Less than a liter"
                    checked={formData.ch2o === '0'}
                    value="0"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="ch2o"
                    label="Between 1 and 2 liter"
                    checked={formData.ch2o === '1'}
                    value="1"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="ch2o"
                    label="More than 2 liter"
                    checked={formData.ch2o === '2'}
                    value="2"
                    onChange={handleChange2}
                  />

                </div>
              </div>

              {/* FAF */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">How often do you have physical activity?</label>
                <div className="space-y-1">
                  <Radio2Option
                    name="faf"
                    label="I don't do"
                    checked={formData.faf === '0'}
                    value="0"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="faf"
                    label="1 or 2 times a week"
                    checked={formData.faf === '1'}
                    value="1"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="faf"
                    label="2 or 4 times a week"
                    checked={formData.faf === '2'}
                    value="2"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="faf"
                    label="More than 4 times a week"
                    checked={formData.faf === '3'}
                    value="3"
                    onChange={handleChange2}
                  />

                </div>
              </div>

              {/* TUE */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">How much time do you use technological devices such as cell phone, videogames, television, computer and others?</label>
                <div className="space-y-1">
                  <Radio2Option
                    name="tue"
                    label="0–2 hours a day"
                    checked={formData.tue === '0'}
                    value="0"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="tue"
                    label="3–5 hours a day"
                    checked={formData.tue === '1'}
                    value="1"
                    onChange={handleChange2}
                  />
                  <Radio2Option
                    name="tue"
                    label="More than 5 hours a day"
                    checked={formData.tue === '2'}
                    value="2"
                    onChange={handleChange2}
                  />
                </div>
              </div>


              {/* Gender */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Gender:</label>
                <div className="space-y-1">
                  <RadioOption
                    name="gender_female"
                    label="Female"
                    checked={formData.gender_female === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="gender_male"
                    label="Male"
                    checked={formData.gender_male === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Family History */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Family History with Overweight:</label>
                <div className="space-y-1">
                  <RadioOption
                    name="family_history_with_overweight_no"
                    label="No"
                    checked={formData.family_history_with_overweight_no === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="family_history_with_overweight_yes"
                    label="Yes"
                    checked={formData.family_history_with_overweight_yes === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* FAVC */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Do you eat high caloric food frequently?</label>
                <div className="space-y-1">
                  <RadioOption
                    name="favc_no"
                    label="No"
                    checked={formData.favc_no === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="favc_yes"
                    label="Yes"
                    checked={formData.favc_yes === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* CAEC */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Do you eat any food between meals?</label>
                <div className="space-y-1">
                  <RadioOption
                    name="caec_no"
                    label="No"
                    checked={formData.caec_no === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="caec_sometimes"
                    label="Sometimes"
                    checked={formData.caec_sometimes === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="caec_frequently"
                    label="Frequently"
                    checked={formData.caec_frequently === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="caec_always"
                    label="Always"
                    checked={formData.caec_always === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Smoke */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Do you smoke?</label>
                <div className="space-y-1">
                  <RadioOption
                    name="smoke_no"
                    label="No"
                    checked={formData.smoke_no === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="smoke_yes"
                    label="Yes"
                    checked={formData.smoke_yes === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* SCC */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Do you monitor the calories you eat daily?</label>
                <div className="space-y-1">
                  <RadioOption
                    name="scc_no"
                    label="No"
                    checked={formData.scc_no === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="scc_yes"
                    label="Yes"
                    checked={formData.scc_yes === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* CALC */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">How often do you drink alcohol?</label>
                <div className="space-y-1">
                  <RadioOption
                    name="calc_no"
                    label="No"
                    checked={formData.calc_no === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="calc_sometimes"
                    label="Sometimes"
                    checked={formData.calc_sometimes === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="calc_frequently"
                    label="Frequently"
                    checked={formData.calc_frequently === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="calc_always"
                    label="Always"
                    checked={formData.calc_always === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* MTRANS */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Which transportation do you usually use?</label>
                <div className="space-y-1">
                  <RadioOption
                    name="mtrans_automobile"
                    label="Automobile"
                    checked={formData.mtrans_automobile === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="mtrans_bike"
                    label="Bike"
                    checked={formData.mtrans_bike === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="mtrans_motorbike"
                    label="Motorbike"
                    checked={formData.mtrans_motorbike === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="mtrans_public_transportation"
                    label="Public Transportation"
                    checked={formData.mtrans_public_transportation === '1'}
                    onChange={handleChange}
                  />
                  <RadioOption
                    name="mtrans_walking"
                    label="Walking"
                    checked={formData.mtrans_walking === '1'}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500 focus:ring-offset-cyan-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              >
                Predict
              </button>
            </form>

            {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Result: </h2>
              {result.prediction === 0 ? (
                <p className="text-cyan-600 font-medium">Insufficient Weight</p>
              ) : result.prediction === 1 ? (
                <p className="text-green-600 font-medium">Normal Weight</p>
              ) : result.prediction === 5 ? (
                <p className="text-yellow-600 font-medium">Overweight Level I</p>
              ) : result.prediction === 6 ? (
                <p className="text-yellow-600 font-medium">Overweight Level II</p>
              ) : result.prediction === 2 ? (
                <p className="text-orange-600 font-medium">Obesity Type I</p>
              ) : result.prediction === 3 ? (
                <p className="text-orange-600 font-medium">Obesity Type II</p>
              ) : (
                <p className="text-red-600 font-medium">Obesity Type III</p>
              )}
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}:
      </label>
      <input
        type="number"
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 focus:z-10 sm:text-sm"
      />
    </div>
  );
}

function RadioOption({ name, label, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={name}
        name={name}
        value="1"
        checked={checked}
        onChange={onChange}
        className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
      />
      <label htmlFor={name} className="ml-3 block text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}

function Radio2Option({ name, label, checked, onChange, value }) {
  return (
    <div className="flex items-center">
      <input
        type="radio"
        id={name}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
      />
      <label htmlFor={name} className="ml-3 block text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}

