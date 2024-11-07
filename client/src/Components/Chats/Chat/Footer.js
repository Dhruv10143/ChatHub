import { React, useState, useEffect } from 'react';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import InputBase from '@mui/material/InputBase';
import { uploadFile } from '../../../Service/Api';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const Footer = ({ sendText, setValue, value, file, setFile, setImg,openDrawer }) => {
  const onFileChange = (e) => {
    console.log(e);
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);
  };

  useEffect(() => {
    const setImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        let response = await uploadFile(data);
        setImg(response.data);
      }
    };
    setImage();
  }, [file]);

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const togglePicker = () => {
    setIsPickerOpen(!isPickerOpen);
  };

  const handleEmojiSelect = (emoji) => {
    // Append the emoji to the current value
    setValue((prev) => prev + emoji.native); // Add emoji to the text input
  };

  return (
    <div className='h-[63px] bg-gray-200 flex items-center w-full px-[15px] pb-0 text-gray-400'
     style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Black with 60% transparency
        borderRadius: '5px', // Rounded corners
        width: openDrawer ? '69%' : '100%', // Adjust width based on openDrawer state
        transition: 'width 0.3s ease', // Smooth transition for width change
      }}>
      <EmojiEmotionsOutlinedIcon className="m-[5px]" onClick={togglePicker} />
      {isPickerOpen && (
        <div style={{
          position: 'absolute',
          bottom: '7%',
          left: '0',
          zIndex: 1000,
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
        }}>
          <Picker theme='light' data={data} onEmojiSelect={handleEmojiSelect} />
        </div>
      )}
      <label htmlFor="fileInput">
        <AttachFileOutlinedIcon className='m-[5px] rotate-45' />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={(e) => onFileChange(e)} />
      <div className='mx-[5px] my-[0px] py-[5px] bg-white rounded-[5px] w-[calc(94%-25px)] text-sm'>
        <InputBase
          className="pl-[15px] w-full"
          placeholder='Type a message'
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={(e) => sendText(e)}
          value={value} />
      </div>
      <MicOutlinedIcon className='m-[5px]' />
    </div>
  );
};

export default Footer;
