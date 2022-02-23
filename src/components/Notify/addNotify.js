const addNotify = (_meg, _type) => {
  return {
    title: 'Notify!',
    message: _meg,
    type: _type,
    width: 300,
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
      onScreen: true,
      pauseOnHover: true,
      click: true,
      touch: true,
    }
  }
}

export default addNotify