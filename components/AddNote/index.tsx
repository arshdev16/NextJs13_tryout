"use client";
import React, { useState } from "react";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as yup from "yup";

type Props = {};

interface formValues {
  title: string;
  description: string;
}

const AddNote = (props: Props) => {
  const HandleSubmit = async (formikFormValues: formValues) => {
    try {
      const { title, description } = formikFormValues;
      const docStruct = {
        title: title,
        note: description,
        createdAt: serverTimestamp(),
        createdBy: auth.currentUser?.uid,
      };
      const docRef = doc(
        db,
        `/users/${auth.currentUser?.uid}/notes/${docStruct.title}`
      );
      await setDoc(docRef, docStruct);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const initialValues: formValues = { title: "", description: "" };

  return (
    <div className="p-10">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          HandleSubmit(values);
        }}
      >
        <Form>
          <div className="flex flex-col">
            <label htmlFor="title" className="text-2xl m-2">
              Title
            </label>
            <Field
              id="title"
              name="title"
              placeholder="Title"
              type="text"
              className="p-5 border-2 border-black rounded-xl w-3/4  h-10 outline-none "
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="desc" className="text-2xl m-2">
              Description
            </label>
            <Field
              placeholder="Note"
              id="description"
              name="description"
              className="p-5 border-2 border-black rounded-xl w-3/4 h-40 outline-none "
              as="textarea"
            />
          </div>
          <button
            className="text-white bg-indigo-400 border-none rounded-2xl p-3 m-4"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddNote;
