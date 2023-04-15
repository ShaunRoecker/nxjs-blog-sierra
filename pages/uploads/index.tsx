import { NextPage } from "next";
import { useState } from "react";
import axios from 'axios';

type Props = {}

const Upload: NextPage<Props> = () => {
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState<File>();

    const handleUpload = async () => {
        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("myImage", selectedFile);
            const { data } = await axios.post("/api/image", formData);
            console.log(data);
        } catch (error: any) {
            console.log(error.response?.data);
        }
        setUploading(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-20 space-y-6 border rounded-xl">
            <label>
                <input 
                    type="file" 
                    hidden 
                    onChange={({ target }) => {
                        if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                            setSelectedFile(file);
                        }
                    }}
                    />
                <div className="w-40 aspect-video rounded flex items-center
                    justify-center border-2 border-dashed cursor-pointer">
                    { selectedImage ? (
                        <img src={selectedImage} alt="" />
                    ) : (
                        <span>Select Image</span>
                    )}
                </div>
            </label>

            <button 
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}
                className="bg-red-600 p-3 w-32 text-center rounded text-white"
            >
                { uploading ? "Uploading..." : "Upload" }
            </button>
            
        </div>
    )
}
export default Upload;


