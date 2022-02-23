import React, { forwardRef, memo, useCallback, useImperativeHandle, useState } from 'react'
import { Modal } from 'antd'
import { useFormik } from 'formik'
import { useNftContract } from 'hooks/useContract'
import { useActiveWeb3React } from 'hooks'
import UploadFile from 'pages/Upload/UploadFile'
import { useHookUpload } from 'pages/Upload/Store-Upload'
import { API_IMAGE } from 'constants/index'

import Button from 'components/Button'

const EditProfile = memo<any>(
  forwardRef<any, any>((props, ref) => {
    const nftContract = useNftContract()
    const { account } = useActiveWeb3React()
    const [state, actions] = useHookUpload()
    const [EditisModalVisible, EditsetIsModalVisible] = useState(false)
    const { objData } = state

    const handleCancelEditProfile = () => {
      EditsetIsModalVisible(false)
    }

    const handleOkEditProfile = () => {
      EditsetIsModalVisible(false)
    }

    console.log({ objDataaaa: objData })

    const formikEdit = useFormik({
      enableReinitialize: true,
      initialValues: {
        fileAvatar: '0',
        name: objData?.artistName || '',
        social: objData?.publicProfileLink || '',
        bio: objData?.artistDescription || '',
        fileBanner: '',
      },
      onSubmit: () => {
        actions.submitEditArtists(formikEdit.values, account)
        .then(() => {
          formikEdit.resetForm()
          EditsetIsModalVisible(false)
        })
      },
    } as any)

    const upLoadFileAvatarEdit = (event) => {
      formikEdit.setFieldValue('fileAvatar', event.target.files[0])
    }

    const toggle = useCallback(() => {
      EditsetIsModalVisible((p) => !p)
    }, [])

    useImperativeHandle(
      ref,
      () => {
        return {
          toggle,
        }
      },
      [toggle]
    )

    const EditModal = (
      <form id="frm-create-artist" className="uploadInfo" onSubmit={formikEdit.handleSubmit}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelName" htmlFor="nameInput">
          Name
        </label>
        <div className="form-group">
          <input
            placeholder="Enter the artist name"
            type="text"
            className="form-control"
            name="name"
            value={formikEdit.values.name}
            onChange={formikEdit.handleChange}
          />
        </div>

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="labelName" htmlFor="nameInput">
         Link Author&apos;s Social network
        </label>
        <div className="form-group">
          <input
            type="url"
            className="form-control"
            name="social"
            value={formikEdit.values.social}
            onChange={formikEdit.handleChange}
          />
        </div>

        <div className="form-group">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="bio" htmlFor="bio">
            Description
          </label>
          <textarea
            className="form-control"
            name="bio"
            placeholder="Please write something about yourself"
            value={formikEdit.values.bio}
            onChange={formikEdit.handleChange}
          />
        </div>
        <hr />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className="avatar" htmlFor="avatar">
          Your avatar
        </label>
        <div className="formfile">
          <div className="form-group avatar-upload">
            <UploadFile
              // src={`${API_IMAGE}${objData.avatarName}?v=122`}
              name="fileName"
              id="imgFile"
              accept="image/*"
              onChange={upLoadFileAvatarEdit}
            />
          </div>
        </div>
        <div className="btn-inf" id="btn-submit-artist">
          <Button primary text="Save" type="submit" />
        </div>
      </form>
    )

    return (
      <Modal
        className="body-custom"
        title="Edit Profile"
        // description="hieu"
        visible={EditisModalVisible}
        onOk={handleOkEditProfile}
        onCancel={handleCancelEditProfile}
      >
        {EditModal}
      </Modal>
    )
  })
)

export default EditProfile
