import React, { useState } from 'react'
import { Modal, Checkbox } from 'antd'
import '../styless.css'

const ShowModalBeta = React.memo((props: any): any => {
  const isBeta: any = localStorage.getItem('isBeta')
  const result: boolean = isBeta && isBeta.toLowerCase() === '1' ? false : true || true
  const [isModalVisible, setIsModalVisible] = useState(result)
  const [isCheck1, setCheck1] = useState(false)
  const [isCheck2, setCheck2] = useState(false)

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(true)
  }

  const accept = () => {
    if (isCheck1 && isCheck2) {
      localStorage.setItem('isBeta', '1')
      setIsModalVisible(false)
    }
  }

  const contentModalBeta = (
    <>
      <div className="content-modal-show">
        <h3 className="title-beta">This Product is in beta</h3>
        <p className="desc-beta">Once you enter a position, you cannot cancel or adjust it.</p>
        <div className="box-checked-item">
          <div className="checked-role">
            <Checkbox checked={isCheck1} onChange={() => setCheck1(!isCheck1)}>
              I understand that I am using this product at my own risk. Any losses incurred due to my actions are my own
              responsibility.
            </Checkbox>
          </div>
        </div>
        <div className="box-checked-item">
          <div className="checked-role">
            <Checkbox checked={isCheck2} onChange={() => setCheck2(!isCheck2)}>
              I understand that this product is still in beta.
              <br /> I am participating at my own risk
            </Checkbox>
          </div>
        </div>
      </div>
      <button
        disabled={!(isCheck1 && isCheck2)}
        onClick={() => accept()}
        type="button"
        className="btn-show-error disble"
      >
        Continue
      </button>
    </>
  )

  return (
    <>
      <Modal
        className="modal-beta-show"
        title="Welcome!"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {contentModalBeta}
      </Modal>
    </>
  )
})
function areEqual(prevProps, nextProps) {
  if (prevProps.type === nextProps.type) {
    return true
  }
  return false
}
export default React.memo(ShowModalBeta, areEqual)
