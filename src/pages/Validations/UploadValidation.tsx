/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik'

 const userSchema = yup.object().shape({
    name: yup.string().min(4).max(20).required(),
    category: yup.string().required() ,
    channel:yup.string().required() ,
    description: yup.string().max(100).required(),
    checkbox: yup.string().required(),
    // file: yup.string().required(),
  });

export default userSchema

// const ValidateFormUpload = () => {

//   <Formik
//     initialValues={{ name: "", desscription: "" }}
//     onSubmit={(values, { setSubmitting }) => {
//       console.log("Submitting")
//     }}
//     validationSchema = {Yup.object().shape({
//       name: Yup.string().min(4).max(20).required(),
//       desscription: Yup.string().min(1).max(100).required(),
//     })}
//   >
//     {props => {
//       const {
//         values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit
//       } = props;
//       return (
//         <form className="upload" onSubmit={handleSubmit}>
//           <label className="labelName" htmlFor="nameInput">Name</label>
//           <div className="form-group">
//             <input type="text" 
//                   className= "form-control"
//                   name="name" 
//                   value={values.name}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
                  
//                    />
//             {errors.name && touched.name &&(
//               <div className="input-feedback">{errors.name}</div>
//             )}
//           </div>
//           <div className="form-group">
//             <div className='row'>
//               <div className=" col-sm-4 col-md-4">
//                 <label className="labelCate" htmlFor="Textarea1">Category</label>
//                 <select className="form-control">
//                   <option>Image</option>
//                   <option>Video</option>
//                   <option>Gif</option>
//                 </select>
//               </div>
//               <div className=" col-sm-4 col-md-4">
//                 <label className="labelChannel" htmlFor="channel">Channel</label>
//                 <select className="form-control">
//                   <option>Fine Arts</option>
//                   <option>Sports</option>
//                 </select>
//               </div>
//               <div className="form-check col-sm-4 col-md-4">
//                 <input className="form-check-input check" type="radio" name="radios" value="ERC-721" checked />
//                 <label className="form-check-label">
//                   ERC-721
//                 </label>
//               </div>
//             </div>
//           </div>
//           <div className="form-group">
//             <label className="labelDes" htmlFor="Textarea1">Description</label>
//             <textarea className="form-control" />
//           </div>

//           <form className="formfile">
//             <div className="form-group">
//               <input type="file" accept=".jpg, .png, .jpeg" id="imgFile" className="inputFile" />
//             </div>
//           </form>
//           <div className="btn">
//             <button type="submit" className="btn btn-submit" disabled={isSubmitting}>Submit</button>
//             <button type="button" className="btn btn-cancel">Cancel</button>
//           </div>
//         </form>
//       )
//     }}
//   </Formik>
// }

// export default ValidateFormUpload;
