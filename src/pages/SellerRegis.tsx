import { ChangeEvent, useState } from "react";
import Nav from "../components/Nav";

export default function SellerRegis() {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');

    const handleFile = (e : ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setSelectedFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    return (
        <>
            <Nav />
            <input
                type="file"
                className="file-input file-input-bordered file-input-success w-full max-w-xs"
                onChange={handleFile}
            />
            {
                previewUrl && (
                    <div>
                        <img src={previewUrl}></img>
                    </div>
                )
            }
        </>
    );
}