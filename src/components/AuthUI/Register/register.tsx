
import React, { MouseEvent, useState } from "react";
import MD5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/5cb480cd5f1b6d3fbadece79.png';
import firebaseAuth from "../../../firebase/firebase";
// IUserRegisterData

export const Register = (props:any) => {

    const [_visible,_setVisible] = useState<boolean>(false);
    const [_userData, _setUserData] = useState<IUserRegisterData>({
            username: '',
            email: '',
            password:'',
            errors:[],
            loading: false,
            usersRef: firebaseAuth.database().ref('users')
        });

    const isFormValid = () =>{
        let errs = Array();
        let error;

        if(isFormEmpty(_userData)){
            error = {message:'All fields are required!'}
            _setUserData({
                ..._userData,
                errors:errs.concat(error)
            });
            return false;
        }else if(!isPasswordValid(_userData)){
            error = {message:'Password should be more than six character'}
            _setUserData({
                ..._userData,
                errors:errs.concat(error)
            })
            return false;
        }else{
            _setUserData({
                ..._userData,
                errors:[]
            });
            return true;
        }
    }


    const isFormEmpty = ({ username,email,password }:IUserRegisterData) => {
        return !username.length || !email.length || !password.length;
    }

    const isPasswordValid = ({ password }:IUserRegisterData) => {
        if(password.length < 6) {
            return false;
        }
        return true;
    }

    
    const displayErrors = (errors:any[]) => errors.map((error, i) => 
                            <p className="p-3 bg-red-300 w-full mb-4 text-white" key={i}>{error.message}</p>)
    

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        _setUserData({
            ..._userData,
            [e.currentTarget.name]: e.currentTarget.value 
        });
    }

    const handleSubmit = (event:MouseEvent<HTMLButtonElement>) => {
        if(isFormValid()){
            _setUserData({
                ..._userData,
                errors:[],
                loading: true
            });

            event.preventDefault();
            firebaseAuth
                    .auth()
                    .createUserWithEmailAndPassword( _userData.email, _userData.password)
                    .then((createdUser:any) => {
                        createdUser.user.updateProfile({
                            displayName: _userData.username,
                            photoURL: `http://gravatar.com/avatar/${MD5(createdUser.user.email)}?d=identicon`
                        }) 
                        .then(() => {
                            _saveUser(createdUser).then(() => {
                                console.log("user save");
                            })
                            _setUserData({
                                ..._userData,
                                errors:[],
                                loading: false
                            });
                        })
                        .catch( (error:any) => {
                            _setUserData({
                                ..._userData,
                                errors: _userData.errors.concat(error),
                                loading:false
                            })
                        })
                    })
                    .catch(err =>{
                        console.log(err);
                        
                        _setUserData({
                            ..._userData,
                            errors: _userData.errors.concat(err),
                            loading: false
                        });
                    })
        }

    }

    const _saveUser = (createdUser:any) => {
        return _userData.usersRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    }
    const handlePasswordVisibility = () => _setVisible(prevState => !prevState);

    const passwordIconVisibility = _visible === false ? (<svg className="fill-current w-6 h-6" viewBox="0 0 24 24"><path fillRule="evenodd" d="M20.0980654,15.8909586 L18.6838245,14.4767177 C19.3180029,13.8356474 19.9009094,13.1592525 20.4222529,12.4831239 C20.5528408,12.3137648 20.673512,12.1521776 20.7838347,12 C20.673512,11.8478224 20.5528408,11.6862352 20.4222529,11.5168761 C19.8176112,10.7327184 19.1301624,9.94820254 18.37596,9.21885024 C16.2825083,7.1943753 14.1050769,6 12,6 C11.4776994,6 10.9509445,6.07352686 10.4221233,6.21501656 L8.84014974,4.63304296 C9.8725965,4.22137709 10.9270589,4 12,4 C14.7275481,4 17.3356792,5.4306247 19.76629,7.78114976 C20.5955095,8.58304746 21.3456935,9.43915664 22.0060909,10.2956239 C22.4045936,10.8124408 22.687526,11.2189945 22.8424353,11.4612025 L23.1870348,12 L22.8424353,12.5387975 C22.687526,12.7810055 22.4045936,13.1875592 22.0060909,13.7043761 C21.4349259,14.4451181 20.7965989,15.1855923 20.0980652,15.8909583 L20.0980654,15.8909586 Z M17.0055388,18.4197523 C15.3942929,19.4304919 13.7209154,20 12,20 C9.27245185,20 6.66432084,18.5693753 4.23371003,16.2188502 C3.40449054,15.4169525 2.65430652,14.5608434 1.99390911,13.7043761 C1.59540638,13.1875592 1.31247398,12.7810055 1.15756471,12.5387975 L0.812965202,12 L1.15756471,11.4612025 C1.31247398,11.2189945 1.59540638,10.8124408 1.99390911,10.2956239 C2.65430652,9.43915664 3.40449054,8.58304746 4.23371003,7.78114976 C4.6043191,7.42275182 4.9790553,7.0857405 5.35771268,6.77192624 L1.29289322,2.70710678 L2.70710678,1.29289322 L22.7071068,21.2928932 L21.2928932,22.7071068 L17.0055388,18.4197523 Z M6.77972015,8.19393371 C6.39232327,8.50634201 6.00677809,8.84872289 5.62403997,9.21885024 C4.86983759,9.94820254 4.18238879,10.7327184 3.57774714,11.5168761 C3.44715924,11.6862352 3.32648802,11.8478224 3.21616526,12 C3.32648802,12.1521776 3.44715924,12.3137648 3.57774714,12.4831239 C4.18238879,13.2672816 4.86983759,14.0517975 5.62403997,14.7811498 C7.71749166,16.8056247 9.89492315,18 12,18 C13.1681669,18 14.3586152,17.6321975 15.5446291,16.9588426 L14.0319673,15.4461809 C13.4364541,15.7980706 12.7418086,16 12,16 C9.790861,16 8,14.209139 8,12 C8,11.2581914 8.20192939,10.5635459 8.55381909,9.96803265 L6.77972015,8.19393371 Z M10.0677432,11.4819568 C10.0235573,11.6471834 10,11.8208407 10,12 C10,13.1045695 10.8954305,14 12,14 C12.1791593,14 12.3528166,13.9764427 12.5180432,13.9322568 L10.0677432,11.4819568 Z"/>
        </svg>):(<svg className="fill-current w-6 h-6"  viewBox="0 0 24 24"><path fillRule="evenodd" d="M12,4 C14.7275481,4 17.3356792,5.4306247 19.76629,7.78114976 C20.5955095,8.58304746 21.3456935,9.43915664 22.0060909,10.2956239 C22.4045936,10.8124408 22.687526,11.2189945 22.8424353,11.4612025 L23.1870348,12 L22.8424353,12.5387975 C22.687526,12.7810055 22.4045936,13.1875592 22.0060909,13.7043761 C21.3456935,14.5608434 20.5955095,15.4169525 19.76629,16.2188502 C17.3356792,18.5693753 14.7275481,20 12,20 C9.27245185,20 6.66432084,18.5693753 4.23371003,16.2188502 C3.40449054,15.4169525 2.65430652,14.5608434 1.99390911,13.7043761 C1.59540638,13.1875592 1.31247398,12.7810055 1.15756471,12.5387975 L0.812965202,12 L1.15756471,11.4612025 C1.31247398,11.2189945 1.59540638,10.8124408 1.99390911,10.2956239 C2.65430652,9.43915664 3.40449054,8.58304746 4.23371003,7.78114976 C6.66432084,5.4306247 9.27245185,4 12,4 Z M20.4222529,11.5168761 C19.8176112,10.7327184 19.1301624,9.94820254 18.37596,9.21885024 C16.2825083,7.1943753 14.1050769,6 12,6 C9.89492315,6 7.71749166,7.1943753 5.62403997,9.21885024 C4.86983759,9.94820254 4.18238879,10.7327184 3.57774714,11.5168761 C3.44715924,11.6862352 3.32648802,11.8478224 3.21616526,12 C3.32648802,12.1521776 3.44715924,12.3137648 3.57774714,12.4831239 C4.18238879,13.2672816 4.86983759,14.0517975 5.62403997,14.7811498 C7.71749166,16.8056247 9.89492315,18 12,18 C14.1050769,18 16.2825083,16.8056247 18.37596,14.7811498 C19.1301624,14.0517975 19.8176112,13.2672816 20.4222529,12.4831239 C20.5528408,12.3137648 20.673512,12.1521776 20.7838347,12 C20.673512,11.8478224 20.5528408,11.6862352 20.4222529,11.5168761 Z M12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 Z M12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 Z"/>
        </svg>);

    const handleInputError = (errors:any[],inputName:string) =>  {
        return errors.some((err) => err.message.toLowerCase().includes(inputName)) ?
                                        "focus:ring focus:ring-red-600 focus:outline-none focus:border-transparent border border-red-400 bg-red-400 p-3 w-full rounded-md "
                                        : "focus:ring focus:ring-purple-800 focus:outline-none focus:border-transparent border border-gray-400 p-3 w-full rounded-md"
    }
    
    return (
        <div className="w-full relative lg:h-screen lg:overflow-hidden">
            <div className="flex-1">
                <div className="w-full md:w-3/4 md:mx-auto lg:w-1/2 lg:mx-auto"> 
                <div className="w-full flex flex-col items-center justify-center text-center py-8">
                  <div>
                        <div className="flex flex-1 justify-center mb-6">
                            <img className="w-10 h-10 " src={Logo} />
                            <h1 className="font-robo font-semibold text-black text-3xl ml-2">Slincy</h1>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-sansta font-bold text-black mb-3">
                           First, Join Slincy</h1>
                        <p className="font-w700 text-md text-gray-700">We suggest using the email address you use at work.</p>
                   </div>
                   <div className="w-full input-form mt-7">
                       <div className="px-2">
                           <div className="px-10 md:px-28 lg:px-28 align-middle text-center">

                               {_userData.errors.length > 0 && displayErrors(_userData.errors)}

                               <fieldset className="mb-5">
                                    <input placeholder="Username" name="username" type="text" className=" 
                                    border-gray-400 focus:ring focus:border-transparent focus:outline-none border w-full 
                                    p-3 rounded-md " onChange={handleChange}  autoComplete="on"/>
                               </fieldset>
                               <fieldset className="mb-5">
                                    <input placeholder="E-mail" name="email" type="email" 
                                    className={handleInputError(_userData.errors,'email')}
                                     onChange={handleChange}  autoComplete="on"/>

                               </fieldset>
                               <fieldset className="mb-5 relative">
                                    <input id="input_pass" name="password" placeholder="Password" type={_visible === false ? "password" : "text"} 
                                    className={handleInputError(_userData.errors,'password')}
                                    onChange={handleChange}  />
                                    <span className="absolute right-0 p-3  cursor-pointer" onClick={handlePasswordVisibility}>
                                            {passwordIconVisibility}
                                    </span>
                                </fieldset>
                               <fieldset>
            {
            _userData.loading ? <button disabled className="bg-gray-200 text-center text-lg p-3 w-full focus:outline-none rounded-md">Loading...</button> : 
            <button className=" focus:ring p-3 font-sansta text-white text-lg font-extrabold w-full 
            focus:outline-none rounded-md"  style={{backgroundColor:"#611f69"}}
            onClick={handleSubmit}>Create account</button>
            }

                                   
                               </fieldset> 
                               <fieldset className="mt-5 flex text-left">
                                   <label className="flex items-center justify-start">
                                    <input type="checkbox" className="form-checkbox cursor-pointer bg-gray-200"/>
                                    <span className="text-sm ml-2">It’s okay to send me emails about SlimTeam</span>
                                   </label>
                               </fieldset>
                               <fieldset className="mt-6">
                                   <p className="text-gray-700">
                                   <span className="text-sm">By continuing, you’re agreeing to our</span>
                                    <span className="text-sm">  Customer Terms of Service, Privacy Policy, and Cookie Policy.</span>
                                  </p>
                               </fieldset>
                           </div>
                       </div>
                   </div>
                   <div className="relative mt-10 lg:mt-0 lg:absolute lg:right-10 lg:top-10">
                        <div className="flex items-center justify-center lg:block">
                        <p><span>Have an account?</span></p>
                        <p><Link to="/login" className="font-w800 text-blue-500 underline text-md"> 
                        Sign In</Link></p>
                        </div>
                    </div>
                   <div className="flex mt-10">
                     <div className="flex items-center justify-between text-sm ">
                        <a href="#" className="text-gray-400 hover:underline">Privacy & Terms</a>
                        <a href="#" className="text-gray-400 ml-3 hover:underline">Contact Us</a>
                        <a href="#" className="text-gray-400 ml-3">Change region </a>
                     </div>
                   </div>
                </div>
            </div>
            </div>
            
        </div>
    )
}