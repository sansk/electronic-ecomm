import { signInWithGooglePopUp, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();

    const userDocRef = await createUserDocFromAuth(user);
  }
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={logGoogleUser}>Sign in With Google</button>
    </div>
  );
}

export default SignIn;