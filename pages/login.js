import { useContext, useState, useEffect } from "react";
import { Layout } from "../components";
import { useFormFields } from "../utils/custome-hooks";
import { AuthContext } from "../contexts/auth";
import Router, { useRouter } from "next/router";

const Login = () => {
  const { login, isAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState("");
  const { formFields, createChangeHandler } = useFormFields({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    isAuthenticated && router.push("/dashboard");
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formFields.email, formFields.password);
    console.log(res);
    if (res.status === 401) {
      setError("Please check your credentials!!!");
    } else {
      setError("");
      router.push("/dashboard");
    }
  };

  return (
    <Layout>
      <h1 abbr="Meeting Management App">MMA Login</h1>
      {error && <p className="global-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            id="email"
            value={formFields.email}
            onChange={createChangeHandler("email")}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            id="password"
            value={formFields.password}
            onChange={createChangeHandler("password")}
          />
        </div>
        <button>Log in</button>
      </form>
    </Layout>
  );
};

export default Login;
