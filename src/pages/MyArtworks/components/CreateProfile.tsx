/* eslint-disable dot-notation */
/* eslint-disable import/extensions */
import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react'
import { Modal, notification, Space } from 'antd'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import { useHookNft } from 'pages/Nft/Store-Nft'
import UploadFile from 'pages/Upload/UploadFile'
import Button from 'components/Button'



const CreateProfile = memo<any>(
  forwardRef<any, any>((props, ref) => {
    const nftContract = useNftContract()
    const { account } = useActiveWeb3React()
    const [state, actions]: any = useHookNft()
    const [CreateisModalVisible, CreatesetIsModalVisible] = useState(false)

    const formik = useFormik({
      initialValues: {
        fileAvatar: '',
        name: '',
        social: '',
        bio: '',
        fileBanner: '',
      },
      validationSchema: Yup.object({
        fileAvatar: Yup.string().required('Required!'),
        name: Yup.string().required('Required!'),
        social: Yup.string().required('Required!'),
        bio: Yup.string().required('Required!'),
        // fileBanner: Yup.string().required('Required!')
      } as any),

      onSubmit: () => {
        actions
        .submitArtists(formik.values, account, nftContract)
        .then((response) => {
          notification["info"]({
            message: 'Notification',
            className:'notiCustom',
            description:
            response.data.message===null ? (
              'Successfully!'
            ):( response.data.message)
          });
          if(response.data.message===null){
            window.location.reload()
          }        
        })
      },
    } as any)

    const upLoadFileAvatar = (event) => {
      formik.setFieldValue('fileAvatar', event.target.files[0])
      // console.log("xxx: ", event.target.files[0])
    }

    const handleOk = () => {
      CreatesetIsModalVisible(false)
    }

    const handleCancel = () => {
      CreatesetIsModalVisible(false)
    }

    const toggle = useCallback(() => {
      CreatesetIsModalVisible(p => !p)
    }, [])

    useImperativeHandle(ref, () => {
      return {
        toggle
      }
    }, [toggle])
    const titles = (
      <>
        <div className='title-1'>Activate Profile</div>
        <div className='title-2'>Create Author Profile</div>
      </>
    )

    const CreateProfileModal = (
      <form id="frm-create-artist" className="uploadInfo" onSubmit={formik.handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelName" htmlFor="nameInput">
          Name
        </label>
        <div className="form-group">
          <input
            placeholder="Eg.Blue Sea"
            type="text"
            className="form-control"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && formik.touched.name && <p style={{ color: 'red' }}>{formik.errors.name}</p>}
        </div>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelName" htmlFor="nameInput">
          Link Author&apos;s Social network
        </label>
        <div className="form-group">
          <input
            placeholder="https://twitter.com/link"
            type="url"
            className="form-control"
            name="social"
            value={formik.values.social}
            onChange={formik.handleChange}
          />
          {formik.errors.social && formik.touched.social && <p style={{ color: 'red' }}>{formik.errors.social}</p>}
        </div>

        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="bio" htmlFor="bio">
            Description
          </label>
          <textarea
            className="form-control"
            name="bio"
            placeholder="Please describe some information for your NFT"
            value={formik.values.bio}
            onChange={formik.handleChange}
          />
          {formik.errors.bio && formik.touched.bio && <p style={{ color: 'red' }}>{formik.errors.bio}</p>}
        </div>
        <hr />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="avatar" htmlFor="avatar">
          Your avatar
        </label>
        <div className="formfile">
          <div className="form-group avatar-upload">
            <UploadFile name="fileName" id="imgFile" accept="image/*" onChange={upLoadFileAvatar} />
            {formik.errors.fileAvatar && formik.touched.fileAvatar && (
              <p style={{ color: 'red' }}>{formik.errors.fileAvatar}</p>
            )}
          </div>
        </div>
        <div className="btn-inf cus-modal-info" id="btn-submit-artist">
          <Button
            type="submit"
            text='Submit'
            primary
          />
        </div>
      </form>
    )

    return (
      <Modal
        className="body-custom"
        title={titles}
        visible={CreateisModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {CreateProfileModal}
      </Modal>
    )
  })
)

export default CreateProfile