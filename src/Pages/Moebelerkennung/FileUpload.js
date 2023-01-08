import './Moebelerkennung.css'
import React from 'react';
import { useState, useEffect } from "react";
import {
    ref,
    getStorage,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { firestore } from "../../firebase";
import { v4 } from "uuid";
import TapBarList from "../../components/TapBar/TapBarList";
import Header from "../../components/Header/Header";
import {collection} from "@firebase/firestore";



//tutorial: https://www.youtube.com/watch?v=YOAeBSCkArA&t=84s


const FileUpload = (props) => {
    const [imageUpload, setImageUpload] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

const storage= getStorage();
    const imagesListRef = ref(firestore, "images/");
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = collection(firestore, `images/${imageUpload.name+v4()}`); //namen für bild samndom angeben
        uploadBytes(imageRef, imageUpload).then((snapshot) => {

            /*getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
           );
        }*/ });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);


    return (



        <div className="primary-background">
            <Header/>

            <div className="margin-top">
                <input
                    type="file"
                    onChange={(event) => {
                        setImageUpload(event.target.files[0]);
                    }}
                />
                <button onClick={uploadImage}> Upload Image</button>
                {imageUrls.map((url) => {
                    return <img src={url} />;
                })}
            </div>

            <TapBarList/>


        </div>
    );
}


export default FileUpload;
