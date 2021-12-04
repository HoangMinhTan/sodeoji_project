import { useState, React, useContext } from 'react';
import FirebaseContext from '../../context/firebase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {Fab, Grid } from '@material-ui/core';

  export default function EditProfile({user, handleClose}) {
    const [imgPost, setImgPost] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const { database, storage } = useContext(FirebaseContext);

    // Update password
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const isInvalid = (password === '' || passwordCheck === '') && imageSrc === '';

    // Update
    const handleUpdateUserProfile = async (event) => {
      if (password !== '' && password === passwordCheck) {
        event.preventDefault();
        console.log("ok");
      }
      if (imageSrc !== '')
      {
        event.preventDefault();
        console.log("ok");
      }
      window.location.reload();
    };

    const onImageChange = (event) => {
      
        if (event.target.files && event.target.files[0]) {
          let reader = new FileReader();
          reader.onload = (e) => {
            setImgPost({image: e.target.result});
          };
          reader.readAsDataURL(event.target.files[0]);
        }
        const file = event.target.files[0];
        const storageRef = storage.ref();
        let urlName = Date.now() + file.name;
        const fileRef = storageRef.child(`/avatars/${urlName}`);
        fileRef.put(file).then(() => {
            fileRef.getDownloadURL().then(function (url) {
                setImageSrc(url);
           });
        })
      }

    return (
        <>
          <div className="flex flex-col bg-white p-4 rounded width-post">
            <div className="p-4 py-5">
                <Grid container justify="center" alignItems="center">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={onImageChange}
                        hidden={true}
                    />
                    <label htmlFor="contained-button-file">
                    <Fab component="span">
                        <PhotoCamera />
                    </Fab>
                    </label>
                </Grid>
                { imgPost && <img id="target" className="padding-login" src={imgPost.image}/> }
            </div>

            <input
              type="password"
              placeholder="パスワード確認"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <input
              type="password"
              placeholder="フールネーム"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPasswordCheck(target.value)}
              value={passwordCheck}
            />

            <div>
                <button className={`bg-red-medium text-white w-45 rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}   
                disabled={isInvalid}  
                onClick = {handleUpdateUserProfile}> 保存
                </button>
                <a className={`pt-1`}> </a>

                <button className={` bg-blue-medium text-white w-45 rounded h-8 font-bold `}     
                onClick={handleClose}
                > キャンセル
                </button>
            </div>  
        </div>
    </>
    );
  }