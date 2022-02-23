import React, { useRef } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import styled from 'styled-components'
import { InputArt, ButtonArt } from 'components/Art'
import { useNftContract } from '../../hooks/useContract'
import { useActiveWeb3React } from '../../hooks'
import { useHookUpload } from './Store-Upload'
import UploadFile from '../Upload/UploadFile'
// import { render } from 'react-dom'


export default function Form1() {
  const { account } = useActiveWeb3React()
  const [state, actions] = useHookUpload()
  const nftContract = useNftContract()
  
  const upLoadFileAvatar = (event) => {
      
    formik.setFieldValue('fileAvatar', event.target.files[0])
    
  }
  const upLoadFileBanner = (event) => {
  
    if(event.target.files[0] === undefined){
      formik.setFieldValue('fileBanner', '')
    }else{
      formik.setFieldValue('fileBanner', event.target.files[0])
    }
    
}

    // init formit and validate
    const formik = useFormik({
      initialValues: {
        fileAvatar:'',
        name: '',
        social: '',
        bio: '',
        fileBanner: ''
      },
      validationSchema: Yup.object({
        fileAvatar: Yup.string().required('Required!'),
        name: Yup.string().required('Required!'),
        social: Yup.string().required('Required!'),
        bio: Yup.string().required('Required!'),
        // fileBanner: Yup.string().required('Required!')
      } as any),

      onSubmit: () => {
        actions.submit(formik.values, account, nftContract).then(() => {
          formik.resetForm()
          window.location.href ='#/mintNFT'
          setTimeout(()=>{
            window.location.reload()
          },200)
        })
      },
    } as any)

    
  return (
    <>
      <form id="frm-create-artist" className="uploadInfo" onSubmit={formik.handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelName" htmlFor="nameInput" color='text'>
          Artist Name
        </label>
        <div className="form-group">
          <InputArt
            placeholder="Eg.Blue Sea"
            type="text"
            // className="form-control"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && <p style={{ color: 'red', marginTop: '8px' }}>{formik.errors.name}</p>}
        </div>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelName" htmlFor="nameInput" color='text'>
          Link Author&rsquo;s Social Network
        </label>
        <div className="form-group">
          <InputArt
            type="url"
            // className="form-control"
            name="social"
            value={formik.values.social}
            onChange={formik.handleChange}
            placeholder="https://twitter.com/link"
          />
          {formik.errors.social && formik.touched.social && <p style={{ color: 'red', marginTop: '8px' }}>{formik.errors.social}</p>}
        </div>

        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="bio" htmlFor="bio" color='text'>
            Description
          </label>
          <textarea
            className="form-control area-art"
            name="bio"
            placeholder="Please descibe some information for your NFT"
            value={formik.values.bio}
            onChange={formik.handleChange}
          />
          {formik.errors.bio && formik.touched.bio && <p style={{ color: 'red', marginTop: '8px' }}>{formik.errors.bio}</p>}
        </div>
        <hr />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="avatar" htmlFor="avatar" color='text'>
          Your avatar
          </label>
        <div className="formfile">
          <div className="form-group avatar-upload">
            <UploadFile
              name="fileName"
              id="imgFile"
              accept='image/*'
              onChange={upLoadFileAvatar}
            />
          </div>
          {formik.errors.fileAvatar && formik.touched.fileAvatar && (
              <p style={{ color: 'red' }}>{formik.errors.fileAvatar}</p>
            )}
        </div>
        <div className="btn-inf" id="btn-submit-artist">
          <ButtonArt type="submit" className="btn btn-submit">
            Submit
          </ButtonArt>
        </div>
      </form>
    </>
  )
}
