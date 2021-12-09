import * as Yup from "yup";

import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";

import { updateUser } from "../../../actions/user";
import { useAxios } from "../../../hooks/useAxios";
import { useCurrentUser } from "../../../hooks/user";

interface ProfileImages {
  user_picture: string | null;
  coverPhoto: string | null;
}

export default function UpdateProfileForm() {
  const [currentUser] = useCurrentUser();
  const [dispatchAxios, { loading }] = useAxios();

  const [initialValues, setInitialValues] = useState({
    about: "",
    user_picture: "",
    coverPhoto: "",
  });

  const [selectedFile, setSelectedFile] = useState<ProfileImages>({
    user_picture: null,
    coverPhoto: null,
  });

  const schema = Yup.object().shape({
    name: Yup.string().required("Username is required"),
    about: Yup.string(),
    user_picture: Yup.mixed()
      .test("imageType", "Must be an image format", (file) => {
        if (file) {
          return (
            (file && file.type === "image/jpeg") ||
            (file && file.type === "image/jpg") ||
            (file && file.type === "image/png")
          );
        } else {
          return true;
        }
      })
      .test("fileSize", "File is too large", (file) => {
        if (file) {
          return file && file.size <= 10000000;
        } else {
          return true;
        }
      }),
    coverPhoto: Yup.mixed()
      .test("imageType", "Must be an image format", (file) => {
        if (file) {
          return (
            (file && file.type === "image/jpeg") ||
            (file && file.type === "image/jpg") ||
            (file && file.type === "image/png")
          );
        } else {
          return true;
        }
      })
      .test("fileSize", "File is too large", (file) => {
        if (file) {
          return file && file.size <= 10000000;
        } else {
          return true;
        }
      }),
  });

  const onSelectFile = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: {
      (field: string, value: any, shouldValidate?: boolean | undefined): void;
    }
  ) => {
    if (event.target.files) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedFile({
          ...selectedFile,
          [event.target.id]: reader.result as string,
        });

        if (event.target.files)
          setFieldValue(event.target.id, event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setSelectedFile({
        ...selectedFile,
        [event.target.id]: null,
      });
      setFieldValue(event.target.id, null);
    }
  };

  useEffect(() => {
    const isEmpty = Object.values(initialValues).every(
      (x) => x === null || x === ""
    );

    if (isEmpty) {
      const currentPhoto = currentUser.user_picture[0]?.value;
      setInitialValues({
        about: "",
        user_picture: currentUser.user_picture[0]?.value,
        coverPhoto: "",
      });
      setSelectedFile({
        ...selectedFile,
        user_picture: currentPhoto,
      });
    }
  }, [initialValues, currentUser]);

  async function handleSubmit(values: any) {
    dispatchAxios(updateUser(currentUser.uid[0].value, values));
  }

  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={(values) => handleSubmit(values)}
      validateOnChange={true}
      enableReinitialize
      validateOnBlur={true}
    >
      {({ handleSubmit, setFieldValue, errors, values }) => {
        return (
          <Form className="bg-white shadow">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6 py-6 px-4 sm:px-6 lg:py-12 lg:px-8">
              <div className="sm:col-span-6">
                <h2 className="text-xl font-medium text-gray-900">
                  CANNAcadet Profile
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  This is your public CANNAPAGES account profile, and how you
                  look to other CANNAcadets.
                </p>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor={"about"}
                  className={"block text-sm font-medium text-gray-700"}
                >
                  About
                </label>
                <Field
                  label="About"
                  id="about"
                  name="about"
                  type="text"
                  as={"textarea"}
                  className={
                    "text-base max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md px-3 py-2 h-20"
                  }
                />
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your profile. URLs will be hyperlinked.
                </p>
              </div>

              {/* <div className="sm:col-span-6">
                <label
                  htmlFor="user_picture"
                  className="block text-sm font-medium text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  <div className="inline-block h-12 w-12 rounded-full overflow-hidden	relative">
                    {selectedFile.user_picture ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={selectedFile.user_picture}
                          alt="Profile Photo"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    ) : (
                      <AvatarIcon className="w-12 h-12" />
                    )}
                  </div>
                  <div className="ml-4 flex">
                    <div className="relative bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-gray-50 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 focus-within:ring-green">
                      <label
                        htmlFor="user_picture"
                        className="relative text-sm font-medium text-gray-900 pointer-events-none"
                      >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                      </label>
                      <input
                        id="user_picture"
                        name="user_picture"
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                        onChange={(event) => onSelectFile(event, setFieldValue)}
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              {/* <div className="sm:col-span-6">
                <label
                  htmlFor="coverPhoto"
                  className="block text-sm font-medium text-gray-900"
                >
                  Cover Photo
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  {selectedFile.coverPhoto ? (
                    <div className="w-full flex justify-center px-6 pt-5 pb-6 h-36 rounded-md overflow-hidden relative">
                      <Image
                        src={selectedFile.coverPhoto}
                        alt="Cover Photo"
                        layout="fill"
                        objectFit="cover"
                      />

                      <div className="absolute bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm flex items-center cursor-pointer hover:bg-gray-50 focus-within:outline-none bottom-0 right-0 mr-2 mb-2 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-50 focus-within:ring-green">
                        <label
                          htmlFor="coverPhoto"
                          className="relative text-sm font-medium text-gray-900 pointer-events-none"
                        >
                          <span>Change</span>
                          <span className="sr-only">cover photo</span>
                        </label>
                        <input
                          id="coverPhoto"
                          name="coverPhoto"
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                          onChange={(event) =>
                            onSelectFile(event, setFieldValue)
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex justify-center px-6 pt-5 h-36 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <AddImageIcon className="h-12 w-12 text-gray-400 ml-auto mr-auto" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="coverPhoto"
                            className="relative cursor-pointer rounded-md font-medium text-green hover:text-green-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green"
                          >
                            <span>Upload a file</span>
                            <input
                              id="coverPhoto"
                              name="coverPhoto"
                              type="file"
                              className="sr-only"
                              onChange={(event) =>
                                onSelectFile(event, setFieldValue)
                              }
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div> */}
            </div>
            <div className=" bg-gray-50  py-3 flex justify-end pr-4">
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green"
              >
                Save
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
