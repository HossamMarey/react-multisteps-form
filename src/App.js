import { Button, Card, CardContent, TextField } from "@material-ui/core";
import React, { useState } from "react";

import { Field, Formik, Form } from "formik";
import * as Yup from "yup";

function App() {
  return (
    <div className="App">
      <Card>
        <CardContent>
          <Formik
            initialValues={{ name: "", age: 18, description: "" }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Name is Required"),
              age: Yup.number().required("Age is Required").min(18, "only +18"),
              description: Yup.string().min(10),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              validateField,
              /* and other goodies */
            }) => (
              <Form onSubmit={handleSubmit}>
                <FormSteps
                  isSubmitting={isSubmitting}
                  validateField={validateField}
                  errors={errors}
                  touched={touched}
                >
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Your Name"
                    component={TextField}
                    error={errors.name ? true : false}
                    helperText={errors.name && errors.name}
                  />

                  <Field
                    type="number"
                    name="age"
                    id="age"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    placeholder="Your age"
                    component={TextField}
                    error={errors.age ? true : false}
                    helperText={errors.age && errors.age}
                  />

                  <Field
                    type="text"
                    name="description"
                    id="description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    placeholder="Description"
                    component={TextField}
                    error={errors.description ? true : false}
                    helperText={errors.description && errors.description}
                  />
                </FormSteps>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

const FormSteps = (props) => {
  const childrenArr = React.Children.toArray(props.children);
  const [step, setStep] = useState(1);
  console.log(props.errors);

  const name = childrenArr[step - 1].props.name;
  const isError = props.errors[name] ? true : false;
  const isTouched = props.touched[name] ? true : false;
  const isEmpty = childrenArr[step - 1].props.value ? false : true;

  console.log(isEmpty);
  const goBack = () => {
    setStep(step - 1);
  };
  const goNext = () => {
    if (isTouched && !isError) {
      setStep(step + 1);
    } else if (!isEmpty && !isError) {
      setStep(step + 1);
    } else {
      props.validateField(name);
    }
  };
  return (
    <>
      {childrenArr[step - 1]}

      {step > 1 && (
        <Button
          disabled={props.isSubmitting}
          variant="contained"
          color="secondary"
          onClick={goBack}
        >
          Back
        </Button>
      )}
      {step < childrenArr.length && (
        <Button
          disabled={props.isSubmitting}
          variant="contained"
          onClick={goNext}
        >
          Next
        </Button>
      )}
      {step === childrenArr.length && (
        <Button
          type="submit"
          disabled={props.isSubmitting}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      )}
    </>
  );
};

export default App;
