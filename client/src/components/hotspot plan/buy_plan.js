import React, { Fragment, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import axios from "axios";
import { useHistory, Link, Redirect } from "react-router-dom";

const Buy_plan = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [size] = useState("large");
  const token = localStorage.getItem("token");

  if (token === null) {
    setLoading(false);
  }
  const onFinish = (values) => {
    if (setLoading(false)) {
      return <Redirect to="/" />;
    }
    const userWiFi = {
      username: values.username,
      password: values.password,
    };
    axios
      .post("https://api-hotspot.koompi.org/api/hotspot/free-plan", userWiFi)
      .then((res) => {
        console.log(res);
        if (res.data === "Account already exist") {
          message.error(res.data);
          setLoading(false);
        }
        if (res.data === "Set plan successfully.") {
          message.success(res.data);
          setLoading(true);
          history.push("/home");
        }
      })
      .catch(async (err) => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        await message.error(err.response.data);
      });
  };
  return (
    <Fragment>
      <div className="loginBackground">
        <div className="forgotContainer">
          <div className="">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              className="login-form"
            >
              <h2>Buy Hotspot Plan</h2>
              {/* =============== username ============== */}
              <Form.Item
                name="username"
                rules={[{ required: true, message: "Please input username!" }]}
                size={size}
              >
                <Input placeholder="Username" size={size} />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Please input password!" }]}
              >
                <Input.Password
                  type="password"
                  placeholder="Password"
                  size={size}
                />
              </Form.Item>
              <Form.Item>
                <Radio.Group label="Plan Date:" defaultValue="15days">
                  <Radio.Button value="15days">15 Days</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {/* =============== Button Submit ============== */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  size={size}
                >
                  Submit
                </Button>
              </Form.Item>
              <p>
                * This user for loggin to <span>Koompi Hotspot Wi-Fi</span>{" "}
              </p>
            </Form>
            <Button>
              <Link to="/home">back</Link>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Buy_plan;
