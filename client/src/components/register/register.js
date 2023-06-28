import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Register = () => {
  const history = useHistory();

  const register = (user) => {
    const { name, email, password } = user;
    if (name && email && password) {
      axios.post("http://localhost:9002/register", user).then((res) => {
        alert(res.data.message);
        history.push("/login");
      });
    } else {
      alert("invlid input");
    }
  };

  const validate = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(10, "Too Long!")
      .required("Required"),

    email: Yup.string().email("Invalid email").required("Required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Pasword is required"),

    number: Yup.string()
      .min(10, "Too Short!")
      .max(12, "Too Long!")
      // .min(10, "Number must be at least 10 characters")
      // .max(12, "Number must be at least 12 digits")
      .required("Number is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        // reEnterPassword: "",
        number: "",
        level: "",
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
        register(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          {console.log(errors)}
          <div className="register">
            {console.log("User")}
            <h1>Create An Account</h1>
            <div className="GooogleButton">Google</div>
            <Field name="name" placeholder="Full Name" />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}

            <Field name="email" placeholder="Email" />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}

            <Field name="password" placeholder="Password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}

            <Field name="number" placeholder="Mobile Numbers" />
            {errors.number && touched.number ? (
              <div>{errors.number}</div>
            ) : null}

            <Field
              as="select"
              id="education"
              name="level"
              form="education form"
              required
            >
              <option value="higer">------Highest education level------</option>
              <option value="6th-9th">class 6th -9th</option>
              <option value="10 th">10th class</option>
              <option value="12th">12th class</option>
              <option value="graduate">Graduate Dgree / Diploma</option>
              <option value="postgraduate">PostGraduate Dgree</option>
            </Field>
            
            <button type="submit" className="button">
              Register
            </button>
            <div>or</div>
            <button className="button" onClick={() => history.push("/login")}>
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
