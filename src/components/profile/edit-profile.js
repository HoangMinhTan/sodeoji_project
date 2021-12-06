import { useState, React, useContext, useEffect } from 'react';
import FirebaseContext from '../../context/firebase';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import {Fab, Grid } from '@material-ui/core';
import { database} from '../../lib/firebase';


  export default function EditProfile({user, handleClose}) {
    const [imgPost, setImgPost] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const {firebase, storage } = useContext(FirebaseContext); 
    const realtimeDb = database;

    // Fail and Success
    const [fail, setFail] = useState('notshow');
    const [success, setSuccess] = useState('notshow');

    // Update password
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    // update group
    const [group, setGroup] = useState(user.group);

    const isInvalid = (password === '' || passwordCheck === '') && imageSrc === '' && (group === user.group);
    const valid = (password !== '' && passwordCheck !== '' && passwordCheck === password) || (imageSrc !== '') || (group !== user.group);
    const imgValid = (imageSrc !== '');
    const options = [
      {
        label: "中学生",
        value: "中学生",
      },
      {
        label: "高学生",
        value: "高学生",
      },
      {
        label: "大学生",
        value: "大学生",
      },
    ];

    // Update profile
    const handleUpdateUserProfile = async (event) => {
      //console.log(user);
      if (password !== '' && password === passwordCheck) {
        let current = firebase.auth().currentUser; 
        current.updatePassword(password).then(() => {
          console.log('success!Newpass:' + password);
        }).catch((error) => {
          console.error("fail");
        });
      }


      if (imageSrc !== '')
      {
        console.log(imageSrc);
        await realtimeDb.ref('Users/' + user.key).set({
          avatar: imageSrc,
          group: user.group,
          user_id: user.user_id,
          username: user.username,
        });
      }
      //console.log(user);


      if (group !== user.group){
        if (imageSrc === ''){
          await realtimeDb.ref('Users/' + user.key).set({
            avatar: user.avatar,
            group: group,
            user_id: user.user_id,
            username: user.username,
          });
        }
        else{
          await realtimeDb.ref('Users/' + user.key).set({
            avatar: imageSrc,
            group: group,
            user_id: user.user_id,
            username: user.username,
          });
        }
      }
      //console.log(user);
      if(valid){
        if(imgValid){
          setSuccess('notshow show')
        }
        else{
          setSuccess('notshow mshow');
        }
      }
      else setFail('notshow mshow');

      setTimeout(() => {
        setFail('notshow');
        setSuccess('notshow');
      },1000);
    };


    
    // update group
    const onGroupChange = (e) => {
      setGroup(e.target.value);
      //console.log(group);
    }

    // update avatar
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
          <div style={{width: 100 + '%', 
                       height: 50 + 'px', 
                       backgroundColor: 'rgb(112, 219, 112)',
                       marginTop: 15 + 'px',
                       marginBottom: 20 + 'px',
                       textAlign: 'center',
                       fontSize: 30 + 'px',
                       fontWeight: 'bold',
                       color: 'rgba(0, 0, 0, 0.5)'}}
               className={success}>成功しました。</div>
          <div style={{width: 100 + '%', 
                       height: 50 + 'px', 
                       backgroundColor: 'rgb(255, 92, 51)',
                       marginTop: 15 + 'px',
                       marginBottom: 20 + 'px',
                       textAlign: 'center',
                       fontSize: 30 + 'px',
                       fontWeight: 'bold',
                       color: 'rgba(0, 0, 0, 0.5)'}}
               className={fail}>不合格。</div>
          <div className="flex flex-col bg-white p-4 rounded width-post">
            <div className="p-4 py-5" style={{marginTop:100 + 'px'}}>
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
              type="text"
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
            <select
              style={{height: 100 + 'px'}}
              className="text-sm text-gray-base w-full mr-3 px-4 h-16 border border-gray-primary rounded mb-2"
              onChange={onGroupChange}
              value={group}>
              <option hidden>グルプル選択</option>
              {options.map((option) => (
              <option value={option.value}>{option.label}</option>
              ))}
            </select>

            <div>
                <button className={`bg-red-medium text-white w-45 rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}   
                disabled={isInvalid}  
                onClick = {() => 
                  {
                    handleUpdateUserProfile();
                    setTimeout(() => {
                      window.location.reload();
                    },2000);
                  }
                }> 保存
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