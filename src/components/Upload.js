import React, { useState } from 'react'
import { Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';


// credits to: https://medium.com/geekculture/how-to-upload-images-to-cloudinary-with-a-react-app-f0dcc357999c

const Upload = () => {
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");

    const uploadImage = () => {
        const cloudName = "dspyfujx0";
        const uploadPreset = "buffalo-app";

        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", uploadPreset)
        data.append("cloud_name", cloudName)
        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
                <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
                {/* <Button type='primary' onClick={uploadImage}>Upload</Button> */}
                <Button icon={<UploadOutlined />} onClick={uploadImage}>Click to Upload</Button>
            </div>
            <div>
                { url && <img alt="imagen" src={url} />}
            </div>
        </div>
    )
}
export default Upload;