import React, { Component } from 'react'
import '../styles/output.css';
import {get, post} from '../scripts/requests';

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
          id: window.location.hash.replace('#', '')
      };

      firebase.initializeApp(firebaseConfig)
    }
    
    componentDidMount() {
        get(`http://localhost:8000/api/interview/${this.state.id}`, null).then((res) => {this.setState({question: res.questions, title: res.title, host: res.host})})

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

    save = async () => {
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
            const res = await post('http://localhost:8000/api/applicant/', null, {
                name: this.state.name,
                email: this.state.email,
                desc: this.state.desc,
                interview: this.state.id,
                video: this.state.urls
            })

            console.log(res)

            this.setState({tab: -1})
        }
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
                                <textarea className="w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3" type="text" placeholder="Your Introduction" onChange={(val) => this.setState({desc: val.target.value})} />
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
        </div>
      );
    }
  }

export default Interview