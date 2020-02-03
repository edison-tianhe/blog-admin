import store from '@/store'
import imagePreview from '_c/image-preview'

const btns = {
  image: (h, params, vm, type) => {
    return h('img', {
      attrs: {
        src: params.row[type]
          ? `${store.getters.baseImgUrl}${params.row[type]}`
          : require(`@/assets/images/emoticon/image_emoticon${Math.floor(Math.random() * 33) + 1}.png`)
      },
      style: {
        margin: '5px 0',
        width: '100%',
        display: 'block'
      },
      on: {
        click: () => {
          imagePreview([
            params.row[type]
              ? `${store.getters.baseImgUrl}${params.row[type]}`
              : require(`@/assets/images/emoticon/image_emoticon${Math.floor(Math.random() * 33) + 1}.png`)
          ])
        }
      }
    })
  },
  status: (h, params, vm, type) => {
    let _arr = ['隐藏', '显示']
    if (type) {
      type.split('-')[1] &&
      (_arr = type.split('-')[1].split('^'))
    }
    let tips = (params.row[type.split('-')[0]] === 1 ? _arr[0] : _arr[1])
    let children = ''
    if (params.row[type.split('-')[0]] === 1) {
      children = h('Button', {
        props: {
          type: 'success',
          size: 'small'
        }
      }, _arr[1])
    } else {
      children = h('Button', {
        props: {
          size: 'small'
        }
      }, _arr[0])
    }
    return h('div', [
      h('Poptip', {
        props: {
          confirm: true,
          placement: 'left',
          transfer: true,
          title: `是否修改为：${tips} ?`
        },
        on: {
          'on-ok': () => {
            vm.$emit(`on-item-${type.split('-')[0]}`, params.row)
          }
        }
      }, [children])
    ])
  },
  details: (h, params, vm) => {
    return h('Button', {
      props: {
        type: 'success',
        icon: 'ios-paper-outline',
        size: 'small'
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: () => {
          vm.$emit('on-item-details', params)
        }
      }
    }, '详情')
  },
  update: (h, params, vm) => {
    return h('Button', {
      props: {
        type: 'primary',
        icon: 'md-create',
        size: 'small'
      },
      style: {
        marginRight: '5px'
      },
      on: {
        click: () => {
          vm.$emit('on-item-update', params)
        }
      }
    }, '修改')
  },
  delete: (h, params, vm) => {
    return h('Poptip', {
      props: {
        confirm: true,
        title: '你确定要删除吗?',
        placement: 'left'
      },
      style: {
        marginRight: '5px',
        textAlign: 'left'
      },
      on: {
        'on-ok': () => {
          vm.$emit('on-item-delete', params)
        }
      }
    }, [
      h('Button', {
        props: {
          type: 'error',
          icon: 'ios-trash-outline',
          size: 'small'
        }
      }, '删除')
    ])
  }
}

export default btns
