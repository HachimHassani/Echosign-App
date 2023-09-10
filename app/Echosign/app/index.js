import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Link, Redirect} from 'expo-router';

export default function App() {
  return (
    <>
      <Link
        href="/welcome"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        start
      </Link>
      <Link
        href="/mainPage"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        home Page
      </Link>
      <Link
        href="/courses"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        learn
      </Link>
      <Link
        href="/lessonABC"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        study abc
      </Link>
      <Link
        href="/echoSign"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        about us
      </Link>
      <Link
        href="/lessonColor"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        Study color
      </Link>
      <Link
        href="/lessonAnimals"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        Study animals
      </Link>
      <Link
        href="/lessonNum"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        Study numbers
      </Link>
      <Link
        href="/game"
        className=" text-blue-500 justify-center items-center text-xl"
      >
        practice
      </Link>
    </>
  );
}

const styles = StyleSheet.create({
  
});
