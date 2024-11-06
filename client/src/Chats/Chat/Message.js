import React from 'react'
import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import { formatDate, downloadMedia } from '../../../utils/common_utils'
import { AccountContext } from '../../Context/AccountProvider';
import GetAppIcon from '@mui/icons-material/GetApp';
import { iconPDF } from '../../Constants/data';
const Message = ({ message }) => {
    const { account } = useContext(AccountContext);
    return (
        <>
            {
                account.sub === message.senderId ?
                    <div className='bg-lime-200 max-w-[60%] ml-auto p-[5px] w-fit flex rounded-2xl break-words mb-[5px]' >
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }

                    </div>
                    : <div className='bg-white  p-[5px] max-w-[60%] w-fit flex rounded-2xl break-words mb-[5px]' >
                        {
                            message.type === 'file' ? <ImageMessage message={message} /> : <TextMessage message={message} />
                        }
                    </div>

            }
        </>

    )
}
const ImageMessage = ({ message }) => {
    return (
        <div className='relative'>
            {
                message?.text?.includes('.pdf') ?
                    <div className='flex'>
                        <img src={iconPDF} alt="pdf" style={{ width: 80 }} />
                        <Typography style={{ fontSize: 14 }}>{message.text.split('/').pop()}</Typography>
                    </div>
                    :
                    <img className='w-[300px] h-[100%] object-cover' src={message.text} alt={message.text} />

            }
            <Typography className='absolute bottom-0 right-0 text-xs mt-[6px] text-zinc-400 break-words break-keep'>
                <GetAppIcon onClick={(e) => { downloadMedia(e, message.text) }} style={{ marginRight: 10, border: '1px solid grey', borderRadius: '50%' }} fontSize="small" />
                {formatDate(message.createdAt)}
            </Typography>

        </div>
    )
}

const TextMessage = ({ message }) => {
    return (
        <>
            <Typography className='text-sm pr-[25px] pl-[5px]'>{message.text}</Typography>
            <Typography className='text-xs mt-[6px] text-zinc-400 break-words break-keep'>{formatDate(message.createdAt)}</Typography>
        </>
    )
}
export default Message