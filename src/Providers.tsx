import React, { useEffect } from "react";
import { Routes } from "./Routes";
import { StateProvider } from "./context/state";
import PNHelper from './Components/PNHelper';
interface ProvidersProps { }
import * as firebase from 'firebase';

export const Providers: React.FC<ProvidersProps> = ({ }) => {

  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyAnlqfLPf-VjIqEMp4LNsX48BAFll2e2Gw",
      authDomain: "kodfln.firebaseapp.com",
      databaseURL: "https://kodfln.firebaseio.com",
      projectId: "kodfln",
      storageBucket: "kodfln.appspot.com",
      messagingSenderId: "689575859836",
      appId: "1:689575859836:web:6d85748109e392d8d21bf9",
      measurementId: "G-01JW54G2QS"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, [])
  return (
    <StateProvider>
      <PNHelper></PNHelper>
      <Routes />
    </StateProvider>
  );
};
