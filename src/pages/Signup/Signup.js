import React, { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import auth from "../../firebase.init";
import useToken from "../../hooks/useToken";
import googleLogo from "../../images/google.png";

const Signup = () => {
  const [currentUser] = useAuthState(auth);
  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [updateProfile] = useUpdateProfile(auth);

  const [token] = useToken(user || gUser);

  let signInError;

  if (error || gError) {
    signInError = (
      <p className="text-red-500">
        <small>{error?.message || gError?.message}</small>
      </p>
    );
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (token || currentUser) {
      navigate("/");
    }
  }, [token, navigate, currentUser]);

  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <>
      <div className="my-10 mx-10">
        <section>
          <div className="card w-fit mx-auto bg-base-100 shadow-xl">
            <section>
              <div className="flex flex-row justify-evenly items-center rounded bg-gray-200 font-serif font-medium mb-2 font-primary text-lg">
                <Link
                  to="/login"
                  className="text-black px-4 py-2 w-full rounded hover:text-primary"
                >
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary text-accent px-4 py-2 w-full rounded"
                >
                  <span>Signup</span>
                </Link>
              </div>
            </section>
            <div className="card-body">
              {signInError}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="input input-bordered w-full max-w-xs"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Name is Required",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.name?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                </div>

                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="input input-bordered w-full max-w-xs"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "Email is Required",
                      },
                      pattern: {
                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                        message: "Provide a valid Email",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.email?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span className="label-text-alt text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </label>
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Password is Required",
                      },
                      minLength: {
                        value: 6,
                        message: "Must be 6 characters or longer",
                      },
                    })}
                  />
                  <label className="label">
                    {errors.password?.type === "required" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password?.type === "minLength" && (
                      <span className="label-text-alt text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </label>
                </div>

                <input
                  className="btn btn-primary w-full max-w-xs"
                  type="submit"
                  value={`${loading ? "Loading..." : "Signup"}`}
                />
              </form>
              <p>
                <small>
                  Already have an account?{" "}
                  <Link className="text-secondary" to="/login">
                    Login Now
                  </Link>
                </small>
              </p>
              <div className="divider">OR</div>
              <button
                onClick={() => signInWithGoogle()}
                className="border-2 border-primary w-full flex flex-row justify-center items-center gap-4 rounded-md p-2"
              >
                <img src={googleLogo} alt="" className="w-6 mx-auto" />
                <p>{gLoading ? "Loading..." : "Continue with Google"}</p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
