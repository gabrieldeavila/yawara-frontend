import 'tui-image-editor/dist/tui-image-editor.css'
import ImageEditor from '@toast-ui/react-image-editor'
import 'tui-image-editor/dist/tui-image-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import { RiImageAddFill } from 'react-icons/ri'
import styled from 'styled-components'
import Dropzone from 'react-dropzone'
import { useState, memo } from 'react'
import { useEffect } from 'react'
import yawaTail from '../../assets/img/tail.svg'
import useTheme from '../../states/Theme'

const ImageReceive = styled.section`
  background: ${(props) => (props.isProfile ? '' : '#c4c4c4')};
  outline: 4px dashed var(--green);
  height: 366px;
  width: ${(props) =>
    props.isProfile ? '100%' : props.width ? `${props.width}%` : '50%'};
  box-shadow: 0px 4px 87px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 625px) {
    width: 100%;
  }
  p {
    color: var(--green);
    font-weight: 600;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

const Icon = styled(RiImageAddFill)`
  fill: var(--green);
  height: 10rem;
  width: 10rem;
`

const ProfPic = styled.img`
  width: 10rem;
`

function ImageEditorHistory({ defaultImage, width }) {
  const [message, setMessage] = useState('Joga a sua foto ou clica aqui 👀')
  const [img, setImg] = useState(null)

  const [theme] = useTheme(false, true)
  useEffect(() => {
    let imgToChange = document.getElementsByClassName(
      'tui-image-editor-header-logo',
    )[0]

    let textInPtBR = document.getElementsByClassName(
      'tui-image-editor-header-buttons',
    )[0]

    if (imgToChange) {
      imgToChange.children[0].src = yawaTail
    }
  }, [img])

  const createImageBlob = (file) => {
    // setImg(URL.createObjectURL(file));
    let fileToShow = file.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    )
    setImg(fileToShow[0].preview)
  }

  const tuiSettings = {
    includeUI: {
      loadImage: {
        path: img,
        name: 'SampleImage',
      },

      initMenu: 'filter',
      uiSize: {
        height: '60rem',
        width: '100%',
      },
      menuBarPosition: 'bottom',
    },
    text: {
      color: '#00a9ff',
      range: {
        value: 28,
      },
    },
    selectionStyle: {
      cornerSize: 20,
      rotatingPointOffset: 70,
    },
    usageStatistics: true,
  }

  const saveAsCanvas = () => {
    let canvas = document.getElementsByClassName('lower-canvas')[0]
    let base64 = canvas.toDataURL('image/jpeg', 1.0)
    console.log(base64)
  }

  return (
    <Container>
      {!img ? (
        <Dropzone
          onDragEnter={() => setMessage('Pode jogar aqui 🧐')}
          onDragLeave={() => setMessage('Joga a sua foto ou clica aqui 👀')}
          onDrop={(acceptedFiles) => {
            setMessage('Ae 😆 jogou!   ')
            createImageBlob(acceptedFiles)
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <ImageReceive
              width={width ?? false}
              isProfile={defaultImage ? true : false}
            >
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {defaultImage ? <ProfPic src={defaultImage} /> : <Icon />}
                <p style={{ margin: '1rem' }}>{message}</p>
              </div>
            </ImageReceive>
          )}
        </Dropzone>
      ) : (
        <div
          className={`tui-theme trans-1 ${
            theme[1] === 'dark' ? '' : 'tui-light'
          }`}
        >
          <ImageEditor {...tuiSettings} />
        </div>
      )}
    </Container>
  )
}

export default memo(ImageEditorHistory)
