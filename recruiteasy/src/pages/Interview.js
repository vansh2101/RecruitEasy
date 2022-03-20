import React, { Component } from 'react'
import '../styles/output.css';
import {get, post, patch} from '../scripts/requests';

//firebase
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage'
import { firebaseConfig } from '../scripts/firebaseConfig';

//videojs
import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import 'webrtc-adapter';
import RecordRTC from 'recordrtc';

// register videojs-record plugin with this import
import 'videojs-record/dist/css/videojs.record.css';
import Record from 'videojs-record/dist/videojs.record.js';


class Interview extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name: '',
          email: '',
          desc: '',
          question: [],
          title: '',
          host: '',
          tab: 0,
          urls: [],
          id: window.location.hash.replace('#', ''),
          applicants: ''
      };

      firebase.initializeApp(firebaseConfig)
    }
    
    componentDidMount() {
        get(`https://b2bc-2405-201-4004-a04c-d5aa-285f-10b0-3687.ngrok.io/api/interview/${this.state.id}`, null).then((res) => {this.setState({question: res.questions, title: res.title, host: res.host, applicants: res.applicants})})

        const videoJsOptions = {
            controls: true,
            bigPlayButton: false,
            width: 500,
            height: 300,
            fluid: false,
            plugins: {
                record: {
                    audio: true,
                    video: true,
                    maxLength: 120,
                    debug: true
                }
            }
        };

        this.player = videojs(this.videoNode, videoJsOptions, () => {
            // print version information at startup
            const version_info = 'videoJs ready'
            videojs.log(version_info);
        });

        this.player.on('startRecord', () => {
            console.log('started recording!');
        });

        this.player.on('finishRecord', () => {
            console.log('finished recording');
        });
    };

    save = async (e) => {
        e.preventDefault()
        document.getElementById('load').classList.remove('hidden')
        if (this.state.tab !== 0){
            this.player.record().stop()
            await this.upload(this.player.recordedData)

            var url = await firebase.storage().ref().child(`${this.state.host}/${this.state.title}/${this.state.name}/${this.state.tab}`).getDownloadURL()

            const arr = this.state.urls
            arr[this.state.tab-1] = url
            this.setState({urls: arr})

            this.player.record().reset()
        }

        if(this.state.tab !== this.state.question.length){
            this.setState({tab: this.state.tab+1})
        }
        else{
            const res = await post('https://b2bc-2405-201-4004-a04c-d5aa-285f-10b0-3687.ngrok.io/api/applicant/', null, {
                name: this.state.name,
                email: this.state.email,
                desc: this.state.desc,
                interview: this.state.id,
                video: this.state.urls
            })

            const data = await patch(`https://b2bc-2405-201-4004-a04c-d5aa-285f-10b0-3687.ngrok.io/api/interview/${this.state.id}`, {'applicants': this.state.applicants+1})

            this.setState({tab: -1})
        }
        document.getElementById('load').classList.add('hidden')
    }

    upload = (uri) => {
        const path = `${this.state.host}/${this.state.title}/${this.state.name}/${this.state.tab}`
        var ref = firebase.storage().ref().child(path)
        return ref.put(uri)
    }

    render() {
      return (
        <div className='bg-gray-100 h-screen flex bg-local'>
            <div className="bg-white mx-auto max-w-6xl bg-white px-20 py-10 shadow-xl mt-14 mb-48 h-3/4">
                <form>
                    <h3 className="text-2xl font-bold text-center mb-7" style={this.state.tab != -1 ? {}: {display: 'none'}}>{this.state.title}</h3>

                    <div style={this.state.tab == 0 ? {}: {display: 'none'}}>
                        <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-full px-3">
                                <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                    Your Name*
                                </label>
                                <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Your Name" onChange={(val) => this.setState({name: val.target.value})} />
                            </div>
                        </div>

                        <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-full px-3">
                                <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                    Your Email*
                                </label>
                                <input className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Your Email" onChange={(val) => this.setState({email: val.target.value})} />
                            </div>
                        </div>

                        <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-full px-3">
                                <label className="uppercase tracking-wide text-black text-xs font-bold mb-2">
                                    Your Introduction*
                                </label>
                                <textarea className="w-full bg-gray-200 resize-none text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Your Introduction" onChange={(val) => this.setState({desc: val.target.value})} />
                            </div>
                        </div>
                    </div>

                    <div style={this.state.tab > 0 ? {}: {display: 'none'}}>
                        <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-full px-3">
                                <label className="uppercase tracking-wide text-black text-sm font-bold mb-2">
                                    {this.state.question[this.state.tab-1]}*
                                </label>
                            </div>
                        </div>

                        <div data-vjs-player>
                            <video id="myVideo" ref={node => this.videoNode = node} className="video-js vjs-default-skin" playsInline />
                        </div>
                    </div>

                    <div style={this.state.tab == -1 ? {}: {display: 'none'}}>
                        <div className="-mx-3 md:flex mb-1">
                            <div className="md:w-full px-3">
                                <h3 className="text-2xl font-bold text-center mb-7">Your application submitted successfully</h3>
                            </div>
                        </div>
                    </div>

                        <div className="-mx-3 md:flex mt-8" style={this.state.tab != -1 ? {}: {display: 'none'}}>
                            <div className="md:w-full px-3">
                                <button className="md:w-full bg-gray-900 text-white font-bold py-2 px-4 border-b-4 hover:border-b-2 border-gray-500 hover:border-gray-100 rounded-full" onClick={this.save}>
                                    {this.state.tab === this.state.question.length ? 'Submit' : 'Save & Continue'}
                                </button>
                            </div>
                        </div>

                </form>
            </div>

            <div className="modal fade bg-black bg-opacity-60 fixed hidden top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto" id="load">
                <div className='w-full h-screen flex justify-center items-center'>
                <svg role="status" class="mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="black"/>
                </svg>
                </div>
            </div>
        </div>
      );
    }
  }

export default Interview